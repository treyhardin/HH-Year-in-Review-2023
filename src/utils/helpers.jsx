export const throttle = (func, delay) => {

  let timeout = null;

  return (...args) => {
    if (timeout === null) {
      func(...args);
      timeout = setTimeout(() => {
        timeout = null;
      }, delay);
    }
  };
}