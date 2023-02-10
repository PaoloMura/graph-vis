"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _ForceLayout = _interopRequireDefault(require("./ForceLayout"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* eslint-disable @typescript-eslint/no-explicit-any */

/* eslint-disable no-undef */

/** placeholder function, the real execution of ForceLayout is through the iline worker */
var forceOptions = {};

var _default = function _default() {
  onmessage = function onmessage(e) {
    var data = e.data;
    /** parser an object with method */

    var newForceOptions = JSON.parse(JSON.stringify(forceOptions), function (key, value) {
      if (typeof value === 'string' && value.indexOf('function ') === 0) {
        // eslint-disable-next-line no-eval
        return eval("(".concat(value, ")"));
      }

      return value;
    });
    var simulation = new _ForceLayout.default(Object.assign(Object.assign({}, newForceOptions), {
      done: function done() {
        // @ts-ignore
        postMessage({
          done: true
        });
        if (newForceOptions.done) newForceOptions.done();
      }
    }));
    simulation.setData(data);
    simulation.register('render', function (forceData) {
      // @ts-ignore
      postMessage({
        forceData: forceData,
        done: false
      });
    });
    simulation.start();
  };
};

exports.default = _default;