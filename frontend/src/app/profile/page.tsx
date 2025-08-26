'use client';

import { useRouter } from 'next/navigation';
import { useAuth } from '@/store/auth-store';
import ProfileCard from '@/components/profile-card';

export default function ProfilePage() {
  const { user, logout } = useAuth();
  const router = useRouter();

  if (!user) return null;

  return (
    <div className="flex items-center justify-center min-h-[70vh] px-2">
      <div className="flex gap-3 justify-center flex-col">
        <ProfileCard user={user} />
        <button
          className="px-4 py-2 rounded-xl bg-red-500 hover:bg-red-600 text-white font-semibold transition mt-4"
          onClick={() => {
            logout();
            router.replace('/login');
          }}
        >
          Logout
        </button>
      </div>
    </div>
  );
}
