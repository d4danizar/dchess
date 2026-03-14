"use client";

import Link from "next/link";
import { useTheme } from "next-themes";
import { Sun, Moon } from "lucide-react";
import { useEffect, useState } from "react";

export function Header() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // Prevent hydration mismatch
  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <header className="w-full h-16 flex items-center justify-between px-6 border-b border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-950 transition-colors z-50">
      <Link href="/" className="flex items-center gap-1 group">
        <span className="text-2xl font-extrabold tracking-tighter text-blue-600 dark:text-blue-500 group-hover:text-blue-500 transition-colors">
          d
        </span>
        <span className="text-2xl font-extrabold tracking-tighter text-gray-900 dark:text-white group-hover:text-gray-600 dark:group-hover:text-gray-300 transition-colors">
          chess
        </span>
      </Link>
      
      <button
        onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
        className="p-2 rounded-lg bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 text-gray-600 dark:text-gray-300 transition-all active:scale-95"
        aria-label="Toggle Dark Mode"
      >
        {mounted && theme === "dark" ? (
          <Sun className="w-5 h-5" />
        ) : mounted ? (
          <Moon className="w-5 h-5" />
        ) : (
          <div className="w-5 h-5 opacity-0" />
        )}
      </button>
    </header>
  );
}
