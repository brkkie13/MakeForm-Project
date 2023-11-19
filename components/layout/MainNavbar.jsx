'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

import Button from '../ui/Button';
import { Header } from './MainNavbar.styles';
import ToggleSwitch from '../../helpers/ToggleSwitch';

// icons
import { CreateIcon, FormIcon, ChartIcon } from '../../\bstyles/Icons';
import { Logo } from '../../\bstyles/Logo';

// redux
import { useDispatch, useSelector } from 'react-redux';
import { uiActions } from '../../redux/features/uiSlice';
import AuthForm from '../modals/AuthForm';

// code
function MainNavbar() {
  const pathname = usePathname();

  const dispatch = useDispatch();
  const isDarkMode = useSelector(state => state.ui.isDarkMode);

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

  const loginHandler = () => {};

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
        <div className="control auth-button">
          <Button primary="highlight" onClick={openAuthModalHandler}>
            로그인 / 회원가입
          </Button>
        </div>
      </div>
    </Header>
  );
}

export default MainNavbar;
