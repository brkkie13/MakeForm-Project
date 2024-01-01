'use client';
import { useCallback, useEffect } from 'react';
import { useRouter } from 'next/navigation';

import FormList from '@components/forms/FormList';
import Pagination from '@components/forms/Pagination';
import useFirebaseAuthState from '@utils/useFirebaseAuthState';
import Filters from '@components/forms/Filters';
import { Section, SectionCard } from '@components/ui/Section';
import useFilters from '@components/forms/hooks/useFilters';
import usePagination from '@components/forms/hooks/usePagination';
import useQueryString from '@components/forms/hooks/useQueryString';
import { getDataFromLocalStorage, useLocalStorage } from '@utils/localStorage';
import ErrorBox from '@components/ui/ErrorBox';

// redux
import { useDispatch, useSelector } from 'react-redux';
import {
  sendFormData,
  fetchFormData,
} from '@stores/actions/formActionCreators';
import { formActions } from '@stores/features/formSlice';

// code
function FormsPage() {
  const router = useRouter();
  const dispatch = useDispatch();
  const user = useFirebaseAuthState();
  const formList = useSelector(state => state.form.formList);
  const setQueryStringState = useQueryString();
  const { getItem } = useLocalStorage();

  const { year, month, searchWord, changeFilter, resetFilter, filterList } =
    useFilters(setQueryStringState);

  const { currentPage, indexOfFirstPost, indexOfLastPost, changePage } =
    usePagination(setQueryStringState);

  const filteredFormList = formList ? filterList(formList) : [];

  const currentPosts =
    filteredFormList.length > 0
      ? filteredFormList.slice(indexOfFirstPost, indexOfLastPost)
      : [];

  useEffect(() => {
    // 로그인 되었을 때 데이터를 불러옴
    if (user) {
      dispatch(fetchFormData(user?.uid));
    }

    // 로그아웃일 때 로컬스토리지에 저장된 데이터를 불러옴
    if (!user) {
      const storedForms = getDataFromLocalStorage();
      dispatch(formActions.replaceFormList(storedForms));
    }
  }, [dispatch, user]);

  const resetFilterHandler = () => {
    resetFilter();
    changePage(1);
  };

  useEffect(() => {
    resetFilterHandler();
  }, [user]);

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

      {formList && formList.length > 0 && (
        <Filters
          dataList={filteredFormList}
          year={year}
          month={month}
          searchWord={searchWord}
          onFilterChange={changeFilter}
          onFilterReset={resetFilterHandler}
          onPageChange={changePage}
        />
      )}

      <SectionCard>
        <FormList
          allPosts={formList}
          filteredPosts={filteredFormList}
          currentPosts={currentPosts}
          onShow={showDetailHandler}
          onCopy={copyFormHandler}
        />
      </SectionCard>

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
