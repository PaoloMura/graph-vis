import * as React from 'react';
import GraphinContext from '../GraphinContext';

var Hoverable = function Hoverable(props) {
  var graphin = React.useContext(GraphinContext);
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

export default Hoverable;