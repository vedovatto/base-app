'use strict';

module.exports = function(common) {

  // delete distribution folder before Build process
  common.plugins.gulp.task('clean', function() {
    return common.plugins.gulp.src(common.directories.VARS.DIST_BASE_PATH + '/**/*.*', { read: false })
      .pipe(common.plugins.gulpClean({ force: true }));
  });

};
