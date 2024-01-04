'use client';
import { useEffect } from 'react';
import { Section, SectionCard } from '@components/ui/Section';
import ResponsesList from '@components/responses/ResponsesList';
import useFirebaseAuthState from '@utils/useFirebaseAuthState';

// redux
import { useDispatch, useSelector } from 'react-redux';
import { fetchFormResponses } from '@stores/actions/formResponseActionCreators';

// code
function AnalysisPage() {
  const user = useFirebaseAuthState();
  const dispatch = useDispatch();
  const responsesList = useSelector(state => state.responses.responsesList);

  useEffect(() => {
    user && dispatch(fetchFormResponses(user?.uid));
  }, [dispatch, user]);

  return (
    <Section>
      <SectionCard>
        <ResponsesList responsesList={responsesList} />
      </SectionCard>
    </Section>
  );
}

export default AnalysisPage;
