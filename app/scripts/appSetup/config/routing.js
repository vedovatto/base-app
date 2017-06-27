'use strict';

app.config(function($injector) {
  var $urlRouterProvider = $injector.get('$urlRouterProvider');
  var $stateProvider = $injector.get('$stateProvider');
  var STATES = $injector.get('STATES');

  $urlRouterProvider.otherwise(function($injector, $location) {
    $injector.get('$state').go(STATES.HOME.name);
  });

  Object.keys(STATES).forEach(function(item) {
    var state = STATES[ item ];

    var stateSettings = {
      url: state.url || '',
      templateUrl: state.templateUrl || '',
      controller: state.controller || '',
      data: state.data || {  },
      params: state.params || {  }
    };

    $stateProvider.state(state.name, stateSettings);
  });
});
