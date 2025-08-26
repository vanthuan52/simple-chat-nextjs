import { api } from '@/lib/api';
import { create } from 'zustand';

export type Room = {
  id: string;
  name?: string | null;
  users: { id: string; username: string }[];
};
export type Message = {
  id: string;
  roomId: string;
  content: string;
  createdAt: string;
  user: { id: string; username: string };
};

interface ChatState {
  rooms: Room[];
  activeRoomId: string | null;
  messages: Record<string, Message[]>; // roomId -> msgs
  setActiveRoom: (roomId: string) => void;
  fetchMyRooms: (token: string) => Promise<void>;
  fetchMessages: (token: string, roomId: string) => Promise<void>;
  appendMessage: (roomId: string, msg: Message) => void;
}

export const useChat = create<ChatState>((set, get) => ({
  rooms: [],
  activeRoomId: null,
  messages: {},
  setActiveRoom(roomId) {
    set({ activeRoomId: roomId });
  },
  async fetchMyRooms(token) {
    const rooms = await api<Room[]>('/rooms/mine', {}, token);
    set({ rooms });
    if (!get().activeRoomId && rooms[0]) set({ activeRoomId: rooms[0].id });
  },
  async fetchMessages(token, roomId) {
    const list = await api<Message[]>(`/messages/room/${roomId}`, {}, token);
    set((s) => ({ messages: { ...s.messages, [roomId]: list } }));
  },
  appendMessage(roomId, msg) {
    set((s) => ({
      messages: {
        ...s.messages,
        [roomId]: [...(s.messages[roomId] || []), msg],
      },
    }));
  },
}));
