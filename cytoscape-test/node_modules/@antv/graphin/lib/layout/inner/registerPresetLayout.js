"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _g = _interopRequireDefault(require("@antv/g6"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _default = function _default() {
  _g.default.registerLayout('preset', {
    init: function init() {},
    execute: function execute() {},
    destroy: function destroy() {
      this.destroyed = true;
    }
  });
};

exports.default = _default;