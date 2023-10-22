import { myFormActions } from './features/myFormSlice';
import { db } from '../firebase.config';
import {
  collection,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
} from 'firebase/firestore';

export const sendFormData = newForm => {
  return async () => {
    const formsCollectionRef = collection(db, 'forms');

    const postData = async () => {
      await addDoc(formsCollectionRef, newForm);
    };

    try {
      await postData();
    } catch (error) {
      console.error(error);
    }
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

    try {
      const formData = await getData();
      dispatch(myFormActions.replaceFormList(formData));
    } catch (error) {
      console.error(error);
    }
  };
};

export const updateFormData = (formId, editedData) => {
  return async () => {
    const patchData = async () => {
      const formDoc = doc(db, 'forms', formId);
      await updateDoc(formDoc, editedData);
    };

    try {
      await patchData();
    } catch (error) {
      console.error(error);
    }
  };
};

export const removeFormData = formId => {
  return async () => {
    const deleteData = async () => {
      const formDoc = doc(db, 'forms', formId);
      await deleteDoc(formDoc);
    };

    try {
      await deleteData();
    } catch (error) {
      console.error(error);
    }
  };
};
