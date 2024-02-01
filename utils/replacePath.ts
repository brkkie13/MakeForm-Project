// 'use client';
import { useRouter } from 'next/navigation';

export function replaceFirstSegmentOfPath(pathname: string) {
  const router = useRouter();
  const splitPathname = pathname.split('/');
  const newPathname = '/' + splitPathname[1];
  router.replace(newPathname);
}
