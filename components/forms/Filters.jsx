'use client';
import { FiltersStyled } from './Filters.styles';
import { SearchIcon } from '../../\bstyles/Icons';

function Filters({
  dataList,
  year,
  month,
  searchWord,
  onFilterChange,
  onPageChange,
}) {
  const yearOptions = [
    'all-year',
    ...new Set(dataList.map(form => new Date(form.creationDate).getFullYear())),
  ];

  // 1~12월을 배열로 반환
  const monthOptions = [
    'all-month',
    ...new Array(12).fill().map((_, index) => index + 1),
  ];

  return (
    <FiltersStyled>
      <select
        value={year}
        onChange={e => {
          onFilterChange('year', e.target.value);
          onPageChange(1);
        }}
      >
        {yearOptions.map(item => (
          <option key={item} value={item}>
            {item}
          </option>
        ))}
      </select>

      <select
        value={month}
        onChange={e => {
          onFilterChange('month', e.target.value);
          onPageChange(1);
        }}
      >
        {monthOptions.map(item => (
          <option key={item} value={item}>
            {item}
          </option>
        ))}
      </select>

      <label>
        <SearchIcon />
        <input
          type="text"
          placeholder="검색..."
          value={searchWord}
          onChange={e => {
            onFilterChange('searchWord', e.target.value);
            onPageChange(1);
          }}
        />
      </label>
    </FiltersStyled>
  );
}

export default Filters;
