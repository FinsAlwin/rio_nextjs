const setLocalStorage = (key, value) => {
  try {
    let response = localStorage.setItem(key, value);
    return response;
  } catch (e) {
    console.log(e);
  }
};

const getLocalStorage = (key) => {
  try {
    let response = localStorage.getItem(key);
    return response;
  } catch (e) {
    console.log(e);
  }
};

const removeLocalStorage = (key) => {
  try {
    let response = localStorage.removeItem(key);
    return response;
  } catch (e) {
    console.log(e);
  }
};

export { setLocalStorage, getLocalStorage, removeLocalStorage };
