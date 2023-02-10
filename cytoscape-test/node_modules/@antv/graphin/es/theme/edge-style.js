var defaultEdgeTheme = {
  primaryEdgeColor: '#ddd',
  edgeSize: 1,
  mode: 'light'
};

var getEdgeStyleByTheme = function getEdgeStyleByTheme(inputTheme) {
  var _Object$assign = Object.assign(Object.assign({}, defaultEdgeTheme), inputTheme),
      edgeSize = _Object$assign.edgeSize,
      primaryEdgeColor = _Object$assign.primaryEdgeColor,
      mode = _Object$assign.mode;

  var Colors = {
    light: {
      stroke: primaryEdgeColor,
      label: primaryEdgeColor,
      disabled: '#ddd'
    },
    dark: {
      stroke: primaryEdgeColor,
      label: primaryEdgeColor,
      disabled: '#ddd3'
    }
  };
  var Color = Colors[mode];
  var defaultStyle = {
    type: 'graphin-line',
    style: {
      keyshape: {
        type: 'line',
        lineWidth: edgeSize,
        stroke: Color.stroke,
        strokeOpacity: 1,
        lineAppendWidth: 9,
        cursor: 'pointer'
      },
      halo: {
        // stroke: Color.stroke,
        visible: false,
        cursor: 'pointer',
        strokeOpacity: 0.4
      },
      label: {
        value: '',
        position: 'top',
        fill: Color.label,
        fontSize: 12,
        textAlign: 'center'
      },
      animate: {}
    },
    status: {
      hover: {
        halo: {
          visible: true
        }
      },
      selected: {
        halo: {
          visible: true
        },
        keyshape: {
          lineWidth: 2
        },
        label: {
          visible: true
        }
      },
      active: {
        halo: {
          visible: true
        },
        keyshape: {
          lineWidth: 2
        },
        label: {
          visible: true
        }
      },
      inactive: {
        halo: {
          visible: false
        },
        keyshape: {
          strokeOpacity: 0.1
        },
        label: {
          visible: false
        }
      },
      disabled: {
        halo: {
          visible: false
        },
        keyshape: {
          lineWidth: 0.5,
          stroke: Color.disabled
        },
        label: {
          visible: false
        }
      }
    }
  };
  return defaultStyle;
};

export default getEdgeStyleByTheme;