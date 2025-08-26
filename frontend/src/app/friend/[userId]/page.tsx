'use client';

import { useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import AuthGuard from '@/components/auth-guard';
import ProfileCard from '@/components/profile-card';
import { useUser } from '@/store/user-store';
import { useAuth } from '@/store/auth-store';

export default function FriendPage() {
  const { accessToken } = useAuth();
  const { currentFriend, fetchCurrentFriend } = useUser();
  const router = useRouter();
  const params = useParams();
  const userId = params?.userId as string;

  useEffect(() => {
    if (accessToken) fetchCurrentFriend(accessToken, userId);
  }, [userId]);

  const handleChat = async (targetUser: any) => {
    if (!accessToken) return;
    try {
      //router.push(`/room/${room.id}`);
    } catch (e) {
      alert('Cant get or create chat room!');
    }
  };

  return (
    <AuthGuard>
      <div className="w-full max-w-2xl mx-auto flex flex-col">
        <ProfileCard user={currentFriend} />

        <div className="flex p-4 m-4 justify-center items-center">
          <div className="flex gap-3 mt-2">
            <button
              className="px-4 py-1.5 rounded-xl bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-200 font-semibold shadow hover:bg-slate-300 dark:hover:bg-slate-600 transition-colors text-sm"
              onClick={() => {
                router.back();
              }}
            >
              Back
            </button>
            <button
              className="px-4 py-1.5 rounded-xl bg-blue-500 text-white font-semibold shadow hover:bg-blue-600 transition-colors text-sm"
              onClick={() => handleChat(currentFriend)}
            >
              Chat
            </button>
          </div>
        </div>
      </div>
    </AuthGuard>
  );
}
