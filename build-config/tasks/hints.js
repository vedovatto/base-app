'use strict';

module.exports = function(common) {

  common.plugins.gulp.task('hints', [ 'scripts:hint' ]);

  common.plugins.gulp.task('scripts:hint', function() {
    var source = common.fn.resolveAppDir(common.directories.scripts.own.source);
    var stream = common.plugins.gulp.src(source);

    return common.build.prePipe(stream)
      .pipe(common.plugins.gulpEslint({
        configFile: common.directories.VARS.ESLINT_RULES_FILE,
        fix: true
      }))
      .pipe(common.plugins.gulpEslint.format())
      .pipe(common.plugins.gulpEslint.failOnError());
  });

};
