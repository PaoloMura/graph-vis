"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

// const defaultComboTheme = {
//   primaryComboColor: '#FF6A00',
//   comboSize: 20,
//   mode: 'light',
// };
var getComboStyleByTheme = function getComboStyleByTheme() {
  // const { comboSize, primaryComboColor, mode } = {
  //   ...defaultEdgeTheme,
  //   ...inputTheme,
  // };
  // const Colors = {
  //   light: {
  //     stroke: primaryComboColor,
  //     label: primaryComboColor,
  //     disabled: '#ddd',
  //   },
  //   dark: {
  //     stroke: primaryComboColor,
  //     label: primaryComboColor,
  //     disabled: '#ddd3',
  //   },
  // };
  // const Color = Colors[mode];
  var defaultStyle = {
    type: 'circle',
    style: {
      labelCfg: {
        position: 'top'
      }
    },
    status: {}
  };
  return defaultStyle;
};

var _default = getComboStyleByTheme;
exports.default = _default;