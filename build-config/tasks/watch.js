'use strict';

module.exports = function(common, browserSync) {

  // PRIVATE PROPERTIES
  var DEFAULT_WATCH_INTERVAL = 500; // ms

  var watchFn = function(path, tasks) {
    common.plugins.gulp.watch(common.fn.resolveAppDir(path), { interval: DEFAULT_WATCH_INTERVAL }, common.plugins.gulpSync(common.plugins.gulp).sync(tasks.concat('watch:reload')));
  };
  // -->

  common.plugins.gulp.task('watch', [
    'watch:constants',
    'watch:fonts',
    'watch:images',
    'watch:media',
    'watch:miscellaneous',
    'watch:scripts',
    'watch:stylesheets',
    'watch:svgs',
    'watch:views'
  ]);

  common.plugins.gulp.task('watch:constants', function() {
    var files = common.plugins.lodash.concat(common.directories.constants.watch.source);
    return watchFn(files, [ 'constants', 'scripts:own', 'views:index' ]);
  });

  common.plugins.gulp.task('watch:fonts', function() {
    var files = common.directories.fonts.watch.source;
    return watchFn(files, [ 'fonts:own', 'fonts:vendor' ]);
  });

  common.plugins.gulp.task('watch:images', function() {
    var files = common.directories.images.watch.source;
    return watchFn(files, [ 'images:own', 'images:vendor' ]);
  });

  common.plugins.gulp.task('watch:media', function() {
    var files = common.directories.media.watch.source;
    return watchFn(files, [ 'media:own', 'media:vendor' ]);
  });

  common.plugins.gulp.task('watch:miscellaneous', function() {
    var files = common.directories.miscellaneous.watch.source;
    return watchFn(files, [ 'miscellaneous:own', 'miscellaneous:vendor' ]);
  });

  common.plugins.gulp.task('watch:scripts', function() {
    var files = common.directories.scripts.watch.source;
    return watchFn(files, [ 'scripts:vendor', 'scripts:own', 'views:index' ]);
  });

  common.plugins.gulp.task('watch:stylesheets', function() {
    var files = common.directories.stylesheets.watch.source;
    return watchFn(files, [ 'stylesheets:vendor', 'stylesheets:own', 'views:index' ]);
  });

  common.plugins.gulp.task('watch:svgs', function() {
    var files = common.directories.svgs.watch.source;
    return watchFn(files, [ 'svgs:vendor', 'svgs:own' ]);
  });

  common.plugins.gulp.task('watch:views', function() {
    var files = common.directories.views.watch.source;
    return watchFn(files, [ 'views:vendor', 'views:own', 'views:index' ]);
  });

  common.plugins.gulp.task('watch:reload', function() {
    browserSync.reload();
  });

};
