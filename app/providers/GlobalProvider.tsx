'use client';
import { Provider } from 'react-redux';
import store from '@stores/store';
import AppThemeProvider from '@app/providers/AppThemeProvider';

type Props = {
  children: React.ReactNode;
};

export default function GlobalProvider({ children }: Props) {
  return (
    <Provider store={store}>
      <AppThemeProvider>{children}</AppThemeProvider>
    </Provider>
  );
}
