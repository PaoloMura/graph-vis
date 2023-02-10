import React, { useEffect } from 'react';
import GraphinContext from '../GraphinContext';

var FitView = function FitView(props) {
  var padding = props.padding,
      isBindLayoutChange = props.isBindLayoutChange;

  var _React$useContext = React.useContext(GraphinContext),
      graph = _React$useContext.graph;

  useEffect(function () {
    var handleFitView = function handleFitView() {
      graph.fitView(padding);
    };
    /** 第一次就执行 FitView */


    handleFitView();

    if (isBindLayoutChange) {
      graph.on('afterlayout', handleFitView);
    }

    return function () {
      if (isBindLayoutChange) {
        graph.off('afterlayout', handleFitView);
      }
    };
  }, []);
  return null;
};

export default FitView;