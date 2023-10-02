'use client';

import GlobalStyle from '@/\bstyles/GlobalStyles';
import { Provider } from 'react-redux';
import store from '@/redux/store';
import DarkModeProvider from './darkmode-provider';

export default function Providers({ children }) {
  return (
    <Provider store={store}>
      <GlobalStyle />
      <DarkModeProvider>{children}</DarkModeProvider>
    </Provider>
  );
}
