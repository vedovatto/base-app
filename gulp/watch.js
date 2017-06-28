module.exports = function(common, browserSync) {
  /*
   * implements watch from all
   */
  common.gulp.task('watch', ['watch:own:all', 'watch:vendor:all']);

  /*
   * implaments watch own all task
   */
  common.gulp.task('watch:own:all', [
    'watch:own:fonts',
    'watch:own:images',
    'watch:own:media',
    'watch:own:scripts',
    'watch:own:stylesheets',
    'watch:own:views'
  ]);

  /*
   * implements watch own fonts task
   */
  common.gulp.task('watch:own:fonts', function() {
    return common.gulp.watch(common.directories.fonts.own.files, ['fonts:own']);
  });

  /*
   * implements watch own images task
   */
  common.gulp.task('watch:own:images', function() {
    return common.gulp.watch(common.directories.images.own.files, ['images:own']);
  });

  /*
   * implements watch own media task
   */
  common.gulp.task('watch:own:media', function() {
    return common.gulp.watch(common.directories.media.own.files, ['media:own']);
  });

  /*
   * implements watch own scripts task
   */
  common.gulp.task('watch:own:scripts', function() {
    return common.gulp.watch(common.directories.scripts.own.files, common.gulp_sync.sync([
      'scripts:own', 'views:index'
    ]));
  });

  /*
   * implements watch own stylesheets task
   */
  common.gulp.task('watch:own:stylesheets', function() {
    return common.gulp.watch(common.directories.stylesheets.own.files, common.gulp_sync.sync([
      'stylesheets:own', 'views:index'
    ]));
  });

  /*
   * implements watch own views task
   */
  common.gulp.task('watch:own:views', function() {
    return common.gulp.watch(common.directories.views.own.files, common.gulp_sync.sync([
      'views:own', 'views:index'
    ]));
  });

  /*
   * implements watch vendor all task
   */
  common.gulp.task('watch:vendor:all', [
    'watch:vendor:fonts',
    'watch:vendor:images',
    'watch:vendor:media',
    'watch:vendor:scripts',
    'watch:vendor:stylesheets',
    'watch:vendor:views'
  ]);

  /*
   * implements watch vendor fonts task
   */
  common.gulp.task('watch:vendor:fonts', function() {
    return common.gulp.watch(common.directories.fonts.vendor.files, ['fonts:vendor']);
  });

  /*
   * implements watch vendor images task
   */
  common.gulp.task('watch:vendor:images', function() {
    return common.gulp.watch(common.directories.images.vendor.files, ['images:vendor']);
  });

  /*
   * implements watch vendor media task
   */
  common.gulp.task('watch:vendor:media', function() {
    return common.gulp.watch(common.directories.media.vendor.files, ['media:vendor']);
  });

  /*
   * implements watch vendor scripts task
   */
  common.gulp.task('watch:vendor:scripts', function() {
    return common.gulp.watch(common.directories.scripts.vendor.files, common.gulp_sync.sync([
      'scripts:vendor', 'views:index'
    ]));
  });

  /*
   * implements watch vendor stylesheets task
   */
  common.gulp.task('watch:vendor:stylesheets', function() {
    return common.gulp.watch(common.directories.stylesheets.vendor.files, common.gulp_sync.sync([
      'stylesheets:vendor', 'views:index'
    ]));
  });

  /*
   * implements watch vendor views task
   */
  common.gulp.task('watch:vendor:views', function() {
    return common.gulp.watch(common.directories.views.vendor.files, common.gulp_sync.sync([
      'views:vendor', 'views:index'
    ]));
  });

  /*
   * watch all distribution files
   */
  common.gulp.watch(['./dist/*.*', './dist/**/*.*'], browserSync.reload);
};
