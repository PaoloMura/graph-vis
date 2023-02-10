"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var shallowEqual = function shallowEqual(prev, current) {
  var isEqual = true;
  var prevKeys = Object.keys(prev);
  var currentKeys = Object.keys(current);
  if (prevKeys.length !== currentKeys.length) return false;

  for (var i = 0; i < prevKeys.length; i++) {
    var key = prevKeys[i];

    if (prev[key] !== current[key]) {
      isEqual = false;
      break;
    }
  }

  return isEqual;
};

var _default = shallowEqual;
exports.default = _default;