import { db } from '@/firebase.config';
import {
  collection,
  getDocs,
  getDoc,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  query,
  where,
  DocumentData,
} from 'firebase/firestore';
import {
  getDataFromLocalStorage,
  removeDataFromLocalStorage,
  storeDataIdToLocalStorage,
  storeDataToLocalStorage,
  updateDataToLocalStorage,
} from '@utils/localStorage';
import { Dispatch } from 'redux';
import { formActions } from '@stores/features/formSlice';
import { uiActions } from '@stores/features/uiSlice';
import { CreatedData, EditedData, Item, Option } from '@/types/types';
import { User } from 'firebase/auth';

// code
const validateForm = (form: CreatedData | EditedData) => {
  if (form.header === '') {
    throw new Error('빈칸을 모두 입력하세요.');
  }

  if (form.items.length === 0) {
    throw new Error('최소 한 개 이상의 질문을 입력하세요.');
  }

  let hasTitle = false;

  form.items.forEach((item: Item) => {
    // 모든 item객체에 'title'필드가 없고 'description'같이 질문이 아닌 필드만 있을 때
    if ('title' in item) {
      hasTitle = true;
    }

    if ('title' in item && item.title === '') {
      throw new Error('빈칸을 모두 입력하세요.');
    }

    if ('description' in item && item.description === '') {
      throw new Error('빈칸을 모두 입력하세요.');
    }

    if ('options' in item && item.options) {
      item.options.forEach((option: Option) => {
        if ('text' in option && option.text === '') {
          throw new Error('빈칸을 모두 입력하세요.');
        }
      });
    }
  });

  if (!hasTitle) {
    throw new Error('최소 한 개 이상의 질문을 입력하세요.');
  }
};

export const sendFormData = (user: User | null, newForm: CreatedData) => {
  return async (dispatch: Dispatch) => {
    const formsCollectionRef = collection(db, 'forms');

    const postData = async () => {
      await addDoc(formsCollectionRef, newForm);
    };

    try {
      // '/create'페이지에서 새로 생성할 때만 검증. copyFormHandler에서는 검증할 필요 없음.
      validateForm(newForm);

      // 로그인을 하지 않았을 때 생성할 수 있는 게시물은 총 30개까지로 제한
      if (!user) {
        const storedForms = getDataFromLocalStorage();

        if (storedForms && storedForms.length >= 30) {
          throw new Error(
            '로그인을 하지 않으면 임시 폼을 30개까지만 생성할 수 있습니다.'
          );
        }
      }

      // 로그인 상태에서는 db에 저장, 로그아웃 상태에서는 로컬스토리지에 저장
      user && (await postData());
      !user && storeDataToLocalStorage(newForm);

      // 저장 성공했을 때 create페이지의 모든 값 리셋
      dispatch(formActions.resetAllValue());

      // 로그아웃 상태일 땐 dataId 뒤의 숫자를 1만큼 올려서 로컬스토리지에 저장
      !user && storeDataIdToLocalStorage();

      dispatch(
        uiActions.showNotification({
          status: 'success',
          message: '생성되었습니다.',
        })
      );

      return true; // Promise가 성공적으로 완료
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

export const fetchFormData = (uid: string) => {
  return async (dispatch: Dispatch) => {
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

    try {
      const formData = await getData();
      dispatch(formActions.replaceFormList(formData)); // formList변수에 데이터 저장.
    } catch (error) {
      dispatch(
        uiActions.showNotification({
          status: 'error',
          message: '데이터를 불러올 수 없습니다.',
        })
      );
    }
  };
};

export const fetchFormDataWithFormId = (formId: string) => {
  return async (dispatch: Dispatch) => {
    const formDocRef = doc(db, 'forms', formId);

    const getData = async () => {
      const formDoc = await getDoc(formDocRef);

      if (!formDoc.exists()) {
        throw new Error('문서가 존재하지 않습니다.');
      }

      const data: DocumentData = formDoc.data();
      const formattedData = {
        id: formId,
        header: data.header,
        items: data.items,
        userId: data.userId,
      };
      return formattedData;
    };

    try {
      const formData = await getData();
      return formData;
    } catch (error) {
      dispatch(
        uiActions.showNotification({
          status: 'error',
          message: '데이터를 불러올 수 없습니다.',
        })
      );
    }
  };
};

// 함수가 사용된 컴포넌트: edit/page.tsx
export const updateFormData = (
  user: User | null,
  formId: string,
  editedForm: EditedData
) => {
  return async (dispatch: Dispatch) => {
    const patchData = async () => {
      const formDoc = doc(db, 'forms', formId);
      await updateDoc(formDoc, editedForm);
    };

    try {
      validateForm(editedForm);

      user && (await patchData());
      !user && updateDataToLocalStorage(formId, editedForm);

      dispatch(
        uiActions.showNotification({
          status: 'success',
          message: '수정되었습니다.',
        })
      );

      return true; // Promise가 성공적으로 완료
    } catch (error) {
      if (error instanceof Error) {
        dispatch(
          uiActions.showNotification({
            status: 'error',
            message: error.message,
          })
        );
      }

      throw error; // 에러를 던져 호출하는 곳에서 에러를 잡아낼 수 있게 함.
    }
  };
};

export const removeFormData = (user: User, formId: string) => {
  return async (dispatch: Dispatch) => {
    const deleteData = async () => {
      const formDoc = doc(db, 'forms', formId);
      await deleteDoc(formDoc);
    };

    try {
      user && (await deleteData());
      !user && removeDataFromLocalStorage(formId);

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
          message: '삭제에 실패했습니다.',
        })
      );
    }
  };
};
