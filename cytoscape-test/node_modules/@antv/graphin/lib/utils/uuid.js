"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var createUuid = function createUuid() {
  function S4() {
    // eslint-disable-next-line no-bitwise
    return ((1 + Math.random()) * 0x10000 | 0).toString(16).substring(1);
  }

  return "".concat(S4() + S4(), "-").concat(S4(), "-").concat(S4(), "-").concat(S4(), "-").concat(S4()).concat(S4()).concat(S4());
};

var _default = createUuid;
exports.default = _default;