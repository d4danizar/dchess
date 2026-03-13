"use client";

import { useState, useEffect, useCallback } from "react";
import { useParams } from "next/navigation";
import { Chess } from "chess.js";
import { Chessboard } from "react-chessboard";
import { Check, RotateCcw, Play, ChevronLeft, ChevronRight, Trophy, ArrowRight } from "lucide-react";
import { openingsData } from "../../../lib/openingsData";

export default function TrainerPage() {
  const params = useParams<{ id: string }>();
  const openingId = params?.id || "";
  const opening = openingId ? openingsData[openingId] : null;

  const [game, setGame] = useState(new Chess());
  const [fen, setFen] = useState(game.fen());
  const [isMounted, setIsMounted] = useState(false);
  const [moveIndex, setMoveIndex] = useState(0);
  const [currentLessonIndex, setCurrentLessonIndex] = useState(0);
  const [isFreePlay, setIsFreePlay] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [undoneHistory, setUndoneHistory] = useState<string[]>([]);
  const [moveFrom, setMoveFrom] = useState<string | null>(null);
  const [optionSquares, setOptionSquares] = useState({});

  if (!opening) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center text-white flex-col gap-4 text-center p-8">
        <h1 className="text-3xl font-bold">Opening Not Found</h1>
        <p className="text-gray-400">The chess opening you are looking for does not exist in our database.</p>
        <a href="/" className="px-6 py-3 bg-blue-600 hover:bg-blue-700 rounded-lg font-bold transition-colors">Go Back Home</a>
      </div>
    );
  }

  const lessons = opening.lessons;
  const currentLesson = lessons[currentLessonIndex] || { sequence: [], title: "", description: "" };

  // Fix hydration issues by only rendering chessboard on the client
  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Function to safely modify the game state
  const makeAMove = useCallback(
    (move: string | { from: string; to: string; promotion?: string }) => {
      try {
        const result = game.move(move);
        setFen(game.fen());
        return result; // returns null if the move was illegal, the move object if the move was legal
      } catch (e) {
        return null; // chess.js throws if move is invalid in recent versions
      }
    },
    [game]
  );

  // AI opponent logic: triggers automatically when it is the AI's turn
  useEffect(() => {
    const aiColor = opening?.playerColor === "black" ? "w" : "b";
    if (!isFreePlay && !showModal && game.turn() === aiColor && moveIndex < currentLesson.sequence.length) {
      const timer = setTimeout(() => {
        const expectedMove = currentLesson.sequence[moveIndex];
        makeAMove(expectedMove);
        setUndoneHistory([]); // Clear undone history on new moves

        const nextIndex = moveIndex + 1;
        setMoveIndex(nextIndex);

        if (nextIndex >= currentLesson.sequence.length) {
          setTimeout(() => setShowModal(true), 800);
        }
      }, 400);
      return () => clearTimeout(timer);
    }
  }, [moveIndex, game, makeAMove, isFreePlay, currentLesson, showModal, opening?.playerColor]);

  // Reusable core move validation extracted from drag and drop
  const handlePlayerMove = (sourceSquare: string, targetSquare: string) => {
    // Reset click highlighting
    setMoveFrom(null);
    setOptionSquares({});

    const playerColor = opening?.playerColor === "black" ? "b" : "w";
    if (!isFreePlay && game.turn() !== playerColor) {
      return false;
    }

    // Free Play Mode logic
    if (isFreePlay) {
      const move = makeAMove({
        from: sourceSquare,
        to: targetSquare,
        promotion: "q",
      });
      if (move) setUndoneHistory([]);
      return move !== null;
    }

    // Since we need to validate against SAN, and we only have coordinates from the UI event/click,
    // we make the move on a cloned game to see what its SAN representation is.
    const gameCopy = new Chess(game.fen());
    try {
      const attemptedMove = gameCopy.move({
        from: sourceSquare,
        to: targetSquare,
        promotion: "q",
      });

      if (!attemptedMove) return false; // Illegal chess move generally

      const expectedSan = currentLesson.sequence[moveIndex];

      // Strict sequence validation
      if (attemptedMove.san !== expectedSan) {
        return false;
      }

      // Valid sequence move, apply it
      makeAMove(attemptedMove);
      setUndoneHistory([]); // Clear undone history
      
      const nextIndex = moveIndex + 1;
      setMoveIndex(nextIndex);

      if (nextIndex >= currentLesson.sequence.length) {
        setTimeout(() => setShowModal(true), 800);
      }
      return true;

    } catch (e) {
      return false; // Illegal move caught by the chess.js engine
    }
  };

  // Handle player dropping a piece
  const onDrop = ({ sourceSquare, targetSquare }: { sourceSquare: string; targetSquare: string | null }) => {
    if (!targetSquare) {
      setMoveFrom(null);
      setOptionSquares({});
      return false;
    }
    return handlePlayerMove(sourceSquare, targetSquare);
  };

  const getMoveOptions = (square: string) => {
    // get all valid moves for this piece
    const moves = game.moves({
      square: square as import('chess.js').Square,
      verbose: true,
    });

    if (moves.length === 0) {
      setOptionSquares({});
      return;
    }

    const newSquares: Record<string, React.CSSProperties> = {};
    moves.map((move: any) => {
      newSquares[move.to] = {
        background:
          game.get(move.to as any) && game.get(move.to as any)?.color !== game.get(square as any)?.color
            ? "radial-gradient(circle, rgba(0,0,0,.1) 85%, transparent 85%)"
            : "radial-gradient(circle, rgba(0,0,0,.1) 25%, transparent 25%)",
        borderRadius: "50%",
      };
      return move;
    });

    // highlight the selected square
    newSquares[square] = {
      background: "rgba(255, 255, 0, 0.4)",
    };
    
    setOptionSquares(newSquares);
  };

  const onSquareClick = ({ square }: { square: string }) => {
    const playerColor = opening?.playerColor === "black" ? "b" : "w";
    if (!isFreePlay && game.turn() !== playerColor) {
      setMoveFrom(null);
      setOptionSquares({});
      return;
    }

    // If we haven't selected a piece yet
    if (!moveFrom) {
      const hasPiece = game.get(square as any);
      if (hasPiece && hasPiece.color === game.turn()) {
        setMoveFrom(square);
        getMoveOptions(square);
      }
      return;
    }

    // If we have selected a piece, attempt the move
    // Regardless of validation, reset the active visual highlights after execution
    handlePlayerMove(moveFrom, square);
  };

  const stepBack = () => {
    const undoneMove = game.undo();
    if (undoneMove) {
      let decrements = 1;
      const historyToPush = [undoneMove.san];
      
      const aiColor = opening?.playerColor === "black" ? "w" : "b";

      // If we are in lesson mode and we just undid the AI's move (meaning it's now the AI's turn),
      // we probably want to undo the user's move too, so the user can play.
      if (!isFreePlay && game.turn() === aiColor && moveIndex > 0) {
        const undoneUser = game.undo();
        if (undoneUser) {
          decrements = 2;
          historyToPush.push(undoneUser.san);
        }
      }

      setFen(game.fen());
      setUndoneHistory(prev => [...prev, ...historyToPush]);
      setOptionSquares({});
      setMoveFrom(null);
      if (!isFreePlay) {
        setMoveIndex(prev => Math.max(0, prev - decrements));
        setShowModal(false); // Hide modal if stepping back from end state
      }
    }
  };

  const stepForward = () => {
    if (undoneHistory.length > 0) {
      const moveToRedo = undoneHistory[undoneHistory.length - 1];
      try {
        game.move(moveToRedo);
        setFen(game.fen());
        setUndoneHistory(prev => prev.slice(0, -1));
        setOptionSquares({});
        setMoveFrom(null);
        if (!isFreePlay) {
          setMoveIndex(prev => prev + 1);
        }
      } catch (e) { }
    }
  };

  const resetGame = () => {
    const newGame = new Chess();
    setGame(newGame);
    setFen(newGame.fen());
    setMoveIndex(0);
    setUndoneHistory([]);
    setIsFreePlay(false);
    setShowModal(false);
  };

  const selectLesson = (index: number) => {
    setCurrentLessonIndex(index);
    const newGame = new Chess();
    setGame(newGame);
    setFen(newGame.fen());
    setMoveIndex(0);
    setUndoneHistory([]);
    setIsFreePlay(false);
    setShowModal(false);
  };

  const renderHistory = () => {
    const history = game.history();
    const pairs = [];
    for (let i = 0; i < history.length; i += 2) {
      pairs.push({
        moveNumber: Math.floor(i / 2) + 1,
        white: history[i],
        black: history[i + 1] || ""
      });
    }
    return pairs.map((pair, idx) => (
      <span key={idx} className="whitespace-nowrap">
        <span className="text-gray-500 mr-1">{pair.moveNumber}.</span>
        <span className="text-gray-200 mr-1">{pair.white}</span>
        {pair.black && <span className="text-gray-400">{pair.black}</span>}
      </span>
    ));
  };

  if (!isMounted) {
    return (
      <div className="min-h-screen bg-zinc-950 flex items-center justify-center">
        <div className="w-10 h-10 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col w-full bg-gray-900 text-white font-sans overflow-y-auto lg:flex-row lg:h-screen lg:overflow-hidden">

      {/* Column 1: Left Sidebar - Lessons (20%) */}
      <div className="w-full lg:w-1/5 order-3 lg:order-1 p-4 lg:p-0 border-t border-gray-700 lg:border-t-0 lg:border-r lg:border-gray-800 mt-4 lg:mt-0 flex-shrink-0 bg-gray-950 flex flex-col lg:h-full lg:overflow-y-auto shadow-2xl relative z-10">
        <div className="p-6 pb-4 border-b border-gray-800 sticky top-0 bg-gray-950/95 backdrop-blur z-20">
          <a href="/" className="inline-flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-colors mb-4 group font-medium">
            <ChevronLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            Back to Dashboard
          </a>
          <h1 className="text-2xl font-extrabold tracking-tight text-white flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center shadow-lg shadow-blue-500/20">
              <span className="text-lg leading-none">♟️</span>
            </div>
            {opening.title}
          </h1>
          <p className="text-gray-400 text-sm mt-3 font-medium">Progressive Stages</p>
        </div>

        <div className="p-4 flex-1 flex flex-col gap-3">
          {lessons.map((lesson, idx) => (
            <button
              key={lesson.id}
              onClick={() => selectLesson(idx)}
              className={`text-left p-4 rounded-xl border transition-all relative overflow-hidden group ${currentLessonIndex === idx
                  ? "bg-blue-600 border-blue-500 shadow-lg shadow-blue-500/10"
                  : "bg-gray-900/40 border-gray-800 hover:bg-gray-800/60 hover:border-gray-700"
                }`}
            >
              <div className="flex items-start justify-between mb-1">
                <span className={`font-bold tracking-tight ${currentLessonIndex === idx ? "text-white" : "text-gray-200"}`}>
                  {lesson.title}
                </span>
                {currentLessonIndex === idx && <Play className="w-4 h-4 text-white/80 shrink-0 mt-0.5 animate-pulse" />}
              </div>
              <p className={`text-sm leading-relaxed ${currentLessonIndex === idx ? "text-blue-100" : "text-gray-400 group-hover:text-gray-300"}`}>
                {lesson.description}
              </p>
            </button>
          ))}
        </div>
      </div>

      {/* Column 2: Middle - Chessboard (40%) */}
      <div className="w-full lg:w-2/5 order-1 lg:order-2 p-4 lg:p-6 flex flex-col lg:flex-row items-center justify-center flex-shrink-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-gray-800 via-gray-900 to-gray-950 relative">

        {/* Notification Toast */}
        <div className={`transform transition-all duration-500 ease-out absolute top-8 left-1/2 -translate-x-1/2 z-50 ${isFreePlay ? "translate-y-0 opacity-100" : "-translate-y-8 opacity-0 pointer-events-none"}`}>
          <div className="bg-emerald-950/90 backdrop-blur-md border border-emerald-500/30 rounded-full px-6 py-3 flex items-center shadow-[0_0_30px_rgba(16,185,129,0.15)] whitespace-nowrap">
            <div className="p-1 bg-emerald-500/20 rounded-full shrink-0 mr-3">
              <Check className="w-4 h-4 text-emerald-400" />
            </div>
            <div>
              <p className="text-emerald-100/90 text-sm font-medium tracking-wide">
                <strong className="text-emerald-300">Free Play Mode:</strong> You can now move both pieces natively.
              </p>
            </div>
          </div>
        </div>

        <div className={`w-full max-w-[400px] lg:max-w-none mx-auto aspect-square rounded-2xl p-4 md:p-6 border transition-all duration-700 shadow-2xl ${isFreePlay
            ? "bg-emerald-950/20 border-emerald-900/30 shadow-[0_0_50px_rgba(16,185,129,0.05)]"
            : "bg-gray-800/30 border-gray-700/50"
          }`}>
          <div className="w-full h-full rounded-lg overflow-hidden shadow-[inset_0_2px_10px_rgba(0,0,0,0.5)] border border-gray-900 bg-gray-800 flex items-center justify-center">
            <Chessboard options={{
              position: fen,
              onPieceDrop: onDrop,
              onSquareClick: onSquareClick,
              squareStyles: optionSquares,
              boardOrientation: opening?.playerColor || "white",
              darkSquareStyle: { backgroundColor: '#475569' },
              lightSquareStyle: { backgroundColor: '#e2e8f0' },
              animationDurationInMs: 250
            }} />
          </div>
        </div>
      </div>

      {/* Column 3: Right Sidebar - Notation & Controls (40%) */}
      <div className="w-full lg:w-2/5 order-2 lg:order-3 p-4 lg:p-6 flex flex-col gap-4 lg:gap-0 lg:border-l lg:border-gray-700 bg-gray-800/50 lg:h-full lg:overflow-y-auto flex-shrink-0">
        
        {/* Mission Briefing */}
        <div className="mb-4">
          <h2 className="text-xl font-bold text-blue-400 mb-2">{currentLesson.title}</h2>
          <p className="text-sm text-gray-300 leading-relaxed mb-6">{currentLesson.description}</p>
        </div>

        <h3 className="text-sm font-semibold tracking-wider text-gray-400 uppercase mb-3">Move Sequence</h3>

        {/* Move History */}
        <div className="flex-1 min-h-0 overflow-y-auto bg-gray-900 rounded-lg p-4 border border-gray-700 shadow-[inset_0_2px_15px_rgba(0,0,0,0.3)] font-mono text-lg flex flex-wrap gap-x-4 gap-y-2 content-start">
          {renderHistory()}
        </div>

        {/* Control Buttons */}
        <div className="flex justify-between gap-4 mt-4">
          <button
            onClick={stepBack}
            disabled={moveIndex === 0 && !isFreePlay && undoneHistory.length === 0}
            className="flex-1 group flex items-center justify-center py-4 bg-gray-800 hover:bg-gray-700 disabled:opacity-50 border border-gray-700 hover:border-gray-500 transition-all rounded-xl shadow-xl active:scale-95 disabled:active:scale-100"
          >
            <ChevronLeft className="w-6 h-6 text-gray-400 group-hover:text-white transition-colors" />
          </button>

          <button
            onClick={resetGame}
            className="flex-[2] group flex items-center justify-center gap-2 py-4 bg-red-950/40 hover:bg-red-900/60 border border-red-900/50 hover:border-red-700 transition-all rounded-xl font-bold tracking-wider text-red-200 shadow-xl active:scale-95"
          >
            <RotateCcw className="w-5 h-5 text-red-400 group-hover:text-white transition-colors group-active:-rotate-90 duration-300" />
            RESET
          </button>

          <button
            onClick={stepForward}
            disabled={undoneHistory.length === 0}
            className="flex-1 group flex items-center justify-center py-4 bg-gray-800 hover:bg-gray-700 disabled:opacity-50 border border-gray-700 hover:border-gray-500 transition-all rounded-xl shadow-xl active:scale-95 disabled:active:scale-100"
          >
            <ChevronRight className="w-6 h-6 text-gray-400 group-hover:text-white transition-colors" />
          </button>
        </div>
      </div>

      {/* Completion Modal Overlay */}
      {showModal && (
        <div className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center backdrop-blur-sm p-4 animate-in fade-in duration-300">
          <div className="bg-gray-900 border border-gray-700 p-8 rounded-2xl shadow-2xl max-w-sm w-full flex flex-col items-center relative overflow-hidden">
            {/* Background Glow */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-32 bg-blue-500/20 blur-[50px] pointer-events-none"></div>

            <div className="w-16 h-16 bg-blue-500/10 border border-blue-500/20 text-blue-400 rounded-full flex items-center justify-center mb-6 shadow-[0_0_30px_rgba(59,130,246,0.2)]">
              <Trophy className="w-8 h-8" />
            </div>

            <h2 className="text-2xl font-bold text-white mb-2 text-center tracking-tight">Lesson Completed!</h2>
            <p className="text-gray-400 mb-8 text-center text-sm leading-relaxed">
              Excellent! You successfully learned <strong>{currentLesson.title}</strong>. What would you like to do next?
            </p>

            <div className="flex flex-col gap-3 w-full">
              {currentLessonIndex < lessons.length - 1 && (
                <button
                  onClick={() => selectLesson(currentLessonIndex + 1)}
                  className="flex items-center justify-center gap-2 w-full py-3.5 bg-blue-600 hover:bg-blue-500 rounded-xl font-semibold text-white transition-all shadow-[0_0_20px_rgba(37,99,235,0.3)] active:scale-95"
                >
                  Start Next Stage <ArrowRight className="w-4 h-4" />
                </button>
              )}

              <button
                onClick={resetGame}
                className="flex items-center justify-center gap-2 w-full py-3.5 bg-gray-800 hover:bg-gray-700 border border-gray-700 rounded-xl font-semibold text-white transition-colors active:scale-95"
              >
                <RotateCcw className="w-4 h-4 text-gray-400" /> Retry Stage
              </button>

              <button
                onClick={() => {
                  setShowModal(false);
                  setIsFreePlay(true);
                }}
                className="flex items-center justify-center gap-2 w-full py-3.5 bg-emerald-950/30 hover:bg-emerald-900/40 border border-emerald-500/20 rounded-xl font-semibold text-emerald-400 transition-colors active:scale-95"
              >
                Explore from Here
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
