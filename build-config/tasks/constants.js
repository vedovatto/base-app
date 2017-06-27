'use strict';

module.exports = function(common) {

  common.plugins.gulp.task('constants', function() {
    var config = common.fn.configuration();
    var compact = !common.environments.dev();
    var distPath = common.fn.resolveDistDir(common.directories.constants.dist.path);
    var distFileName = common.directories.constants.dist.fileName;
    var source = new Buffer(JSON.stringify(config));
    var stream = common.plugins.bufferToVinyl.stream(source, distFileName);

    return common.build.prePipe(stream)
      .pipe(common.plugins.gulpNgConfig(config.GENERAL.ANGULAR_APP_NAME, { createModule: false, type: 'constant' }))
      .pipe(common.plugins.gulpIf(compact, common.plugins.gulpUglify({ compress: true })))
      .pipe(common.plugins.gulpIf(compact, common.plugins.gulpRename(common.fn.minFileName(distFileName))))
      .pipe(common.plugins.gulp.dest(distPath));
  });

};
