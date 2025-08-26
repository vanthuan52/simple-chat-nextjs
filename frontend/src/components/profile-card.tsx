import React from 'react';
import { User } from '@/lib/auth';

type Props = {
  user: User | null;
};

const ProfileCard = ({ user }: Props) => {
  if (!user) return <div>Can't get profile now</div>;
  return (
    <div className="w-full min-w-xs max-w-md mx-auto p-6 bg-white  rounded-3xl shadow-xl flex flex-col items-center gap-5 transition-transform duration-200 hover:scale-[1.025] hover:shadow-2xl border border-transparent dark:bg-gradient-to-br dark:from-slate-800 dark:via-slate-900 dark:to-slate-800">
      <div className="relative">
        <div className="w-24 h-24 rounded-full bg-gradient-to-tr from-blue-500 to-purple-500 flex items-center justify-center text-4xl font-extrabold text-white shadow-lg border-4 border-white dark:border-slate-900">
          {user.username?.[0]?.toUpperCase() || 'U'}
        </div>
        <span
          className="absolute bottom-2 right-2 w-4 h-4 bg-green-400 border-2 border-white dark:border-slate-900 rounded-full shadow-md"
          title="Online"
        />
      </div>
      <div className="text-center flex flex-col gap-1">
        <div className="text-xl font-bold text-slate-800 dark:text-slate-100 tracking-wide">
          {user.username}
        </div>
      </div>
      {/* <div className="flex gap-3 mt-2">
        <button className="px-4 py-1.5 rounded-xl bg-blue-500 text-white font-semibold shadow hover:bg-blue-600 transition-colors text-sm">
          Nhắn tin
        </button>
        <button className="px-4 py-1.5 rounded-xl bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-200 font-semibold shadow hover:bg-slate-300 dark:hover:bg-slate-600 transition-colors text-sm">
          Kết bạn
        </button>
      </div> */}
    </div>
  );
};

export default ProfileCard;
