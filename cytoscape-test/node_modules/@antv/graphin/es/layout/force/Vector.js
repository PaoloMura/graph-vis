function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * 向量运算 Youtube教程：https://www.youtube.com/watch?v=Kti2mNKDOTw&list=PLA9470D64579500CE&index=6
 *
 * 向量有3个容易混淆概念
 * scalar Multip 系数积
 * dot Product 内积/点积
 * cross product 外积/有向积
 */
var Vector = /*#__PURE__*/_createClass(function Vector(x, y) {
  var _this = this;

  _classCallCheck(this, Vector);

  this.getvec = function () {
    return _this;
  };

  this.add = function (v2) {
    return new Vector(_this.x + v2.x, _this.y + v2.y);
  };

  this.subtract = function (v2) {
    return new Vector(_this.x - v2.x, _this.y - v2.y);
  };

  this.magnitude = function () {
    return Math.sqrt(_this.x * _this.x + _this.y * _this.y);
  };

  this.normalise = function () {
    return _this.divide(_this.magnitude());
  };

  this.divide = function (n) {
    return new Vector(_this.x / n || 0, _this.y / n || 0);
  };

  this.scalarMultip = function (n) {
    return new Vector(_this.x * n, _this.y * n);
  };

  this.x = x;
  this.y = y;
});

export default Vector;