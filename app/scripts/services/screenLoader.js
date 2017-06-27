'use strict';

app.factory('screenLoaderSrv', function(eventSrv, CONFIG) {

  // COMPONENT
  var SERVICE = {  };
  // -->

  // OPERATIONS
  SERVICE.show = function() {
    eventSrv.dispatch(CONFIG.SCREEN_LOADER.SHOW_EVENT, null, { log: false });
  };

  SERVICE.hide = function() {
    eventSrv.dispatch(CONFIG.SCREEN_LOADER.HIDE_EVENT, null, { log: false });
  };
  // -->

  return SERVICE;

});
