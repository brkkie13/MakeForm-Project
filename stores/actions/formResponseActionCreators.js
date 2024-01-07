import { db } from '@/firebase.config';
import {
  collection,
  addDoc,
  getDocs,
  updateDoc,
  deleteDoc,
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
      const formattedData = data.docs.map(doc => ({
        ...doc.data(),
        docId: doc.id,
      }));

      const existingFormResponses = formattedData.find(
        item => item.formId === formId
      );

      // 유저가 제출한 폼id가 db에 존재하지 않으면 새 doc 추가.
      if (!existingFormResponses) {
        await addDoc(submittedResponsesCollectionRef, {
          formId,
          header,
          responsesList: [
            {
              id: String(new Date(submissionDate).getTime()),
              submissionDate,
              responses,
            },
          ],
          userId,
        });
      }

      // 유저가 제출한 폼id가 이미 db에 존재한다면, 해당 폼id의 doc만 업데이트.
      if (existingFormResponses) {
        existingFormResponses.responsesList.push({
          id: String(new Date(submissionDate).getTime()),
          submissionDate,
          responses,
        });
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

export const removeResponseData = (user, formId, responsesId) => {
  return async dispatch => {
    const submittedResponsesCollectionRef = collection(
      db,
      'submittedResponses'
    );

    // 유저가 제출한 답변에 관련된 정보.

    const deleteData = async () => {
      const data = await getDocs(submittedResponsesCollectionRef);
      const formattedData = data.docs.map(doc => ({ ...doc.data() }));

      const existingFormResponse = formattedData.find(
        item => item.formId === formId
      );

      console.log(existingFormResponse);

      // responsesList 배열의 요소가 2 이상이면, 특정 formId를 가진 doc의 responsesList필드만 교체.
      if (existingFormResponse.responsesList.length > 1) {
        console.log(formId, responsesId);
        const filteredList = existingFormResponse.responsesList.filter(
          data => data.id !== responsesId
        );
        console.log(filteredList);

        // responsesList필드만 filteredList(삭제가 눌려진 response를 제외한 배열)로 교체.
        const newFormResponse = {
          ...existingFormResponse,
          responsesList: filteredList,
        };

        // firebase의 submittedResponses에서 특정 docId를 가진 문서를 찾음.
        const responseDoc = doc(
          db,
          'submittedResponses',
          existingFormResponse.docId
        );

        // 그 문서를 newFormResponse로 교체.
        await updateDoc(responseDoc, newFormResponse);
      }

      // responsesList배열 요소가 1개뿐이라면 아예 해당 doc을 삭제.
      if (existingFormResponse.responsesList.length === 1) {
        const responseDoc = doc(
          db,
          'submittedResponses',
          existingFormResponse.docId
        );
        await deleteDoc(responseDoc);
      }
    };

    try {
      user && (await deleteData());

      dispatch(
        uiActions.showNotification({
          status: 'success',
          message: '삭제되었습니다.',
        })
      );
    } catch (error) {
      dispatch(
        uiActions.showNotification({
          status: 'error',
          message: error.message,
        })
      );
    }
  };
};
