module.exports = function(common) {
  /**
   * implements server
   */
  common.gulp.task('server', common.gulp_sync.sync(['build']), function() {
    // initialize browsersync
    var browserSync = require('browser-sync').create();
    browserSync.init({
      open: 'external',
      port: 3000,
      server: {
        baseDir: common.directories.distribution.path
      }
    }, function() {
      // require watch
      require('./watch.js')(common, browserSync);

      // watch all files
      common.gulp.start('watch');
    });
  });
};
