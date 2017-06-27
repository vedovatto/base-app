'use strict';

app.factory('requestSrv', function($http, $log, $q, stringResolverSrv) {

  // COMPONENT
  var SERVICE = {  };
  // -->

  // PRIVATE OPERATIONS
  var asArray = function(value) {
    return angular.isArray(value) ? value : [ value ];
  };

  var checkEventHandlers = function(options, configs) {
    if (configs.hasOwnProperty('eventHandlers')) {
      ensureIsOfType('object', 'eventHandlers', configs.eventHandlers);
      options.eventHandlers = configs.eventHandlers;
    }

    if (configs.hasOwnProperty('uploadEventHandlers')) {
      ensureIsOfType('object', 'uploadEventHandlers', configs.uploadEventHandlers);
      options.uploadEventHandlers = configs.uploadEventHandlers;
    }
  };

  var checkDistinctSettings = function(options, configs) {
    if (configs.hasOwnProperty('cache')) {
      ensureIsOfType([ 'object', 'boolean' ], 'cache', configs.cache);
      options.cache = configs.cache;
    } else {
      options.cache = false;
    }

    if (configs.hasOwnProperty('withCredentials')) {
      ensureIsOfType('boolean', 'withCredentials', configs.withCredentials);
      options.withCredentials = configs.withCredentials;
    } else {
      options.withCredentials = false;
    }

    if (configs.hasOwnProperty('responseType')) {
      ensureIsOfType('string', 'responseType', configs.responseType);
      options.responseType = configs.responseType;
    }

    if (configs.hasOwnProperty('isMultipartForm')) {
      ensureIsOfType('boolean', 'isMultipartForm', configs.isMultipartForm);

      if (configs.isMultipartForm) {
        options.headers = angular.extend({ 'Content-Type': 'undefined' }, options.headers);
        options.transformRequest = fnObjToFormData;
      }
    }
  };

  var checkTransformers = function(options, configs) {
    options.transformRequest = asArray($http.defaults.transformRequest);
    options.transformResponse = asArray($http.defaults.transformResponse);

    if (configs.hasOwnProperty('appendTransformRequest')) {
      ensureIsOfType('function', 'appendTransformRequest', configs.appendTransformRequest);
      options.transformRequest.push(configs.appendTransformRequest);
    }

    if (configs.hasOwnProperty('transformRequest')) {
      ensureIsOfType('function', 'transformRequest', configs.transformRequest);
      options.transformRequest = configs.transformRequest;
    }

    if (configs.hasOwnProperty('appendTransformResponse')) {
      ensureIsOfType('function', 'appendTransformResponse', configs.appendTransformResponse);
      options.transformResponse.push(configs.appendTransformResponse);
    }

    if (configs.hasOwnProperty('transformResponse')) {
      ensureIsOfType('function', 'transformResponse', configs.transformResponse);
      options.transformResponse = configs.transformResponse;
    }
  };

  var ensureIsOfType = function(type, paramName, paramValue) {
    var types = asArray(type);
    var currentType = typeof(paramValue);
    var isValid = types.some(function(item) {
      return currentType === item;
    });

    if (!isValid) {
      throw new Error(String.format("Parameter '{0}' must be of type '{1}'. (value = {2}, type = {3})", paramName, types.join(', '), paramValue, currentType));
    }
  };

  var fnObjToFormData = function(data, headersGetter) {
    var formData = new FormData();

    angular.forEach(data, function(value, key) {
      formData.append(key, value);
    });

    return formData;
  };

  var log = function(action, args, data) {
    $log.debug('requestSrv', action, args, data);
  };

  var newRequest = function(method, url, params, data, configs) {
    var configs = configs || {  };
    var params = params || {  };
    var data = data || {  };
    var isArray = configs.hasOwnProperty('isArray') ? !!configs.isArray : false;
    var requestResult = process(method, url, params, data, configs);

    return ret(requestResult, isArray);
  };

  var process = function(method, url, params, data, configs) {
    ensureIsOfType('string', 'url', url || configs.url);

    var options = {
      method: method,
      url: stringResolverSrv.resolve(url || configs.url, params),
      data: data || configs.data,
      headers: configs.headers || {  }
    };

    checkEventHandlers(options, configs);
    checkTransformers(options, configs);
    checkDistinctSettings(options, configs);

    log('NEW_REQUEST', arguments, null);

    return $http(options);
  };

  var processData = function(obj, data, isArray) {
    for (var index in data) {
      if (!data.hasOwnProperty(index)) {
        continue;
      }

      if (isArray) {
        obj.push(data[ index ]);
      } else {
        obj[ index ] = data[ index ];
      }
    }
  };

  var ret = function(promise, isArray) {
    var obj = isArray ? [  ] : {  };
    obj.$resolved = false;
    obj.$response = null;
    obj.$promise = promise
      .then(
        function(response) {
          log('REQUEST_RESOLVED', arguments, response);

          obj.$response = response;

          if (isArray !== angular.isArray(response.data)) {
            throw new Error('XHR misconfig.');
          }

          processData(obj, response.data, isArray);

          return obj;
        },
        function(response) {
          log('REQUEST_REJECTED', arguments, response);

          obj.$response = response;
          return $q.reject(response);
        }
      )
      .finally(
        function() {
          obj.$resolved = true;
        }
      );

    return obj;
  };
  // -->

  // OPERATIONS
  SERVICE.delete = function(url, params, configs) {
    return newRequest('DELETE', url, params, null, configs);
  };

  SERVICE.get = function(url, params, configs) {
    return newRequest('GET', url, params, null, configs);
  };

  SERVICE.post = function(url, params, data, configs) {
    return newRequest('POST', url, params, data, configs);
  };

  SERVICE.put = function(url, params, data, configs) {
    return newRequest('PUT', url, params, data, configs);
  };
  // -->

  return SERVICE;

});
