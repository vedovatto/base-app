'use strict';

app.filter('trust', function($sce) {

  return function(input, type) {
    if (!angular.isString(input)) {
      return input;
    }

    return $sce.trustAs(type || 'html', input);
  };

});
