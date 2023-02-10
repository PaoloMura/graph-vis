function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

// import { handleAutoZoom, handleRealZoom, handleChangeZoom, handleZoomIn, handleZoomOut } from './zoom';
// import { focusNodeById, highlightNodeById } from './element';
import * as zoomApis from './zoom';
import * as elementApis from './element';
var apis = Object.assign(Object.assign({}, zoomApis), elementApis);

var ApiController = function ApiController(graph) {
  var apiKeys = Object.keys(apis);
  return apiKeys.reduce(function (acc, curr) {
    return Object.assign(Object.assign({}, acc), _defineProperty({}, curr, apis[curr](graph)));
  }, {});
};

export default ApiController;