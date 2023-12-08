import { useState, useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import useLocalStorage from './useLocalStorage';

function useQueryString() {
  const router = useRouter();
  const pathname = usePathname();
  const { getItem, setItem, removeItem } = useLocalStorage();
  const [queryStringState, setQueryStringState] = useState({
    year: getItem('year'),
    month: getItem('month'),
    searchWord: getItem('searchWord'),
    page: getItem('page'),
  });

  // 페이지 새로고침 시 로컬스토리지에서 값을 가져와서 쿼리스트링 설정
  useEffect(() => {
    const params = new URLSearchParams();

    for (const [key, value] of Object.entries(queryStringState)) {
      const storedValue = getItem(key);
      if (storedValue) {
        params.set(key, storedValue);
      } else {
        params.delete(key);
      }
    }

    const newQueryString = params.toString();
    router.push(pathname + '?' + newQueryString);
  }, []);

  // queryStringState가 변경될 때마다 쿼리스트링 업데이트
  useEffect(() => {
    const params = new URLSearchParams();

    for (const [key, value] of Object.entries(queryStringState)) {
      if (value) {
        params.set(key, value);
      } else {
        params.delete(key);
      }
    }

    const newQueryString = params.toString();
    router.push(pathname + '?' + newQueryString);
  }, [queryStringState]);

  return setQueryStringState;
}

export default useQueryString;
