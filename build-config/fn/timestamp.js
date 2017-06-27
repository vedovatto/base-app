'use strict';

module.exports = function(common) {

  return function() {
    return (new Date()).toISOString().replace(/[^0-9]/g, '').toString();
  };

};
