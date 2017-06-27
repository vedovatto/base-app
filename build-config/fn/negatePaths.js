'use strict';

module.exports = function(common) {

  return function(paths) {
    var negate = function(path) {
      return (path[ 0 ] !== '!' ? '!' : '') + path;
    };

    if (Array.isArray(paths)) {
      return paths.map(function(item) {
        return negate(item);
      });
    } else {
      return negate(paths);
    }
  };

};
