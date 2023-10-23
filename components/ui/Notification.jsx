import SuccessBadge from '../icons/SuccessBadge';
import ErrorBadge from '../icons/ErrorBadge';
import { NotificationBox } from './Notification.styles';
import { useSelector, useDispatch } from 'react-redux';
import { uiActions } from '../../redux/features/uiSlice';

function Notification({ status, message }) {
  return (
    <NotificationBox status={status}>
      <div>{status === 'success' ? <SuccessBadge /> : <ErrorBadge />}</div>
      <div>{message}</div>
    </NotificationBox>
  );
}

export default Notification;
