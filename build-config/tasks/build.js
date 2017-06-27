'use strict';

module.exports = function(common) {

  // Build process
  common.plugins.gulp.task('build',
    common.plugins.gulpSync(common.plugins.gulp).sync([
      'clean',
      'constants',
      'fonts',
      'images',
      'media',
      'miscellaneous',
      'scripts',
      'stylesheets',
      'svgs',
      'views',
      'hints'
    ])
  );

};
