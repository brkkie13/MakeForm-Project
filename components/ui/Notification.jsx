import { NotificationBox } from './Notification.styles';
import { ErrorBadge, SuccessBadge } from '../../\bstyles/Icons';

// code
function Notification({ status, message }) {
  return (
    <NotificationBox status={status}>
      <div>{status === 'success' ? <SuccessBadge /> : <ErrorBadge />}</div>
      <div>{message}</div>
    </NotificationBox>
  );
}

export default Notification;
