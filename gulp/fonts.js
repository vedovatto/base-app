module.exports = function(common) {
  /*
   * implements all fonts
   */
  common.gulp.task('fonts', ['fonts:own', 'fonts:vendor']);

  /*
   * implements fonts task
   */
  common.gulp.task('fonts:own', function() {
    return generate({
      src: common.directories.fonts.own.files,
      destination: common.directories.fonts.own.destination
    });
  });

  /*
   * implements vendor fonts task
   */
  common.gulp.task('fonts:vendor', function() {
    return generate({
      src: common.directories.fonts.vendor.files,
      destination: common.directories.fonts.vendor.destination
    });
  });

  /*
   * generate fonts optimized
   */
  var generate = function(options) {
    // generate files
    return common.gulp.src(options.src)
      .pipe(common.gulp_fontmin())
      .pipe(common.gulp_rename({ dirname: '' }))
      .pipe(common.gulp.dest(options.destination));
  };
};
