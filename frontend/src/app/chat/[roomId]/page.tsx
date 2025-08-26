'use client';

import { useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { useChat } from '@/store/chat-store';
import MessageList from '@/components/message-list';
import MessageInput from '@/components/message-input';
import AuthGuard from '@/components/auth-guard';

export default function ChatRoomPage() {
  const { rooms, setActiveRoom } = useChat();
  const router = useRouter();
  const params = useParams();
  const roomId = params?.roomId as string;

  useEffect(() => {
    if (roomId) setActiveRoom(roomId);
  }, [roomId, setActiveRoom]);

  const room = rooms.find((r) => r.id === roomId);

  return (
    <AuthGuard>
      <div className="w-full max-w-2xl mx-auto flex flex-col min-h-[70vh]">
        <div className="flex items-center gap-2 mb-4">
          <button
            className="px-3 py-1 rounded bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-200 hover:bg-slate-200 dark:hover:bg-slate-600 text-xs font-medium transition"
            onClick={() => router.back()}
          >
            ← Quay lại
          </button>
          <div className="font-bold text-lg text-blue-600 dark:text-blue-400">
            {room?.name ||
              room?.users?.map((u) => u.username).join(', ') ||
              'Phòng chat'}
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
