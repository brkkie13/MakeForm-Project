'use client';
import Link from 'next/link';
import styled from 'styled-components';
import { usePathname } from 'next/navigation';

// imported components
import Logo from '../icons/logo';
import Button from '../ui/button';
import DarkModeIcon from '../icons/dark-mode-icon';
import LightModeIcon from '../icons/light-mode-icon';
import ArrowDownIcon from '../icons/arrow-down-icon';
import { useDispatch, useSelector } from 'react-redux';
import { uiActions } from '@/redux/features/ui-slice';

// CSS (styled-components)
const Header = styled.header`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 100;
  height: 65px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: ${props => props.theme.colors.background};
  border-bottom: 1px solid ${props => props.theme.colors.border};

  ul {
    display: flex;
    gap: 30px;
  }

  li {
    background: transparent;
    padding: 8px 14px;
    border-radius: 5px;
  }

  li span {
    margin-right: 5px;
  }

  li:hover {
    background: ${props => props.theme.colors.hoverMenu};
  }

  li.active {
    background: ${props => props.theme.colors.activeMenu};
  }

  .controls {
    display: flex;
    align-items: center;
    gap: 15px;
  }

  .control {
    display: flex;
    gap: 7px;
  }
`;

// 컴포넌트
function MainNavigation() {
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
      <Link href="/">
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
          <Link href="/my-form">
            <li className={pathname === '/my-form' ? 'active' : ''}>
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
          <div onClick={toggleDarkModeHandler}>
            {isDarkMode ? <DarkModeIcon /> : <LightModeIcon />}
          </div>
        </div>
        <div className="control">
          <Button onClick={loginHandler}>로그인</Button>
          <Button>가입</Button>
        </div>
      </div>
    </Header>
  );
}

export default MainNavigation;
