import * as React from 'react';
import GraphinContext from '../GraphinContext';
import { debounce } from '@antv/util';

var ResizeCanvas = function ResizeCanvas(props) {
  var graphDOM = props.graphDOM;
  var graphin = React.useContext(GraphinContext);
  React.useEffect(function () {
    var graph = graphin.graph;
    /** 内置 resize */

    var handleResizeEvent = debounce(function () {
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

export default ResizeCanvas;