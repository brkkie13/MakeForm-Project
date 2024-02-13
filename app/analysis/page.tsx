'use client';
import { useEffect } from 'react';
import { Section, SectionCard } from '@components/ui/Section';
import ResponsesList from '@components/responses/ResponsesList';
import Filters from '@components/ui/Filters';
import Pagination from '@components/ui/Pagination';
import ErrorBox from '@components/ui/ErrorBox';
import useFirebaseAuthState from '@utils/useFirebaseAuthState';
import useFilters from '@utils/useFilters';
import usePagination from '@utils/usePagination';
import useQueryString from '@utils/useQueryString';

// redux
import { useSelector } from 'react-redux';
import { useAppDispatch } from '@/stores/store';
import { fetchFormResponses } from '@stores/actions/formResponseActionCreators';

// types
import { ResponsesState, Response } from '@/types/types';

// code
function AnalysisPage() {
  const user = useFirebaseAuthState();
  const dispatch = useAppDispatch();
  const setQueryStringState = useQueryString();
  const responsesList = useSelector(
    (state: ResponsesState) => state.responses.responsesList
  );

  const {
    year,
    month,
    searchWord,
    formId,
    changeFilter,
    resetFilter,
    filterList,
  } = useFilters(setQueryStringState);

  const { currentPage, indexOfFirstPost, indexOfLastPost, changePage } =
    usePagination(setQueryStringState);

  const filteredResponsesList = responsesList
    ? (filterList(responsesList) as Response[])
    : [];

  const currentPosts =
    filteredResponsesList.length > 0
      ? filteredResponsesList.slice(indexOfFirstPost, indexOfLastPost)
      : [];

  const resetFilterHandler = () => {
    resetFilter();
    changePage(1);
  };

  useEffect(() => {
    user && dispatch(fetchFormResponses(user?.uid));
  }, [dispatch, user]);

  useEffect(() => {
    resetFilterHandler();
  }, [user]);

  return (
    <Section>
      {!user && <ErrorBox message="로그인을 해주세요." />}
      <h1>통계</h1>

      {responsesList && responsesList.length > 0 && user && (
        <Filters
          allPosts={responsesList}
          year={year}
          month={month}
          searchWord={searchWord}
          formId={formId}
          onFilterChange={changeFilter}
          onFilterReset={resetFilterHandler}
          onPageChange={changePage}
          isAnalysisPage={true}
        />
      )}

      <SectionCard>
        <ResponsesList
          allPosts={responsesList}
          filteredPosts={filteredResponsesList}
          currentPosts={currentPosts}
          user={user}
        />
      </SectionCard>

      {currentPosts.length > 0 && user && (
        <Pagination
          dataListLength={filteredResponsesList.length}
          currentPage={currentPage}
          onPageChange={changePage}
        />
      )}
    </Section>
  );
}

export default AnalysisPage;
