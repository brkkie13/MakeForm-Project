import { db } from '../../firebase.config';
import {
  collection,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
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
      await postData();
      dispatch(formActions.resetAllValue()); // post 성공했을 때만 create페이지 값 리셋
      dispatch(
        uiActions.showNotification({
          status: 'success',
          message: '생성되었습니다',
        })
      );
    } catch (error) {
      dispatch(
        uiActions.showNotification({
          status: 'error',
          message: '저장 실패!',
        })
      );
    }
    // 3초 뒤에 notification을 null로 변경
    setTimeout(() => {
      dispatch(uiActions.clearNotification());
    }, 3000);
  };
};

export const fetchFormData = () => {
  return async dispatch => {
    const formsCollectionRef = collection(db, 'forms');

    const getData = async () => {
      const data = await getDocs(formsCollectionRef);
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
    // 3초 뒤에 notification을 null로 변경
    setTimeout(() => {
      dispatch(uiActions.clearNotification());
    }, 3000);
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

    // 3초 뒤에 notification을 null로 변경
    setTimeout(() => {
      dispatch(uiActions.clearNotification());
    }, 3000);
  };
};
