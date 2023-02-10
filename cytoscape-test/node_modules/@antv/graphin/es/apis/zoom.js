// 放大
export var handleZoomOut = function handleZoomOut(graph) {
  return function () {
    if (!graph || graph.destroyed) return;
    var current = graph.getZoom();
    var canvas = graph.get('canvas');
    var point = canvas.getPointByClient(canvas.get('width') / 2, canvas.get('height') / 2);
    var pixelRatio = canvas.get('pixelRatio') || 1;
    var ratio = 1 + 0.05 * 5;

    if (ratio * current > 5) {
      return;
    }

    graph.zoom(ratio, {
      x: point.x / pixelRatio,
      y: point.y / pixelRatio
    });
    return {
      text: "".concat(Math.round(ratio * current * 100), "%"),
      ratio: ratio * current
    };
  };
}; // 缩小

export var handleZoomIn = function handleZoomIn(graph) {
  return function () {
    if (!graph || graph.destroyed) return;
    var current = graph.getZoom();
    var canvas = graph.get('canvas');
    var point = canvas.getPointByClient(canvas.get('width') / 2, canvas.get('height') / 2);
    var pixelRatio = canvas.get('pixelRatio') || 1;
    var ratio = 1 - 0.05 * 5;

    if (ratio * current < 0.3) {
      return;
    }

    graph.zoom(ratio, {
      x: point.x / pixelRatio,
      y: point.y / pixelRatio
    });
    return {
      text: "".concat(Math.round(ratio * current * 100), "%"),
      ratio: ratio * current
    };
  };
}; // 自定义缩放

export var handleChangeZoom = function handleChangeZoom(graph) {
  return function (_ref) {
    var text = _ref.text,
        ratio = _ref.ratio;
    if (!graph || graph.destroyed) return;
    var canvas = graph.get('canvas');
    var point = canvas.getPointByClient(canvas.get('width') / 2, canvas.get('height') / 2);
    var pixelRatio = canvas.get('pixelRatio') || 1;
    graph.zoomTo(ratio, {
      x: point.x / pixelRatio,
      y: point.y / pixelRatio
    });
    return {
      text: text,
      ratio: ratio
    };
  };
}; // 实际大小

export var handleRealZoom = function handleRealZoom(graph) {
  return function () {
    if (!graph || graph.destroyed) return;
    var current = graph.getZoom();
    graph.zoom(1 / current);
    graph.fitCenter();
    return {
      text: '100%',
      ratio: 1
    };
  };
}; // 自适应canvas大小

export var handleAutoZoom = function handleAutoZoom(graph) {
  return function () {
    if (!graph || graph.destroyed) return;
    var nodes = graph.getNodes();

    if (nodes.length > 0) {
      graph.fitView([20, 20]);
    }

    var current = graph.getZoom();
    return {
      text: "".concat(Math.round(current * 100), "%"),
      ratio: current
    };
  };
};