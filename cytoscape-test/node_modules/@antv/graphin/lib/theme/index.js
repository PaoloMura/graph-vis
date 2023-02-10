"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getDefaultStyleByTheme = exports.DEFAULT_THEME = void 0;

var _comboStyle = _interopRequireDefault(require("./combo-style"));

var _edgeStyle = _interopRequireDefault(require("./edge-style"));

var _nodeStyle = _interopRequireDefault(require("./node-style"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var DEFAULT_THEME = {
  mode: 'light',
  primaryColor: '#873bf4',
  nodeSize: 26,
  edgeSize: 1,
  primaryEdgeColor: '#ddd'
};
exports.DEFAULT_THEME = DEFAULT_THEME;

var getDefaultStyleByTheme = function getDefaultStyleByTheme(inputTheme) {
  var theme = Object.assign(Object.assign({}, DEFAULT_THEME), inputTheme);
  var primaryColor = theme.primaryColor,
      primaryEdgeColor = theme.primaryEdgeColor,
      nodeSize = theme.nodeSize,
      edgeSize = theme.edgeSize,
      mode = theme.mode,
      background = theme.background;
  var nodeStyle = (0, _nodeStyle.default)({
    primaryColor: primaryColor,
    nodeSize: nodeSize,
    mode: mode
  });
  var edgeStyle = (0, _edgeStyle.default)({
    primaryEdgeColor: primaryEdgeColor,
    edgeSize: edgeSize,
    mode: mode
  });
  var comboStyle = (0, _comboStyle.default)();
  var BackgroundStyle = {
    light: '#fff',
    dark: '#1f1f1f'
  };
  return Object.assign(Object.assign({}, theme), {
    mode: mode,
    background: background || BackgroundStyle[mode],
    defaultNodeStyle: {
      type: nodeStyle.type,
      style: nodeStyle.style
    },
    defaultNodeStatusStyle: {
      status: nodeStyle.status
    },
    defaultEdgeStyle: {
      type: edgeStyle.type,
      style: edgeStyle.style
    },
    defaultEdgeStatusStyle: {
      status: edgeStyle.status
    },
    defaultComboStyle: {
      type: comboStyle.type,
      style: comboStyle.style
    },
    defaultComboStatusStyle: {
      status: comboStyle.status
    }
  });
};

exports.getDefaultStyleByTheme = getDefaultStyleByTheme;