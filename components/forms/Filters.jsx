'use client';
import { FiltersStyled } from './Filters.styles';
import { SearchIcon } from '../../\bstyles/Icons';
import { Button } from '../ui/Button.styles';

function Filters({
  dataList,
  year,
  month,
  searchWord,
  onFilterChange,
  onFilterReset,
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

      <Button
        onClick={() => {
          onFilterReset();
          onPageChange(1);
        }}
      >
        필터 초기화
      </Button>
    </FiltersStyled>
  );
}

export default Filters;
