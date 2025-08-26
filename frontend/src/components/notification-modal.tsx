import { useRouter } from 'next/navigation';
import { useNotification } from '../store/notification-store';

export default function NotificationModal({
  onClose,
}: {
  onClose: () => void;
}) {
  const notifications = useNotification((s) => s.notifications);
  const markAsRead = useNotification((s) => s.markAsRead);
  const router = useRouter();

  return (
    <div
      style={{
        position: 'fixed',
        top: 60,
        right: 20,
        background: 'white',
        border: '1px solid #ccc',
        borderRadius: 8,
        width: 320,
        zIndex: 1000,
        boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
      }}
    >
      <div
        style={{
          padding: 16,
          borderBottom: '1px solid #eee',
          fontWeight: 'bold',
        }}
      >
        Notifications
        <button style={{ float: 'right' }} onClick={onClose}>
          Đóng
        </button>
      </div>
      <div style={{ maxHeight: 400, overflowY: 'auto' }}>
        {notifications.length === 0 && <div style={{ padding: 16 }}>Emtpy</div>}
        {notifications.map((n, idx) => (
          <div
            key={idx}
            style={{
              padding: 12,
              background: n.read ? '#f9f9f9' : '#e6f7ff',
              borderBottom: '1px solid #eee',
              cursor: 'pointer',
            }}
            onClick={() => {
              markAsRead(idx);
              router.push(`/room/${n.roomId}`);
              onClose();
            }}
          >
            <b>{n.from}</b>: {n.content}
            <div style={{ fontSize: 12, color: '#888' }}>
              {n.createdAt ? new Date(n.createdAt).toLocaleTimeString() : ''}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
