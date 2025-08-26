'use client';

import { useEffect, useRef } from 'react';
import { useAuth } from '@/store/auth-store';
import { useChat } from '@/store/chat-store';
import { useRoomSocket } from '@/hooks/use-room-socket';

export default function MessageList() {
  const { accessToken, user } = useAuth();
  const { activeRoomId, messages, fetchMessages, appendMessage } = useChat();
  const endRef = useRef<HTMLDivElement | null>(null);

  useRoomSocket(activeRoomId);

  useEffect(() => {
    if (!accessToken || !activeRoomId) return;
    fetchMessages(accessToken, activeRoomId);
  }, [accessToken, activeRoomId, fetchMessages]);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, activeRoomId]);

  const list = (activeRoomId && messages[activeRoomId]) || [];

  return (
    <div
      className="w-full px-1 md:px-2 overflow-y-auto"
      style={{
        height: '100%',
        maxHeight: '60vh',
        minHeight: '500px',
      }}
    >
      <ul className="flex flex-col gap-3 pb-2">
        {list.map((m) => {
          const isMe = m.user.id === user?.id;
          return (
            <li
              key={m.id}
              className={isMe ? 'flex justify-end' : 'flex justify-start'}
            >
              <div
                className={
                  'flex items-end gap-2 max-w-[80%] ' +
                  (isMe ? 'flex-row-reverse' : '')
                }
              >
                <div className="w-8 h-8 flex items-center justify-center rounded-full bg-blue-500 text-white font-bold text-base">
                  {m.user.username?.[0]?.toUpperCase() || 'U'}
                </div>
                <div
                  className={
                    'rounded-2xl px-4 py-2 shadow text-sm break-words ' +
                    (isMe
                      ? 'bg-blue-500 text-white text-right'
                      : 'bg-slate-100 dark:bg-slate-700 text-slate-800 dark:text-slate-100 text-left')
                  }
                >
                  <div className="font-semibold mb-1 text-xs opacity-80">
                    {m.user.username}
                  </div>
                  <div className="whitespace-pre-line">{m.content}</div>
                </div>
              </div>
            </li>
          );
        })}
        <div ref={endRef} />
      </ul>
    </div>
  );
}
