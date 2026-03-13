export interface Lesson {
  id: string;
  title: string;
  description: string;
  sequence: string[];
}

export interface OpeningData {
  title: string;
  description: string;
  playerColor?: "white" | "black";
  lessons: Lesson[];
}

export const openingsData: Record<string, OpeningData> = {
  "scotch-gambit": {
    title: "Scotch Gambit",
    description: "An aggressive 1.e4 e5 opening where White sacrifices a pawn for rapid development and attacking chances.",
    lessons: [
      // ==========================================
      // PART 1: THE FOUNDATION
      // ==========================================
      {
        id: "sg-base",
        title: "1. The Gambit Setup",
        description: "The foundation: Sacrifice the d4 pawn to develop the Bishop aggressively to c4, eyeing the f7 square.",
        sequence: ["e4", "e5", "Nf3", "Nc6", "d4", "exd4", "Bc4"]
      },

      // ==========================================
      // PART 2: FACING 4... Bc5 (Classical Main Line)
      // Black defends and pressures the center.
      // ==========================================
      {
        id: "sg-bc5-c3",
        title: "2A. Facing Bc5: The c3 Push",
        description: "Black responds with Bc5. We immediately pressure the center by offering a second pawn with c3.",
        sequence: ["e4", "e5", "Nf3", "Nc6", "d4", "exd4", "Bc4", "Bc5", "c3"]
      },
      {
        id: "sg-bc5-accept",
        title: "2B. Facing Bc5: They Take c3",
        description: "If Black gets greedy and takes the c3 pawn (dxc3), DO NOT RECAPTURE. Castle immediately (O-O) for rapid development.",
        sequence: ["e4", "e5", "Nf3", "Nc6", "d4", "exd4", "Bc4", "Bc5", "c3", "dxc3", "O-O"]
      },
      {
        id: "sg-bc5-d3",
        title: "2C. Facing Bc5: They Push d3",
        description: "Black plays it smart, refusing to open files and pushing the pawn to d3. We recapture with the Queen (Qxd3).",
        sequence: ["e4", "e5", "Nf3", "Nc6", "d4", "exd4", "Bc4", "Bc5", "c3", "d3", "Qxd3"]
      },
      {
        id: "sg-bc5-ng5",
        title: "2D. Facing Bc5: The Ng5 Aggression",
        description: "The hooligan variation. After Bc5, we ignore c3 and immediately attack f7 with the Knight (Ng5).",
        sequence: ["e4", "e5", "Nf3", "Nc6", "d4", "exd4", "Bc4", "Bc5", "Ng5"]
      },

      // ==========================================
      // PART 3: FACING 4... Nf6 (Two Knights Defense)
      // Black ignores our Bishop and attacks e4.
      // ==========================================
      {
        id: "sg-nf6-e5",
        title: "3A. Facing Nf6: The e5 Thrust",
        description: "Black attacks e4 with the Knight. We immediately thrust the e5 pawn to kick the Knight away.",
        sequence: ["e4", "e5", "Nf3", "Nc6", "d4", "exd4", "Bc4", "Nf6", "e5"]
      },
      {
        id: "sg-nf6-d5",
        title: "3B. Facing Nf6: The d5 Counter",
        description: "After we push e5, Black usually attacks our Bishop with d5. We ignore d5 and capture the Knight (exf6).",
        sequence: ["e4", "e5", "Nf3", "Nc6", "d4", "exd4", "Bc4", "Nf6", "e5", "d5", "exf6"]
      },
      {
        id: "sg-nf6-maxlange",
        title: "3C. Facing Nf6: Max Lange Attack",
        description: "A razor-sharp variation. After Nf6, we let the e4 pawn hang, castle immediately (O-O), and prepare a deadly pin on the e-file.",
        sequence: ["e4", "e5", "Nf3", "Nc6", "d4", "exd4", "Bc4", "Nf6", "O-O"]
      },

      // ==========================================
      // PART 4: FACING 4... Bb4+ (Provocative Check)
      // Black checks immediately.
      // ==========================================
      {
        id: "sg-bb4-c3",
        title: "4A. Facing Bb4+: Block with c3",
        description: "Black checks. We block solidly with the c3 pawn, simultaneously attacking the Bishop.",
        sequence: ["e4", "e5", "Nf3", "Nc6", "d4", "exd4", "Bc4", "Bb4+", "c3"]
      },
      {
        id: "sg-bb4-dxc3",
        title: "4B. Facing Bb4+: Double Sacrifice",
        description: "If Black takes c3 (dxc3), WE LET IT HANG AGAIN! Castle immediately (O-O). Our attacking initiative is massive.",
        sequence: ["e4", "e5", "Nf3", "Nc6", "d4", "exd4", "Bc4", "Bb4+", "c3", "dxc3", "O-O"]
      },

      // ==========================================
      // PART 5: THE TRAPS
      // Quick checkmates if Black blunders.
      // ==========================================
      {
        id: "sg-trap-greed",
        title: "5A. Trap: The Greedy Bishop",
        description: "Black gets greedy and takes the b2 pawn after the Double Sacrifice. We capture with the Bishop (Bxb2) and dominate the long diagonal.",
        sequence: ["e4", "e5", "Nf3", "Nc6", "d4", "exd4", "Bc4", "Bb4+", "c3", "dxc3", "O-O", "cxb2", "Bxb2"]
      },
      {
        id: "sg-trap-f7",
        title: "5B. Trap: The f7 Collapse",
        description: "From the Ng5 variation, Black blunders with Nh6. We sacrifice the Knight on f7 (Nxf7) to completely shatter their Kingside.",
        sequence: ["e4", "e5", "Nf3", "Nc6", "d4", "exd4", "Bc4", "Bc5", "Ng5", "Nh6", "Nxf7"]
      },
      {
        id: "sg-trap-queen",
        title: "5C. Trap: The Queen Fork",
        description: "The follow-up to Trap 5B. After the King takes the Knight (Kxf7), we bring the Queen to f3 (Qf3+) for a devastating double attack.",
        sequence: ["e4", "e5", "Nf3", "Nc6", "d4", "exd4", "Bc4", "Bc5", "Ng5", "Nh6", "Nxf7", "Nxf7", "Bxf7+", "Kxf7", "Qh5+"]
      },

      // ==========================================
      // PART 6: GÖRING GAMBIT (Extreme Aggression)
      // Offering two pawns right from the start.
      // ==========================================
      {
        id: "gg-base",
        title: "6A. Göring Gambit: Offer c3",
        description: "Instead of Bc4, we immediately offer a second pawn with c3.",
        sequence: ["e4", "e5", "Nf3", "Nc6", "d4", "exd4", "c3"]
      },
      {
        id: "gg-accept",
        title: "6B. Göring Gambit: Accepted",
        description: "Black accepts the c3 offer (dxc3). We develop the Knight (Nxc3). Our pieces activate incredibly fast.",
        sequence: ["e4", "e5", "Nf3", "Nc6", "d4", "exd4", "c3", "dxc3", "Nxc3"]
      },
      {
        id: "gg-decline",
        title: "6C. Göring Gambit: Declined (d3)",
        description: "Black declines to open the position and pushes the pawn to d3. We recapture with the Bishop (Bxd3) and prepare our assault.",
        sequence: ["e4", "e5", "Nf3", "Nc6", "d4", "exd4", "c3", "d3", "Bxd3"]
      }
    ]
  },
  "stafford-gambit": {
    title: "Stafford Gambit",
    description: "A venomous response for Black against 1.e4. Sacrifice a pawn for blistering piece activity and vicious traps.",
    playerColor: "black",
    lessons: [
      // ==========================================
      // PART 1: THE FOUNDATION
      // ==========================================
      {
        id: "st-base",
        title: "1. The Stafford Setup",
        description: "Bait White with the Petrov Defense, let them take e5, then challenge with Nc6. You are down a pawn but gain massive, explosive development.",
        sequence: ["e4", "e5", "Nf3", "Nf6", "Nxe5", "Nc6", "Nxc6", "dxc6"]
      },

      // ==========================================
      // PART 2: FACING 5. d3 (The Most Common/Solid Defense)
      // White tries to protect e4 and play it safe.
      // ==========================================
      {
        id: "st-d3-bc5",
        title: "2A. Facing 5. d3: Bc5 Development",
        description: "White solidly defends e4. We immediately develop our Bishop to c5, targeting the vulnerable f2 square.",
        sequence: ["e4", "e5", "Nf3", "Nf6", "Nxe5", "Nc6", "Nxc6", "dxc6", "d3", "Bc5"]
      },
      {
        id: "st-d3-bg5",
        title: "2B. Facing 5. d3: The Bg5 Pin",
        description: "White pins our Knight to the Queen. We casually ignore the danger and push h6, baiting a massive trap.",
        sequence: ["e4", "e5", "Nf3", "Nf6", "Nxe5", "Nc6", "Nxc6", "dxc6", "d3", "Bc5", "Bg5", "h6"]
      },
      {
        id: "st-d3-be2",
        title: "2C. Facing 5. d3: The Be2 Solid Line",
        description: "White plays very safely with Be2 to prevent Ng4. We respond by pushing h5, preparing to launch a Kingside attack anyway.",
        sequence: ["e4", "e5", "Nf3", "Nf6", "Nxe5", "Nc6", "Nxc6", "dxc6", "d3", "Bc5", "Be2", "h5"]
      },

      // ==========================================
      // PART 3: FACING 5. Nc3 (Standard Development)
      // White develops a piece instead of pushing a pawn.
      // ==========================================
      {
        id: "st-nc3-ng4",
        title: "3A. Facing 5. Nc3: The Ng4 Assault",
        description: "After Bc5, if White plays d3, we immediately launch our Knight to g4. The pressure on f2 is immense.",
        sequence: ["e4", "e5", "Nf3", "Nf6", "Nxe5", "Nc6", "Nxc6", "dxc6", "Nc3", "Bc5", "d3", "Ng4"]
      },
      {
        id: "st-nc3-bc4",
        title: "3B. Facing 5. Nc3: The Qd4 Counter",
        description: "White tries to attack our f7 square with Bc4. We respond with Qd4!, a brutal double attack threatening both the Bishop and checkmate.",
        sequence: ["e4", "e5", "Nf3", "Nf6", "Nxe5", "Nc6", "Nxc6", "dxc6", "Nc3", "Bc5", "Bc4", "Qd4"]
      },

      // ==========================================
      // PART 4: FACING 5. e5 (Aggressive/Greedy Push)
      // White tries to kick our Knight immediately.
      // ==========================================
      {
        id: "st-e5-base",
        title: "4A. Facing 5. e5: The Ne4 Outpost",
        description: "White pushes e5. We do not retreat! We jump our Knight forward to the powerful e4 outpost.",
        sequence: ["e4", "e5", "Nf3", "Nf6", "Nxe5", "Nc6", "Nxc6", "dxc6", "e5", "Ne4"]
      },

      // ==========================================
      // PART 5: THE ERIC ROSEN TRAPS (Lethal Executions)
      // Punishing White's natural-looking blunders.
      // ==========================================
      {
        id: "st-trap-queen",
        title: "5A. Trap: Oh No, My Queen!",
        description: "From the Bg5 pin, White retreats to Bh4. We sacrifice the Queen with Nxe4! If Bxd8, Bxf2+ Ke2 Bg4# is a forced mate.",
        sequence: ["e4", "e5", "Nf3", "Nf6", "Nxe5", "Nc6", "Nxc6", "dxc6", "d3", "Bc5", "Bg5", "h6", "Bh4", "Nxe4", "Bxd8", "Bxf2+", "Ke2", "Bg4#"]
      },
      {
        id: "st-trap-elephant",
        title: "5B. Trap: The Elephant (e5 Variation)",
        description: "White attacks our Ne4 outpost with d3. We ignore it with Bc5! If they take the Knight (dxe4), Bxf2+ forces the King to move, and we win the Queen.",
        sequence: ["e4", "e5", "Nf3", "Nf6", "Nxe5", "Nc6", "Nxc6", "dxc6", "e5", "Ne4", "d3", "Bc5", "dxe4", "Bxf2+", "Ke2", "Qxd1+", "Kxd1"]
      },

      // ==========================================
      // PART 6: THE DEEP WATERS (Advanced Theory)
      // What happens when White actually knows the theory.
      // ==========================================
      {
        id: "st-deep-refutation",
        title: "6A. Advanced: The GM Refutation",
        description: "White plays Be2 and responds to h5 with c3. This blunts our Bishop and solidifies their extra pawn. A slow, positional grind begins.",
        sequence: ["e4", "e5", "Nf3", "Nf6", "Nxe5", "Nc6", "Nxc6", "dxc6", "d3", "Bc5", "Be2", "h5", "c3"]
      },
      {
        id: "st-deep-hybrid",
        title: "6B. Advanced: Tennison Hybrid Trap",
        description: "White spots the Queen trap and plays dxe4 instead. We bring the Queen out (Qxh4). The position is chaotic, but we have massive attacking chances.",
        sequence: ["e4", "e5", "Nf3", "Nf6", "Nxe5", "Nc6", "Nxc6", "dxc6", "d3", "Bc5", "Bg5", "h6", "Bh4", "Nxe4", "dxe4", "Qxh4"]
      },

      // ==========================================
      // PART 7: THE MISSING PIECES (Extra Defenses & Sacrifices)
      // ==========================================
      {
        id: "st-f3-defense",
        title: "7A. Facing 5. f3: The Engine Defense",
        description: "White plays the absolute best computer move, f3, solidly defending e4 and completely blocking Ng4. We continue with Bc5, aiming to reroute the Knight to h5 to attack g3.",
        sequence: ["e4", "e5", "Nf3", "Nf6", "Nxe5", "Nc6", "Nxc6", "dxc6", "f3", "Bc5"]
      },
      {
        id: "st-trap-knight-sac",
        title: "7B. Trap: The h3 Knight Sacrifice",
        description: "White plays safely and castling (O-O). We put our Knight on g4. White kicks it with h3. We DO NOT retreat! We play Qd6, threatening mate on h2. If they take the Knight (hxg4), hxg4 opens the devastating h-file for our Rook.",
        sequence: ["e4", "e5", "Nf3", "Nf6", "Nxe5", "Nc6", "Nxc6", "dxc6", "d3", "Bc5", "Be2", "h5", "O-O", "Ng4", "h3", "Qd6"]
      },
      {
        id: "st-d4-strike",
        title: "7C. Facing 5. d4: The Center Strike",
        description: "White ignores defending e4 and immediately strikes the center with d4. We simply take the free pawn with Nxe4, centralizing our Knight and challenging their control.",
        sequence: ["e4", "e5", "Nf3", "Nf6", "Nxe5", "Nc6", "Nxc6", "dxc6", "d4", "Nxe4"]
      }
    ]
  },
  // ==========================================
  // 3. THE KING'S GAMBIT (White)
  // ==========================================
  "kings-gambit": {
    title: "King's Gambit",
    description: "The ultimate romantic opening. Sacrifice the f-pawn on move 2 to obliterate Black's center and open the f-file.",
    playerColor: "white",
    lessons: [
      {
        id: "kg-base",
        title: "1. The Setup & Accepted",
        description: "Offer the f4 pawn. If Black takes, develop the Knight to Nf3 to prevent Qh4+ and prepare to dominate the center.",
        sequence: ["e4", "e5", "f4", "exf4", "Nf3"]
      },
      {
        id: "kg-trap-muzio",
        title: "2. Trap: The Muzio Gambit",
        description: "Pure chaos. If Black pushes g5 to defend their pawn, we ignore it, castle (O-O), and let them take our Knight! Massive attack follows.",
        sequence: ["e4", "e5", "f4", "exf4", "Nf3", "g5", "Bc4", "g4", "O-O", "gxf3", "Qxf3"]
      }
    ]
  },

  // ==========================================
  // 4. THE EVANS GAMBIT (White)
  // ==========================================
  "evans-gambit": {
    title: "Evans Gambit",
    description: "A hyper-aggressive cousin of the Italian Game. Sacrifice the b-pawn to build a massive center and trap the Black King.",
    playerColor: "white",
    lessons: [
      {
        id: "eg-base",
        title: "1. The b4 Sacrifice",
        description: "After standard Italian development, throw the b4 pawn at their Bishop. If accepted, immediately push c3 to gain a tempo.",
        sequence: ["e4", "e5", "Nf3", "Nc6", "Bc4", "Bc5", "b4", "Bxb4", "c3"]
      },
      {
        id: "eg-center-crush",
        title: "2. The Center Crush",
        description: "After Black retreats the Bishop to a5, we strike the center with d4, completely taking over the board.",
        sequence: ["e4", "e5", "Nf3", "Nc6", "Bc4", "Bc5", "b4", "Bxb4", "c3", "Ba5", "d4", "exd4", "O-O"]
      }
    ]
  },

  // ==========================================
  // 5. THE DANISH GAMBIT (White)
  // ==========================================
  "danish-gambit": {
    title: "Danish Gambit",
    description: "Sacrifice TWO pawns in the first 4 moves to turn your Bishops into lethal sniper rifles aiming at Black's Queenside.",
    playerColor: "white",
    lessons: [
      {
        id: "dg-base",
        title: "1. The Double Sacrifice",
        description: "Offer d4, then c3, and finally let them take b2. Recapture with the Bishop. Look at those diagonals!",
        sequence: ["e4", "e5", "d4", "exd4", "c3", "dxc3", "Bc4", "cxb2", "Bxb2"]
      }
    ]
  },

  // ==========================================
  // 6. FRIED LIVER ATTACK (White)
  // ==========================================
  "fried-liver": {
    title: "Fried Liver Attack",
    description: "Punish Black's Two Knights Defense by ruthlessly targeting the f7 square and drawing their King into the center.",
    playerColor: "white",
    lessons: [
      {
        id: "fl-base",
        title: "1. The Setup",
        description: "When Black plays Nf6, jump in with Ng5. If they block with d5, take it. If they recapture with the Knight... the trap is set.",
        sequence: ["e4", "e5", "Nf3", "Nc6", "Bc4", "Nf6", "Ng5", "d5", "exd5", "Nxd5"]
      },
      {
        id: "fl-sacrifice",
        title: "2. The Sacrifice (Nxf7)",
        description: "Boom! Sacrifice the Knight on f7. When the King takes, bring the Queen to f3 with check, attacking the King and the pinned Knight.",
        sequence: ["e4", "e5", "Nf3", "Nc6", "Bc4", "Nf6", "Ng5", "d5", "exd5", "Nxd5", "Nxf7", "Kxf7", "Qf3+"]
      }
    ]
  },

  // ==========================================
  // 7. THE LONDON SYSTEM (White)
  // ==========================================
  "london-system": {
    title: "London System",
    description: "A rock-solid, system-based opening. Build an unbreakable pyramid of pawns and wait for Black to make a mistake.",
    playerColor: "white",
    lessons: [
      {
        id: "ls-base",
        title: "1. The Pyramid Setup",
        description: "No matter what Black does, play d4, Bf4, e3, and c3. Your center is practically invincible.",
        sequence: ["d4", "d5", "Bf4", "Nf6", "e3", "e6", "c3", "c5", "Nd2"]
      }
    ]
  },

  // ==========================================
  // 8. TENNISON GAMBIT (White)
  // ==========================================
  "tennison-gambit": {
    title: "Tennison Gambit",
    description: "A sneaky opening against the Scandinavian. Features the infamous 'ICBM Trap' that wins the Queen.",
    playerColor: "white",
    lessons: [
      {
        id: "tg-icbm",
        title: "1. The ICBM Trap",
        description: "Sacrifice the Knight on f7. When the King takes, Bg6+ forces the King away, leaving the Black Queen completely undefended!",
        sequence: ["e4", "d5", "Nf3", "dxe4", "Ng5", "Nf6", "d3", "exd3", "Bxd3", "h6", "Nxf7", "Kxf7", "Bg6+", "Kxg6", "Qxd8"]
      }
    ]
  },

  // ==========================================
  // 9. CARO-KANN DEFENSE (Black)
  // ==========================================
  "caro-kann": {
    title: "Caro-Kann Defense",
    description: "A highly resilient response to 1.e4. Prepare to strike the center with d5 while keeping a flawless pawn structure.",
    playerColor: "black",
    lessons: [
      {
        id: "ck-base",
        title: "1. The Classical Main Line",
        description: "Play c6 then d5. If White takes (exd5), recapture with cxd5. You have a central pawn and an open c-file.",
        sequence: ["e4", "c6", "d4", "d5", "exd5", "cxd5"]
      },
      {
        id: "ck-advance",
        title: "2. Facing the Advance Variation",
        description: "If White pushes e5, bring your Bishop out to f5 BEFORE playing e6. This solves the 'bad bishop' problem of the French Defense.",
        sequence: ["e4", "c6", "d4", "d5", "e5", "Bf5", "Nf3", "e6"]
      }
    ]
  },

  // ==========================================
  // 10. SCANDINAVIAN DEFENSE (Black)
  // ==========================================
  "scandinavian": {
    title: "Scandinavian Defense",
    description: "Instantly challenge White's e4 pawn on move 1. Force the game into your territory immediately.",
    playerColor: "black",
    lessons: [
      {
        id: "sd-base",
        title: "1. The Qa5 Main Line",
        description: "White takes on d5. Recapture with the Queen. When they attack it with Nc3, retreat the Queen safely to a5.",
        sequence: ["e4", "d5", "exd5", "Qxd5", "Nc3", "Qa5"]
      }
    ]
  },

  // ==========================================
  // 11. ENGLUND GAMBIT (Black)
  // ==========================================
  "englund-gambit": {
    title: "Englund Gambit",
    description: "A tricky, trappy response to 1.d4. Sacrifice the e5 pawn immediately to create chaos and quick checkmates.",
    playerColor: "black",
    lessons: [
      {
        id: "eng-trap",
        title: "1. The Queen Trap",
        description: "Attack the e5 pawn. White defends with Bf4. We check with Qb4+. If White blocks with the Bishop (Bc3), Qxb2 wins the Rook or forces mate!",
        sequence: ["d4", "e5", "dxe5", "Nc6", "Nf3", "Qe7", "Bf4", "Qb4+", "Bd2", "Qxb2", "Bc3", "Bb4"]
      }
    ]
  },
  // ==========================================
  // 12. SICILIAN DEFENSE (Black)
  // ==========================================
  "sicilian-defense": {
    title: "Sicilian Defense",
    description: "The most popular and aggressive response to 1.e4. Create an unbalanced position and fight for the center from the flank.",
    playerColor: "black",
    lessons: [
      {
        id: "sic-open",
        title: "1. The Open Sicilian",
        description: "White plays Nf3 and d4 to open the center. We trade our c-pawn for their central d-pawn, creating a dynamic imbalance.",
        sequence: ["e4", "c5", "Nf3", "d6", "d4", "cxd4", "Nxd4"]
      },
      {
        id: "sic-dragon",
        title: "2. The Dragon Variation",
        description: "Fianchetto your Bishop to g7 to turn it into a fire-breathing monster aiming down the long diagonal.",
        sequence: ["e4", "c5", "Nf3", "d6", "d4", "cxd4", "Nxd4", "Nf6", "Nc3", "g6", "Be3", "Bg7", "f3"]
      },
      {
        id: "sic-accelerated",
        title: "3. The Accelerated Dragon",
        description: "Skip d6 and push g6 immediately. This forces White to react differently and prepares a rapid strike on the center.",
        sequence: ["e4", "c5", "Nf3", "Nc6", "d4", "cxd4", "Nxd4", "g6", "c4", "Bg7", "Be3", "Nf6"]
      }
    ]
  }
};
