'use client';
import React from 'react';
import Link from 'next/link';
import { useAuth } from '@/store/auth-store';

const Header = () => {
  const { accessToken } = useAuth();
  return (
    <header className="w-full bg-white dark:bg-slate-900 shadow-md sticky top-0 z-20">
      <div className="max-w-4xl mx-auto flex items-center justify-between px-4 py-3">
        <Link
          href="/"
          className="text-2xl font-bold text-blue-600 dark:text-blue-400 tracking-tight"
        >
          Simple Chat
        </Link>
        <nav className="flex items-center gap-4">
          <Link
            href="/chat"
            className="text-slate-700 dark:text-slate-200 hover:text-blue-600 dark:hover:text-blue-400 font-medium transition"
          >
            Chat
          </Link>
          {accessToken && (
            <>
              <Link
                href="/profile"
                className="text-slate-700 dark:text-slate-200 hover:text-blue-600 dark:hover:text-blue-400 font-medium transition"
              >
                Profile
              </Link>
            </>
          )}
          {!accessToken && (
            <>
              <Link
                href="/login"
                className="text-slate-700 dark:text-slate-200 hover:text-blue-600 dark:hover:text-blue-400 font-medium transition"
              >
                Login
              </Link>
              <Link
                href="/register"
                className="text-slate-700 dark:text-slate-200 hover:text-blue-600 dark:hover:text-blue-400 font-medium transition"
              >
                Register
              </Link>
            </>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Header;
