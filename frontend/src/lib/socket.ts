import { io, Socket } from 'socket.io-client';
import { toast } from 'react-toastify';
import { useChat } from '@/store/chat-store';
import { CONFIG } from '@/common/config';
import { useNotification } from '@/store/notification-store';

let socket: Socket | null = null;
let lastToken: string | null = null;
let listenersAttached = false;

export function getSocket(accessToken: string) {
  if (!socket || lastToken !== accessToken) {
    if (socket) {
      socket.disconnect();
      listenersAttached = false;
    }
    socket = io(`${CONFIG.API_BASE}/ws`, {
      transports: ['websocket'],
      autoConnect: true,
      reconnection: true,
      withCredentials: true,
      auth: { token: accessToken },
    });
    lastToken = accessToken;
  }

  if (socket && !listenersAttached) {
    socket.onAny((event, ...args) => {
      // console.debug('[socket any]', event, args);
    });

    // When a message arrives, append it directly to the zustand store.
    socket.on('message', (msg: any) => {
      // msg should contain roomId and other fields
      try {
        useChat.getState().appendMessage(msg.roomId, msg);
        // console.debug('[socket] message appended to store', msg);
      } catch (err) {
        // console.error('Failed to append message to store', err);
      }
    });

    socket.on('notifyMessage', (data: any) => {
      // data: { from, roomId, content }
      try {
        useNotification.getState().addNotification({
          from: data.from,
          roomId: data.roomId,
          content: data.content,
          createdAt: Date.now(),
          read: false,
        });

        if (!window.location.pathname.startsWith(`/room/${data.roomId}`)) {
          console.log('navigating: ');
        }
      } catch (err) {}
    });

    listenersAttached = true;
  }

  return socket;
}

export function closeSocket() {
  if (socket) {
    socket.disconnect();
    socket = null;
    lastToken = null;
    listenersAttached = false;
  }
}
