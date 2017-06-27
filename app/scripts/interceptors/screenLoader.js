'use strict';

app.factory('screenLoaderItr', function($q, eventSrv, CONFIG) {

  // COMPONENT
  var INTERCEPTOR = {  };
  // -->

  // OPERATIONS
  INTERCEPTOR.request = function(config) {
    loader(true, config.url);

    return config;
  };

  INTERCEPTOR.requestError = function(rejection) {
    loader(false, rejection.config.url);

    return rejection;
  };

  INTERCEPTOR.response = function(response) {
    loader(false, response.config.url);

    return response;
  };

  INTERCEPTOR.responseError = function(rejection) {
    var url = angular.isObject(rejection.config) ? rejection.config.url : null;

    loader(false, url);

    return $q.reject(rejection);
  };
  // -->

  // PRIVATE OPERATIONS
  var getEventName = function(show) {
    return (show) ? CONFIG.SCREEN_LOADER.SHOW_EVENT : CONFIG.SCREEN_LOADER.HIDE_EVENT;
  };

  var isUrlIgnored = function(url) {
    return CONFIG.SCREEN_LOADER.IGNORED.some(function(rawUrl) {
      return url === rawUrl || (rawUrl.indexOf('**') >= 0 && !rawUrl.split('**').some(function(piece) {
        return piece !== '' && url.indexOf(piece) < 0;
      }));
    });
  };

  var loader = function(show, url) {
    if (angular.isString(url) && isUrlIgnored(url)) {
      return;
    }

    eventSrv.dispatch(getEventName(show), null, { log: false });
  };
  // -->

  return INTERCEPTOR;

});
