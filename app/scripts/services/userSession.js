'use strict';

app.factory('userSessionSrv', function($log, $q, VALUES) {

  // COMPONENT
  var SERVICE = {  };
  // -->

  // PRIVATE PROPERTIES
  var data = null;
  var updatePromise = null;
  // -->

  // OPERATIONS
  SERVICE.cachedSessionData = function() {
    return angular.copy(data);
  };

  SERVICE.logout = function() {
    return requestSessionLogout()
      .finally(
        function() {
          data = null;
          updatePromise = null;
        }
      );
  };

  SERVICE.session = function(mustReload) {
    if (!!updatePromise) {
      return updatePromise;
    }

    if (!!data && !mustReload) {
      return $q.resolve(SERVICE.cachedSessionData());
    }

    return loadInfo();
  };

  SERVICE.updateSession = function() {
    return SERVICE.session(true);
  };
  // -->

  // PRIVATE OPERATIONS
  var loadInfo = function() {
    var promise = requestSessionInfo()
      .then(
        function(response) {
          if (response.success) {
            data = {
              status: response.data.status,
              isAuthenticated: response.data.status === VALUES.ACCOUNT_STATUS.AUTHENTICATED,
              user: response.data.user,
              customData: response.data.customData
            };

            return angular.copy(data);
          } else {
            logError(response);

            return $q.reject(response);
          }
        },
        function(response) {
          logError(response);

          return $q.reject(response);
        }
      )
      .finally(
        function() {
          updatePromise = null;
        }
      );

    return updatePromise = promise;
  };

  var logError = function(response) {
    $log.error('There was an error loading session info.', response);
  };

  // FIXME: implement Session Info request
  var requestSessionInfo = function() {
    var deferred = $q.defer();

    deferred.resolve({
      success: true,
      data: {
        status: VALUES.ACCOUNT_STATUS.AUTHENTICATED,
        user: {  },
        customData: {  }
      }
    });

    return deferred.promise;
  };

  // FIXME: implement Session Logout request
  var requestSessionLogout = function() {
    return $q.resolve();
  };
  // -->

  return SERVICE;

});
