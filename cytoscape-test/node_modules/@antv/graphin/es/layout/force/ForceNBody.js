import { quadtree } from 'd3-quadtree';
var theta2 = 0.81; // Barnes-Hut approximation threshold

var epsilon = 0.1; // 为了防止出现除0的情况，加一个epsilon

export function forceNBodyBruteForce(nodes, coulombDisScale, repulsion) {
  return nodes.map(function (a, i) {
    var v = {
      vx: 0,
      vy: 0
    };
    nodes.forEach(function (b, j) {
      if (i === j) return;
      var dx = a.x - b.x || 0.001;
      var dy = a.y - b.y || 0.001;
      var len = Math.sqrt(dx * dx + dy * dy) + epsilon;
      var dis = len * coulombDisScale;
      var force = repulsion / (dis * dis) || 0;
      v.vx += (dx / len || 0) * force;
      v.vy += (dy / len || 0) * force;
    });
    return v;
  });
}
export function forceNBody(nodes, coulombDisScale, repulsion) {
  var weight = repulsion / (coulombDisScale * coulombDisScale);
  var data = nodes.map(function (n, i) {
    return Object.assign(Object.assign({
      index: i
    }, n), {
      vx: 0,
      vy: 0,
      weight: weight
    });
  });
  var tree = quadtree(data, function (d) {
    return d.x;
  }, function (d) {
    return d.y;
  }).visitAfter(accumulate); // init internal node

  data.forEach(function (n) {
    computeForce(n, tree);
  });
  return data.map(function (n) {
    return {
      vx: n.vx,
      vy: n.vy
    };
  });
} // @ts-ignore

function accumulate(quad) {
  var accWeight = 0;
  var accX = 0;
  var accY = 0;

  if (quad.length) {
    // internal node, accumulate 4 child quads
    for (var i = 0; i < 4; i++) {
      var q = quad[i];

      if (q && q.weight) {
        accWeight += q.weight;
        accX += q.x * q.weight;
        accY += q.y * q.weight;
      }
    }

    quad.x = accX / accWeight;
    quad.y = accY / accWeight;
    quad.weight = accWeight;
  } else {
    // leaf node
    var _q = quad;
    quad.x = _q.data.x;
    quad.y = _q.data.y;
    quad.weight = _q.data.weight;
  }
} // @ts-ignore


function computeForce(node, tree) {
  // @ts-ignore
  var apply = function apply(quad, x1, y1, x2, y2) {
    var dx = node.x - quad.x || 0.001;
    var dy = node.y - quad.y || 0.001;
    var width = x2 - x1;
    var len2 = dx * dx + dy * dy + epsilon;
    var len = Math.sqrt(len2) + epsilon; // far node, apply Barnes-Hut approximation

    if (width * width / theta2 < len2) {
      node.vx += dx / len * quad.weight / len2;
      node.vy += dy / len * quad.weight / len2;
      return true;
    } // near quad, compute force directly


    if (quad.length) return false; // internal node, visit children
    // leaf node

    if (quad.data !== node) {
      node.vx += dx / len * quad.data.weight / len2;
      node.vy += dy / len * quad.data.weight / len2;
    }
  };

  tree.visit(apply);
}