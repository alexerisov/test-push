export const debounce = (callback, delay) => {
  let timeout;

  return (...args) => {
    if(timeout) {
      clearTimeout(timeout);
    }

    timeout = setTimeout(callback, delay, ...args);
  };
};
