'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

// components
import Button from '../ui/Button';
import { Header } from './MainNavbar.styles';
import ToggleSwitch from '../../helpers/ToggleSwitch';
import { CreateIcon, FormIcon, ChartIcon } from '../../\bstyles/Icons';
import { Logo } from '../../\bstyles/Logo';
import AuthForm from '../modals/AuthForm';

// redux
import { useDispatch, useSelector } from 'react-redux';
import { uiActions } from '../../redux/features/uiSlice';

// firebase auth
import { logout } from '../../redux/actions/authActionCreators';
import useFirebaseAuthState from '../../utils/useFirebaseAuthState';

// code
function MainNavbar() {
  const pathname = usePathname();
  const dispatch = useDispatch();
  const isDarkMode = useSelector(state => state.ui.isDarkMode);
  const user = useFirebaseAuthState();

  const toggleDarkModeHandler = () => {
    dispatch(uiActions.toggleDarkMode());
    if (isDarkMode) {
      document.body.setAttribute('data-theme', 'dark');
    } else {
      document.body.setAttribute('data-theme', 'light');
    }
  };

  const openAuthModalHandler = () => {
    dispatch(uiActions.openModal(<AuthForm />));
  };

  const logoutHandler = () => {
    dispatch(logout());
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
            <>
              <img
                src={user?.photoURL || '/images/profile.png'}
                alt="유저 프로필"
              />
              <span>{user?.displayName || user?.email}님</span>
              <Button primary="non-outline" onClick={logoutHandler}>
                로그아웃
              </Button>
            </>
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
