function cssToArray(style) {
  return style
    .replace(/;$/, '')
    .replace(/;\s*;/g, ';')
    .split(';')
    .map(function (ruleset) {
      return ruleset
        .split(':')
        .map(str => str.trim());
    });
}

function getRule(rule, style) {
  if (!style) return '';
  var cssObject = cssToObject(style);
  return cssObject[rule]
    ? `${rule}:${cssObject[rule]};`
    : '';
}

function getValue(property, style) {
  if (!style) return '';
  return cssToObject(style)[property];
}

function cssToObject(style) {
  var cssArray = cssToArray(style);
  var cssObject = {};

  for (var i = 0; i < cssArray.length; i++) {
    cssObject[cssArray[i][0]] = cssArray[i][1];
  }

  return cssObject;
}

function objectToCss(obj) {
  var cssString = '';
  for(var key in obj) {
    cssString += `${key}:${obj[key]};`
  }
  return cssString.replace(/;$/, '');
}

function mergeStyles() {
  var styles = Array.prototype.slice.call(arguments).reduce((a, b) => a + ';' + b);
  var merged = cssToObject(styles);
  return objectToCss(merged);
}

module.exports = {
  cssToArray,
  objectToCss,
  mergeStyles,
  cssToObject,
  getRule,
  getValue,
}