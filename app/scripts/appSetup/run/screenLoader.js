'use strict';

app.run(function($injector) {
  var $rootScope = $injector.get('$rootScope');
  var eventSrv = $injector.get('eventSrv');
  var CONFIG = $injector.get('CONFIG');

  // GLOBAL PROPERTIES
  $rootScope[ CONFIG.SCREEN_LOADER.COUNTER_NAME ] = 0;
  // -->

  // EVENTS
  eventSrv.listen(CONFIG.SCREEN_LOADER.SHOW_EVENT, function() {
    $rootScope[ CONFIG.SCREEN_LOADER.COUNTER_NAME ]++;
  }, { log: false });

  eventSrv.listen(CONFIG.SCREEN_LOADER.HIDE_EVENT, function() {
    $rootScope[ CONFIG.SCREEN_LOADER.COUNTER_NAME ]--;
  }, { log: false });
  // -->
});
