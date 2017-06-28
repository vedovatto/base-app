module.exports = function(common) {
  /*
   * implements all images
   */
  common.gulp.task('images', ['images:own', 'images:vendor']);

  /*
   * implements images task
   */
  common.gulp.task('images:own', function() {
    return generate({
      src: common.directories.images.own.files,
      destination: common.directories.images.own.destination
    });
  });

  /*
   * implements vendor images task
   */
  common.gulp.task('images:vendor', function() {
    return generate({
      src: common.directories.images.vendor.files,
      destination: common.directories.images.vendor.destination
    });
  });

  /*
   * generate optimized images
   */
  var generate = function(options) {
    // generate files
    return common.gulp.src(options.src)
      .pipe(common.gulp_imagemin({ optimizationLevel: 7, progressive: true }))
      .pipe(common.gulp.dest(options.destination));
  };
};
