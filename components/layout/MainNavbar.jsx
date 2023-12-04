'use client';
import { useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

// components
import Button from '../ui/Button';
import { Header } from './MainNavbar.styles';
import ToggleSwitch from '../../helpers/ToggleSwitch';
import { CreateIcon, FormIcon, ChartIcon } from '../../\bstyles/Icons';
import { Logo } from '../../\bstyles/Logo';
import UserProfile from '../user/UserProfile';
import AuthForm from '../modals/AuthForm';
import useLocalStorage from '../../utils/useLocalStorage';

// redux
import { useDispatch, useSelector } from 'react-redux';
import { uiActions } from '../../redux/features/uiSlice';

// firebase auth
import useFirebaseAuthState from '../../utils/useFirebaseAuthState';

// code
function MainNavbar() {
  const pathname = usePathname();
  const dispatch = useDispatch();
  const isDarkMode = useSelector(state => state.ui.isDarkMode);
  const user = useFirebaseAuthState();
  const { getItem, setItem } = useLocalStorage();

  useEffect(() => {
    const theme = getItem('theme');
    dispatch(uiActions.loadTheme(theme));
  }, [dispatch]);

  const toggleDarkModeHandler = () => {
    dispatch(uiActions.changeThemeMode());

    if (isDarkMode) {
      setItem('theme', 'light');
      document.body.setAttribute('data-theme', 'light');
    } else {
      setItem('theme', 'dark');
      document.body.setAttribute('data-theme', 'dark');
    }
  };

  const openAuthModalHandler = () => {
    dispatch(uiActions.openModal(<AuthForm />));
  };

  return (
    <Header>
      <Link href="/" className="logo">
        <Logo />
      </Link>

      <nav>
        <ul>
          <li className={pathname === '/create' ? 'active' : ''}>
            <Link href={'/create'} className="menu-button">
              <CreateIcon />
              <span>폼 만들기</span>
            </Link>
          </li>
          <li className={pathname === '/forms' ? 'active' : ''}>
            <Link href="/forms" className="menu-button">
              <FormIcon />
              <span>나의 폼</span>
            </Link>
          </li>
          <li className={pathname === '/analysis' ? 'active' : ''}>
            <Link href="/analysis" className="menu-button">
              <ChartIcon />
              <span>통계</span>
            </Link>
          </li>
        </ul>
      </nav>

      <div className="controls">
        <div className="control">
          <ToggleSwitch
            isToggled={!isDarkMode}
            onToggle={toggleDarkModeHandler}
          />
        </div>
        <div className="control auth-control">
          {user ? (
            <UserProfile
              imageUrl={user?.photoURL}
              displayName={user?.displayName}
              email={user?.email}
            />
          ) : (
            <Button primary="highlight" onClick={openAuthModalHandler}>
              로그인 / 회원가입
            </Button>
          )}
        </div>
      </div>
    </Header>
  );
}

export default MainNavbar;
