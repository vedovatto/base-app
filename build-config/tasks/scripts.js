'use strict';

module.exports = function(common) {

  // PRIVATE OPERATIONS
  var generate = function(options) {
    var compact = !common.environments.dev();
    var concat = true;
    var distPath = common.fn.resolveDistDir(common.directories.scripts.dist.path + (options.vendor ? common.directories.VARS.VENDOR_PATH : ''));
    var distFileName = common.directories.scripts.dist.fileName;
    var source = options.src;

    if (!options.vendor) {
      source = common.fn.resolveAppDir(source);
    }

    var stream = common.plugins.gulp.src(source);

    return common.build.prePipe(stream)
      .pipe(common.plugins.gulpNgAnnotate({ single_quotes: true }))
      .pipe(common.plugins.gulpIf(concat, common.plugins.gulpConcat(distFileName)))
      .pipe(common.plugins.gulpIf(compact, common.plugins.gulpUglify({ compress: true, mangle: true })))
      .pipe(common.plugins.gulpIf(compact, common.plugins.gulpRename(common.fn.minFileName(distFileName))))
      .pipe(common.plugins.gulp.dest(distPath));
  };
  // -->

  common.plugins.gulp.task('scripts', [ 'scripts:own', 'scripts:vendor' ]);

  common.plugins.gulp.task('scripts:own', function() {
    return generate({
      vendor: false,
      src: common.directories.scripts.own.source
    });
  });

  common.plugins.gulp.task('scripts:vendor', function() {
    return generate({
      vendor: true,
      src: common.directories.scripts.vendor.source
    });
  });

};
