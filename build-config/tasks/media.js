'use strict';

module.exports = function(common) {

  // PRIVATE OPERATIONS
  var generate = function(options) {
    var distPath = common.fn.resolveDistDir(common.directories.media.dist.path + (options.vendor ? common.directories.VARS.VENDOR_PATH : ''));
    var source = common.fn.resolveAppDir(options.src);
    var stream = common.plugins.gulp.src(source);

    return common.build.prePipe(stream)
      .pipe(common.plugins.gulp.dest(distPath));
  };
  // -->

  common.plugins.gulp.task('media', [ 'media:own', 'media:vendor' ]);

  common.plugins.gulp.task('media:own', function() {
    return generate({
      vendor: false,
      src: common.directories.media.own.source
    });
  });

  common.plugins.gulp.task('media:vendor', function() {
    return generate({
      vendor: true,
      src: common.directories.media.vendor.source
    });
  });

};
