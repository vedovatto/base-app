module.exports = function(common) {
  /*
   * implements all scripts
   */
  common.gulp.task('scripts', ['scripts:own', 'scripts:vendor']);

  /*
   * implements scripts task
   */
  common.gulp.task('scripts:own', function() {
    return generate({
      src: common.directories.scripts.own.files,
      destination: common.directories.scripts.own.destination,
      name: 'all.js',
      minified: 'all.min.js'
    });
  });

  /*
   * implements vendor scripts task
   */
  common.gulp.task('scripts:vendor', function() {
    return generate({
      src: common.directories.scripts.vendor.files,
      destination: common.directories.scripts.vendor.destination,
      name: 'all.vendor.js',
      minified: 'all.vendor.min.js'
    });
  });

  /*
   * generate full and minified version from scripts
   */
  var generate = function(options) {
    // generate files
    return common.gulp.src(options.src)
      .pipe(common.gulp_sourcemaps.init())
      .pipe(common.gulp_concat(options.name))
      .pipe(common.gulp.dest(options.destination))
      .pipe(common.gulp_rename(options.minified))
      .pipe(common.gulp_uglify_js().on('error', function(error) {
        // notify
        common.gulp_notifier.notify({
          title: 'something wrong in js:',
          message: error.stack,
          sound: true
        });
        // end
        this.emit('end');
      }))
      .pipe(common.gulp_sourcemaps.write('.'))
      .pipe(common.gulp.dest(options.destination));
  };
};
