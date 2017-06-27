'use strict';

app.factory('stringResolverSrv', function() {

  // COMPONENT
  var SERVICE = {  };
  // -->

  // PRIVATE PROPERTIES
  var DEFAULT_OPEN_CHAR = '{';
  var DEFAULT_CLOSE_CHAR = '}';
  // -->

  // PRIVATE OPERATIONS
  var getConfig = function(opts) {
    var opts = opts || {  };

    var config = {
      openChar: opts.openChar || DEFAULT_OPEN_CHAR,
      closeChar: opts.closeChar || DEFAULT_CLOSE_CHAR
    };

    return config;
  };
  // -->

  // OPERATIONS
  SERVICE.resolve = function(message, params, opts) {
    if (!params) {
      return message;
    }

    if (!angular.isString(message)) {
      throw new Error('"message" must be of type String.');
    }

    if (!angular.isObject(params) && !angular.isArray(params)) {
      throw new Error('"params" must be of type Object or Array.');
    }

    var config = getConfig(opts);
    var msg = message;

    Object.keys(params).forEach(function(paramName) {
      msg = msg.replace(config.openChar + paramName + config.closeChar, params[ paramName ]);
    });

    return msg;
  };
  // -->

  return SERVICE;

});
