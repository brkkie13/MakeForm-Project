function useLocalStorage() {
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
}

export default useLocalStorage;
