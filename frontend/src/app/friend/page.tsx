'use client';

import AuthGuard from '@/components/auth-guard';
import UserList from '@/components/user-list';

export default function ChatPage() {
  return (
    <AuthGuard>
      <div className="flex flex-col items-center justify-center min-h-[70vh] px-2">
        <div className="w-full max-w-md bg-white dark:bg-slate-800 rounded-2xl shadow-lg p-6">
          <h1 className="text-xl font-bold text-left mb-6 text-blue-600 dark:text-blue-400">
            My friends
          </h1>
          <UserList />
        </div>
      </div>
    </AuthGuard>
  );
}
