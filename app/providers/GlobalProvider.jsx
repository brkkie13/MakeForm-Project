'use client';
import { Provider } from 'react-redux';
import store from '@stores/store';
import AppThemeProvider from '@app/providers/AppThemeProvider';

export default function GlobalProvider({ children }) {
  return (
    <Provider store={store}>
      <AppThemeProvider>{children}</AppThemeProvider>
    </Provider>
  );
}
