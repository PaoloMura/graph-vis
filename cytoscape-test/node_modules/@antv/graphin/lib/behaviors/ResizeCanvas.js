"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var React = _interopRequireWildcard(require("react"));

var _GraphinContext = _interopRequireDefault(require("../GraphinContext"));

var _util = require("@antv/util");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

var ResizeCanvas = function ResizeCanvas(props) {
  var graphDOM = props.graphDOM;
  var graphin = React.useContext(_GraphinContext.default);
  React.useEffect(function () {
    var graph = graphin.graph;
    /** 内置 resize */

    var handleResizeEvent = (0, _util.debounce)(function () {
      var clientWidth = graphDOM.clientWidth,
          clientHeight = graphDOM.clientHeight;
      graph.set('width', clientWidth);
      graph.set('height', clientHeight);
      var canvas = graph.get('canvas');

      if (canvas) {
        canvas.changeSize(clientWidth, clientHeight);
        graph.autoPaint();
      }
    }, 200);
    /** 内置 drag force node */

    window.addEventListener('resize', handleResizeEvent, false);
    return function () {
      window.removeEventListener('resize', handleResizeEvent, false);
    };
  }, []);
  return null;
};

var _default = ResizeCanvas;
exports.default = _default;