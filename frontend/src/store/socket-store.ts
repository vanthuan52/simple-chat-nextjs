import { create } from 'zustand';
import { io, Socket } from 'socket.io-client';
import { CONFIG } from '@/common/config';

interface SocketState {
  socket: Socket | null;
  connect: (token: string) => void;
  disconnect: () => void;
}

export const useSocketStore = create<SocketState>((set, get) => ({
  socket: null,
  connect: (token) => {
    if (get().socket) return;

    const s = io(`${CONFIG.API_BASE}/ws`, {
      transports: ['websocket'],
      auth: { token },
    });

    set({ socket: s });
  },
  disconnect: () => {
    get().socket?.disconnect();
    set({ socket: null });
  },
}));
