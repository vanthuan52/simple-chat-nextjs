import { io, Socket } from 'socket.io-client';
import { CONFIG } from '@/common/config';

let socket: Socket | null = null;
let lastToken: string | null = null;

export function getSocket(accessToken: string) {
  if (!socket || lastToken !== accessToken) {
    if (socket) {
      socket.disconnect();
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
  return socket;
}

export function closeSocket() {
  if (socket) {
    socket.disconnect();
    socket = null;
  }
}
