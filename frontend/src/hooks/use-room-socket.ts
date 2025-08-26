import { useEffect } from 'react';
import { useAuth } from '@/store/auth-store';
import { getSocket } from '@/lib/socket';

export function useRoomSocket(roomId: string | null) {
  const { accessToken } = useAuth();

  useEffect(() => {
    if (!accessToken || !roomId) return;

    const socket = getSocket(accessToken);

    socket.emit('joinRoom', { roomId });

    return () => {
      socket.emit('leaveRoom', { roomId });
    };
  }, [accessToken, roomId]);
}
