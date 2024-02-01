'use client';
import { ThemeProvider } from 'styled-components';
import GlobalStyle from '@styles/GlobalStyles';
import { darkTheme, lightTheme } from '@styles/Theme';

// components
import Notification from '@components/ui/Notification';
import Modal from '@components/ui/Modal';

// redux
import { useSelector } from 'react-redux';

// types
import { UiState } from '@/types/types';
import React from 'react';

type Props = {
  children: React.ReactNode;
};

// code
export default function AppThemeProvider({ children }: Props) {
  const isDarkMode = useSelector((state: UiState) => state.ui.isDarkMode);
  const notification = useSelector((state: UiState) => state.ui.notification);
  const isModalOpen = useSelector((state: UiState) => state.ui.isModalOpen);

  return (
    <ThemeProvider theme={isDarkMode ? darkTheme : lightTheme}>
      {isModalOpen && <Modal />}
      {notification.status && notification.message && (
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
