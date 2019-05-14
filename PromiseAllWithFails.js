export const PromiseAllWithFails = (promises, isRawResult = false) => {
  if (!Array.isArray(promises)) {
    return Promise.reject(new Error('The parameter should be an array of promises'));
  }
  const newPromises = promises.map((promise, i) => {
    if (typeof promise.then !== 'function') {
      return Promise.reject(new Error(`The parameter ${i} should be a promise`));
    }
    return promise.then(result => (isRawResult ? result : {
      result,
      isResolved: true,
    })).catch(err => (isRawResult ? err : {
      result: err,
      isResolved: false,
    }));
  });
  return Promise.all(newPromises);
};
