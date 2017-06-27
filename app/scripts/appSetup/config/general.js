'use strict';

app.config(function($injector) {
  var CONFIG = $injector.get('CONFIG');

  $injector.get('$compileProvider').debugInfoEnabled(CONFIG.IS_DEBUG_ENABLED);
  $injector.get('$locationProvider').html5Mode(CONFIG.IS_HTML5_ENABLED);
  $injector.get('$logProvider').debugEnabled(CONFIG.IS_DEBUG_ENABLED);
  $injector.get('$sceDelegateProvider').resourceUrlWhitelist([ 'self' ].concat(CONFIG.WHITELIST_STATIC_RESOURCES || [  ]));
});
