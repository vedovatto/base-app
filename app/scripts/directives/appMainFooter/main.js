'use strict';

app.directive('appMainFooter', function(CONFIG) {

  return {
    restrict: 'E',
    replace: CONFIG.DIRECTIVES.REPLACE_HTML,
    transclude: false,
    templateUrl: 'directives/appMainFooter/main.html'
  };

});
