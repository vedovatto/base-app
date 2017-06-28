module.exports = function(common) {
  /*
   * implements all miscellaneous
   */
  common.gulp.task('miscellaneous', ['miscellaneous:own', 'miscellaneous:vendor']);

  /*
   * implements miscellaneous task
   */
  common.gulp.task('miscellaneous:own', function() {
    return generate({
      src: common.directories.miscellaneous.own.files,
      destination: common.directories.miscellaneous.own.destination
    });
  });

  /*
   * implements vendor miscellaneous task
   */
  common.gulp.task('miscellaneous:vendor', function() {
    return generate({
      src: common.directories.miscellaneous.vendor.files,
      destination: common.directories.miscellaneous.vendor.destination
    });
  });

  /*
   * generate miscellaneous
   */
  var generate = function(options) {
    // generate files
    return common.gulp.src(options.src)
      .pipe(common.gulp.dest(options.destination))
  };
};
