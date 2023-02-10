var __rest = this && this.__rest || function (s, e) {
  var t = {};

  for (var p in s) {
    if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0) t[p] = s[p];
  }

  if (s != null && typeof Object.getOwnPropertySymbols === "function") for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
    if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i])) t[p[i]] = s[p[i]];
  }
  return t;
};

import Force from '../force';
import G6 from '@antv/g6';
export default (function () {
  G6.registerLayout('graphin-force', {
    /**
     * 定义自定义行为的默认参数，会与用户传入的参数进行合并
     */
    getDefaultCfg: function getDefaultCfg() {
      return {
        /** 前置布局，默认为 concentric */
        preset: {
          /** 特殊情况处理：前置布局为force，但是前置的数据也为空，则证明是初始化force布局，否则为正常前置force布局 */
          name: 'grid',
          options: {}
        },

        /** spring stiffness 弹簧劲度系数 * */
        stiffness: 200.0,

        /** repulsion 斥力，这里指代 库伦常量Ke */
        repulsion: 200.0 * 5,

        /** 向心力 */
        centripetalOptions: {
          leaf: 1.6,
          single: 1.6
        },

        /** 速度的减震因子，其实就是阻尼系数 */
        damping: 0.9,

        /** 最小能量阈值，当粒子运动，有阻尼系数的存在，最终会将初始的能量消耗殆尽 */
        minEnergyThreshold: 0.1,

        /** 最大的速度 [0,1000] */
        maxSpeed: 1000,

        /** 最大迭代数 */
        MaxIterations: 10000,

        /** 是否开启动画 */
        animation: true
      };
    },

    /**
     * 初始化
     * @param {Object} data 数据
     */
    init: function init(data) {
      this.nodes = data.nodes;
      this.edges = data.edges;

      var _a = this,
          graph = _a.graph,
          layoutConfig = __rest(_a, ["graph"]);

      var options = Object.assign(Object.assign({}, this.getDefaultCfg()), layoutConfig);

      var width = options.width,
          height = options.height,
          animation = options.animation,
          _options$done = options.done,
          _done = _options$done === void 0 ? function () {} : _options$done,
          others = __rest(options, ["width", "height", "animation", "done"]);
      /** 1. Create a force simulator */


      this.simulation = new Force(Object.assign(Object.assign(Object.assign({
        width: width,
        height: height,
        animation: animation
      }, others), layoutConfig), {
        done: function done(nodes) {
          _done(graph, nodes);
        }
      })); // 2. Mount Data

      this.simulation.setData(data); // 3. Custom rendering function

      this.simulation.register('render', function (forceData) {
        if (!animation && data && data.nodes && data.nodes.length > 0) {
          // 如果不需要动画
          var nodes = forceData.nodes; // eslint-disable-next-line @typescript-eslint/no-explicit-any

          data.nodes.forEach(function (node, index) {
            var indexNode = nodes[index];

            if (indexNode && indexNode.id === node.id) {
              node.x = nodes[index].x;
              node.y = nodes[index].y;
            } else {
              var matchNode = nodes.find(function (item) {
                return item.id === node.id;
              });

              if (matchNode) {
                node.x = matchNode.x;
                node.y = matchNode.y;
              }
            }
          });
          return Object.assign({}, forceData);
        }

        try {
          if (!graph || graph.destroyed) return;
          var shouldUpdateCombos = false;
          forceData.nodes.forEach(function (item) {
            var node = graph.findById(item.id);

            if (node) {
              // 因为有可能画布删除了节点
              var model = node.get('model');
              model.x = item.x;
              model.y = item.y;

              if (node.getType() === 'combo') {
                shouldUpdateCombos = true;
              }
            }
          });
          graph.refreshPositions(shouldUpdateCombos);
        } catch (error) {
          // eslint-disable-next-line no-console
          console.error(error);
        }
      });
    },

    /**
     * 执行布局
     */
    execute: function execute() {
      // TODO

      /**  4. Start force  simulator */
      this.simulation.start();
    },

    /**
     * 根据传入的数据进行布局
     * @param {Object} data 数据
     */
    layout: function layout(data) {
      this.init(data);
      this.execute();
    },

    /**
     * 更新布局配置，但不执行布局
     * @param {Object} cfg 需要更新的配置项
     */
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    updateCfg: function updateCfg(cfg) {
      this.cfg = Object.assign(Object.assign({}, this.cfg), cfg);
    },

    /**
     * 销毁
     */
    destroy: function destroy() {
      this.destroyed = true;
      this.simulation.stop();
      this.simulation = null;
    },
    getType: function getType() {
      return 'graphin-force';
    }
  });
});