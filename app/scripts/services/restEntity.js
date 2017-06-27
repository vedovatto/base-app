'use strict';

app.factory('restEntitySrv', function($resource, RESOURCES) {

  // COMPONENT
  var SERVICE = {  };
  // -->

  // OPERATIONS
  SERVICE.getResource = function(entity) {
    var baseUrl = RESOURCES.DEFAULT_ENTITY_URL.replace('{endpoint}', entity.endpoint);
    var resource = $resource(baseUrl, null, this.getBasicOperations(baseUrl, entity.configs));
    resource.entity = entity;

    return resource;
  };

  SERVICE.getBasicOperations = function(baseUrl, configs) {
    var operations = {
      query: { method: 'GET', url: baseUrl, isArray: true },
      get: { method: 'GET', url: baseUrl, params: { id: '@id' } },
      create: { method: 'POST', url: baseUrl },
      update: { method: 'PUT', url: baseUrl, params: { id: '@id' } },
      delete: { method: 'DELETE', url: baseUrl, params: { id: '@id' } }
    };

    if (angular.isObject(configs)) {
      Object.getOwnPropertyNames(configs).forEach(function(item) {
        var operation = operations[ item ] || { method: 'GET', url: baseUrl, params: { id: '@id' } }; // if operation does not exist, create a basic one
        operations[ item ] = angular.extend({  }, operation, configs[ item ]);
      });
    }

    return operations;
  };
  // -->

  return SERVICE;

});
