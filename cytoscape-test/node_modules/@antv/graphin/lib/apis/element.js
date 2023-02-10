"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.highlightNodeById = exports.focusNodeById = void 0;

/**
 * 高亮节点
 * @param graph
 */
var highlightNodeById = function highlightNodeById(graph) {
  return function (nodeIds) {
    graph.getNodes().forEach(function (node) {
      graph.clearItemStates(node, ['active', 'inactive']);

      if (nodeIds.indexOf(node.get('id')) !== -1) {
        graph.setItemState(node, 'active', true);
      } else {
        graph.setItemState(node, 'active', false);
      }
    });
  };
};
/**
 * Focus 节点
 * @param graph
 */


exports.highlightNodeById = highlightNodeById;

var focusNodeById = function focusNodeById(graph) {
  return function (nodeId) {
    if (!graph || typeof nodeId !== 'string') {
      return;
    }

    var node = graph.findById(nodeId);

    if (!node) {
      console.warn("The node ".concat(nodeId, " does not exist!"));
      return;
    }

    graph.focusItem(nodeId, true, {
      duration: 300,
      easing: 'easeCubic'
    });
    graph.setItemState(node, 'selected', true);
    node.toFront();
  };
};

exports.focusNodeById = focusNodeById;