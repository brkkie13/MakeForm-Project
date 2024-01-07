'use client';
import { useEffect, useState, useCallback } from 'react';
import { useRouter, useParams } from 'next/navigation';

import FormDetail from '@components/forms/FormDetail';
import Confirm from '@components/ui/Confirm';
import { Section, SectionCard } from '@components/ui/Section';
import useFirebaseAuthState from '@/utils/useFirebaseAuthState';

// redux
import { useDispatch, useSelector } from 'react-redux';
import { uiActions } from '@stores/features/uiSlice';
import { fetchFormResponses } from '@stores/actions/formResponseActionCreators';
import { removeResponseData } from '@stores/actions/formResponseActionCreators';

function ResponseDetail() {
  const router = useRouter();
  const dispatch = useDispatch();
  const params = useParams();
  const responsesId = params.responsesId;
  const user = useFirebaseAuthState();

  const responsesList = useSelector(state => state.responses.responsesList);
  const [response, setResponse] = useState({});

  useEffect(() => {
    // 로그인 되어있을 때, db에서 데이터 가져옴(responsesList에 값이 생김)
    if (user) {
      dispatch(fetchFormResponses(user.uid));
    }
  }, [user, dispatch]);

  useEffect(() => {
    // responsesList의 길이가 0보다 클 때, targetedResponse를 찾음
    if (responsesList.length > 0) {
      const targetedResponse = responsesList.find(
        data => data.id === responsesId
      );
      targetedResponse && setResponse(targetedResponse);
    }
  }, [responsesList]);

  const removeFormHandler = () => {
    const clickConfirmHandler = async () => {
      dispatch(uiActions.closeModal());
      dispatch(await removeResponseData(user, response.formId, responsesId));
      router.replace('/analysis');
    };
    dispatch(
      uiActions.openModal(
        <Confirm
          text="삭제하시겠습니까? 삭제하면 복구할 수 없습니다."
          onclickConfirm={clickConfirmHandler}
        />
      )
    );
  };

  return (
    <Section>
      <SectionCard>
        <FormDetail responseDetail={response} onRemove={removeFormHandler} />
      </SectionCard>
    </Section>
  );
}

export default ResponseDetail;
