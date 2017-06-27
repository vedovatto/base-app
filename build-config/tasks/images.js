'use strict';

module.exports = function(common) {

  // PRIVATE OPERATIONS
  var generate = function(options) {
    var compact = !common.environments.dev();
    var distPath = common.fn.resolveDistDir(common.directories.images.dist.path + (options.vendor ? common.directories.VARS.VENDOR_PATH : ''));
    var source = common.fn.resolveAppDir(common.directories.images.own.source);
    var stream = common.plugins.gulp.src(source);

    return common.build.prePipe(stream)
      .pipe(common.plugins.gulpIf(compact, common.plugins.gulpImagemin()))
      .pipe(common.plugins.gulp.dest(distPath));
  };
  // -->

  common.plugins.gulp.task('images', [ 'images:own', 'images:vendor' ]);

  common.plugins.gulp.task('images:own', function() {
    return generate({
      vendor: false,
      src: common.directories.images.own.source
    });
  });

  common.plugins.gulp.task('images:vendor', function() {
    return generate({
      vendor: true,
      src: common.directories.images.vendor.source
    });
  });

};
