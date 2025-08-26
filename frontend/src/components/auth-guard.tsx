'use client';

import { ReactNode, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/store/auth-store';

export default function AuthGuard({ children }: { children: ReactNode }) {
  const { accessToken } = useAuth();
  const router = useRouter();
  useEffect(() => {
    if (!accessToken) router.replace('/login');
  }, [accessToken, router]);

  if (!accessToken)
    return (
      <div className="flex items-center justify-center min-h-[40vh]">
        <div className="flex flex-col items-center gap-2">
          <svg
            className="animate-spin h-6 w-6 text-blue-500 mb-2"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            ></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
            ></path>
          </svg>
          <div className="text-slate-500 text-sm">Authenticating...</div>
        </div>
      </div>
    );
  return <>{children}</>;
}
