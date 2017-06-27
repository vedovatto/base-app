'use strict';

app.directive('tcccIncludeStatic', function(VIEW_VARS) {

  // COMPONENT OPERATIONS
  var controller = function($scope) {

    // OPERATIONS
    $scope.getUrl = function() {
      if (!!$scope.absolute) {
        return $scope.url;
      }

      var prefix = VIEW_VARS.STATIC_URL_PREFIX;
      var url = $scope.url;

      var prefixHasSlash = prefix[ prefix.length - 1 ] === '/';
      var urlHasSlash = url[ 0 ] === '/';

      prefix = prefixHasSlash ? prefix.substring(0, prefix.length - 1) : prefix;
      url = urlHasSlash ? url.substr(1) : url;

      return prefix + '/' + url;
    };
    // -->

  };
  // -->

  return {
    restrict: 'E',
    replace: false,
    transclude: false,
    controller: [ '$scope', controller ],
    scope: {
      url: '@',
      absolute: '@'
    },
    templateUrl: 'directives/tcccIncludeStatic/main.html'
  };

});
