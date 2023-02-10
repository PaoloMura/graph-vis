"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var React = _interopRequireWildcard(require("react"));

var _GraphinContext = _interopRequireDefault(require("../GraphinContext"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

var Hoverable = function Hoverable(props) {
  var graphin = React.useContext(_GraphinContext.default);
  var _props$bindType = props.bindType,
      bindType = _props$bindType === void 0 ? 'node' : _props$bindType,
      disabled = props.disabled;
  var graph = graphin.graph;
  React.useEffect(function () {
    if (disabled) {
      return;
    } // eslint-disable-next-line @typescript-eslint/no-explicit-any


    var handleNodeMouseEnter = function handleNodeMouseEnter(evt) {
      graph.setItemState(evt.item, 'hover', true);
    }; // eslint-disable-next-line @typescript-eslint/no-explicit-any


    var handleNodeMouseLeave = function handleNodeMouseLeave(evt) {
      graph.setItemState(evt.item, 'hover', false);
    }; // eslint-disable-next-line @typescript-eslint/no-explicit-any


    var handleEdgeMouseEnter = function handleEdgeMouseEnter(evt) {
      graph.setItemState(evt.item, 'hover', true);
    }; // eslint-disable-next-line @typescript-eslint/no-explicit-any


    var handleEdgeMouseLeave = function handleEdgeMouseLeave(evt) {
      graph.setItemState(evt.item, 'hover', false);
    };

    if (bindType === 'node') {
      graph.on('node:mouseenter', handleNodeMouseEnter);
      graph.on('node:mouseleave', handleNodeMouseLeave);
    }

    if (bindType === 'edge') {
      graph.on('edge:mouseenter', handleEdgeMouseEnter);
      graph.on('edge:mouseleave', handleEdgeMouseLeave);
    }

    return function () {
      if (bindType === 'node') {
        graph.off('node:mouseenter', handleNodeMouseEnter);
        graph.off('node:mouseleave', handleNodeMouseLeave);
      }

      if (bindType === 'edge') {
        graph.off('edge:mouseenter', handleEdgeMouseEnter);
        graph.off('edge:mouseleave', handleEdgeMouseLeave);
      }
    };
  }, [graph, disabled]);
  return null;
};

var _default = Hoverable;
exports.default = _default;