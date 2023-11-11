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
import { sendFormData, fetchFormData } from '../../redux/actions';

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
  const [yearOption, setYearOption] = useState('all-year');
  const [monthOption, setMonthOption] = useState('all-month');
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

  // 게시글의 모든 연도를 배열로 반환
  const yearOptionList = [
    'all-year',
    ...formList.reduce((accumulator, form) => {
      const yearOption = new Date(form.creationDate).getFullYear();
      if (!accumulator.includes(yearOption)) {
        accumulator.push(yearOption);
      }
      return accumulator;
    }, []),
  ];

  // 1~12월을 배열로 반환
  const monthOptionList = [
    'all-month',
    ...new Array(12).fill().map((_, index) => index + 1),
  ];

  useEffect(() => {
    dispatch(fetchFormData());
  }, []);

  useEffect(() => {
    setFilteredFormList(formList); // 새로고침해도 전체 리스트가 뜨도록.
  }, [formList]);

  // 필터링이 바뀔 때마다 실행
  useEffect(() => {
    if (
      yearOption !== 'all-year' ||
      monthOption !== 'all-month' ||
      searchWord !== ''
    ) {
      getProcessedFormList();
    }

    if (
      yearOption === 'all-year' &&
      monthOption === 'all-month' &&
      searchWord === ''
    ) {
      setFilteredFormList(formList);
    }

    // 년,월,검색어가 바뀔 때마다 항상 현재 페이지는 1로 초기화.
    setCurrentPage(1);
  }, [yearOption, monthOption, searchWord]);

  // 폼리스트 필터링
  function getProcessedFormList() {
    const yearFilter = item => {
      if (yearOption !== 'all-year') {
        const formYear = new Date(item.creationDate).getFullYear();
        return formYear === parseInt(yearOption);
      } else {
        return item;
      }
    };

    const monthFilter = item => {
      if (monthOption !== 'all-month') {
        const formMonth = new Date(item.creationDate).getMonth() + 1;
        return formMonth === parseInt(monthOption);
      } else {
        return item;
      }
    };

    const searchFilter = item => {
      if (searchWord !== '') {
        return item.header.toLowerCase().includes(searchWord.toLowerCase());
      } else {
        return item;
      }
    };

    let copiedList = JSON.parse(JSON.stringify(formList));

    if (yearOption !== 'all-year') {
      copiedList = copiedList.filter(item => yearFilter(item));
    }

    if (yearOption !== 'all-month') {
      copiedList = copiedList.filter(item => monthFilter(item));
    }

    if (searchWord !== '') {
      copiedList = copiedList.filter(item => searchFilter(item));
    }

    setFilteredFormList(copiedList);
  }

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
          value={yearOption}
          onChange={e => {
            setYearOption(e.target.value);
            const newQueryString = createQueryString('year', e.target.value);
            router.push(pathname + '?' + newQueryString);
          }}
        >
          {yearOptionList.map(item => (
            <option key={item} value={item}>
              {item}
            </option>
          ))}
        </select>

        <select
          value={monthOption}
          onChange={e => {
            setMonthOption(e.target.value);
            const newQueryString = createQueryString('month', e.target.value);
            router.push(pathname + '?' + newQueryString);
          }}
        >
          {monthOptionList.map(item => (
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
