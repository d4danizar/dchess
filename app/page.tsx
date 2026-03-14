import Link from 'next/link';
import { ArrowRight, Swords } from 'lucide-react';
import { openingsData } from '@/lib/openingsData';

export default function Home() {
  const openings = Object.entries(openingsData).map(([id, data]) => ({
    id,
    ...data
  }));

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-gray-50 dark:bg-gray-950 flex flex-col p-8 md:p-16 transition-colors">
      <div className="max-w-6xl mx-auto w-full space-y-12">
        <div className="text-center space-y-4">
          <h1 className="text-5xl font-extrabold text-gray-900 dark:text-white tracking-tight flex items-center justify-center gap-4 transition-colors">
            <Swords className="w-12 h-12 text-blue-600 dark:text-blue-500" />
            Opening Repertoire
          </h1>
          <p className="text-gray-600 dark:text-gray-400 text-lg max-w-2xl mx-auto transition-colors">
            Select a gambit or opening to begin your automated training against the AI opponent down critical variations.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {openings.map((opening) => (
            <div key={opening.id} className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-6 flex flex-col hover:border-blue-500/50 dark:hover:border-blue-500/50 hover:bg-gray-50 dark:hover:bg-gray-800/80 transition-all group shadow-sm dark:shadow-none">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                {opening.title}
              </h2>
              <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed mb-8 flex-1 transition-colors">
                {opening.description}
              </p>
              
              <Link 
                href={`/trainer/${opening.id}`}
                className="inline-flex items-center justify-between w-full px-6 py-3 bg-blue-600 hover:bg-blue-500 text-white rounded-xl font-semibold transition-all shadow-lg shadow-blue-500/20 dark:shadow-blue-900/20 active:scale-95 group/btn"
              >
                Start Training
                <ArrowRight className="w-5 h-5 group-hover/btn:translate-x-1 transition-transform" />
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
