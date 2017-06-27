'use strict';

app.config(function($injector) {
  var $httpProvider = $injector.get('$httpProvider');

  $httpProvider.defaults.headers.common[ 'X-Requested-With' ] = 'XMLHttpRequest';
  $httpProvider.interceptors.push('screenLoaderItr');
  $httpProvider.interceptors.push('authenticationItr');
});
