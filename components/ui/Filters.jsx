'use client';
import { useState } from 'react';
import { FiltersStyled } from '@components/ui/Filters.styles';
import { SearchIcon, FilterIcon } from '@components/assets/Icons';
import { OutlinedButtonStyled } from '@components/ui/Buttons';

// code
function Filters({
  allPosts,
  year,
  month,
  searchWord,
  formId,
  onFilterChange,
  onFilterReset,
  onPageChange,
  isAnalysisPage,
}) {
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const yearOptions = [
    '전체 년',
    ...new Set(
      allPosts.map(data =>
        new Date(data.creationDate || data.submissionDate).getFullYear()
      )
    ),
  ];

  // 1~12월을 배열로 반환
  const monthOptions = [
    '전체 월',
    ...new Array(12).fill().map((_, index) => index + 1),
  ];

  // '/analysis'에서만 사용. 응답이 들어온 폼 제목을 배열로 반환
  let titleOptions = [];
  if (isAnalysisPage === true) {
    const map = new Map(
      allPosts.map(item => [`${item.header}-${item.formId}`, item])
    );
    const uniquePosts = Array.from(map.values());
    titleOptions = ['전체 폼', ...uniquePosts];
  }

  const changeFilterHandler = (filterName, value) => {
    onFilterChange(filterName, value);
    onPageChange(1);
  };

  const toggleFilterButtonHandler = () => {
    setIsFilterOpen(!isFilterOpen);
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

        {/* '/forms'페이지에서만 사용 */}
        {!isAnalysisPage && (
          <>
            <label className="search-pc">
              <SearchIcon />
              <input
                type="text"
                placeholder="검색..."
                value={searchWord}
                onChange={e =>
                  changeFilterHandler('searchWord', e.target.value)
                }
              />
            </label>

            <OutlinedButtonStyled
              className="search-button"
              onClick={toggleFilterButtonHandler}
            >
              <SearchIcon />
            </OutlinedButtonStyled>
          </>
        )}

        {/* '/analysis'페이지에서만 사용 */}
        {isAnalysisPage === true && (
          <>
            <select
              className="form-filter-pc"
              value={formId}
              onChange={e => {
                onFilterChange('formId', e.target.value);
                onPageChange(1);
              }}
            >
              {titleOptions.map((item, idx) => (
                <option
                  key={idx}
                  value={item === '전체 폼' ? item : item.formId}
                >
                  {item === '전체 폼'
                    ? item
                    : `${item.header} (폼ID : ${item.formId})`}
                </option>
              ))}
            </select>

            <OutlinedButtonStyled
              className="form-filter-button"
              onClick={toggleFilterButtonHandler}
            >
              <FilterIcon />
            </OutlinedButtonStyled>
          </>
        )}

        <OutlinedButtonStyled onClick={onFilterReset}>
          필터 초기화
        </OutlinedButtonStyled>
      </div>

      {isFilterOpen &&
        (!isAnalysisPage ? (
          <label className="search-mobile">
            <SearchIcon />
            <input
              type="text"
              placeholder="검색..."
              value={searchWord}
              onChange={e => changeFilterHandler('searchWord', e.target.value)}
            />
          </label>
        ) : (
          <select
            className="form-filter-mobile"
            value={formId}
            onChange={e => {
              onFilterChange('formId', e.target.value);
              onPageChange(1);
            }}
          >
            {titleOptions.map((item, idx) => (
              <option
                key={idx}
                value={item === '전체 폼' ? '전체 폼' : item.formId}
              >
                {item === '전체 폼'
                  ? '전체 폼'
                  : `${item.header} (폼ID : ${item.formId})`}
              </option>
            ))}
          </select>
        ))}
    </FiltersStyled>
  );
}

export default Filters;
