'use client';

import { ThemeProvider } from 'styled-components';
import GlobalStyle from '../../styles/GlobalStyles';
import { darkTheme, lightTheme } from '../../styles/Theme';

// components
import Notification from '../../components/ui/Notification';
import Modal from '../../components/Modals/Modal';
import AuthForm from '../../components/Modals/AuthForm';

// redux
import { useSelector } from 'react-redux';

// code
export default function AppThemeProvider({ children }) {
  const isDarkMode = useSelector(state => state.ui.isDarkMode);
  const notification = useSelector(state => state.ui.notification);
  const isModalOpen = useSelector(state => state.ui.isModalOpen);

  return (
    <ThemeProvider theme={isDarkMode ? darkTheme : lightTheme}>
      {/* AuthForm 모달은 어디서든지 열 수 있도록 전역으로 설정 */}
      {isModalOpen && <Modal />}
      {notification && (
        <Notification
          status={notification.status}
          message={notification.message}
        />
      )}
      <GlobalStyle />
      {children}
    </ThemeProvider>
  );
}
