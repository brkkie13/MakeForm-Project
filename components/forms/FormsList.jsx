'use client';
import { useCallback, useState, useEffect } from 'react';
import { useRouter, usePathname, useSearchParams } from 'next/navigation';

// css
import { FilterNav, PaginationNav } from './FormsList.styles';
import { Table } from './FormsList.styles';

// icons
import { LinkIcon, TrashIcon, SearchIcon } from '../../\bstyles/Icons';

// redux
import { useDispatch, useSelector } from 'react-redux';
import { removeFormData } from '../../redux/actions';
import { fetchFormData } from '../../redux/actions';

// 쿼리스트링 예시
// http://localhost:3000/forms?page=1&year=2023&month=10&search=hi

// code
function FormsList() {
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
  const [postsPerPage, setPostsPerPage] = useState(8); // 한 페이지 당 포스트 개수
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = filteredFormList.slice(
    indexOfFirstPost,
    indexOfLastPost
  );
  const pageNumbers = [];
  const totalPosts = filteredFormList.length;
  for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
    pageNumbers.push(i);
  }

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

  // 전체 월을 배열로 반환
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
  }, [yearOption, monthOption, searchWord]);

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
      // if (value !== 'all-year') {
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

  const removeFormHandler = useCallback(
    (event, formId) => {
      if (window.confirm('삭제하시겠습니까?')) {
        dispatch(removeFormData(formId));
        router.push('/forms');
        // 삭제버튼의 상위태그 tr의 onClick함수가 실행되는 이벤트버블링을 막음.
        event.stopPropagation();
        // redux에서 가져온 formList 요소가 삭제되면, 바로 fetchFormData를 호출해 삭제가 반영된 새 formList를 가져옴.
        setTimeout(() => {
          dispatch(fetchFormData());
        }, 0);
      } else {
        // confirm창의 취소버튼을 눌렀을 때도 이벤트버블링을 막아 현재페이지에 머물기.
        event.stopPropagation();
      }
    },
    [dispatch, router]
  );

  return (
    <>
      <FilterNav>
        <select
          value={yearOption}
          onChange={e => {
            setYearOption(e.target.value);
            router.push(
              pathname + '?' + createQueryString('year', e.target.value)
            );
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
            router.push(
              pathname + '?' + createQueryString('month', e.target.value)
            );
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
              router.push(
                pathname + '?' + createQueryString('search', e.target.value)
              );
            }}
          />
        </label>
      </FilterNav>

      <Table>
        <thead>
          <tr>
            <th>제목</th>
            <th>생성 날짜</th>
          </tr>
        </thead>
        <tbody>
          {/* {filteredFormList.map(data => ( */}
          {currentPosts.map(data => (
            <tr key={data.id} onClick={() => showDetailHandler(data.id)}>
              <td>{data.header}</td>
              <td>{new Date(data.creationDate).toLocaleString()}</td>
              <td className="controls">
                <span>
                  <LinkIcon />
                </span>
                <span onClick={event => removeFormHandler(event, data.id)}>
                  <TrashIcon />
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <PaginationNav>
        <ul>
          {pageNumbers.map(number => (
            <li
              key={number}
              onClick={() => {
                setCurrentPage(number);
                router.push(`${pathname}?${createQueryString('page', number)}`);
              }}
              className={currentPage === number ? 'active' : ''}
            >
              {number}
            </li>
          ))}
        </ul>
      </PaginationNav>
    </>
  );
}

export default FormsList;
