'use strict';

module.exports = function(common) {

  common.plugins.gulp.task('documentation', [ 'scripts:documentation' ]);

  common.plugins.gulp.task('scripts:documentation', function() {
    var configuration = require('../jsdoc.json');
    var stream = common.plugins.gulp.src(common.directories.scripts.own.files, { read: false });

    return common.build.prePipe(stream)
      .pipe(common.plugins.gulpJsdoc3(configuration));
  });

};
