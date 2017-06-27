'use strict';

module.exports = function(common) {

  return function() {
    var requireGlob = common.plugins.requireGlob;
    var decamelize = common.plugins.decamelize;
    var fnExtend = common.plugins.lodash.extend;
    var currentEnvironment = common.environments.current().$name;

    try {
      var configs = {  };

      // Global configs
      var globalConfigsFiles = requireGlob.sync(common.fn.resolveAppDir(common.directories.constants.application.source), { cwd: '.', bustCache: true });

      Object.keys(globalConfigsFiles).forEach(function(item) {
        fnExtend(configs, { [ decamelize(item).toUpperCase() ]: globalConfigsFiles[ item ] });
      });
      // -->

      // Environment configs
      var environmentConfigsFiles = requireGlob.sync(common.fn.resolveAppDir(common.directories.constants.environment.source), { cwd: '.', bustCache: true });

      Object.keys(environmentConfigsFiles).forEach(function(item) {
        var constantName = decamelize(item).toUpperCase();
        fnExtend(configs[ constantName ] = configs[ constantName ] || {  }, environmentConfigsFiles[ item ][ currentEnvironment ]);
      });
      // -->

      return configs;
    } catch (error) {
      var pluginError = new common.plugins.gulpUtil.PluginError('common.configuration', {
        message: error.message,
        stack: error.message,
        error: error
      });

      common.fn.errorHandler(pluginError);

      return {  };
    }
  };

};
