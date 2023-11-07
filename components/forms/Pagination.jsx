import { PaginationStyled } from './Pagination.styles';

function Pagination({ currentPage, totalPages, onPageChange }) {
  const pageNumbers = [];
  for (let index = 1; index <= totalPages; index++) {
    pageNumbers.push(index);
  }

  return (
    <PaginationStyled>
      <ul className="pagination">
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
