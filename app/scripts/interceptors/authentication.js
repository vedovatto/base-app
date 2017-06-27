'use strict';

app.factory('authenticationItr', function($injector, $q, $rootScope, $window, STATES, VALUES) {

  // COMPONENT
  var INTERCEPTOR = {  };
  // -->

  // OPERATIONS
  INTERCEPTOR.responseError = function(rejection) {
    if (rejection.status === VALUES.HTTP_STATUS.FORBIDDEN) {
      var $state = $injector.get('$state');
      var defaultUrl = $state.href($state.get(STATES[ CONFIG.DEFAULT_STATE ].name), null, { absolute: true });

      if ($window.location.href !== defaultUrl) {
        $window.location.href = defaultUrl;
      }
    }

    return $q.reject(rejection);
  };
  // -->

  return INTERCEPTOR;

});
