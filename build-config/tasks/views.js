'use strict';

module.exports = function(common) {

  // PRIVATE PROPERTIES
  var config = common.fn.configuration();
  // -->

  // PRIVATE OPERATIONS
  var getViewVariables = function() {
    var states = {  };

    // add STATES to view's variables
    Object.keys(config.STATES).forEach(function(item) {
      states[ item ] = config.STATES[ item ].name;
    });
    // -->

    return common.plugins.lodash.extend(config.VIEW_VARS, { STATES: states });
  };

  var resolveHtml = function(compact) {
    return common.plugins.gulpPug({ locals: getViewVariables(), pretty: !compact });
  };

  var resolveIndexFiles = function() {
    var paths = {
      scriptsVendor: common.fn.resolveDistDir(common.directories.scripts.dist.path + 'vendor/**/*.js'),
      scriptsOwn: common.fn.resolveDistDir(common.directories.scripts.dist.path + '**/*.js'),
      stylesheetsVendor: common.fn.resolveDistDir(common.directories.stylesheets.dist.path + 'vendor/**/*.css'),
      stylesheetsOwn: common.fn.resolveDistDir(common.directories.stylesheets.dist.path + '**/*.css')
    };

    paths.scriptsOwn = [ paths.scriptsOwn, common.fn.negatePaths(paths.scriptsVendor) ];
    paths.stylesheetsOwn = [ paths.stylesheetsOwn, common.fn.negatePaths(paths.stylesheetsVendor) ];

    return paths;
  };

  var inject = function(files, name, fnTransform) {
    var resourcesUrlPrefix = config.VIEW_VARS.STATIC_URL_PREFIX;

    if (resourcesUrlPrefix) {
      if (resourcesUrlPrefix.charAt(resourcesUrlPrefix.length - 1) === '/') {
        resourcesUrlPrefix = resourcesUrlPrefix.substring(0, resourcesUrlPrefix.length - 1);
      }
    }

    return common.plugins.gulpInject(common.plugins.gulp.src(files), {
      addRootSlash: false,
      addPrefix: resourcesUrlPrefix,
      ignorePath: '/dist',
      name: name,
      transform: fnTransform
    });
  };

  var generate = function(options) {
    var compact = !common.environments.dev();
    var distPath = common.fn.resolveDistDir(common.directories.views.dist.path + (options.vendor ? common.directories.VARS.VENDOR_PATH : ''));
    var distFileName = common.directories.views.dist.fileName;
    var source = common.fn.resolveAppDir(options.src);
    var stream = common.plugins.gulp.src(source);

    return common.build.prePipe(stream)
      .pipe(common.plugins.gulpFileInclude({
        prefix: '@@',
        basepath: common.fn.resolveAppDir('views/').shift()
      }))
      .pipe(resolveHtml(compact))
      .pipe(common.plugins.gulpAngularTemplatecache({
        filename: distFileName,
        standalone: false,
        module: config.GENERAL.ANGULAR_APP_NAME
      }))
      .pipe(common.plugins.gulpIf(compact, common.plugins.gulpUglify({ compress: compact })))
      .pipe(common.plugins.gulpIf(compact, common.plugins.gulpRename(common.fn.minFileName(distFileName))))
      .pipe(common.plugins.gulp.dest(distPath));
  };
  // -->

  common.plugins.gulp.task('views', common.plugins.gulpSync(common.plugins.gulp).sync([ 'views:own', 'views:vendor', 'views:index' ]));

  common.plugins.gulp.task('views:index', function() {
    var transformScriptFilePath = function(filePath) {
      return common.plugins.gulpInject.transform.html.js(filePath + '?v=' + common.fn.timestamp());
    };

    var transformStyleFilePath = function(filePath) {
      return common.plugins.gulpInject.transform.html.css(filePath + '?v=' + common.fn.timestamp());
    };

    var compact = !common.environments.dev();
    var distPath = common.directories.VARS.DIST_BASE_PATH;
    var source = common.fn.resolveAppDir('views/index.pug');
    var indexFiles = resolveIndexFiles();
    var stream = common.plugins.gulp.src(source);

    return common.build.prePipe(stream)
      .pipe(common.plugins.gulpFileInclude({
        prefix: '@@',
        basepath: common.fn.resolveAppDir('views/').shift()
      }))
      .pipe(inject(indexFiles.scriptsVendor, 'vendor', transformScriptFilePath))
      .pipe(inject(indexFiles.scriptsOwn, '', transformScriptFilePath))
      .pipe(inject(indexFiles.stylesheetsVendor, 'vendor', transformStyleFilePath))
      .pipe(inject(indexFiles.stylesheetsOwn, '', transformStyleFilePath))
      .pipe(resolveHtml(compact))
      .pipe(common.plugins.gulp.dest(distPath));
  });

  common.plugins.gulp.task('views:own', function() {
    return generate({
      vendor: false,
      src: common.directories.views.own.source
    });
  });

  common.plugins.gulp.task('views:vendor', function() {
    return generate({
      vendor: true,
      src: common.directories.views.vendor.source
    });
  });

};
