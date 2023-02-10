import React from 'react';
import GraphinContext from '../GraphinContext';

var FontPaint = function FontPaint() {
  var _React$useContext = React.useContext(GraphinContext),
      graph = _React$useContext.graph;

  React.useEffect(function () {
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

export default FontPaint;