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

import * as React from 'react';
import GraphinContext from '../GraphinContext';
import useBehaviorHook from './useBehaviorHook';
var defaultConfig = {
  /** 收起和展开树图的方式，支持 'click' 和 'dblclick' 两种方式。默认为 'click'，即单击； */
  trigger: 'click'
  /**
   * 收起或展开的回调函数。
   * 警告：G6 V3.1.2 版本中将移除；itemcollapsed：当 collapse-expand 发生时被触发。
   * 请使用 graph.on('itemcollapsed', e => {...}) 监听，参数 e 有以下字段：
   *  */

};

var TreeCollapse = function TreeCollapse(props) {
  var onChange = props.onChange,
      otherCofnig = __rest(props, ["onChange"]);

  var _React$useContext = React.useContext(GraphinContext),
      graph = _React$useContext.graph;
  /** 通用注册逻辑 */


  useBehaviorHook({
    defaultConfig: defaultConfig,
    userProps: otherCofnig,
    type: 'collapse-expand'
  });
  React.useEffect(function () {
    var handleChange = function handleChange(e) {
      var item = e.item,
          collapsed = e.collapsed;
      var model = item.get('model');
      model.collapsed = collapsed;

      if (onChange) {
        onChange(item, collapsed); // callback
      }
    };

    graph.on('itemcollapsed', handleChange);
    return function () {
      graph.off('itemcollapsed', handleChange);
    };
  }, []);
  return null;
};

export default TreeCollapse;