'use strict';

app.factory('eventSrv', function($log, $rootScope) {

  // COMPONENT
  var SERVICE = {  };
  // -->

  // PRIVATE PROPERTIES
  var handlers = [  ];
  // -->

  // PRIVATE OPERATIONS
  var getValid = function(param, def) {
    return param ? param : (def || {  });
  };

  var getHandlersForName = function(name) {
    return handlers.filter(function(item) {
      return item.name === name;
    });
  };

  var canLog = function(options) {
    var opt = getValid(options);

    if (!opt.hasOwnProperty('log')) {
      return true;
    }

    return !!opt.log;
  };

  var log = function(description, args, options) {
    if (!canLog(options)) {
      return;
    }

    $log.debug(description, args);
  };
  // -->

  // OPERATIONS
  SERVICE.dispatch = function(name, data, options) {
    log('eventSrv.dispatch', arguments, options);

    var opt = getValid(options);
    (opt.on || $rootScope).$broadcast(name, data);
  };

  SERVICE.listen = function(name, fn, options) {
    log('eventSrv.listen', arguments, options);

    var opt = getValid(options);
    var scope = opt.on || $rootScope;

    var handler = {  };
    handler.name = name;
    handler.onScope = scope;
    handler.functionCall = scope.$on(name, fn);

    if (angular.isObject(opt.destroyFor)) {
      handler.destroyCall = opt.destroyFor.$on('$destroy', function() {
        log('eventSrv.listen.destroyCall', arguments, options);
        handler.functionCall();
      });
    }

    handlers.push(handler);
  };

  SERVICE.unlisten = function(name, onScope, ignoreScope, options) {
    log('eventSrv.unlisten', arguments, options);

    var scope = onScope || $rootScope;

    getHandlersForName(name).forEach(function(item) {
      if (!ignoreScope && item.onScope !== scope) {
        return;
      }

      if (angular.isFunction(item.destroyCall)) {
        item.destroyCall();
      }

      item.functionCall();
    });
  };
  // -->

  return SERVICE;

});
