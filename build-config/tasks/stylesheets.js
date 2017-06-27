'use strict';

module.exports = function(common) {

  // PRIVATE PROPERTIES
  var config = common.fn.configuration();
  // -->

  // PRIVATE OPERATIONS
  var generate = function(options) {
    var compact = !common.environments.dev();
    var distPath = common.fn.resolveDistDir(common.directories.stylesheets.dist.path + (options.vendor ? common.directories.VARS.VENDOR_PATH : ''));
    var distFileName = common.directories.stylesheets.dist.fileName;
    var source = common.fn.resolveAppDir(options.src);
    var stream = common.plugins.gulp.src(source);

    return common.build.prePipe(stream)
      .pipe(common.plugins.gulpSassVariables(getViewVariables()))
      .pipe(common.plugins.gulpSass({ errLogToConsole: true }))
      .pipe(common.plugins.gulpIf(compact, common.plugins.gulpConcat(distFileName)))
      .pipe(common.plugins.gulpAutoprefixer({ browsers: [ 'last 5 version' ] }))
      .pipe(common.plugins.gulpIf(compact, common.plugins.gulpCsso({ restructure: true, sourceMap: false })))
      .pipe(common.plugins.gulpIf(compact, common.plugins.gulpRename(common.fn.minFileName(distFileName))))
      .pipe(common.plugins.gulp.dest(distPath));
  };

  var getViewVariables = function() {
    var variables = {  };

    Object.keys(config.VIEW_VARS).forEach(function(item) {
      variables[ '$' + item ] = config.VIEW_VARS[ item ];
    });

    return variables;
  };
  // -->

  common.plugins.gulp.task('stylesheets', [ 'stylesheets:own', 'stylesheets:vendor' ]);

  common.plugins.gulp.task('stylesheets:own', function() {
    return generate({
      vendor: false,
      src: common.directories.stylesheets.own.source
    });
  });

  common.plugins.gulp.task('stylesheets:vendor', function() {
    return generate({
      vendor: true,
      src: common.directories.stylesheets.vendor.source
    });
  });

};
