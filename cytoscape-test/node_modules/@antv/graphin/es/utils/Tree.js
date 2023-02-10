function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Tree = /*#__PURE__*/_createClass(function Tree(root) {
  var _this = this;

  _classCallCheck(this, Tree);

  this.nodeIds = [];

  this.bfs = function (cb) {
    var _a;

    if (!_this.root) {
      return;
    }

    var queue = [];
    queue.push(_this.root);

    while (queue.length) {
      var node = queue.shift();

      if (cb(node)) {
        return node;
      }

      if ((_a = node === null || node === void 0 ? void 0 : node.children) === null || _a === void 0 ? void 0 : _a.length) {
        queue.push.apply(queue, _toConsumableArray(node.children));
      }
    }
  };

  this.getRoot = function () {
    return _this.root;
  };

  this.getNode = function (id) {
    var result = _this.bfs(function (node) {
      return node.id === id;
    });

    return result;
  }; // eslint-disable-next-line


  this.addRoot = function (id, data) {
    _this.root = {
      id: id,
      children: []
    };

    _this.nodeIds.push(id);
  }; // eslint-disable-next-line


  this.addNode = function (conf) {
    var parentId = conf.parentId,
        id = conf.id,
        data = conf.data;

    if (!_this.root) {
      _this.addRoot(id, data);

      return;
    }

    var parent;

    if (!parentId) {
      // If parentId was not given, pick a random node as parent
      var index = Math.floor(Math.random() * _this.nodeIds.length);
      parent = _this.getNode(_this.nodeIds[index]);
    } else {
      parent = _this.getNode(parentId);
    }

    if (!parent) {
      console.error("Parent node doesn't exist!");
      return;
    }

    _this.nodeIds.push(id); // @ts-ignore


    parent.children.push({
      id: id,
      // @ts-ignore
      parent: parent,
      children: []
    });
  }; // Pass in the root of an existing tree


  if (root) this.root = root;
});

export { Tree as default };