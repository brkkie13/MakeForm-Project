import { useState, useEffect } from 'react';
import { useLocalStorage } from './localStorage';

function useFilters(setQueryStringState) {
  const { getItem, setItem, removeItem } = useLocalStorage();

  const [year, setYear] = useState(getItem('year') || 'all-year');
  const [month, setMonth] = useState(getItem('month') || 'all-month');
  const [searchWord, setSearchWord] = useState(getItem('searchWord') || '');

  const filterActions = [
    { name: 'year', setFilter: setYear, defaultValue: 'all-year' },
    { name: 'month', setFilter: setMonth, defaultValue: 'all-month' },
    { name: 'searchWord', setFilter: setSearchWord, defaultValue: '' },
  ];

  // 필터값 바뀔 때마다 로컬스토리지에 setItem하거나 기본값이면 removeItem.
  useEffect(() => {
    year !== 'all-year' ? setItem('year', year) : removeItem('year');
    month !== 'all-month' ? setItem('month', month) : removeItem('month');
    searchWord !== ''
      ? setItem('searchWord', searchWord)
      : removeItem('searchWord');
  }, [year, month, searchWord]);

  const changeFilter = (filterName, value) => {
    const action = filterActions.find(action => action.name === filterName);
    if (action) {
      action.setFilter(value);

      setQueryStringState(prevState => ({
        ...prevState,
        [filterName]: value !== action.defaultValue ? value : null,
      }));
    }
  };

  const resetFilter = () => {
    filterActions.map(action => {
      removeItem(action.name);
      action.setFilter(action.defaultValue);
    });

    setQueryStringState(prevState => ({
      ...prevState,
      year: null,
      month: null,
      searchWord: null,
    }));
  };

  // 폼리스트 필터링
  const filterList = data => {
    let filteredList = [...data];

    if (year !== 'all-year') {
      filteredList = filteredList.filter(
        item => new Date(item.creationDate).getFullYear() === parseInt(year)
      );
    }

    if (month !== 'all-month') {
      filteredList = filteredList.filter(
        item => new Date(item.creationDate).getMonth() + 1 === parseInt(month)
      );
    }

    if (searchWord !== '') {
      filteredList = filteredList.filter(item =>
        item.header.toLowerCase().includes(searchWord.toLowerCase())
      );
    }

    return filteredList;
  };

  return { year, month, searchWord, changeFilter, resetFilter, filterList };
}

export default useFilters;
