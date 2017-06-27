'use strict';

app.run(function($injector) {
  var $state = $injector.get('$state');
  var eventSrv = $injector.get('eventSrv');
  var messageSrv = $injector.get('messageSrv');
  var routingAccessControlSrv = $injector.get('routingAccessControlSrv');
  var screenLoaderSrv = $injector.get('screenLoaderSrv');
  var userSessionSrv = $injector.get('userSessionSrv');

  userSessionSrv.session(true); // ensure local session initiation

  eventSrv.listen('$stateChangeStart', function(event, toState, toParams, fromState, fromParams) {
    event.preventDefault();
    screenLoaderSrv.show();
    messageSrv.clearAll();

    var authorization = routingAccessControlSrv.authorize(
      event,
      toState,
      toParams,
      fromState,
      fromParams
    );

    var handleAuthorization = function(result) {
      $state.go(result.toState, result.toParams, { notify: false })
        .then(
          function() {
            eventSrv.dispatch('$stateChangeSuccess', { toState: result.toState, toParams: result.toParams, fromState: fromState, fromParams: fromParams }, { log: false });
          }
        );
    };

    authorization
      .then(handleAuthorization)
      .finally(screenLoaderSrv.hide);
  }, { log: false });
});
