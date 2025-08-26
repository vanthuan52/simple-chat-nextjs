'use client';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { api } from '@/lib/api';
import { clearTokens, saveTokens, type AuthPayload } from '@/lib/auth';

interface AuthState {
  user: { id: string; username: string } | null;
  accessToken: string | null;
  refreshToken: string | null;
  login: (username: string, password: string) => Promise<void>;
  register: (username: string, password: string) => Promise<void>;
  refresh: () => Promise<void>;
  logout: () => void;
}

export const useAuth = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      accessToken: null,
      refreshToken: null,
      async login(username, password) {
        const data = await api<AuthPayload>('/auth/login', {
          method: 'POST',
          body: JSON.stringify({ username, password }),
        });
        saveTokens(data);
        set({
          user: data.user,
          accessToken: data.accessToken,
          refreshToken: data.refreshToken,
        });
      },
      async register(username, password) {
        const data = await api<AuthPayload>('/auth/register', {
          method: 'POST',
          body: JSON.stringify({ username, password }),
        });
        saveTokens(data);
        set({
          user: data.user,
          accessToken: data.accessToken,
          refreshToken: data.refreshToken,
        });
      },
      async refresh() {
        const { refreshToken } = get();
        if (!refreshToken) throw new Error('No refresh token');
        const data = await api<AuthPayload>('/auth/refresh', {
          method: 'POST',
          body: JSON.stringify({ refreshToken }),
        });
        saveTokens(data);
        set({
          user: data.user,
          accessToken: data.accessToken,
          refreshToken: data.refreshToken,
        });
      },
      logout() {
        clearTokens();
        set({ user: null, accessToken: null, refreshToken: null });
      },
    }),
    { name: 'auth-state' },
  ),
);
