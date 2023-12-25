'use client';
import { useState } from 'react';
import { FiltersStyled } from '@components/forms/Filters.styles';
import { SearchIcon } from '@styles/Icons';
import { OutlinedButtonStyled } from '@components/ui/Buttons';

// code
function Filters({
  dataList,
  year,
  month,
  searchWord,
  onFilterChange,
  onFilterReset,
  onPageChange,
}) {
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const yearOptions = [
    '전체 년',
    ...new Set(dataList.map(form => new Date(form.creationDate).getFullYear())),
  ];

  // 1~12월을 배열로 반환
  const monthOptions = [
    '전체 월',
    ...new Array(12).fill().map((_, index) => index + 1),
  ];

  const changeFilterHandler = (filterName, value) => {
    onFilterChange(filterName, value);
    onPageChange(1);
  };

  const resetFilterHandler = () => {
    onFilterReset();
    onPageChange(1);
  };

  const toggleSearchButtonHandler = () => {
    setIsSearchOpen(!isSearchOpen);
  };

  return (
    <FiltersStyled>
      <div className="filters-group">
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

        <label className="search-pc">
          <SearchIcon />
          <input
            type="text"
            placeholder="검색..."
            value={searchWord}
            onChange={e => changeFilterHandler('searchWord', e.target.value)}
          />
        </label>

        <OutlinedButtonStyled
          className="search-button"
          onClick={toggleSearchButtonHandler}
        >
          <SearchIcon />
        </OutlinedButtonStyled>

        <OutlinedButtonStyled onClick={resetFilterHandler}>
          필터 초기화
        </OutlinedButtonStyled>
      </div>

      {isSearchOpen && (
        <label className="search-mobile">
          <SearchIcon />
          <input
            type="text"
            placeholder="검색..."
            value={searchWord}
            onChange={e => changeFilterHandler('searchWord', e.target.value)}
          />
        </label>
      )}
    </FiltersStyled>
  );
}

export default Filters;
