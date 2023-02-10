function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

import Tree from './Tree';
import walk from './walk';
var defaultOptions = {
  /** 节点 */
  nodeCount: 10,
  nodeType: 'company'
};
/**
 * 1,mock data with edges,nodes
 * 2.mock nodes properties
 * 3.filter edges
 * 4.
 */

export var Mock = /*#__PURE__*/_createClass(function Mock(count) {
  var _this = this;

  _classCallCheck(this, Mock);

  this.initNodes = function () {
    var _this$options = _this.options,
        nodeCount = _this$options.nodeCount,
        nodeType = _this$options.nodeType;
    var temp = Array.from({
      length: nodeCount
    });
    _this.nodes = temp.map(function (node, index) {
      return {
        id: "node-".concat(index),
        label: "node-".concat(index),
        type: nodeType
      };
    });

    for (var i = 0; i < nodeCount; i = i + 1) {
      for (var j = 0; j < nodeCount - 1; j = j + 1) {
        _this.edges.push({
          source: "node-".concat(i),
          target: "node-".concat(j)
        });
      }
    }

    _this.nodeIds = _this.nodes.map(function (node) {
      return node.id;
    });
  };

  this.expand = function (snodes) {
    _this.edges = [];
    _this.nodes = [];
    snodes.forEach(function (node) {
      for (var i = 0; i < _this.options.nodeCount; i += 1) {
        _this.nodes.push({
          id: "".concat(node.id, "-").concat(i),
          type: node.type
        });

        _this.edges.push({
          source: "".concat(node.id, "-").concat(i),
          target: node.id
        });
      }
    });
    return _this;
  };

  this.type = function (nodeType) {
    _this.nodes = _this.nodes.map(function (node) {
      return Object.assign(Object.assign({}, node), {
        type: nodeType
      });
    });
    return _this;
  };

  this.circle = function () {
    var centerId = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
    var id = centerId;

    if (_this.nodeIds.indexOf(id) === -1) {
      id = 'node-0';
    }

    _this.edges = _this.edges.filter(function (edge) {
      return edge.source === id || edge.target === id;
    });
    return _this;
  };
  /**
   * @param ratio 随机的稀疏程度，默认0.5
   */


  this.random = function () {
    var ratio = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0.5;
    var nodeCount = _this.options.nodeCount;
    var length = parseInt(String(nodeCount * ratio));
    /**  随机ID */

    var randomArray = _this.nodeIds.sort(function () {
      return Math.random() - 0.5;
    }).slice(0, length);

    _this.edges = _this.edges.filter(function (edge) {
      return randomArray.indexOf(edge.target) !== -1;
    });
    _this.edges = _this.edges.sort(function () {
      return Math.random() - 0.5;
    }).slice(0, length);
    return _this;
  };

  this.tree = function () {
    _this.edges = [];
    _this.treeData = new Tree();
    var rootId = _this.nodeIds[0];

    _this.nodeIds.forEach(function (id) {
      _this.treeData.addNode({
        id: id,
        // @ts-ignore
        style: {
          label: {
            value: id
          }
        }
      });
    });

    _this.treeData.bfs(function (node) {
      var _a;

      if (node.id !== rootId) {
        _this.edges.push({
          source: (_a = node === null || node === void 0 ? void 0 : node.parent) === null || _a === void 0 ? void 0 : _a.id,
          target: node.id,
          properties: []
        });
      }

      return false;
    });

    return _this;
  };

  this.value = function () {
    return {
      nodes: _this.nodes,
      edges: _this.edges
    };
  };

  this.combos = function (chunkSize) {
    var comboIds = new Set();
    _this.nodes = _this.nodes.map(function (node, index) {
      var comboIndex = Math.ceil((index + 1) / chunkSize);
      var comboId = "combo-".concat(comboIndex);
      comboIds.add(comboId);
      return Object.assign(Object.assign({}, node), {
        comboId: comboId
      });
    });
    _this.combosData = _toConsumableArray(comboIds).map(function (c) {
      return {
        id: c,
        label: c
      };
    });
    return _this;
  };

  this.graphin = function () {
    return {
      // @ts-ignore
      nodes: _this.nodes.map(function (node) {
        return Object.assign(Object.assign({}, node), {
          id: node.id,
          type: 'graphin-circle',
          comboId: node.comboId,
          style: {
            label: {
              value: "".concat(node.id)
            }
          }
        });
      }),
      edges: _this.edges.map(function (edge) {
        return {
          source: edge.source,
          target: edge.target
        };
      }),
      combos: _this.combosData
    };
  };

  this.graphinTree = function () {
    var tree = _this.treeData.getRoot(); // @ts-ignore


    walk(tree, function (node) {
      // @ts-ignore
      delete node.parent;
    }); // @ts-ignore

    return tree;
  };

  this.options = defaultOptions;
  this.options.nodeCount = count;
  this.nodes = [];
  this.edges = [];
  this.nodeIds = [];
  this.treeData = new Tree();
  this.initNodes();
});

var mock = function mock(count) {
  return new Mock(count);
};

export default mock;