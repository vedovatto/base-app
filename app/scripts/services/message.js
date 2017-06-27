'use strict';

app.factory('messageSrv', function($q, $rootScope, stringResolverSrv, SERVICES) {

  // COMPONENT
  var SERVICE = {  };
  // -->

  // PRIVATE PROPERTIES
  var SETTINGS = SERVICES.MESSAGE_SRV;
  var showingGenericError = false;
  // -->

  // PRIVATE OPERATIONS
  var show = function(title, message, params, type) {
    var deferred = $q.defer();

    // TODO: implement friendly messaging
    alert(type.NAME + ' - ' + title + ' - ' + stringResolverSrv.resolve(message, params));

    deferred.resolve();

    return deferred.promise;
  };
  // -->

  // OPERATIONS
  SERVICE.clearAll = function() {
    // TODO: clear all pending messages;
  };

  SERVICE.showAlert = function(title, message, params) {
    return show(title, message, params, SETTINGS.TYPES.ALERT);
  };

  SERVICE.showConfirm = function(title, message, params) {
    return show(title, message, params, SETTINGS.TYPES.CONFIRM);
  };

  SERVICE.showError = function(title, message, params) {
    return show(title, message, params, SETTINGS.TYPES.ERROR);
  };

  SERVICE.showInfo = function(title, message, params) {
    return show(title, message, params, SETTINGS.TYPES.INFO);
  };

  SERVICE.showSuccess = function(title, message, params) {
    return show(title, message, params, SETTINGS.TYPES.SUCCESS);
  };

  SERVICE.showWarning = function(title, message, params) {
    return show(title, message, params, SETTINGS.TYPES.WARNING);
  };

  SERVICE.showGenericError = function() {
    if (showingGenericError) {
      return;
    }

    showingGenericError = true;

    var message = SERVICE.showError('Oops!', 'Tivemos um problema e não conseguimos carregar as informações neste momento. Tente novamente em alguns minutos.', null);

    var deferred = $q.defer();

    message
      .then(deferred.resolve, deferred.reject)
      .finally(function() {
        showingGenericError = false;
      });

    return deferred.promise;
  };
  // -->

  return SERVICE;

});
