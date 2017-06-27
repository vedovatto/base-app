'use strict';

app.factory('dateTimeSrv', function(MomentJS, CONFIG) {

  // COMPONENT
  var SERVICE = {  };
  // -->

  // PRIVATE OPERATIONS
  var init = function() {
    MomentJS.locale(CONFIG.DEFAULT_LOCALE);
  };
  // -->

  // OPERATIONS
  SERVICE.now = function() {
    return MomentJS();
  };

  SERVICE.with = function(input, locale, format, strict) {
    return MomentJS(input, locale, format, strict);
  };
  // -->

  // CONSTRUCTOR
  init();
  // -->

  return SERVICE;

});
