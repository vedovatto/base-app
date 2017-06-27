'use strict';

app.factory('routingAccessControlSrv', function($log, $q, $state, userSessionSrv, CONFIG, STATES, VALUES) {

  // COMPONENT
  var SERVICE = {  };
  // -->

  // OPERATIONS
  SERVICE.authorize = function(event, toState, toParams, fromState, fromParams) {
    var resultPromise = null;

    if (!toState.data || !toState.data.authStatus) {
      resultPromise = $q.resolve(getStateTransition(toState, toParams));
    } else {
      resultPromise = userSessionSrv.session(true)
        .then(
          function(data) {
            var state = toState;
            var params = toParams;

            if (!!data && toState.data.authStatus.indexOf(data.status) < 0) {
              state = $state.get(STATES[ VALUES.ACCOUNT_STATUS_FALLBACK[ data.status ] ].name);
              params = null;
            }

            return getStateTransition(state, params);
          },
          function(response) {
            $log.error('routingAccessControlSrv', 'Error while retrieving session info.', response);

            if (angular.isString(CONFIG.DEFAULT_STATE)) {
              return $q.resolve(getStateTransition($state.get(STATES[ CONFIG.DEFAULT_STATE ].name), null));
            }

            return $q.reject(response);
          }
        );
    }

    return resultPromise;
  };
  // -->

  // PRIVATE OPERATIONS
  var getStateTransition = function(state, params) {
    return { toState: state, toParams: params };
  };
  // -->

  return SERVICE;

});
