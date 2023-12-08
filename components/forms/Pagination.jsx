import { PaginationStyled } from './Pagination.styles';

function Pagination({ dataList, currentPage, onPageChange }) {
  const pageNumbers = [];
  const postsPerPage = 8;
  const totalPages = Math.ceil(dataList.length / postsPerPage);

  for (let index = 1; index <= totalPages; index++) {
    pageNumbers.push(index);
  }

  return (
    <PaginationStyled>
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
    </PaginationStyled>
  );
}

export default Pagination;
