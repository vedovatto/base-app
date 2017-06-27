'use strict';

module.exports = function(common) {

  // PRIVATE OPERATIONS
  var cookieRewrite = function(req, res, next) {
    var application    = common.environments.current().app;
    var isProxyRequest = req.url.lastIndexOf('/api', 0) === 0;

    if (isProxyRequest) {
      var oldWriteHead = res.writeHead;

      res.writeHead = function() {
        var cookie = res.getHeader('Set-Cookie');

        if (cookie) {
          res.setHeader('Set-Cookie', cookie.map(function(item) {
            return item.replace(new RegExp('/' + application.context + '/'), '/').replace(new RegExp('/' + application.context), '/');
          }));
        }

        oldWriteHead.apply(res, arguments);
      };
    }

    next();
  };
  // -->

  common.plugins.gulp.task('serve', common.plugins.gulpSync(common.plugins.gulp).sync([ 'build' ]), function() {
    var application = common.environments.current().app;
    var proxy = common.plugins.httpProxyMiddleware(application.api, { target: application.getAppUrl() });

    var browserSync = common.plugins.browserSync.create();

    browserSync.init({
      open: 'external',
      host: application.domain,
      server: {
        baseDir: common.directories.VARS.DIST_BASE_PATH,
        middleware: [ cookieRewrite, proxy, common.plugins.connectHistoryApiFallback() ]
      }
    }, function() {
      require('./watch.js')(common, browserSync);

      common.plugins.gulp.start('watch');
    });
  });

};
