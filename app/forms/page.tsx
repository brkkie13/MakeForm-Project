'use client';
import React from 'react';
import { useCallback, useEffect } from 'react';
import { useRouter } from 'next/navigation';

import { Section, SectionCard } from '@components/ui/Section';
import ErrorBox from '@components/ui/ErrorBox';
import FormList from '@components/forms/FormList';
import Pagination from '@components/ui/Pagination';
import Filters from '@components/ui/Filters';
import useFilters from '@utils/useFilters';
import usePagination from '@utils/usePagination';
import useQueryString from '@utils/useQueryString';
import useFirebaseAuthState from '@utils/useFirebaseAuthState';
import { getDataFromLocalStorage, useLocalStorage } from '@utils/localStorage';

// redux
import { useDispatch, useSelector } from 'react-redux';
import { useAppDispatch } from '@/stores/store';
import {
  sendFormData,
  fetchFormData,
} from '@stores/actions/formActionCreators';
import { formActions } from '@stores/features/formSlice';
import { copyToClipboard } from '@stores/actions/utilsActionCreators';
import { CreatedData, FormState } from '@/types/types';

// code
function FormsPage() {
  const router = useRouter();
  // const dispatch = useDispatch();
  const dispatch = useAppDispatch();
  const user = useFirebaseAuthState();
  const formList = useSelector((state: FormState) => state.form.formList);
  const setQueryStringState = useQueryString();
  const { getItem } = useLocalStorage();

  const { year, month, searchWord, changeFilter, resetFilter, filterList } =
    useFilters(setQueryStringState);

  const { currentPage, indexOfFirstPost, indexOfLastPost, changePage } =
    usePagination(setQueryStringState);

  const filteredFormList = formList
    ? (filterList(formList) as CreatedData[])
    : [];

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
    (dataId: string) => {
      router.push('/forms/' + dataId);
    },
    [router]
  );

  const cloneFormHandler = useCallback(
    async (event: React.MouseEvent, formId: string) => {
      event.stopPropagation(); // 부모태그 클릭 막기

      if (user) {
        const targetedForm = formList.find(
          (form: CreatedData) => form.id === formId
        );

        if (targetedForm) {
          const data = {
            ...targetedForm,
            creationDate: new Date(),
            header: `${targetedForm.header} - 복사`,
          };
          dispatch(sendFormData(user, data));
        }

        // 복사된 데이터가 바로 화면에 업데이트 되도록 함
        dispatch(fetchFormData(user.uid));
      }

      // 로그인상태 아닐 때 데이터 복사해서 로컬스토리지에 저장
      if (!user) {
        let dataId = getItem('dataId');
        let storedForms = getDataFromLocalStorage();
        const targetedForm = storedForms.find(
          (form: CreatedData) => form.id === formId
        );

        const data = {
          ...targetedForm,
          id: dataId,
          creationDate: new Date(),
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

  const copyShareLinkHandler = (event: React.MouseEvent, formId: string) => {
    event.stopPropagation(); // 부모태그 클릭 막기
    dispatch(
      copyToClipboard(
        process.env.NEXT_PUBLIC_DOMAIN + formId,
        '폼 링크가 복사되었습니다.'
      )
    );
  };

  return (
    <Section>
      {!user && (
        <ErrorBox message="게시물은 브라우저에 임시로 저장됩니다. 로그인을 해주세요." />
      )}
      <h1>최근 폼</h1>

      {formList && formList.length > 0 && (
        <Filters
          allPosts={formList}
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
          onShowDetail={showDetailHandler}
          onCloneForm={cloneFormHandler}
          onCopyLink={copyShareLinkHandler}
        />
      </SectionCard>

      {currentPosts.length > 0 && (
        <Pagination
          dataListLength={filteredFormList.length}
          currentPage={currentPage}
          onPageChange={changePage}
        />
      )}
    </Section>
  );
}

export default FormsPage;
