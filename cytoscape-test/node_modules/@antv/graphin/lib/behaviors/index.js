"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _ActivateRelations = _interopRequireDefault(require("./ActivateRelations"));

var _BrushSelect = _interopRequireDefault(require("./BrushSelect"));

var _ClickSelect = _interopRequireDefault(require("./ClickSelect"));

var _DragCanvas = _interopRequireDefault(require("./DragCanvas"));

var _DragCombo = _interopRequireDefault(require("./DragCombo"));

var _DragNode = _interopRequireDefault(require("./DragNode"));

var _DragNodeWithForce = _interopRequireDefault(require("./DragNodeWithForce"));

var _FitView = _interopRequireDefault(require("./FitView"));

var _FontPaint = _interopRequireDefault(require("./FontPaint"));

var _Hoverable = _interopRequireDefault(require("./Hoverable"));

var _LassoSelect = _interopRequireDefault(require("./LassoSelect"));

var _ResizeCanvas = _interopRequireDefault(require("./ResizeCanvas"));

var _TreeCollapse = _interopRequireDefault(require("./TreeCollapse"));

var _ZoomCanvas = _interopRequireDefault(require("./ZoomCanvas"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _default = {
  /** 内置 */
  DragCanvas: _DragCanvas.default,
  ZoomCanvas: _ZoomCanvas.default,
  ClickSelect: _ClickSelect.default,
  BrushSelect: _BrushSelect.default,
  DragNode: _DragNode.default,
  ResizeCanvas: _ResizeCanvas.default,
  LassoSelect: _LassoSelect.default,
  DragCombo: _DragCombo.default,

  /** 可选 */
  ActivateRelations: _ActivateRelations.default,
  TreeCollapse: _TreeCollapse.default,
  FitView: _FitView.default,
  FontPaint: _FontPaint.default,
  DragNodeWithForce: _DragNodeWithForce.default,
  Hoverable: _Hoverable.default
};
exports.default = _default;