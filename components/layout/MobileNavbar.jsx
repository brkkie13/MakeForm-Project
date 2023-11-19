'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  CreateIcon,
  FormIcon,
  ChartIcon,
  HomeIcon,
  UserIcon,
} from '../../\bstyles/Icons';
import { MobileNavbarStyled } from './MobileNavbar.styles';

function MobileNavbar() {
  const pathname = usePathname();

  return (
    <MobileNavbarStyled>
      <ul>
        <li className={pathname === '/' ? 'active' : ''}>
          <Link href={'/'}>
            <HomeIcon />
            <span>홈</span>
          </Link>
        </li>
        <li className={pathname === '/create' ? 'active' : ''}>
          <Link href={'/create'}>
            <CreateIcon />
            <span>폼 만들기</span>
          </Link>
        </li>
        <li className={pathname === '/forms' ? 'active' : ''}>
          <Link href="/forms">
            <FormIcon />
            <span>나의 폼</span>
          </Link>
        </li>
        <li className={pathname === '/analysis' ? 'active' : ''}>
          <Link href="/analysis">
            <ChartIcon />
            <span>통계</span>
          </Link>
        </li>
        <li className={pathname === '/' ? 'active' : ''}>
          <Link href="/">
            <UserIcon />
            <span>계정</span>
          </Link>
        </li>
      </ul>
    </MobileNavbarStyled>
  );
}

export default MobileNavbar;
