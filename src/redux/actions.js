import { myFormActions } from './features/my-form-slice';

// actions creator (비동기 함수 로직)
export const sendFormData = newForm => {
  return async dispatch => {
    const sendRequest = async () => {
      const response = await fetch(
        'https://make-form-8c00e-default-rtdb.firebaseio.com/new-form.json',
        {
          method: 'POST',
          body: JSON.stringify(newForm),
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      if (!response.ok) {
        throw new Error('새로운 폼 저장 실패');
      }
    };

    try {
      await sendRequest();
    } catch (error) {
      console.log(error);
    }
  };
};

export const fetchFormData = () => {
  return async dispatch => {
    const fetchData = async () => {
      const response = await fetch(
        'https://make-form-8c00e-default-rtdb.firebaseio.com/new-form.json'
      );
      if (!response.ok) {
        throw new Error('데이터를 불러올 수 없음');
      }
      const data = await response.json();
      return data;
    };

    try {
      const formData = await fetchData();
      dispatch(myFormActions.replaceFormList(formData));
    } catch (error) {
      console.log(error);
    }
  };
};
