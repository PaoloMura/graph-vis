function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

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

import G6 from '@antv/g6';
import { deepMix, isArray, isNumber } from '@antv/util';
import { getDefaultStyleByTheme } from '../theme';
import { convertSizeToWH, getBadgePosition, getLabelXYByPosition, removeDumpAttrs, setStatusStyle } from './utils';

function getRadiusBySize(size) {
  var r;

  if (isNumber(size)) {
    r = size / 2;
  } else if (isArray(size)) {
    r = size[0] / 2;
  }

  return r;
}

var getStyleByTheme = function getStyleByTheme() {
  var theme = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var themeResult = getDefaultStyleByTheme(theme);
  var defaultNodeStyle = themeResult.defaultNodeStyle,
      defaultNodeStatusStyle = themeResult.defaultNodeStatusStyle;
  return {
    style: defaultNodeStyle.style,
    status: defaultNodeStatusStyle.status
  };
};
/**
 * @description 解析Halo
 * @param config 用户输入的数据
 */


var parseHalo = function parseHalo(style) {
  var halo = style.halo,
      keyshape = style.keyshape;

  var size = halo.size,
      visible = halo.visible,
      fill = halo.fill,
      fillOpacity = halo.fillOpacity,
      otherAttrs = __rest(halo, ["size", "visible", "fill", "fillOpacity"]);

  var haloR = getRadiusBySize(size);
  var keyshapeR;
  var keyshapeFill;
  var keyshapeStroke;

  if (keyshape && keyshape.size) {
    var calculateR = getRadiusBySize(keyshape.size);
    keyshapeR = calculateR + 15;
  }

  if (keyshape && keyshape.fill) {
    keyshapeFill = keyshape.fill;
  }

  if (keyshape && keyshape.stroke) {
    keyshapeStroke = keyshape.stroke;
  }

  var attrs = Object.assign({
    x: 0,
    y: 0,
    r: haloR || keyshapeR,
    fill: fill || keyshapeFill || keyshapeStroke,
    fillOpacity: fillOpacity || 0.1,
    visible: visible !== false
  }, otherAttrs);
  return {
    name: 'halo',
    visible: visible !== false,
    attrs: removeDumpAttrs(attrs)
  };
};

var parseKeyshape = function parseKeyshape(style) {
  var keyshape = style.keyshape;

  var size = keyshape.size,
      visible = keyshape.visible,
      stroke = keyshape.stroke,
      fill = keyshape.fill,
      fillOpacity = keyshape.fillOpacity,
      strokeOpacity = keyshape.strokeOpacity,
      otherAttrs = __rest(keyshape, ["size", "visible", "stroke", "fill", "fillOpacity", "strokeOpacity"]);

  var r = getRadiusBySize(size);
  var attrs = Object.assign({
    x: 0,
    y: 0,
    r: r,
    cursor: 'pointer',
    visible: visible !== false,
    stroke: stroke,
    strokeOpacity: strokeOpacity || 1,
    fill: fill || stroke,
    fillOpacity: fillOpacity || 0.2
  }, otherAttrs);
  return {
    name: 'keyshape',
    visible: visible !== false,
    attrs: removeDumpAttrs(attrs)
  };
};

var parseLabel = function parseLabel(style) {
  var label = style.label;

  var value = label.value,
      fill = label.fill,
      fontSize = label.fontSize,
      visible = label.visible,
      otherAttrs = __rest(label, ["value", "fill", "fontSize", "visible"]); // @ts-ignore


  var labelPos = getLabelXYByPosition(style);
  var attrs = Object.assign({
    x: labelPos.x,
    y: labelPos.y,
    fontSize: fontSize,
    text: value,
    textAlign: 'center',
    fill: fill,
    textBaseline: labelPos.textBaseline,
    visible: visible !== false
  }, otherAttrs);
  return {
    name: 'label',
    visible: visible !== false,
    attrs: removeDumpAttrs(attrs)
  };
};

var parseIcon = function parseIcon(style) {
  var icon = style.icon;

  var _icon$value = icon.value,
      value = _icon$value === void 0 ? '' : _icon$value,
      type = icon.type,
      fontFamily = icon.fontFamily,
      _icon$textAlign = icon.textAlign,
      textAlign = _icon$textAlign === void 0 ? 'center' : _icon$textAlign,
      _icon$textBaseline = icon.textBaseline,
      textBaseline = _icon$textBaseline === void 0 ? 'middle' : _icon$textBaseline,
      fill = icon.fill,
      size = icon.size,
      visible = icon.visible,
      clip = icon.clip,
      otherAttrs = __rest(icon, ["value", "type", "fontFamily", "textAlign", "textBaseline", "fill", "size", "visible", "clip"]);

  var _convertSizeToWH = convertSizeToWH(size),
      _convertSizeToWH2 = _slicedToArray(_convertSizeToWH, 2),
      width = _convertSizeToWH2[0],
      height = _convertSizeToWH2[1];

  var params = {
    name: 'icon',
    visible: visible !== false,
    capture: false
  };

  if (type === 'text' || type === 'font') {
    return Object.assign(Object.assign({}, params), {
      attrs: Object.assign({
        x: 0,
        y: 0,
        textAlign: textAlign,
        textBaseline: textBaseline,
        text: value,
        fontSize: width,
        fontFamily: fontFamily,
        fill: fill,
        visible: visible !== false
      }, otherAttrs)
    });
  } // image


  return Object.assign(Object.assign({}, params), {
    attrs: Object.assign({
      x: -width / 2,
      y: -height / 2,
      img: value,
      width: width,
      height: height,
      visible: visible !== false
    }, otherAttrs)
  });
};
/** 根据用户输入的json，解析成attr */
// eslint-disable-next-line @typescript-eslint/no-explicit-any


var parseAttr = function parseAttr(style, itemShapeName) {
  if (itemShapeName === 'keyshape') {
    return parseKeyshape(style).attrs;
  }

  if (itemShapeName === 'halo') {
    return parseHalo(style).attrs;
  }

  if (itemShapeName === 'label') {
    return parseLabel(style).attrs;
  }

  if (itemShapeName === 'icon') {
    return parseIcon(style).attrs;
  }

  return style[itemShapeName] || {};
};

var drawBadge = function drawBadge(badge, group, r) {
  var type = badge.type,
      position = badge.position,
      _badge$value = badge.value,
      badgeValue = _badge$value === void 0 ? '' : _badge$value,
      badgeSize = badge.size,
      fill = badge.fill,
      stroke = badge.stroke,
      color = badge.color,
      fontSize = badge.fontSize,
      fontFamily = badge.fontFamily,
      _badge$padding = badge.padding,
      padding = _badge$padding === void 0 ? 0 : _badge$padding,
      _badge$offset = badge.offset,
      inputOffset = _badge$offset === void 0 ? [0, 0] : _badge$offset,
      id = badge.id;
  var offset = convertSizeToWH(inputOffset);

  var _convertSizeToWH3 = convertSizeToWH(badgeSize),
      _convertSizeToWH4 = _slicedToArray(_convertSizeToWH3, 2),
      width = _convertSizeToWH4[0],
      height = _convertSizeToWH4[1];

  var _getBadgePosition = getBadgePosition(position, r),
      badgeX = _getBadgePosition.x,
      badgeY = _getBadgePosition.y;

  var realX = badgeX;
  var realY = badgeY; // 绘制 badge 的外层容器，根据宽度和高度确定是 circle 还是 rect

  if (width === height) {
    realX += offset[0];
    realY += offset[1];
    var shape = {
      attrs: {
        r: width / 2 + padding,
        fill: fill,
        stroke: stroke,
        x: realX,
        y: realY
      },
      name: 'badges-circle'
    };

    if (id) {
      shape.id = id;
    }

    group.addShape('circle', shape);
  } else {
    realX = badgeX - width - padding * 2;
    realY = badgeY - height - padding * 2;

    if (position === 'LB') {
      realY = badgeY;
    } else if (position === 'RT') {
      realX = badgeX;
      realY = badgeY - height - padding * 2;
    } else if (position === 'RB') {
      realX = badgeX;
      realY = badgeY;
    }

    realX += offset[0];
    realY += offset[1];
    var _shape = {
      attrs: {
        width: width + padding * 2,
        height: height + padding * 2,
        fill: fill,
        stroke: stroke,
        x: realX,
        y: realY,
        radius: (height + padding * 2) / 3
      },
      name: 'badges-rect'
    };

    if (id) {
      _shape.id = id;
    }

    group.addShape('rect', _shape);
  }

  if (type === 'font' || type === 'text') {
    group.addShape('text', {
      attrs: {
        x: width !== height ? realX + width / 2 + padding : realX,
        y: width !== height ? realY + height / 2 + padding : realY,
        text: badgeValue,
        fontSize: fontSize,
        textAlign: 'center',
        textBaseline: 'middle',
        fontFamily: fontFamily,
        fill: color
      },
      capture: false,
      name: 'badges-text'
    });
  } else if (type === 'image') {
    group.addShape('image', {
      attrs: {
        x: realX - width / 2,
        y: realX - height / 2,
        width: width,
        height: height,
        img: badgeValue
      },
      capture: false,
      name: 'badges-image'
    });
  }
};

export default (function () {
  G6.registerNode('graphin-circle', {
    options: {
      style: {},
      status: {}
    },
    draw: function draw(cfg, group) {
      // @ts-ignore
      var _theme = cfg.style._theme;
      this.options = getStyleByTheme(_theme);
      var style = deepMix({}, this.options.style, cfg.style); // getStyles({}, this.options.style, cfg.style) as NodeStyle;

      /** 将初始化样式存储在model中 */

      cfg._initialStyle = Object.assign({}, style);
      var icon = style.icon,
          _style$badges = style.badges,
          badges = _style$badges === void 0 ? [] : _style$badges,
          keyShapeStyle = style.keyshape;
      var r = getRadiusBySize(keyShapeStyle.size); // halo 光晕

      group.addShape('circle', parseHalo(style)); // keyshape 主容器

      var keyShape = group.addShape('circle', parseKeyshape(style)); // 文本

      group.addShape('text', parseLabel(style)); // keyShape 中间的 icon

      var type = icon.type;

      if (type === 'text' || type === 'font') {
        group.addShape('text', parseIcon(style));
      }

      if (type === 'image') {
        var imageAttrs = parseIcon(style);
        var imageShape = group.addShape('image', imageAttrs);
        var clip = style.icon.clip;

        if (clip) {
          var _r = clip.r,
              clipStyle = __rest(clip, ["r"]);

          imageShape.setClip({
            type: 'circle',
            attrs: Object.assign({
              x: 0,
              y: 0,
              r: _r
            }, clipStyle)
          });
        }
      } // badges 会存在多个的情况


      badges.forEach(function (badge) {
        drawBadge(badge, group, r);
      });
      return keyShape;
    },
    setState: function setState(name, value, item) {
      var _a;

      if (!name) return;
      var model = item.getModel();
      var shapes = item.getContainer().get('children'); // 顺序根据 draw 时确定

      var initStateStyle = deepMix({}, this.options.status, model.style.status);

      var initialStyle = item.getModel()._initialStyle;

      var status = ((_a = item._cfg) === null || _a === void 0 ? void 0 : _a.states) || [];

      try {
        Object.keys(initStateStyle).forEach(function (statusKey) {
          if (name === statusKey) {
            if (value) {
              setStatusStyle(shapes, initStateStyle[statusKey], parseAttr); // 匹配到status就改变
            } else {
              setStatusStyle(shapes, initialStyle, parseAttr); // 没匹配到就重置

              status.forEach(function (key) {
                // 如果cfg.status中还有其他状态，那就重新设置回来
                setStatusStyle(shapes, initStateStyle[key], parseAttr);
              });
            }
          }
        });
      } catch (error) {
        console.error(error);
      }
    },
    update: function update(cfg, item) {
      if (!cfg.style) return;

      try {
        var style = deepMix({}, cfg._initialStyle, cfg.style); // getStyles(cfg._initialStyle, cfg.style) as NodeStyle;

        cfg._initialStyle = Object.assign({}, style);
        var badges = style.badges,
            keyshape = style.keyshape;
        var r = getRadiusBySize(keyshape.size);
        var group = item.getContainer();
        var shapes = group.get('children');
        setStatusStyle(shapes, style, parseAttr);

        var copyShapes = _toConsumableArray(shapes);

        if (badges) {
          var index = 0;
          copyShapes.forEach(function (shape) {
            if (shape.cfg.name.startsWith('badges')) {
              shapes.splice(index, 1);
            } else {
              index = index + 1;
            }
          });
          badges.forEach(function (badge) {
            drawBadge(badge, group, r);
          });
        }
      } catch (error) {
        console.error('error');
      }
    } // eslint-disable-next-line @typescript-eslint/no-explicit-any

  });
});