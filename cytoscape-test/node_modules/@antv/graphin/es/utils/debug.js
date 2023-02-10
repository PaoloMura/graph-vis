var isDebugMode = true;

var floorRandom = function floorRandom(number) {
  return Math.floor(Math.random() * number);
};

var randomColor = function randomColor() {
  var opacity = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 1;
  var r = floorRandom(255);
  var g = floorRandom(255);
  var b = floorRandom(255);
  var color = "rgba(".concat(r, ",").concat(g, ",").concat(b, ",").concat(opacity, ")");
  return color;
};

var colorMap = {};
/**
 *
 * @param {*} name 分类的名称
 * @example
 * debug('Tooltip')('render','...')
 * @todo https://developer.mozilla.org/zh-CN/docs/Web/API/Console
 *
 */

var debug = function debug(name) {
  if (!colorMap[name]) {
    colorMap[name] = randomColor();
  }

  var color = colorMap[name]; // eslint-disable-next-line

  return function () {
    // @ts-ignore
    if (isDebugMode && process.env.NODE_ENV === 'development') {
      var _console;

      for (var _len = arguments.length, message = new Array(_len), _key = 0; _key < _len; _key++) {
        message[_key] = arguments[_key];
      }

      // eslint-disable-next-line no-console
      (_console = console).log.apply(_console, ["%c".concat(name), "color:  ".concat(color, "; font-style:italic ;padding: 2px;font-weight:700")].concat(message));
    }
  };
};

export default debug;