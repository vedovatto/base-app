'use strict';

var fs = require('fs');

// export plugins
exports.plugins = require('gulp-load-plugins')({
  DEBUG: false,
  pattern: [ '*' ],
  overridePattern: true,
  replaceString: /^/,
  camelize: true,
  lazy: true
});

// export common directories
var directoriesFileContent = fs.readFileSync('./build-config/directories.json');
exports.directories = JSON.parse(directoriesFileContent);
// -->

// load build functions
var fnFilesList = fs.readdirSync('./build-config/fn/');

exports.fn = {  };

fnFilesList.forEach(function(firstItem, firstIndex, items) {
  items.forEach(function(item) {
    exports.fn[ item.substring(0, item.indexOf('.')) ] = require('../fn/' + item)(exports);
  });
});
// -->

// load environments configs
exports.environments = require('../environments.js')(exports);
// -->

// streams' hooks
exports.build = {
  prePipe: function(stream) {
    return stream
      .pipe(exports.plugins.gulpPlumber(exports.fn.errorHandler))
      .pipe(exports.plugins.gulpPrint());
  }
};
// -->
