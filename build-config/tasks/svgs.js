'use strict';

module.exports = function(common) {

  // PRIVATE OPERATIONS
  var generate = function(options) {
    var config = common.fn.configuration();
    var compact = !common.environments.dev();
    var distPath = common.fn.resolveDistDir(common.directories.svgs.dist.path + (options.vendor ? common.directories.VARS.VENDOR_PATH : ''));
    var distFileName = common.directories.svgs.dist.fileName;
    var source = common.fn.resolveAppDir(options.src);
    var stream = common.plugins.gulp.src(source);

    return common.build.prePipe(stream)
      .pipe(common.plugins.gulpSvgo())
      .pipe(common.plugins.gulpAngularTemplatecache({
        filename: distFileName,
        standalone: false,
        module: config.GENERAL.ANGULAR_APP_NAME
      }))
      .pipe(common.plugins.gulpIf(compact, common.plugins.gulpUglify({ compress: true })))
      .pipe(common.plugins.gulpIf(compact, common.plugins.gulpRename(common.fn.minFileName(distFileName))))
      .pipe(common.plugins.gulp.dest(distPath));
  };
  // -->

  common.plugins.gulp.task('svgs', [ 'svgs:own', 'svgs:vendor' ]);

  common.plugins.gulp.task('svgs:own', function() {
    return generate({
      vendor: false,
      src: common.directories.svgs.own.source
    });
  });

  common.plugins.gulp.task('svgs:vendor', function() {
    return generate({
      vendor: true,
      src: common.directories.svgs.vendor.source
    });
  });

};
