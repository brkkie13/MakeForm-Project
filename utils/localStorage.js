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

  // removeItem은 한번에 여러 개의 key 인자를 받을 수 있음.
  const removeItem = (...keys) => {
    if (typeof window !== 'undefined') {
      keys.forEach(key => localStorage.removeItem(key));
    }
  };

  return { setItem, getItem, removeItem };
};

const { setItem, getItem } = useLocalStorage();

export const getDataFromLocalStorage = () => {
  let storedForms = getItem('forms');
  if (!storedForms) {
    return;
  }

  return JSON.parse(storedForms);
};

export const storeDataToLocalStorage = data => {
  const storedForms = getDataFromLocalStorage() || [];
  storedForms.push(data);
  setItem('forms', JSON.stringify(storedForms));
};

export const storeDataIdToLocalStorage = () => {
  let dataId = getItem('dataId') || 'localData0';
  let numOfDataId = Number(dataId.replace('localData', '')); // 숫자만 추출
  numOfDataId++;
  dataId = `localData${numOfDataId}`;
  setItem('dataId', dataId);
};

export const removeDataFromLocalStorage = id => {
  const storedForms = getDataFromLocalStorage();
  const filteredForms = storedForms.filter(form => form.id !== id);
  setItem('forms', JSON.stringify(filteredForms));
};

export const updateDataToLocalStorage = (id, editedData) => {
  const storedForms = getDataFromLocalStorage();
  const editedForms = storedForms.map(form =>
    form.id === id ? { ...form, ...editedData } : form
  );
  setItem('forms', JSON.stringify(editedForms));
};
