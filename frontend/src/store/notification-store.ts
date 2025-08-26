import { create } from 'zustand';

type Notification = {
  from: string;
  roomId: string;
  content: string;
  read?: boolean;
  createdAt?: number;
};

type NotificationStore = {
  notifications: Notification[];
  addNotification: (n: Notification) => void;
  markAsRead: (idx: number) => void;
  clear: () => void;
};

export const useNotification = create<NotificationStore>((set) => ({
  notifications: [],
  addNotification: (n) =>
    set((state) => ({
      notifications: [n, ...state.notifications],
    })),
  markAsRead: (idx) =>
    set((state) => {
      const notifications = [...state.notifications];
      if (notifications[idx]) notifications[idx].read = true;
      return { notifications };
    }),
  clear: () => set({ notifications: [] }),
}));
