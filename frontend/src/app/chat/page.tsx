'use client';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { useChat } from '@/store/chat-store';
import { useAuth } from '@/store/auth-store';
import AuthGuard from '@/components/auth-guard';

export default function ChatPage() {
  const { fetchMyRooms, rooms } = useChat();
  const { accessToken } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (accessToken) fetchMyRooms(accessToken);
  }, [accessToken, fetchMyRooms]);

  return (
    <AuthGuard>
      <div className="flex flex-col items-center justify-center min-h-[70vh] px-2">
        <div className="w-full max-w-md bg-white dark:bg-slate-800 rounded-2xl shadow-lg p-6">
          <h1 className="text-xl font-bold text-left mb-6 text-blue-600 dark:text-blue-400">
            Danh sách đoạn chat
          </h1>
          <ul className="space-y-3">
            {rooms.map((room) => (
              <li key={room.id}>
                <button
                  className="w-full flex items-center gap-3 px-4 py-3 rounded-xl transition border border-transparent hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 font-medium"
                  onClick={() => router.push(`/chat/${room.id}`)}
                >
                  <span className="flex items-center justify-center w-8 h-8 rounded-full bg-blue-500 text-white font-bold text-lg">
                    {room.name?.[0]?.toUpperCase() ||
                      room.users?.[0]?.username?.[0]?.toUpperCase() ||
                      'R'}
                  </span>
                  <span className="truncate font-medium text-base">
                    {room.name || room.users.map((u) => u.username).join(', ')}
                  </span>
                </button>
              </li>
            ))}
            {!rooms.length && (
              <p className="text-center text-slate-400 py-4">
                Chưa có phòng nào
              </p>
            )}
          </ul>
        </div>
      </div>
    </AuthGuard>
  );
}
