"use client";

import Link from "next/link";
import { useTheme } from "next-themes";
import { Sun, Moon, LogOut } from "lucide-react";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import { User } from "@supabase/supabase-js";

export function Header() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [user, setUser] = useState<User | null>(null);

  // Prevent hydration mismatch and handle Auth
  useEffect(() => {
    setMounted(true);

    // Initial session check
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
    });

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const handleLogin = async () => {
    console.log("Mengecek URL Supabase:", process.env.NEXT_PUBLIC_SUPABASE_URL);
    await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: window.location.origin,
      },
    });
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
  };

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
      <div className="flex items-center gap-4">
        {mounted && !user && (
          <button
            onClick={handleLogin}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-lg font-semibold transition-all shadow-md shadow-blue-500/20 active:scale-95 text-sm"
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
            </svg>
            Login
          </button>
        )}

        {mounted && user && (
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900 overflow-hidden border border-blue-200 dark:border-blue-800 shrink-0">
              {user.user_metadata?.avatar_url ? (
                <img
                  src={user.user_metadata.avatar_url}
                  alt={user.user_metadata?.full_name || "Profile"}
                  className="w-full h-full object-cover"
                />
              ) : (
                <span className="text-sm font-bold text-blue-600 dark:text-blue-400">
                  {(user.user_metadata?.full_name || user.email || "U").charAt(0).toUpperCase()}
                </span>
              )}
            </div>
            <button
              onClick={handleLogout}
              className="p-2 text-gray-500 hover:text-red-500 dark:text-gray-400 dark:hover:text-red-400 transition-colors bg-gray-50 hover:bg-red-50 dark:bg-gray-800 dark:hover:bg-red-950/30 rounded-lg active:scale-95"
              aria-label="Sign Out"
              title="Sign Out"
            >
              <LogOut className="w-5 h-5" />
            </button>
          </div>
        )}

        <button
          onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          className="p-2 rounded-lg bg-gray-50 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 text-gray-600 dark:text-gray-300 transition-all active:scale-95"
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
      </div>
    </header>
  );
}
