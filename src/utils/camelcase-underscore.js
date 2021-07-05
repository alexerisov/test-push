function camelcaseToUnderscore(obj) {
  var newObj = {};

  for (var key in obj) {
    var newKey = _replaceToUnderscore(key);
    newObj[newKey] = obj[key];
  }

  return newObj;
}

function _replaceToUnderscore(text) {
  return text.replace(/\.?([A-Z]+)/g, _replaceFunc).replace(/^_/, "");
}

function _replaceFunc(x, y) {
  return "_" + y.toLowerCase();
}

export default camelcaseToUnderscore;
