'use client';

import { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { useChat } from '@/store/chat-store';
import MessageList from '@/components/message-list';
import MessageInput from '@/components/message-input';
import AuthGuard from '@/components/auth-guard';
import { useAuth } from '@/store/auth-store';

export default function ChatRoomPage() {
  const { rooms, setActiveRoom, fetchMessages } = useChat();
  const { accessToken } = useAuth();
  const router = useRouter();
  const params = useParams();
  const roomId = params?.roomId as string;

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!accessToken || !roomId) return;

    const init = async () => {
      try {
        setActiveRoom(roomId);
        await fetchMessages(accessToken, roomId);
      } catch (e) {
        alert('Cannot load chat room');
        router.push('/friend');
      } finally {
        setLoading(false);
      }
    };

    init();
  }, [roomId, accessToken]);

  if (loading) return <div className="text-center">Loading room...</div>;

  const room = rooms.find((r) => r.id === params.roomId);

  return (
    <AuthGuard>
      <div className="w-full max-w-2xl mx-auto flex flex-col">
        <div className="flex items-center gap-2 mb-4">
          <button
            className="px-3 py-1 rounded bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-200 hover:bg-slate-200 dark:hover:bg-slate-600 text-xs font-medium transition"
            onClick={() => router.back()}
          >
            ← Back
          </button>
          <div className="font-bold text-lg text-blue-600 dark:text-blue-400">
            {room?.name ||
              room?.users?.map((u) => u.username).join(', ') ||
              'Chat room'}
          </div>
        </div>
        <div className="flex-1 flex flex-col bg-white dark:bg-slate-800 rounded-2xl shadow p-4">
          <MessageList />
          <div className="mt-2">
            <MessageInput />
          </div>
        </div>
      </div>
    </AuthGuard>
  );
}
