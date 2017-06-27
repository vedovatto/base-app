'use strict';

app.config(function($injector) {
  var $provide = $injector.get('$provide');
  var entities = $injector.get('RESOURCES').ENTITIES;

  entities.forEach(function(entity) {
    // AngularJS Resource definition
    $provide.provider(entity.name, function() {

      this.$get = ['restEntitySrv', function(restEntitySrv) {
        return restEntitySrv.getResource(entity);
      }];

    });
    // -->

    // decorator for adding Model operations (such as List and Form) and a proxy 'save' operation
    $provide.decorator(entity.name, [ '$delegate', 'modelSrv', function($delegate, modelSrv) {

      // OPERATIONS
      $delegate.gotoDetail = function(item, params) {
        modelSrv.detail($delegate, item, params);
      };

      $delegate.gotoForm = function(item, params) {
        modelSrv.form($delegate, item, params);
      };

      $delegate.gotoList = function(params) {
        modelSrv.list($delegate, params);
      };

      $delegate.save = function(item) {
        if (!angular.isObject(item)) {
          throw new Error('Item must be an object.');
        }

        if (!!item.id) {
          return $delegate.update(item);
        } else {
          return $delegate.create(item);
        }
      };
      // -->

      return $delegate;
    } ]);
    // -->
  });
});
