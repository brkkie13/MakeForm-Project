'use client';

import { Provider } from 'react-redux';
import store from '../../redux/store';
import DarkModeProvider from './DarkModeProvider';
import NextAuthSessionProvider from './SessionProvider';

export default function GlobalProvider({ children }) {
  return (
    <Provider store={store}>
      <NextAuthSessionProvider>
        <DarkModeProvider>{children}</DarkModeProvider>
      </NextAuthSessionProvider>
    </Provider>
  );
}
