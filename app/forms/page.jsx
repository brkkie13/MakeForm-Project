'use client';
import styled from 'styled-components';
import { useCallback, useState, useEffect } from 'react';
import { useRouter, usePathname, useSearchParams } from 'next/navigation';

// components
import FormList from '../../components/forms/FormList';
import Pagination from '../../components/forms/Pagination';
import { SearchIcon } from '../../\bstyles/Icons';

// redux
import { useDispatch, useSelector } from 'react-redux';
import {
  sendFormData,
  fetchFormData,
} from '../../redux/actions/formActionCreators';

import useFirebaseAuthState from '../../utils/useFirebaseAuthState';
import { formActions } from '../../redux/features/formSlice';

// css
const Section = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;

  h1 {
    margin-top: 70px;
    margin-bottom: 20px;
  }
`;

const FilterStyled = styled.nav`
  margin: 20px 0;
  width: 80%;
  display: flex;
  justify-content: end;
  align-items: center;
  gap: 15px;

  select,
  label {
    display: flex;
    align-items: center;
    background: ${props => props.theme.colors.block};
    height: 40px;
    border-radius: 8px;
    border: 1px solid lightgray;
    padding: 0 10px;
  }

  svg {
    fill: lightgray;
    margin-right: 5px;
  }
`;

// code
function FormsPage() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const dispatch = useDispatch();

  const formList = useSelector(state => state.form.formList);
  const [filteredFormList, setFilteredFormList] = useState(formList);
  const [yearFilter, setYearFilter] = useState('all-year');
  const [monthFilter, setMonthFilter] = useState('all-month');
  const [searchWord, setSearchWord] = useState('');

  // 페이지네이션
  const [currentPage, setCurrentPage] = useState(1); // 현재 페이지
  const postsPerPage = 8; // 한페이지당 포스트 개수
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = filteredFormList.slice(
    indexOfFirstPost,
    indexOfLastPost
  );
  const totalPosts = filteredFormList.length;

  const user = useFirebaseAuthState();

  // 게시글의 모든 연도를 배열로 반환
  const yearOptions = [
    'all-year',
    ...new Set(formList.map(form => new Date(form.creationDate).getFullYear())),
  ];

  // 1~12월을 배열로 반환
  const monthOptions = [
    'all-month',
    ...new Array(12).fill().map((_, index) => index + 1),
  ];

  useEffect(() => {
    if (user) {
      dispatch(fetchFormData(user?.uid));

      const storedYearFilter = localStorage.getItem('yearFilter');
      const storedMonthFilter = localStorage.getItem('monthFilter');
      const storedSearchWord = localStorage.getItem('searchWord');
      const storedCurrentPage = parseInt(localStorage.getItem('currentPage'));

      setYearFilter(storedYearFilter || 'all-year');
      setMonthFilter(storedMonthFilter || 'all-month');
      setSearchWord(storedSearchWord || '');
      setCurrentPage(storedCurrentPage);
    } else {
      dispatch(formActions.replaceFormList([])); // 로그아웃 상태라면 formList를 비움.
    }
  }, [dispatch, user]);

  // 새로고침해도 리스트가 뜨도록 함.
  useEffect(() => {
    setFilteredFormList(formList);
    filterFormList();
  }, [formList]);

  // 필터링이 바뀔 때마다 실행
  useEffect(() => {
    localStorage.setItem('yearFilter', yearFilter);
    localStorage.setItem('monthFilter', monthFilter);
    localStorage.setItem('searchWord', searchWord);

    filterFormList();
  }, [yearFilter, monthFilter, searchWord]);

  useEffect(() => {
    localStorage.setItem('currentPage', currentPage);
  }, [currentPage]);

  // 폼리스트 필터링
  const filterFormList = useCallback(() => {
    let filteredList = [...formList];

    if (yearFilter !== 'all-year') {
      filteredList = filteredList.filter(
        item =>
          new Date(item.creationDate).getFullYear() === parseInt(yearFilter)
      );
    }

    if (monthFilter !== 'all-month') {
      filteredList = filteredList.filter(
        item =>
          new Date(item.creationDate).getMonth() + 1 === parseInt(monthFilter)
      );
    }

    if (searchWord !== '') {
      filteredList = filteredList.filter(item =>
        item.header.toLowerCase().includes(searchWord.toLowerCase())
      );
    }

    setFilteredFormList(filteredList);
  }, [formList, yearFilter, monthFilter, searchWord, filteredFormList]);

  // 쿼리스트링
  const createQueryString = useCallback(
    (name, value) => {
      const params = new URLSearchParams(searchParams);

      if (value) {
        params.set(name, value);
      }
      if (name === 'year' && value === 'all-year') {
        params.delete(name);
      }
      if (name === 'month' && value === 'all-month') {
        params.delete(name);
      }
      if (name === 'search' && value === '') {
        params.delete(name);
      }

      return params.toString();
    },
    [searchParams]
  );

  const showDetailHandler = useCallback(
    dataId => {
      router.push('/forms/' + dataId);
    },
    [router]
  );

  const copyFormHandler = useCallback(
    async (event, formId) => {
      event.stopPropagation(); // 부모태그 클릭 막기

      const targetedForm = formList.find(form => form.id === formId);

      const data = {
        creationDate: new Date().toISOString(),
        header: `${targetedForm.header} - 복사`,
        items: targetedForm.items,
      };

      await dispatch(sendFormData(data));
      dispatch(fetchFormData());
    },
    [dispatch, formList]
  );

  return (
    <Section>
      <h1>최근 폼</h1>

      <FilterStyled>
        <select
          value={yearFilter}
          onChange={e => {
            setYearFilter(e.target.value);
            setCurrentPage(1);
            const newQueryString = createQueryString('year', e.target.value);
            router.push(pathname + '?' + newQueryString);
          }}
        >
          {yearOptions.map(item => (
            <option key={item} value={item}>
              {item}
            </option>
          ))}
        </select>

        <select
          value={monthFilter}
          onChange={e => {
            setMonthFilter(e.target.value);
            setCurrentPage(1);
            const newQueryString = createQueryString('month', e.target.value);
            router.push(pathname + '?' + newQueryString);
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
            placeholder="제목으로 검색"
            value={searchWord}
            onChange={e => {
              setSearchWord(e.target.value);
              setCurrentPage(1);
              const newQueryString = createQueryString(
                'search',
                e.target.value
              );
              router.push(pathname + '?' + newQueryString);
            }}
          />
        </label>
      </FilterStyled>

      <FormList
        currentPosts={currentPosts}
        onShow={showDetailHandler}
        onCopy={copyFormHandler}
      />

      <Pagination
        currentPage={currentPage}
        totalPages={Math.ceil(totalPosts / postsPerPage)}
        onPageChange={page => {
          setCurrentPage(page);
          router.push(`${pathname}?${createQueryString('page', page)}`);
        }}
      />
    </Section>
  );
}

export default FormsPage;
