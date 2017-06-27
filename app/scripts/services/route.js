'use strict';

app.factory('routeSrv', function($state, STATES) {

  // COMPONENT
  var SERVICE = {  };
  // -->

  // PRIVATE OPERATIONS
  var go = function(state) {
    $state.go(state);
  };
  // -->

  // OPERATIONS
  SERVICE.gotoHome = function() {
    go(STATES.HOME.name);
  };
  // -->

  return SERVICE;

});
