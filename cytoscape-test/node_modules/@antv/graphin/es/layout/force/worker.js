/* eslint-disable @typescript-eslint/no-explicit-any */

/* eslint-disable no-undef */

/** placeholder function, the real execution of ForceLayout is through the iline worker */
import ForceLayout from './ForceLayout';
var forceOptions = {};
export default (function () {
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
    var simulation = new ForceLayout(Object.assign(Object.assign({}, newForceOptions), {
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
});