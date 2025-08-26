import { create } from 'zustand';
import { api } from '@/lib/api';
import { User } from '@/lib/auth';

interface UserState {
  users: User[];
  friends: User[];
  currentFriend: User | null;
  loadingList: boolean;
  loadingSingle: boolean;
  fetchUsers: (token: string) => Promise<void>;
  fetchFriends: (token: string) => Promise<void>;
  fetchCurrentFriend: (token: string, userId: string) => Promise<void>;
}

export const useUser = create<UserState>((set, get) => ({
  users: [],
  friends: [],
  currentFriend: null,
  loadingList: false,
  loadingSingle: false,

  async fetchUsers(token) {
    set({ loadingList: true });
    try {
      const list = await api<User[]>(`/users`, {}, token);

      set({ users: list, loadingList: false });
    } catch (error) {
      console.error('Failed to fetch users:', error);
      set({ loadingList: false });
    }
  },

  async fetchFriends(token) {
    set({ loadingList: true });
    try {
      const list = await api<User[]>(`/users/friends`, {}, token);

      set({ friends: list, loadingList: false });
    } catch (error) {
      console.error('Failed to fetch friends:', error);
      set({ loadingList: false });
    }
  },

  async fetchCurrentFriend(token, userId) {
    set({ loadingSingle: true });
    try {
      const user = await api<User>(`/users/get/${userId}`, {}, token);

      set({ currentFriend: user, loadingSingle: false });
    } catch (error) {
      console.error('Failed to fetch a friend:', error);
      set({ loadingSingle: false });
    }
  },
}));
