import { useEffect, useState } from 'react';
import { NotificationStyled } from '@components/ui/Notification.styles';
import { ErrorBadge, SuccessBadge } from '@components/assets/Icons';
import { useDispatch } from 'react-redux';
import { uiActions } from '@stores/features/uiSlice';

// code
function Notification({ status, message }) {
  const dispatch = useDispatch();
  const [show, setShow] = useState(true);

  // 컴포넌트가 마운트되었을 때 show는 true였다가, 3초 뒤 false로 변경.
  useEffect(() => {
    setShow(true); // status, message가 바뀔 때마다 show를 다시 true로 변경.
    const timer = setTimeout(() => {
      setShow(false);
      dispatch(uiActions.clearNotification());
    }, 3000);

    return () => clearTimeout(timer);
  }, [status, message]);

  // show가 3초 뒤 false로 바뀌면 Notification 안보이게 함.
  if (!show) return null;

  return (
    <NotificationStyled status={status}>
      <div>{status === 'success' ? <SuccessBadge /> : <ErrorBadge />}</div>
      <div>{message}</div>
    </NotificationStyled>
  );
}

export default Notification;
