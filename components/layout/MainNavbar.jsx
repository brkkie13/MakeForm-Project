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

  const toggleModalHandler = () => {
    dispatch(uiActions.toggleModal());
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
              <CreateIcon />
            </li>
          </Link>
          <Link href="/forms">
            <li className={pathname === '/forms' ? 'active' : ''}>
              <span>나의 폼</span>
              <FormIcon />
            </li>
          </Link>
          <Link href="/analysis">
            <li className={pathname === '/analysis' ? 'active' : ''}>
              <span>통계</span>
              <ChartIcon />
            </li>
          </Link>
        </ul>
      </nav>

      <div className="controls">
        <div className="control">
          <ToggleSwitch
            isToggled={!isDarkMode}
            onToggle={toggleDarkModeHandler}
          />
        </div>
        <div className="control">
          <Button primary="highlight" onClick={toggleModalHandler}>
            로그인 / 회원가입
          </Button>
        </div>
      </div>
    </Header>
  );
}

export default MainNavbar;
