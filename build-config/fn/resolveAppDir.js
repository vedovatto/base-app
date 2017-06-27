'use strict';

module.exports = function(common) {

  var fn = function(path) {
    var newPath = path;

    if (Array.isArray(newPath)) {
      if (newPath.length === 0) {
        return [  ];
      }

      var result = [ fn(newPath.shift()) ];

      if (newPath.length === 0) {
        return result;
      }

      return result.concat(fn(newPath));
    }

    var baseDir = common.directories.VARS.APP_BASE_PATH;
    var negate = false;

    if (newPath[ 0 ] === '!') {
      negate = true;
      newPath = newPath.substr(1);
    }

    return (negate ? '!' : '') + baseDir + newPath;
  };

  return function(path) {
    var newPath = path;

    if (Array.isArray(newPath)) {
      newPath = newPath.slice();
    } else {
      newPath = [ newPath ];
    }

    return fn(newPath);
  };

};
