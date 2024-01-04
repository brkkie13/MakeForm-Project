import { db } from '@/firebase.config';
import {
  collection,
  addDoc,
  getDocs,
  updateDoc,
  doc,
  query,
  where,
} from 'firebase/firestore';
import { uiActions } from '@stores/features/uiSlice';
import { responsesActions } from '../features/responsesSlice';

// code
export const sendFormResponse = submittedForm => {
  return async dispatch => {
    const submittedResponsesCollectionRef = collection(
      db,
      'submittedResponses'
    );

    // 유저가 제출한 답변에 관련된 정보.
    const { formId, header, submissionDate, responses, userId } = submittedForm;

    const postData = async () => {
      const data = await getDocs(submittedResponsesCollectionRef);
      const formattedData = data.docs.map(doc => ({ ...doc.data() }));

      const existingFormResponses = formattedData.find(
        item => item.formId === formId
      );

      // 유저가 제출한 폼id가 db에 존재하지 않으면 새 doc 추가.
      if (!existingFormResponses) {
        await addDoc(submittedResponsesCollectionRef, {
          formId,
          header,
          responsesList: [{ submissionDate, responses }],
          userId,
        });
      }

      // 유저가 제출한 폼id가 이미 db에 존재한다면, 해당 폼id의 doc만 업데이트.
      if (existingFormResponses) {
        existingFormResponses.responsesList.push({ submissionDate, responses });
        const responsesDoc = doc(
          db,
          'submittedResponses',
          existingFormResponses.docId
        );
        await updateDoc(responsesDoc, existingFormResponses);
      }
    };

    try {
      await postData();
      return true; // Promise가 성공적으로 완료
    } catch (error) {
      dispatch(
        uiActions.showNotification({
          status: 'error',
          message: '제출에 실패했습니다.',
        })
      );

      throw error; // 에러를 던져 호출하는 곳에서 에러를 잡아낼 수 있게 함.
    }
  };
};

export const fetchFormResponses = uid => {
  return async dispatch => {
    if (!uid) {
      return;
    }

    const formsCollectionRef = collection(db, 'submittedResponses');
    const q = query(formsCollectionRef, where('userId', '==', uid));

    const getData = async () => {
      const data = await getDocs(q);
      const formattedData = data.docs.map(doc => ({ ...doc.data() }));
      return formattedData;
    };

    try {
      const formResponsesData = await getData();
      dispatch(responsesActions.replaceResponsesList(formResponsesData));
    } catch (error) {
      dispatch(
        uiActions.showNotification({
          status: 'error',
          message: '데이터를 불러올 수 없습니다.',
        })
      );

      throw error; // 에러를 던져 호출하는 곳에서 에러를 잡아낼 수 있게 함.
    }
  };
};
