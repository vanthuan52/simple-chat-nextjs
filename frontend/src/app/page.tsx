'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/store/auth-store';

export default function Page() {
  const { accessToken } = useAuth();
  const router = useRouter();
  useEffect(() => {
    const timeout = setTimeout(() => {
      if (accessToken) router.replace('/chat');
      else router.replace('/login');
    }, 800);
    return () => clearTimeout(timeout);
  }, [accessToken, router]);
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4">
      <div className="animate-pulse w-12 h-12 rounded-full bg-blue-200 dark:bg-blue-900 flex items-center justify-center">
        <svg
          className="h-8 w-8 text-blue-500 dark:text-blue-400"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M12 4v4m0 0V4m0 4a8 8 0 11-8 8"
          />
        </svg>
      </div>
      <div className="text-slate-500 text-base">Đang chuyển hướng...</div>
    </div>
  );
}
