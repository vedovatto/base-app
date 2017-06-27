'use strict';

app.factory('modelSrv', function($state, RESOURCES, STATES) {

  // COMPONENT
  var SERVICE = {  };
  // -->

  // PRIVATE OPERATIONS
  var buildStateName = function(resource, format) {
    return format
      .replace('{entityId}', resource.entity.id);
  };

  var getParams = function(item, params) {
    return angular.extend(angular.isObject(item) ? { id: item.id } : {  }, params || {  });
  };

  var go = function(resource, actionName, params) {
    var state = STATES[ buildStateName(resource, RESOURCES.STATES_FORMAT[ actionName ]) ];

    if (!state) {
      throw new Error('State used, but missing in configs.', resource, actionName, params);
    }

    $state.go(state.name, params);
  };
  // -->

  // COMPONENT OPERATIONS
  SERVICE.detail = function(resource, item, params) {
    go(resource, 'DETAIL', getParams(item, params));
  };

  SERVICE.form = function(resource, item, params) {
    go(resource, 'FORM', getParams(item, params));
  };

  SERVICE.list = function(resource, params) {
    go(resource, 'LIST', getParams(null, params));
  };
  // -->

  return SERVICE;

});
