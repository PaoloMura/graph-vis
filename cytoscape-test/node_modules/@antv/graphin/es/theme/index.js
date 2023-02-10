import getComboStyleByTheme from './combo-style';
import getEdgeStyleByTheme from './edge-style';
import getNodeStyleByTheme from './node-style';
export var DEFAULT_THEME = {
  mode: 'light',
  primaryColor: '#873bf4',
  nodeSize: 26,
  edgeSize: 1,
  primaryEdgeColor: '#ddd'
};
export var getDefaultStyleByTheme = function getDefaultStyleByTheme(inputTheme) {
  var theme = Object.assign(Object.assign({}, DEFAULT_THEME), inputTheme);
  var primaryColor = theme.primaryColor,
      primaryEdgeColor = theme.primaryEdgeColor,
      nodeSize = theme.nodeSize,
      edgeSize = theme.edgeSize,
      mode = theme.mode,
      background = theme.background;
  var nodeStyle = getNodeStyleByTheme({
    primaryColor: primaryColor,
    nodeSize: nodeSize,
    mode: mode
  });
  var edgeStyle = getEdgeStyleByTheme({
    primaryEdgeColor: primaryEdgeColor,
    edgeSize: edgeSize,
    mode: mode
  });
  var comboStyle = getComboStyleByTheme();
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