module.exports = function(common) {
  /*
   * implements all media
   */
  common.gulp.task('media', ['media:own', 'media:vendor']);

  /*
   * implements media task
   */
  common.gulp.task('media:own', function() {
    return generate({
      src: common.directories.media.own.files,
      destination: common.directories.media.own.destination
    });
  });

  /*
   * implements vendor media task
   */
  common.gulp.task('media:vendor', function() {
    return generate({
      src: common.directories.media.vendor.files,
      destination: common.directories.media.vendor.destination
    });
  });

  /*
   * generation media
   */
  var generate = function(options) {
    // generate files
    return common.gulp.src(options.src)
      .pipe(common.gulp.dest(options.destination));
  };
};
