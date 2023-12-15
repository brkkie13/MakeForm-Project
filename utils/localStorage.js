export const useLocalStorage = () => {
  const setItem = (key, value) => {
    if (typeof window !== 'undefined') {
      localStorage.setItem(key, value);
    }
  };

  const getItem = key => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem(key);
    }
    return null;
  };

  const removeItem = key => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem(key);
    }
  };

  return { setItem, getItem, removeItem };
};

export const storeDataToLocalStorage = data => {
  const { setItem, getItem } = useLocalStorage();

  let storedForms = getItem('forms');

  if (!storedForms) {
    storedForms = [];
  } else {
    storedForms = JSON.parse(storedForms);
  }

  storedForms.push(data);
  setItem('forms', JSON.stringify(storedForms));
};

export const getDataFromLocalStorage = () => {
  const { getItem } = useLocalStorage();
  let storedForms = getItem('forms');

  if (!storedForms) {
    return;
  }

  return JSON.parse(storedForms);
};
