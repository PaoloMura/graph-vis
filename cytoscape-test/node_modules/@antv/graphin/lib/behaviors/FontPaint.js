"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _GraphinContext = _interopRequireDefault(require("../GraphinContext"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var FontPaint = function FontPaint() {
  var _React$useContext = _react.default.useContext(_GraphinContext.default),
      graph = _React$useContext.graph;

  _react.default.useEffect(function () {
    // Hack 写法，解决第一次加载不绘制 ICON FONT 的 BUG
    var timer = setTimeout(function () {
      graph.getNodes().forEach(function (node) {
        graph.setItemState(node, 'normal', true);
      });
      graph.paint();
    }, 1600);
    return function () {
      clearTimeout(timer);
    };
  }, []);

  return null;
};

var _default = FontPaint;
exports.default = _default;