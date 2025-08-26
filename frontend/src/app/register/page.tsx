'use client';

import React, { FormEvent, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/store/auth-store';

export default function RegisterPage() {
  const { register } = useAuth();
  const router = useRouter();
  const [username, setUsername] = useState('newuser');
  const [password, setPassword] = useState('password');
  const [error, setError] = useState<string | null>(null);

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);
    try {
      await register(username, password);
      router.replace('/profile');
    } catch (err: any) {
      setError(err.message || 'Register failed');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-[70vh] px-2">
      <div className="w-full max-w-md bg-white dark:bg-slate-800 rounded-2xl shadow-lg p-8">
        <h1 className="text-2xl font-bold text-center mb-6 text-blue-600 dark:text-blue-400">
          Registration
        </h1>
        <form onSubmit={onSubmit} className="flex flex-col gap-4">
          <input
            className="rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 px-4 py-2 text-base focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            autoComplete="username"
          />
          <input
            className="rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 px-4 py-2 text-base focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoComplete="new-password"
          />
          {error && <p className="text-red-500 text-sm text-center">{error}</p>}
          <button
            className="w-full px-4 py-2 rounded-xl bg-blue-500 hover:bg-blue-600 text-white font-semibold transition"
            type="submit"
          >
            Submit
          </button>
          <div className="text-center text-sm text-slate-500 mt-2">
            Already have an account?{' '}
            <a href="/login" className="text-blue-500 hover:underline">
              Login
            </a>
          </div>
        </form>
      </div>
    </div>
  );
}
