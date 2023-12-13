'use client';
import { useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import Image from 'next/image';

// components
import Button from '../ui/Button';
import { HeaderContainer, HeaderStyled } from './MainNavbar.styles';
import ToggleSwitch from '../../helpers/ToggleSwitch';
import { CreateIcon, FormIcon, ChartIcon } from '../../\bstyles/Icons';
import { Logo } from '../../\bstyles/Logo';
import AuthForm from '../modals/AuthForm';
import useLocalStorage from '../../utils/useLocalStorage';
import DropdownMenu from '../ui/DropdownMenu';

// redux
import { useDispatch, useSelector } from 'react-redux';
import { uiActions } from '../../redux/features/uiSlice';

// firebase auth
import useFirebaseAuthState from '../../utils/useFirebaseAuthState';
import { logout } from '../../redux/actions/authActionCreators';

// code
function MainNavbar() {
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
                  <span>{user?.displayName || user?.email}님</span>
                </div>
                {isDropdownOpen && <DropdownMenu menuList={menuList} />}
              </>
            ) : (
              <Button primary="highlight" onClick={openAuthModalHandler}>
                로그인 / 회원가입
              </Button>
            )}
          </div>
        </div>
      </HeaderStyled>
    </HeaderContainer>
  );
}

export default MainNavbar;
