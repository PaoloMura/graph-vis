export var uniqBy = function uniqBy(arr, // eslint-disable-line
fn) {
  return arr.reduce(function (acc, v) {
    // @ts-ignore
    if (!acc.some(function (x) {
      return fn(v, x);
    })) acc.push(v);
    return acc;
  }, []);
};