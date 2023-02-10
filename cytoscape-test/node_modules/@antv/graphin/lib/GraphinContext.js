"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* eslint-disable @typescript-eslint/no-explicit-any */
var defaultContext = {
  graph: {},
  apis: {},
  theme: {},
  layout: {}
};

var GraphinContext = /*#__PURE__*/_react.default.createContext(defaultContext);

var _default = GraphinContext;
exports.default = _default;