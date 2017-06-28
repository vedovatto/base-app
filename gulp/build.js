module.exports = function(common) {
  /**
   * implements build
   */
  common.gulp.task('build', common.gulp_sync.sync([
    'fonts',
    'images',
    'media',
    'scripts',
    'stylesheets',
    'views',
    'miscellaneous'
  ]));
};
