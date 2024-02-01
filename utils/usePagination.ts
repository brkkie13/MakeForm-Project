import { useState, useEffect } from 'react';
import { useLocalStorage } from '@utils/localStorage';
import { SetQueryString } from '@/types/types';

// code
function usePagination(setQueryStringState: SetQueryString) {
  const { getItem, setItem, removeItem } = useLocalStorage();

  const pageNumber = Number(getItem('page'));
  const [currentPage, setCurrentPage] = useState<number>(pageNumber || 1);

  const postsPerPage = 8;
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;

  useEffect(() => {
    const currentPageString = String(currentPage);
    setItem('page', currentPageString);
  }, [currentPage]);

  const changePage = (pageNumber: number) => {
    setCurrentPage(pageNumber);

    const pageString = String(pageNumber);

    setQueryStringState(prevState => ({
      ...prevState,
      page: pageString !== '1' ? pageString : null,
    }));
  };

  return { currentPage, indexOfFirstPost, indexOfLastPost, changePage };
}

export default usePagination;
