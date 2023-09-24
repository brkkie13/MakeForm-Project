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

// CSS (styled-components)
const Header = styled.header`
  height: 65px;
  background-color: #f6f6f6;
  display: flex;
  justify-content: space-between;
  align-items: center;

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
    background: #efefef;
  }

  li.active {
    background: #e3e3e3;
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
  const loginHandler = () => {
    //클릭하면 로그인 팝업이 뜨고, 구글/카카오/이메일 로그인이 가능하도록.
  };

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
          {/* <DarkModeIcon /> */}
          <LightModeIcon />
        </div>
        <div className="control">
          <Button onClick={loginHandler}>로그인</Button>
          <Button primary="true">가입</Button>
        </div>
      </div>
    </Header>
  );
}

export default MainNavigation;
