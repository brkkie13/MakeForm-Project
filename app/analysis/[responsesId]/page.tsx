'use client';
import { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';

import Detail from '@components/ui/Detail';
import Confirm from '@components/ui/Confirm';
import { Section, SectionCard } from '@components/ui/Section';
import { InvalidUrlBanner } from '@components/ui/NotificationBanner';
import useFirebaseAuthState from '@utils/useFirebaseAuthState';

// redux
import { useSelector } from 'react-redux';
import { useAppDispatch } from '@/stores/store';
import { uiActions } from '@stores/features/uiSlice';
import {
  fetchFormResponses,
  removeResponseData,
} from '@stores/actions/formResponseActionCreators';
import { Response, ResponsesState } from '@/types/types';

// code
function ResponseDetail() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const params = useParams();
  const responsesId = params.responsesId as string;
  const user = useFirebaseAuthState();

  const responsesList = useSelector(
    (state: ResponsesState) => state.responses.responsesList
  );
  const [response, setResponse] = useState<Response>();

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
    if (response) {
      const clickConfirmHandler = async () => {
        dispatch(uiActions.closeModal());
        dispatch(await removeResponseData(user, response.formId, responsesId));
        router.replace('/analysis');
      };
      dispatch(
        uiActions.openModal(
          <Confirm
            text="삭제하시겠습니까? 삭제하면 복구할 수 없습니다."
            onClickConfirm={clickConfirmHandler}
          />
        )
      );
    }
  };

  return (
    <Section>
      <SectionCard>
        {!response ? (
          <InvalidUrlBanner />
        ) : (
          <Detail responseDetail={response} onRemove={removeFormHandler} />
        )}
      </SectionCard>
    </Section>
  );
}

export default ResponseDetail;
