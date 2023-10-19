'use client';

import { Provider } from 'react-redux';
import store from '../redux/store';
import DarkModeProvider from './DarkModeProvider';

export default function GlobalProvider({ children }) {
  return (
    <Provider store={store}>
      <DarkModeProvider>{children}</DarkModeProvider>
    </Provider>
  );
}
