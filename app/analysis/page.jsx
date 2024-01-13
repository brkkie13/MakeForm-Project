'use client';
import { useEffect } from 'react';
import { Section, SectionCard } from '@components/ui/Section';
import ResponsesList from '@components/responses/ResponsesList';
import useFirebaseAuthState from '@utils/useFirebaseAuthState';
import Filters from '@components/ui/Filters';
import Pagination from '@components/ui/Pagination';
import useFilters from '@utils/useFilters';
import usePagination from '@utils/usePagination';
import useQueryString from '@utils/useQueryString';
import ErrorBox from '@components/ui/ErrorBox';

// redux
import { useDispatch, useSelector } from 'react-redux';
import { fetchFormResponses } from '@stores/actions/formResponseActionCreators';
import NotificationBanner from '@/components/ui/NotificationBanner';

// code
function AnalysisPage() {
  const user = useFirebaseAuthState();
  const dispatch = useDispatch();
  const setQueryStringState = useQueryString();
  const responsesList = useSelector(state => state.responses.responsesList);

  const { year, month, formTitle, changeFilter, resetFilter, filterList } =
    useFilters(setQueryStringState);

  const { currentPage, indexOfFirstPost, indexOfLastPost, changePage } =
    usePagination(setQueryStringState);

  const filteredResponsesList = responsesList ? filterList(responsesList) : [];

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
          formTitle={formTitle}
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
          dataList={filteredResponsesList}
          currentPage={currentPage}
          onPageChange={changePage}
        />
      )}
    </Section>
  );
}

export default AnalysisPage;
