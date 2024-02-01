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
import { Dispatch } from 'redux';
import { uiActions } from '@stores/features/uiSlice';
import { responsesActions } from '../features/responsesSlice';
import { SavedResponse, SubmittedResponse } from '@/types/types';
import { User } from 'firebase/auth';

// code
// 사용되는 컴포넌트:
export const sendFormResponse = (submittedForm: SubmittedResponse) => {
  return async (dispatch: Dispatch) => {
    const submittedResponsesCollectionRef = collection(
      db,
      'submittedResponses'
    );

    // 유저가 제출한 답변에 관련된 정보.
    const { formId, header, submissionDate, responses, userId } = submittedForm;

    const postData = async () => {
      const data = await getDocs(submittedResponsesCollectionRef);
      const formattedData = data.docs.map(doc => ({
        ...(doc.data() as SavedResponse),
        docId: doc.id,
      }));

      const existingFormResponses = formattedData.find(
        item => item.formId === formId
      );

      // 유저가 제출한 폼id가 db에 존재하지 않으면 새 doc 추가.
      if (!existingFormResponses) {
        const docRef = await addDoc(submittedResponsesCollectionRef, {
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

        // docId 필드도 추가해줌.
        updateDoc(docRef, { docId: docRef.id });
      }

      // 유저가 제출한 폼id가 이미 db에 존재한다면, 해당 폼id의 doc만 업데이트.
      if (existingFormResponses) {
        // 기존의 header와 현재 제출된 폼의 header가 일치하지 않을 때(header가 변경되었을 때) 최신header로 변경.
        if (existingFormResponses.header !== header) {
          existingFormResponses.header = header;
        }

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

export const fetchFormResponses = (uid: string) => {
  return async (dispatch: Dispatch) => {
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

export const removeResponseData = (
  user: User | null,
  formId: string,
  responsesId: string
) => {
  return async (dispatch: Dispatch) => {
    const submittedResponsesCollectionRef = collection(
      db,
      'submittedResponses'
    );

    // 유저가 제출한 답변에 관련된 정보.

    const deleteData = async () => {
      const data = await getDocs(submittedResponsesCollectionRef);
      const formattedData = data.docs.map(doc => ({
        ...(doc.data() as SavedResponse),
      }));

      const existingFormResponse = formattedData.find(
        item => item.formId === formId
      );

      console.log(existingFormResponse);

      if (existingFormResponse) {
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
      if (error instanceof Error) {
        dispatch(
          uiActions.showNotification({
            status: 'error',
            message: error.message,
          })
        );
      }
    }
  };
};
