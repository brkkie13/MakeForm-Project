// 현재 경로의 최상위 경로로 이동하도록 첫번째 세그먼트를 얻는 함수. (/forms/[formId] 경로에 있다면 /forms로 이동)
// 사용되는 컴포넌트: Navbar.tsx, AuthForm.tsx
export function getFirstSegmentOfPath(pathname: string) {
  const splitPathname = pathname.split('/');
  const newPathname = '/' + splitPathname[1];
  return newPathname;
}

// <다른 컴포넌트에서 사용방법>
// const newRouter = getFirstSegmentOfPath;
// router.replace(newRouter);
