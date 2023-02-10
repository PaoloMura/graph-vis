"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.StatusEnum = void 0;

/* eslint-disable @typescript-eslint/no-explicit-any */
var StatusEnum;
exports.StatusEnum = StatusEnum;

(function (StatusEnum) {
  /** 悬停状态 */
  StatusEnum["HOVER"] = "hover";
  StatusEnum["SELECTED"] = "selected";
  StatusEnum["NORMAL"] = "normal";
  StatusEnum["DISABLED"] = "disabled";
  StatusEnum["ACTIVE"] = "active";
  StatusEnum["INACTIVE"] = "inactive";
})(StatusEnum || (exports.StatusEnum = StatusEnum = {}));