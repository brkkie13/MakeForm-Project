import { db } from '../../firebase.config';
import {
  collection,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  query,
  where,
} from 'firebase/firestore';
import { formActions } from '../features/formSlice';
import { uiActions } from '../features/uiSlice';

export const sendFormData = newForm => {
  return async dispatch => {
    const formsCollectionRef = collection(db, 'forms');

    const postData = async () => {
      await addDoc(formsCollectionRef, newForm);
    };

    // 가짜api연결(json-server)
    // const postData = async () => {
    //   await fetch('http://localhost:4000/forms', {
    //     method: 'POST',
    //     body: JSON.stringify(newForm),
    //     headers: {
    //       'Content-Type': 'application/json',
    //     },
    //   });
    // };

    try {
      // 조건 추가 (입력해야 할 값 중 비어있는 값이 있을 때)
      if (newForm.header === '') {
        console.log(newForm);
        throw new Error('빈칸을 모두 입력해주세요.');
      }

      if (newForm.items.length === 0) {
        throw new Error('최소 한 개 이상의 질문을 입력하세요.');
      }

      newForm.items.forEach(item => {
        // 'title'필드가 없고 'description'같이 질문이 아닌 필드만 있을 때
        if (!('title' in item)) {
          throw new Error('최소 한 개 이상의 질문을 입력하세요.');
        }

        if ('title' in item && item.title === '') {
          throw new Error('빈칸을 모두 입력하세요.');
        }

        if ('description' in item && item.description === '') {
          throw new Error('빈칸을 모두 입력하세요.');
        }

        if ('options' in item) {
          item.options.forEach(option => {
            if ('text' in option && option.text === '') {
              throw new Error('빈칸을 모두 입력하세요.');
            }
          });
        }
      });

      await postData();
      // post 성공했을 때만 create페이지 값 리셋
      dispatch(formActions.resetAllValue());

      dispatch(
        uiActions.showNotification({
          status: 'success',
          message: '생성되었습니다',
        })
      );
    } catch (error) {
      if (error.message) {
        dispatch(
          uiActions.showNotification({
            status: 'error',
            message: error.message,
          })
        );
        return;
      }

      dispatch(
        uiActions.showNotification({
          status: 'error',
          message: '저장 실패!',
        })
      );
    }
  };
};

export const fetchFormData = uid => {
  return async dispatch => {
    if (!uid) {
      return;
    }

    const formsCollectionRef = collection(db, 'forms');
    const q = query(formsCollectionRef, where('userId', '==', uid));

    const getData = async () => {
      const data = await getDocs(q);
      const formattedData = data.docs.map(doc => ({
        ...doc.data(),
        id: doc.id,
      }));
      return formattedData;
    };

    // 가짜api연결(json-server)
    // const getData = async () => {
    //   const response = await fetch('http://localhost:4000/forms');
    //   const data = await response.json();
    //   return data;
    // };

    try {
      const formData = await getData();
      dispatch(formActions.replaceFormList(formData)); // formList변수에 데이터 저장.
    } catch (error) {
      console.error(error);
    }
  };
};

export const updateFormData = (formId, editedData) => {
  return async dispatch => {
    const patchData = async () => {
      const formDoc = doc(db, 'forms', formId);
      await updateDoc(formDoc, editedData);
    };

    // 가짜api연결(json-server)
    // const patchData = async () => {
    //   await fetch(`http://localhost:4000/forms/${formId}`, {
    //     method: 'PATCH',
    //     body: JSON.stringify(editedData),
    //     headers: {
    //       'Content-Type': 'application/json',
    //     },
    //   });
    // };

    try {
      await patchData();
      dispatch(
        uiActions.showNotification({
          status: 'success',
          message: '수정되었습니다',
        })
      );
    } catch (error) {
      console.error(error);
    }
  };
};

export const removeFormData = formId => {
  return async dispatch => {
    const deleteData = async () => {
      const formDoc = doc(db, 'forms', formId);
      await deleteDoc(formDoc);
    };

    // 가짜api연결(json-server)
    // const deleteData = async () => {
    //   await fetch(`http://localhost:4000/forms/${formId}`, {
    //     method: 'DELETE',
    //     headers: {
    //       'Content-Type': 'application/json',
    //     },
    //   });
    // };

    try {
      await deleteData();
      dispatch(
        uiActions.showNotification({
          status: 'success',
          message: '삭제되었습니다',
        })
      );
    } catch (error) {
      console.error(error);
    }
  };
};
