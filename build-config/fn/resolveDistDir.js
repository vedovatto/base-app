'use strict';

module.exports = function(common) {

  var fn = function(path) {
    var baseDir = common.directories.VARS.DIST_BASE_PATH;
    var newPath = path;
    var negate = false;

    if (newPath[ 0 ] === '!') {
      negate = true;
      newPath = newPath.substr(1);
    }

    return (negate ? '!' : '') + baseDir + newPath;
  };

  return function(path) {
    if (Array.isArray(path)) {
      throw new Error('Array being passed to Dist folder resolver!');
    }

    return fn(path);
  };

};
