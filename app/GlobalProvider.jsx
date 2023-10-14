'use client';

import GlobalStyle from '../styles/GlobalStyles';
import { Provider } from 'react-redux';
import store from '../redux/store';
import DarkModeProvider from './DarkModeProvider';

export default function GlobalProvider({ children }) {
  return (
    <Provider store={store}>
      <GlobalStyle />
      <DarkModeProvider>{children}</DarkModeProvider>
    </Provider>
  );
}
