const throttle = (func: any, ms: any) => {
  let throttled = false;
  return (...args: any) => {
    if (!throttled) {
      throttled = true;
      setTimeout(() => {
        func(...args);
        throttled = false;
      }, ms);
    }
  };
};

export default throttle;
