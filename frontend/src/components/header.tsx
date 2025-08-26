'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useAuth } from '@/store/auth-store';
import { useNotification } from '@/store/notification-store';
import NotificationModal from './notification-modal';
import { Bell } from 'lucide-react';

const Header = () => {
  const { accessToken } = useAuth();
  const [open, setOpen] = useState(false);
  const notifications = useNotification((s) => s.notifications);
  const unreadCount = notifications.filter((n) => !n.read).length;

  return (
    <header className="w-full bg-white dark:bg-slate-900 shadow-md sticky top-0 z-20">
      <div className="max-w-5xl mx-auto flex items-center justify-between py-3 px-4 md:px-0">
        <Link
          href="/"
          className="text-2xl font-bold text-blue-600 dark:text-blue-400 tracking-tight"
        >
          Simple Chat
        </Link>
        <nav className="flex items-center gap-4">
          <Link
            href="/friend"
            className="text-slate-700 dark:text-slate-200 hover:text-blue-600 dark:hover:text-blue-400 font-medium transition"
          >
            Friends
          </Link>
          {accessToken && (
            <>
              <Link
                href="/profile"
                className="text-slate-700 dark:text-slate-200 hover:text-blue-600 dark:hover:text-blue-400 font-medium transition"
              >
                Profile
              </Link>
            </>
          )}
          {!accessToken && (
            <>
              <Link
                href="/login"
                className="text-slate-700 dark:text-slate-200 hover:text-blue-600 dark:hover:text-blue-400 font-medium transition"
              >
                Login
              </Link>
              <Link
                href="/register"
                className="text-slate-700 dark:text-slate-200 hover:text-blue-600 dark:hover:text-blue-400 font-medium transition"
              >
                Register
              </Link>
            </>
          )}
          <div
            style={{ position: 'relative', cursor: 'pointer' }}
            onClick={() => setOpen(true)}
          >
            <Bell size={24} />
            {unreadCount > 0 && (
              <span
                style={{
                  position: 'absolute',
                  top: 0,
                  right: 0,
                  background: 'red',
                  color: 'white',
                  borderRadius: '50%',
                  width: 16,
                  height: 16,
                  fontSize: 12,
                  textAlign: 'center',
                }}
              >
                {unreadCount}
              </span>
            )}
          </div>
        </nav>
      </div>

      {open && <NotificationModal onClose={() => setOpen(false)} />}
    </header>
  );
};

export default Header;
