'use client';

import { ThemeProvider } from 'styled-components';
import { darkTheme, lightTheme } from '../styles/Theme';
import { useSelector } from 'react-redux';

export default function DarkModeProvider({ children }) {
  const isDarkMode = useSelector(state => state.ui.isDarkMode);
  return (
    <ThemeProvider theme={isDarkMode ? darkTheme : lightTheme}>
      {children}
    </ThemeProvider>
  );
}
