'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  FilledHomeIcon,
  HomeIcon,
  FilledCreateIcon,
  CreateIcon,
  FilledFormIcon,
  FormIcon,
  FilledChartIcon,
  ChartIcon,
  FilledUserIcon,
  UserIcon,
} from '@components/assets/Icons';
import { MobileNavbarStyled } from '@components/layout/MobileNavbar.styles';

// code
function MobileNavbar() {
  const pathname = usePathname();

  // '/[formId]'(폼 답변 작성) 경로에서는 Navbar가 뜨지 않게 함.
  if (
    !pathname.includes('/forms' || '/analysis') &&
    !pathname.includes('/analysis') &&
    pathname !== '/' &&
    pathname !== '/create' &&
    pathname !== '/profile'
  ) {
    return null;
  }

  return (
    <MobileNavbarStyled>
      <ul>
        <li className={pathname === '/' ? 'active' : ''}>
          <Link href={'/'}>
            {pathname === '/' ? <FilledHomeIcon /> : <HomeIcon />}
            <span>홈</span>
          </Link>
        </li>
        <li className={pathname === '/create' ? 'active' : ''}>
          <Link href={'/create'}>
            {pathname === '/create' ? <FilledCreateIcon /> : <CreateIcon />}
            <span>폼 만들기</span>
          </Link>
        </li>
        <li className={pathname === '/forms' ? 'active' : ''}>
          <Link href="/forms">
            {pathname === '/forms' ? <FilledFormIcon /> : <FormIcon />}
            <span>나의 폼</span>
          </Link>
        </li>
        <li className={pathname === '/analysis' ? 'active' : ''}>
          <Link href="/analysis">
            {pathname === '/analysis' ? <FilledChartIcon /> : <ChartIcon />}
            <span>통계</span>
          </Link>
        </li>
        <li className={pathname === '/profile' ? 'active' : ''}>
          <Link href="/profile">
            {pathname === '/profile' ? <FilledUserIcon /> : <UserIcon />}
            <span>계정</span>
          </Link>
        </li>
      </ul>
    </MobileNavbarStyled>
  );
}

export default MobileNavbar;
