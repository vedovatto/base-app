'use strict';

app.directive('appMainHeader', function(CONFIG) {

  // COMPONENT OPERATIONS
  var controller = function($scope, routeSrv) {

    // PROPERTIES
    $scope.routes = routeSrv;
    // -->

  };
  // -->

  return {
    restrict: 'E',
    replace: CONFIG.DIRECTIVES.REPLACE_HTML,
    transclude: false,
    controller: [ '$scope', 'routeSrv', controller ],
    templateUrl: 'directives/appMainHeader/main.html'
  };

});
