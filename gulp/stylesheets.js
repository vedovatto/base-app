module.exports = function(common) {
  /*
   * implements all stylesheets
   */
  common.gulp.task('stylesheets', ['stylesheets:own', 'stylesheets:vendor']);

  /*
   * implements stylesheets task
   */
  common.gulp.task('stylesheets:own', function() {
    return generate({
      src: common.directories.stylesheets.own.files,
      destination: common.directories.stylesheets.own.destination,
      name: 'all.css',
      minified: 'all.min.css'
    });
  });

  /*
   * implements vendor stylesheets task
   */
  common.gulp.task('stylesheets:vendor', function() {
    return generate({
      src: common.directories.stylesheets.vendor.files,
      destination: common.directories.stylesheets.vendor.destination,
      name: 'all.vendor.css',
      minified: 'all.vendor.min.css'
    });
  });

  /*
   * generate full and minified version from styles
   */
  var generate = function(options) {
    // generate minified and unminified
    return common.gulp.src(options.src)
      .pipe(common.gulp_sourcemaps.init())
      .pipe(common.gulp_sass({ errLogToConsole: true }).on('error', function(error) {
        // notify
        common.gulp_notifier.notify({
          title: 'something wrong in scss:',
          message: error.stack,
          sound: true
        });
        // end
        this.emit('end');
      }))
      .pipe(common.gulp_concat(options.name))
      .pipe(common.gulp.dest(options.destination))
      .pipe(common.gulp_uglify_css())
      .pipe(common.gulp_rename(options.minified))
      .pipe(common.gulp_sourcemaps.write('.'))
      .pipe(common.gulp.dest(options.destination));
  };
};
