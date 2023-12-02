'use client';
import { ThemeProvider } from 'styled-components';
import GlobalStyle from '../../styles/GlobalStyles';
import { darkTheme, lightTheme } from '../../styles/Theme';

// components
import Notification from '../../components/ui/Notification';
import Modal from '../../components/modals/Modal';

// redux
import { useSelector } from 'react-redux';

// code
export default function AppThemeProvider({ children }) {
  const isDarkMode = useSelector(state => state.ui.isDarkMode);
  const notification = useSelector(state => state.ui.notification);
  const isModalOpen = useSelector(state => state.ui.isModalOpen);

  return (
    <ThemeProvider theme={isDarkMode ? darkTheme : lightTheme}>
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
