function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

import Vector from './Vector';

var Point = /*#__PURE__*/_createClass(function Point(position, id, data) {
  var _this = this;

  var mass = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 1.0;

  _classCallCheck(this, Point);

  this.updateAcc = function (force) {
    /**
     * 加速度也是一个向量，根据力的平行四边形法则进行力的合成，用向量运算就是加运算
     */
    _this.a = _this.a.add(force.divide(_this.m)); // a = a + F/m
  };

  this.p = position; // 点的位置，用[x,y]向量来表示

  this.m = mass; // 点的质量，默认为1.0

  this.v = new Vector(0, 0); // 速度，初始值为向量零 [0,0] velocity, init with x=0, y=0

  this.a = new Vector(0, 0); // 加速度，初始值为向量零 [0,0] acceleration, init with x=0, y=0

  this.id = id; // 点的唯一ID  id of Point, defaults to -1

  this.data = data;
});

export default Point;