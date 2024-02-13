import { useState, useEffect } from 'react';
import { getItem, setItem, removeItem } from '@utils/localStorage';

// types
import {
  CreatedData,
  QueryString,
  SetQueryString,
  SubmittedResponse,
  FilterActions,
} from '@/types/types';

// code
const ALL_YEAR = '전체 년';
const ALL_MONTH = '전체 월';
const ALL_FORM = '전체 폼';

function useFilters(setQueryStringState: SetQueryString) {
  const [year, setYear] = useState(getItem('year') || ALL_YEAR);
  const [month, setMonth] = useState(getItem('month') || ALL_MONTH);
  // '/forms'에서만 사용
  const [searchWord, setSearchWord] = useState(getItem('searchWord') || '');
  // '/analysis'에서만 사용
  const [formId, setFormId] = useState(getItem('formId') || ALL_FORM);

  const filterActions: FilterActions = {
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

  const changeFilter = (filterName: keyof FilterActions, value: string) => {
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
    (Object.keys(filterActions) as Array<keyof FilterActions>).forEach(
      actionName => {
        const action = filterActions[actionName];
        removeItem(actionName);
        action.setFilter(action.defaultValue);
      }
    );

    setQueryStringState((prevState: QueryString) => ({
      ...prevState,
      year: null,
      month: null,
      searchWord: null,
      formId: null,
    }));
  };

  // 폼리스트 필터링
  // create/page.tsx에서는 CreatedData[]로 단언.
  // analysis/page.tsx에서는 Response[]로 단언.
  const filterList = (data: CreatedData[] | SubmittedResponse[]) => {
    let filteredList = [...data];

    if (year !== ALL_YEAR) {
      filteredList = filteredList.filter(item =>
        'creationDate' in item
          ? new Date(item.creationDate).getFullYear() === parseInt(year)
          : 'submissionDate' in item
          ? new Date(item.submissionDate).getFullYear() === parseInt(year)
          : false
      );
    }

    if (month !== ALL_MONTH) {
      filteredList = filteredList.filter(item =>
        'creationDate' in item
          ? new Date(item.creationDate).getMonth() + 1 === parseInt(month)
          : 'submissionDate' in item
          ? new Date(item.submissionDate).getMonth() + 1 === parseInt(month)
          : false
      );
    }

    if (searchWord !== '') {
      filteredList = filteredList.filter(item =>
        item.header.toLowerCase().includes(searchWord.toLowerCase())
      );
    }

    if (formId !== ALL_FORM) {
      filteredList = filteredList.filter(item =>
        'formId' in item ? item.formId === formId : false
      );
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
