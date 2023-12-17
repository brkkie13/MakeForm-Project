'use client';
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
import Section from '../../components/ui/Section';
import useFilters from '../../utils/useFilters';
import usePagination from '../../utils/usePagination';
import useQueryString from '../../utils/useQueryString';
import { getDataFromLocalStorage } from '../../utils/localStorage';
import { useLocalStorage } from '../../utils/localStorage';
import ErrorBox from '../../components/ui/ErrorBox';

// code
function FormsPage() {
  const router = useRouter();
  const dispatch = useDispatch();
  const user = useFirebaseAuthState();
  const formList = useSelector(state => state.form.formList);
  const setQueryStringState = useQueryString();
  const { setItem, getItem } = useLocalStorage();

  const { year, month, searchWord, changeFilter, resetFilter, filterList } =
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
    }

    // 로그아웃일 때 로컬스토리지에 저장된 데이터를 불러옴
    if (!user) {
      const storedForms = getDataFromLocalStorage();
      dispatch(formActions.replaceFormList(storedForms));
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

      if (user) {
        const targetedForm = formList.find(form => form.id === formId);

        const data = {
          ...targetedForm,
          creationDate: new Date().toISOString(),
          header: `${targetedForm.header} - 복사`,
        };

        dispatch(sendFormData(user, data));

        // 복사된 데이터가 바로 화면에 업데이트 되도록 함
        dispatch(fetchFormData(user?.uid));
      }

      // 로그인상태 아닐 때 데이터 복사해서 로컬스토리지에 저장
      if (!user) {
        let dataId = getItem('dataId');
        let storedForms = getDataFromLocalStorage();
        const targetedForm = storedForms.find(form => form.id === formId);

        const data = {
          ...targetedForm,
          id: dataId,
          creationDate: new Date().toISOString(),
          header: `${targetedForm.header} - 복사`,
        };

        dispatch(sendFormData(user, data));

        // 복사된 데이터가 바로 화면에 업데이트 되도록 함
        storedForms = getDataFromLocalStorage();
        dispatch(formActions.replaceFormList(storedForms));
      }
    },
    [dispatch, formList]
  );

  return (
    <Section>
      {!user && (
        <ErrorBox message="게시물은 브라우저에 임시로 저장됩니다. 로그인을 해주세요." />
      )}
      <h1>최근 폼</h1>

      {currentPosts.length > 0 && (
        <Filters
          dataList={filteredFormList}
          year={year}
          month={month}
          searchWord={searchWord}
          onFilterChange={changeFilter}
          onFilterReset={resetFilter}
          onPageChange={changePage}
        />
      )}

      <FormList
        allPosts={filteredFormList}
        currentPosts={currentPosts}
        onShow={showDetailHandler}
        onCopy={copyFormHandler}
      />

      {currentPosts.length > 0 && (
        <Pagination
          dataList={filteredFormList}
          currentPage={currentPage}
          onPageChange={changePage}
        />
      )}
    </Section>
  );
}

export default FormsPage;
