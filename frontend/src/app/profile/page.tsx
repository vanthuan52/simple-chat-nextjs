'use client';

import { useRouter } from 'next/navigation';
import { useAuth } from '@/store/auth-store';

export default function ProfilePage() {
  const { user, logout } = useAuth();
  const router = useRouter();

  if (!user) return null;

  return (
    <div className="flex items-center justify-center min-h-[70vh] px-2">
      <div className="w-full max-w-md bg-white dark:bg-slate-800 rounded-2xl shadow-lg p-8 flex flex-col items-center gap-6">
        <div className="w-20 h-20 rounded-full bg-blue-500 text-white flex items-center justify-center text-3xl font-bold">
          {user.username?.[0]?.toUpperCase() || 'U'}
        </div>
        <div className="text-center">
          <div className="text-lg font-semibold text-slate-700 dark:text-slate-100">
            {user.username}
          </div>
          <div className="text-slate-500 text-sm mt-1">ID: {user.id}</div>
        </div>
        <button
          className="px-4 py-2 rounded-xl bg-red-500 hover:bg-red-600 text-white font-semibold transition mt-4"
          onClick={() => {
            logout();
            router.replace('/login');
          }}
        >
          Đăng xuất
        </button>
      </div>
    </div>
  );
}
