'use client';
import { Provider } from 'react-redux';
import store from '../../redux/store';
import AppThemeProvider from './AppThemeProvider';

export default function GlobalProvider({ children }) {
  return (
    <Provider store={store}>
      <AppThemeProvider>{children}</AppThemeProvider>
    </Provider>
  );
}
