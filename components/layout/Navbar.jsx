'use client';
import { useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import Image from 'next/image';

// components
import {
  HeaderContainer,
  HeaderStyled,
} from '@components/layout/Navbar.styles';
import ThemeSwitch from '@components/ui/ThemeSwitch';
import {
  FilledCreateIcon,
  CreateIcon,
  FilledFormIcon,
  FormIcon,
  FilledChartIcon,
  ChartIcon,
} from '@components/assets/Icons';
import { Logo } from '@components/assets/Logo';
import AuthForm from '@components/user/AuthForm';
import DropdownMenu from '@components/ui/DropdownMenu';
import { FilledButtonStyled } from '@components/ui/Buttons';
import { useLocalStorage } from '@utils/localStorage';

// redux
import { useDispatch, useSelector } from 'react-redux';
import { uiActions } from '@stores/features/uiSlice';

// firebase auth
import useFirebaseAuthState from '@utils/useFirebaseAuthState';
import { logout } from '@stores/actions/authActionCreators';

// code
function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const dispatch = useDispatch();
  const isDarkMode = useSelector(state => state.ui.isDarkMode);
  const user = useFirebaseAuthState();
  const { getItem, setItem } = useLocalStorage();

  const isDropdownOpen = useSelector(state => state.ui.isDropdownOpen);

  const logoutHandler = () => {
    dispatch(logout());
  };

  const routeProfilePageHandler = () => {
    router.push('/profile');
  };

  const menuList = [
    { id: 0, text: '로그아웃', onClick: logoutHandler },
    { id: 1, text: '내 계정', onClick: routeProfilePageHandler },
  ];

  const toggleDropdownMenuHandler = e => {
    e.stopPropagation(); // DropdownMenu 상위요소 window로 버블링을 막음.
    dispatch(uiActions.toggleDropdownMenu());
  };

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

  const activeUserInfo = isDropdownOpen ? 'user-info active' : 'user-info';

  return (
    <HeaderContainer>
      <HeaderStyled>
        <Link href="/" className="logo">
          <Logo />
        </Link>

        <nav>
          <ul>
            <li className={pathname === '/create' ? 'active' : ''}>
              <Link href={'/create'} className="menu-button">
                {pathname === '/create' ? <FilledCreateIcon /> : <CreateIcon />}
                <span>폼 만들기</span>
              </Link>
            </li>
            <li className={pathname === '/forms' ? 'active' : ''}>
              <Link href="/forms" className="menu-button">
                {pathname === '/forms' ? <FilledFormIcon /> : <FormIcon />}
                <span>나의 폼</span>
              </Link>
            </li>
            <li className={pathname === '/analysis' ? 'active' : ''}>
              <Link href="/analysis" className="menu-button">
                {pathname === '/analysis' ? <FilledChartIcon /> : <ChartIcon />}
                <span>통계</span>
              </Link>
            </li>
          </ul>
        </nav>

        <div className="controls">
          <div className="control">
            <ThemeSwitch
              isToggled={!isDarkMode}
              onToggle={toggleDarkModeHandler}
            />
          </div>
          <div className="control auth-control">
            {user ? (
              <>
                <div
                  className={activeUserInfo}
                  onClick={toggleDropdownMenuHandler}
                >
                  <Image
                    src={user?.photoURL || '/images/profile.png'}
                    alt="유저 프로필"
                    width={30}
                    height={30}
                  />
                  <span>{user?.displayName || user?.email}</span>
                </div>
                {isDropdownOpen && <DropdownMenu menuList={menuList} />}
              </>
            ) : (
              <FilledButtonStyled onClick={openAuthModalHandler}>
                로그인 / 회원가입
              </FilledButtonStyled>
            )}
          </div>
        </div>
      </HeaderStyled>
    </HeaderContainer>
  );
}

export default Navbar;
