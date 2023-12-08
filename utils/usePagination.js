import { useState, useEffect } from 'react';
import useLocalStorage from './useLocalStorage';
import useQueryString from './useQueryString';

function usePagination(setQueryStringState) {
  // const createQueryString = useQueryString();
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

    // createQueryString('page', number);
    setQueryStringState(prevState => ({
      ...prevState,
      page: number !== 1 ? number : null,
    }));
  };

  return { currentPage, indexOfFirstPost, indexOfLastPost, changePage };
}

export default usePagination;
