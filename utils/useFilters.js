import { useState, useEffect } from 'react';
import { useLocalStorage } from '@utils/localStorage';

// code
const ALL_YEAR = '전체 년';
const ALL_MONTH = '전체 월';
const ALL_FORM = '전체 폼';

function useFilters(setQueryStringState) {
  const { getItem, setItem, removeItem } = useLocalStorage();

  const [year, setYear] = useState(getItem('year') || ALL_YEAR);
  const [month, setMonth] = useState(getItem('month') || ALL_MONTH);
  // '/forms'에서만 사용
  const [searchWord, setSearchWord] = useState(getItem('searchWord') || '');
  // '/analysis'에서만 사용
  const [formId, setFormId] = useState(getItem('formId') || ALL_FORM);

  const filterActions = {
    year: { setFilter: setYear, defaultValue: ALL_YEAR },
    month: { setFilter: setMonth, defaultValue: ALL_MONTH },
    searchWord: { setFilter: setSearchWord, defaultValue: '' },
    formId: { setFilter: setFormId, defaultValue: ALL_FORM },
  };

  // 필터값 바뀔 때마다 로컬스토리지에 setItem하거나 기본값이면 removeItem.
  useEffect(() => {
    year !== ALL_YEAR ? setItem('year', year) : removeItem('year');
    month !== ALL_MONTH ? setItem('month', month) : removeItem('month');
    searchWord !== ''
      ? setItem('searchWord', searchWord)
      : removeItem('searchWord');
    formId !== ALL_FORM ? setItem('formId', formId) : removeItem('formId');
  }, [year, month, searchWord, formId]);

  const changeFilter = (filterName, value) => {
    const action = filterActions[filterName];
    if (action) {
      action.setFilter(value);

      setQueryStringState(prevState => ({
        ...prevState,
        [filterName]: value !== action.defaultValue ? value : null,
      }));
    }
  };

  const resetFilter = () => {
    Object.keys(filterActions).forEach(actionName => {
      const action = filterActions[actionName];
      removeItem(actionName);
      action.setFilter(action.defaultValue);
    });

    setQueryStringState(prevState => ({
      ...prevState,
      year: null,
      month: null,
      searchWord: null,
      formId: null,
    }));
  };

  // 폼리스트 필터링
  const filterList = data => {
    let filteredList = [...data];

    if (year !== ALL_YEAR) {
      filteredList = filteredList.filter(
        item =>
          new Date(item.creationDate || item.submissionDate).getFullYear() ===
          parseInt(year)
      );
    }

    if (month !== ALL_MONTH) {
      filteredList = filteredList.filter(
        item =>
          new Date(item.creationDate || item.submissionDate).getMonth() + 1 ===
          parseInt(month)
      );
    }

    if (searchWord !== '') {
      filteredList = filteredList.filter(item =>
        item.header.toLowerCase().includes(searchWord.toLowerCase())
      );
    }

    if (formId !== ALL_FORM) {
      filteredList = filteredList.filter(item => item.formId === formId);
    }

    return filteredList;
  };

  return {
    year,
    month,
    searchWord,
    formId,
    changeFilter,
    resetFilter,
    filterList,
  };
}

export default useFilters;
