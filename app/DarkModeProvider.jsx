'use client';

import { ThemeProvider } from 'styled-components';
import GlobalStyle from '../styles/GlobalStyles';
import { darkTheme, lightTheme } from '../styles/Theme';
import { useSelector } from 'react-redux';
import Notification from '../components/ui/Notification';

export default function DarkModeProvider({ children }) {
  const isDarkMode = useSelector(state => state.ui.isDarkMode);
  const notification = useSelector(state => state.ui.notification);

  return (
    <ThemeProvider theme={isDarkMode ? darkTheme : lightTheme}>
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
