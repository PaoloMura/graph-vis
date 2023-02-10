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

import React from 'react';
import GraphinContext from '../GraphinContext';

var useBehaviorHook = function useBehaviorHook(params) {
  var type = params.type,
      defaultConfig = params.defaultConfig,
      userProps = params.userProps,
      _params$mode = params.mode,
      mode = _params$mode === void 0 ? 'default' : _params$mode;

  var _React$useContext = React.useContext(GraphinContext),
      graph = _React$useContext.graph;

  var disabled = userProps.disabled,
      otherConfig = __rest(userProps, ["disabled"]);

  React.useEffect(function () {
    /** 保持单例 */
    graph.removeBehaviors(type, mode);

    if (disabled) {
      return;
    }

    graph.addBehaviors(Object.assign(Object.assign({
      type: type
    }, defaultConfig), otherConfig), mode);
    return function () {
      if (!graph.destroyed) {
        graph.removeBehaviors(type, mode);
      }
    };
  }, []);
};

export default useBehaviorHook;