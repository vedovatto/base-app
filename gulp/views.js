module.exports = function(common) {
  /*
   * implements all views
   */
  common.gulp.task('views', common.gulp_sync.sync(['views:own', 'views:vendor', 'views:index']));

  /*
   * implements index view
   */
  common.gulp.task('views:index', function() {
    return common.gulp.src('./app/views/index.html')
      .pipe(inject(common.directories.scripts.own.distribution, '', transformScriptFilePathWithTimeStamp))
      .pipe(inject(common.directories.scripts.vendor.distribution, 'vendor', transformScriptFilePathWithTimeStamp))
      .pipe(inject(common.directories.stylesheets.own.distribution, '', transformStyleFilePathWithTimeStamp))
      .pipe(inject(common.directories.stylesheets.vendor.distribution, 'vendor', transformStyleFilePathWithTimeStamp))
      .pipe(common.gulp_file_include({
        prefix: '@@',
        basepath: './app/views/'
      }))
      .pipe(common.gulp_htmlmin())
      .pipe(common.gulp.dest(common.directories.distribution.path));
  });

  /*
   * implements views task
   */
  common.gulp.task('views:own', function() {
    return generate({
      src: common.directories.views.own.files,
      destination: common.directories.views.own.destination
    });
  });

  /*
   * implements vendor styles task
   */
  common.gulp.task('views:vendor', function() {
    return generate({
      src: common.directories.views.vendor.files,
      destination: common.directories.views.vendor.destination
    });
  });

  /*
   * concat into scripts files timestamp
   */
  var transformScriptFilePathWithTimeStamp = function(filepath) {
    return common.gulp_inject.transform.html.js(filepath + '?v=' + common.timestamp());
  }

  /*
   * concat into styles files timestamp
   */
  var transformStyleFilePathWithTimeStamp = function(filepath) {
    return common.gulp_inject.transform.html.css(filepath + '?v=' + common.timestamp());
  };

  /*
   * return inject files into html
   */
  var inject = function(files, name, transform) {
    return common.gulp_inject(common.gulp.src(files), {
      addRootSlash: true,
      ignorePath: '/dist',
      name: name,
      transform: transform
    });
  };

  /*
   * generate cache from views
   */
  var generate = function(options) {
    // generate files
    return common.gulp.src(options.src)
      .pipe(common.gulp_file_include({
        prefix: '@@',
        basepath: './app/views/'
      }))
      .pipe(inject(common.directories.scripts.own.distribution, '', transformScriptFilePathWithTimeStamp))
      .pipe(inject(common.directories.scripts.vendor.distribution, 'vendor', transformScriptFilePathWithTimeStamp))
      .pipe(inject(common.directories.stylesheets.own.distribution, '', transformStyleFilePathWithTimeStamp))
      .pipe(inject(common.directories.stylesheets.vendor.distribution, 'vendor', transformStyleFilePathWithTimeStamp))
      .pipe(common.gulp_htmlmin())
      .pipe(common.gulp.dest(options.destination));
  };
};
