'use client';
import styled from 'styled-components';
import { useCallback, useEffect } from 'react';
import { useRouter } from 'next/navigation';

// components
import FormList from '../../components/forms/FormList';
import Pagination from '../../components/forms/Pagination';

// redux
import { useDispatch, useSelector } from 'react-redux';
import {
  sendFormData,
  fetchFormData,
} from '../../redux/actions/formActionCreators';

import useFirebaseAuthState from '../../utils/useFirebaseAuthState';
import { formActions } from '../../redux/features/formSlice';
import Filters from '../../components/forms/Filters';
import useFilters from '../../utils/useFilters';
import usePagination from '../../utils/usePagination';
import useQueryString from '../../utils/useQueryString';

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

// code
function FormsPage() {
  const router = useRouter();
  const dispatch = useDispatch();
  const user = useFirebaseAuthState();
  const formList = useSelector(state => state.form.formList);
  const setQueryStringState = useQueryString();

  const { year, month, searchWord, changeFilter, filterList } =
    useFilters(setQueryStringState);

  const filteredFormList = filterList(formList);

  const { currentPage, indexOfFirstPost, indexOfLastPost, changePage } =
    usePagination(setQueryStringState);

  const currentPosts = filteredFormList.slice(
    indexOfFirstPost,
    indexOfLastPost
  );

  useEffect(() => {
    if (user) {
      dispatch(fetchFormData(user?.uid));
    } else {
      dispatch(formActions.replaceFormList([])); // 로그아웃 상태라면 formList를 비움.
    }
  }, [dispatch, user]);

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
        ...targetedForm,
        creationDate: new Date().toISOString(),
        header: `${targetedForm.header} - 복사`,
      };

      dispatch(sendFormData(data));
      dispatch(fetchFormData(user?.uid));
    },
    [dispatch, formList]
  );

  return (
    <Section>
      <h1>최근 폼</h1>

      <Filters
        dataList={filteredFormList}
        year={year}
        month={month}
        searchWord={searchWord}
        onFilterChange={changeFilter}
        onPageChange={changePage}
      />

      <FormList
        currentPosts={currentPosts}
        onShow={showDetailHandler}
        onCopy={copyFormHandler}
      />

      <Pagination
        dataList={filteredFormList}
        currentPage={currentPage}
        onPageChange={changePage}
      />
    </Section>
  );
}

export default FormsPage;
