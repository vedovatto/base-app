'use strict';

module.exports = function(common) {

  // PRIVATE OPERATIONS
  var generate = function(options) {
    var compact = !common.environments.dev();
    var distPath = common.fn.resolveDistDir(common.directories.fonts.dist.path + (options.vendor ? common.directories.VARS.VENDOR_PATH : ''));
    var source = common.fn.resolveAppDir(options.src);
    var stream = common.plugins.gulp.src(source);

    return common.build.prePipe(stream)
      .pipe(common.plugins.gulpIf(compact, common.plugins.gulpFontmin()))
      .pipe(common.plugins.gulp.dest(distPath));
  };
  // -->

  common.plugins.gulp.task('fonts', [ 'fonts:own', 'fonts:vendor' ]);

  common.plugins.gulp.task('fonts:own', function() {
    return generate({
      vendor: false,
      src: common.directories.fonts.own.source
    });
  });

  common.plugins.gulp.task('fonts:vendor', function() {
    return generate({
      vendor: true,
      src: common.directories.fonts.vendor.source
    });
  });

};
