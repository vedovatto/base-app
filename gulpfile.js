'use strict';

var build = require('./build-config/tasks/setup.js');

build.plugins.lodash([
  './build-config/tasks/clean.js',
  './build-config/tasks/build.js',
  './build-config/tasks/constants.js',
  './build-config/tasks/documentation.js',
  './build-config/tasks/fonts.js',
  './build-config/tasks/images.js',
  './build-config/tasks/media.js',
  './build-config/tasks/miscellaneous.js',
  './build-config/tasks/scripts.js',
  './build-config/tasks/serve.js',
  './build-config/tasks/stylesheets.js',
  './build-config/tasks/svgs.js',
  './build-config/tasks/views.js',
  './build-config/tasks/hints.js'
]).forEach(function(file) {
  require(file)(build);
});
