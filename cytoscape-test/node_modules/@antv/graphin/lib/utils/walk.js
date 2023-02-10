"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var walk = function walk(node, callback) {
  callback(node);

  if (node.children && node.children.length > 0) {
    node.children.forEach(function (child) {
      walk(child, callback);
    });
  }
};

var _default = walk;
exports.default = _default;