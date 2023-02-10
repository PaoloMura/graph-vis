"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.uniqBy = void 0;

var uniqBy = function uniqBy(arr, // eslint-disable-line
fn) {
  return arr.reduce(function (acc, v) {
    // @ts-ignore
    if (!acc.some(function (x) {
      return fn(v, x);
    })) acc.push(v);
    return acc;
  }, []);
};

exports.uniqBy = uniqBy;