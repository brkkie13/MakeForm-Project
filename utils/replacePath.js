export function replaceFirstSegmentOfPath(router, pathname) {
  const splitPathname = pathname.split('/');
  const newPathname = '/' + splitPathname[1];
  router.replace(newPathname);
}
