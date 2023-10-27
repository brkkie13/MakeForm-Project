'use client';

// react, next
import Link from 'next/link';
import { usePathname } from 'next/navigation';

// css
import Button from '../ui/Button';
import { Header } from './MainNavbar.styles';

// components
import Logo from '../icons/Logo';
import DarkModeIcon from '../icons/DarkModeIcon';
import LightModeIcon from '../icons/LightModeIcon';
import ArrowDownIcon from '../icons/ArrowIcon';

// redux
import { useDispatch, useSelector } from 'react-redux';
import { uiActions } from '../../redux/features/uiSlice';

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

  const loginHandler = () => {};

  return (
    <Header>
      <Link href="/" className="logo">
        <Logo />
      </Link>

      <nav>
        <ul>
          <Link href={'/create'}>
            <li className={pathname === '/create' ? 'active' : ''}>
              <span>폼 만들기</span>
              <ArrowDownIcon />
            </li>
          </Link>
          <Link href="/forms">
            <li className={pathname === '/forms' ? 'active' : ''}>
              <span>나의 폼</span>
              <ArrowDownIcon />
            </li>
          </Link>
          <Link href="/analysis">
            <li className={pathname === '/analysis' ? 'active' : ''}>
              <span>통계</span>
              <ArrowDownIcon />
            </li>
          </Link>
        </ul>
      </nav>

      <div className="controls">
        <div className="control">
          <div className="theme-icon" onClick={toggleDarkModeHandler}>
            {isDarkMode ? <DarkModeIcon /> : <LightModeIcon />}
          </div>
        </div>
        <div className="control">
          <Button onClick={loginHandler} primary="non-outline">
            로그인
          </Button>
          <Button primary="highlight">가입</Button>
        </div>
      </div>
    </Header>
  );
}

export default MainNavbar;
