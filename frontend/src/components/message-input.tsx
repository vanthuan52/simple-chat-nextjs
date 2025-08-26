'use client';
import { FormEvent, useState } from 'react';
import { useAuth } from '@/store/auth-store';
import { useChat } from '@/store/chat-store';
import { getSocket } from '@/lib/socket';

export default function MessageInput() {
  const { accessToken } = useAuth();
  const { activeRoomId } = useChat();
  const [content, setContent] = useState('');

  const onSend = (e: FormEvent) => {
    e.preventDefault();
    if (!content.trim() || !accessToken || !activeRoomId) return;
    const socket = getSocket(accessToken);
    socket.emit('sendMessage', { roomId: activeRoomId, content });
    setContent('');
  };

  return (
    <form onSubmit={onSend} className="flex items-center gap-2 w-full">
      <input
        className="flex-1 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 px-4 py-2 text-base focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
        placeholder="Enter text..."
        value={content}
        onChange={(e) => setContent(e.target.value)}
        autoComplete="off"
      />
      <button
        className="px-4 py-2 rounded-xl bg-blue-500 hover:bg-blue-600 text-white font-semibold transition disabled:opacity-50"
        type="submit"
        disabled={!content.trim()}
      >
        Send
      </button>
    </form>
  );
}
