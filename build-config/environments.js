'use strict';

module.exports = function(common) {

  // Return application url
  var fnGetAppUrl = function() {
    return this.host + ':' + this.port + this.context;
  };

  // Return application api url
  var fnGetAppApiUrl = function() {
    return this.getAppUrl() + this.api;
  };

  var environments = {
    dev: common.plugins.gulpEnvironments.make('dev'),
    qa: common.plugins.gulpEnvironments.make('qa'),
    hml: common.plugins.gulpEnvironments.make('hml'),
    prd: common.plugins.gulpEnvironments.make('prd'),
    current: function() {
      if (this.qa()) {
        return this.qa;
      }

      if (this.hml()) {
        return this.hml;
      }

      if (this.prd()) {
        return this.prd;
      }

      return this.dev;
    }
  };

  environments.dev.app = {
    domain: 'local.app.com.br',
    host: 'http://local.app.com.br',
    port: 8080,
    context: '',
    api: '/api',
    getAppUrl: fnGetAppUrl,
    getAppApiUrl: fnGetAppApiUrl
  };

  environments.qa.app = {
    domain: 'qa.app.com.br',
    host: 'http://qa.app.com.br',
    port: 8080,
    context: '',
    api: '/api',
    getAppUrl: fnGetAppUrl,
    getAppApiUrl: fnGetAppApiUrl
  };

  environments.hml.app = {
    domain: 'test.app.com.br',
    host: 'https://test.app.com.br',
    port: 80,
    context: '',
    api: '/api',
    getAppUrl: fnGetAppUrl,
    getAppApiUrl: fnGetAppApiUrl
  };

  environments.prd.app = {
    domain: 'app.com.br',
    host: 'https://app.com.br',
    port: 80,
    context: '',
    api: '/api',
    getAppUrl: fnGetAppUrl,
    getAppApiUrl: fnGetAppApiUrl
  };

  return environments;

};
