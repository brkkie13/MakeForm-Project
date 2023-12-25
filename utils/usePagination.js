import { useState, useEffect } from 'react';
import { useLocalStorage } from '@utils/localStorage';

// code
function usePagination(setQueryStringState) {
  const { getItem, setItem, removeItem } = useLocalStorage();

  const [currentPage, setCurrentPage] = useState(
    parseInt(getItem('page')) || 1
  );

  const postsPerPage = 8;
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;

  useEffect(() => {
    setItem('page', currentPage);
  }, [currentPage]);

  const changePage = number => {
    setCurrentPage(number);

    setQueryStringState(prevState => ({
      ...prevState,
      page: number !== 1 ? number : null,
    }));
  };

  return { currentPage, indexOfFirstPost, indexOfLastPost, changePage };
}

export default usePagination;
