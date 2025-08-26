'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/store/auth-store';
import { useUser } from '@/store/user-store';
import { api } from '@/lib/api';
import { Room } from '@/store/chat-store';

export default function UserList() {
  const { accessToken, user } = useAuth();
  const { friends, loadingList, fetchFriends } = useUser();
  const router = useRouter();

  useEffect(() => {
    if (!accessToken) return;
    fetchFriends(accessToken);
  }, [accessToken, user?.id]);

  const handleChat = async (targetUser: any) => {
    if (!accessToken) return;
    try {
      const room = await api<Room>(
        `/rooms/get`,
        {
          method: 'POST',
          body: JSON.stringify({ userId: targetUser.id }),
        },
        accessToken,
      );

      router.push(`/room/${room.id}`);
    } catch (e) {
      alert('Cannot create or get room');
    }
  };

  const handleViewProfile = (userId: string) => {
    router.push(`/friend/${userId}`);
  };

  if (loadingList) return <div>Loading users...</div>;

  return (
    <div>
      <ul className="space-y-2">
        {friends.map((u) => (
          <li key={u.id} className="flex items-center gap-2">
            <span className="rounded-full bg-blue-500 text-white w-8 h-8 flex items-center justify-center font-bold">
              {u.username?.[0]?.toUpperCase() || 'U'}
            </span>
            <span className="flex-1" onClick={() => handleViewProfile(u.id)}>
              {u.username}
            </span>
            <button
              className="px-3 py-1 rounded bg-blue-600 text-white cursor-pointer hover:bg-blue-400"
              onClick={() => handleChat(u)}
            >
              Chat
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
