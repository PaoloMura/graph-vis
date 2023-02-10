function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

export var Node = /*#__PURE__*/_createClass(function Node(data) {
  _classCallCheck(this, Node);

  this.id = data.id;
  this.data = data || {};
  this.x = data.x || 0;
  this.y = data.y || 0;
});
export var Edge = /*#__PURE__*/_createClass(function Edge(id, source, target, data) {
  _classCallCheck(this, Edge);

  this.id = id;
  this.source = source;
  this.target = target;
  this.data = data || {};
});