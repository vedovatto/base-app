'use strict';

module.exports = function(common) {

  return function(fileName) {
    var MIN_SUFFIX = 'min';

    var extStart = fileName.lastIndexOf('.');

    if (extStart < 0) {
      return fileName + '.' + MIN_SUFFIX;
    }

    return fileName.substring(0, extStart) + '.' + MIN_SUFFIX + fileName.substr(extStart);
  };

};
