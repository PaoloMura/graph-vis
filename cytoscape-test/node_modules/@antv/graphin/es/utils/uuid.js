var createUuid = function createUuid() {
  function S4() {
    // eslint-disable-next-line no-bitwise
    return ((1 + Math.random()) * 0x10000 | 0).toString(16).substring(1);
  }

  return "".concat(S4() + S4(), "-").concat(S4(), "-").concat(S4(), "-").concat(S4(), "-").concat(S4()).concat(S4()).concat(S4());
};

export default createUuid;