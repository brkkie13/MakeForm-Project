import { useState } from 'react';
import { PaginationStyled } from './Pagination.styles';
import { ArrowIcon, DoubleArrowIcon } from '../../\bstyles/Icons';

// code
const PREV = 'prev';
const NEXT = 'next';
const postsPerPage = 8;
const pagesPerGroup = 5; // 한 그룹당 페이지 개수

function Pagination({ dataList, currentPage, onPageChange }) {
  const totalPages = Math.ceil(dataList.length / postsPerPage);
  const [currentPageGroup, setCurrentPageGroup] = useState(
    Math.ceil(currentPage / pagesPerGroup) // 현재 페이지그룹의 번호
  );

  const pageNumbers = [];

  for (
    let index = (currentPageGroup - 1) * pagesPerGroup + 1; // 페이지그룹 중 가장 작은 페이지(6~10 그룹에서는 6)
    index <= Math.min(currentPageGroup * pagesPerGroup, totalPages); // 페이지그룹 중 가장 큰 페이지 또는 총 페이지 둘 중에 작은 숫자
    index++
  ) {
    pageNumbers.push(index);
  }

  const clickArrowHandler = direction => {
    if (direction === PREV && currentPageGroup > 1) {
      setCurrentPageGroup(currentPageGroup - 1);
      onPageChange((currentPageGroup - 2) * pagesPerGroup + 1);
    } else if (
      direction === NEXT &&
      currentPageGroup < Math.ceil(totalPages / pagesPerGroup)
    ) {
      setCurrentPageGroup(currentPageGroup + 1);
      onPageChange(currentPageGroup * pagesPerGroup + 1);
    }
  };

  const clickDoubleArrowHandler = direction => {
    if (direction === PREV && currentPageGroup > 1) {
      setCurrentPageGroup(1);
      onPageChange(1);
    } else if (
      direction === NEXT &&
      currentPageGroup < Math.ceil(totalPages / pagesPerGroup)
    ) {
      setCurrentPageGroup(Math.ceil(totalPages / pagesPerGroup));
      onPageChange(
        Math.min(
          Math.ceil(totalPages / pagesPerGroup) * pagesPerGroup,
          totalPages
        )
      );
    }
  };

  return (
    <PaginationStyled>
      <DoubleArrowIcon onClick={() => clickDoubleArrowHandler(PREV)} />
      <ArrowIcon onClick={() => clickArrowHandler(PREV)} />
      <ul>
        {pageNumbers.map(number => (
          <li
            key={number}
            className={currentPage === number ? 'active' : ''}
            onClick={() => onPageChange(number)}
          >
            {number}
          </li>
        ))}
      </ul>
      <ArrowIcon onClick={() => clickArrowHandler(NEXT)} />
      <DoubleArrowIcon onClick={() => clickDoubleArrowHandler(NEXT)} />
    </PaginationStyled>
  );
}

export default Pagination;
