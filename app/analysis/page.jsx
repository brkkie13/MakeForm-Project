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

// redux
import { useDispatch, useSelector } from 'react-redux';
import { fetchFormResponses } from '@stores/actions/formResponseActionCreators';

// code
function AnalysisPage() {
  const user = useFirebaseAuthState();
  const dispatch = useDispatch();
  const setQueryStringState = useQueryString();
  const responsesList = useSelector(state => state.responses.responsesList);

  // new
  const { year, month, formTitle, changeFilter, resetFilter, filterList } =
    useFilters(setQueryStringState);

  // new
  const { currentPage, indexOfFirstPost, indexOfLastPost, changePage } =
    usePagination(setQueryStringState);

  // new
  const filteredResponsesList = responsesList ? filterList(responsesList) : [];

  // new
  const currentPosts =
    filteredResponsesList.length > 0
      ? filteredResponsesList.slice(indexOfFirstPost, indexOfLastPost)
      : [];

  // new
  const resetFilterHandler = () => {
    resetFilter();
    changePage(1);
  };

  useEffect(() => {
    user && dispatch(fetchFormResponses(user?.uid));
  }, [dispatch, user]);

  // new
  useEffect(() => {
    resetFilterHandler();
  }, [user]);

  return (
    <Section>
      <h1>통계</h1>

      {responsesList && responsesList.length > 0 && (
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
        />
      </SectionCard>

      {currentPosts.length > 0 && (
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
