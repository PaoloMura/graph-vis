import G6 from '@antv/g6';
export default (function () {
  G6.registerLayout('preset', {
    init: function init() {},
    execute: function execute() {},
    destroy: function destroy() {
      this.destroyed = true;
    }
  });
});