'use strict';

// require common
var common = require('./gulp/common.js');

/*
 * This will load all js or coffee files in the gulp directory
 * in order to load all gulp tasks
 */
common.gulp_lodash([
  './gulp/build.js',
  './gulp/fonts.js',
  './gulp/images.js',
  './gulp/media.js',
  './gulp/scripts.js',
  './gulp/miscellaneous.js',
  './gulp/server.js',
  './gulp/stylesheets.js',
  './gulp/views.js'
]).forEach(function(file) {
  require(file)(common);
});

/*
 * Default launch development environment
 */
common.gulp.task('default', function() {
  common.gulp.start(['server']);
});
