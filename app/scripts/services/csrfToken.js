'use strict';

app.factory('csrfTokenSrv', function(requestSrv, ENDPOINTS) {

  // COMPONENT
  var SERVICE = {  };
  // -->

  // OPERATIONS
  SERVICE.update = function() {
    return requestSrv.get(ENDPOINTS.UPDATE_CSRF_TOKEN);
  };
  // -->

  return SERVICE;

});
