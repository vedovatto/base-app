'use strict';

app.directive('appScreenLoader', function($q, $rootScope, $timeout, eventSrv, CONFIG, VALUES) {

  // PRIVATE PROPERTIES
  var HIDE_UI_DELAY = 900; // ms
  var showing = false;
  // -->

  // PRIVATE OPERATIONS
  var getCounter = function() {
    var value = $rootScope[ CONFIG.SCREEN_LOADER.COUNTER_NAME ];
    return parseInt(value, VALUES.NUMBER_RADIX.DECIMAL);
  };

  var update = function(scope, element) {
    var updateStatus = function(status) {
      return function() {
        scope.isUIEnabled = status;
      };
    };

    var updateConfig = null;
    var counter = getCounter();
    var previousStatus = showing;

    if (counter === 0 && showing) {
      showing = false;
      updateConfig = {
        event: CONFIG.SCREEN_LOADER.HIDDEN_EVENT,
        timeout: HIDE_UI_DELAY
      };
    }

    if (counter > 0 && !showing) {
      showing = true;
      updateConfig = {
        event: CONFIG.SCREEN_LOADER.SHOWN_EVENT,
        timeout: 0
      };
    }

    if (previousStatus !== showing) {
      updateUI(element, showing, updateConfig.event, updateConfig.timeout)
        .then(updateStatus(showing));
    }
  };

  var updateUI = function(element, status, event, timeout) {
    var deferred = $q.defer();

    $timeout(function() {
      var classPrefix = 'app-screen-loader';

      var body = angular.element('body');
      body.toggleClass(classPrefix + '-body--shown', status);
      body.toggleClass(classPrefix + '-body--hidden', !status);

      eventSrv.dispatch(event, null, { log: false });
      deferred.resolve();
    }, timeout);

    return deferred.promise;
  };
  // -->

  // COMPONENT OPERATIONS
  var link = function(scope, element, attrs, ctl, transcludeFn) {

    // PROPERTIES
    scope.isUIEnabled = false;
    // -->

    // PRIVATE OPERATIONS
    var setup = function() {
      // Setup Events listeners
      eventSrv.listen(CONFIG.SCREEN_LOADER.SHOW_EVENT, function() {
        update(scope, element);
      }, { log: false });

      eventSrv.listen(CONFIG.SCREEN_LOADER.HIDE_EVENT, function() {
        update(scope, element);
      }, { log: false });
      // -->
    };
    // -->

    // OPERARATIONS
    scope.isShowing = function() {
      return scope.isUIEnabled;
    };
    // -->

    // EVENTS
    angular.element(document).ready(function() {
      setup();
      update(scope, element);
    });
    // -->

  };
  // -->

  return {
    restrict: 'E',
    replace: CONFIG.DIRECTIVES.REPLACE_HTML,
    transclude: false,
    link: link,
    templateUrl: 'directives/appScreenLoader/main.html'
  };

});
