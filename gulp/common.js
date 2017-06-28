  'use strict';

  // gulp packages
  exports.gulp               = require('gulp');
  exports.gulp_concat        = require('gulp-concat');
  exports.gulp_uglify_js     = require('gulp-uglify');
  exports.gulp_uglify_css    = require('gulp-uglifycss');
  exports.gulp_rename        = require('gulp-rename');
  exports.gulp_watch         = require('gulp-watch');
  exports.gulp_sass          = require('gulp-sass');
  exports.gulp_sourcemaps    = require('gulp-sourcemaps');
  exports.gulp_util          = require('gulp-util');
  exports.gulp_environments  = require('gulp-environments');
  exports.gulp_inject        = require('gulp-inject');
  exports.gulp_file_include  = require('gulp-file-include');
  exports.gulp_sync          = require('gulp-sync')(this.gulp);
  exports.gulp_notifier      = require('node-notifier');
  exports.gulp_del           = require('del');
  exports.gulp_lodash        = require('lodash');

  // optimization and minification
  exports.gulp_htmlmin       = require('gulp-htmlmin');
  exports.gulp_cssmin        = require('gulp-cssmin');
  exports.gulp_svgmin        = require('gulp-svgmin');
  exports.gulp_imagemin      = require('gulp-imagemin');
  exports.gulp_fontmin       = require('gulp-fontmin');

  // exports common directories
  exports.directories = {
    fonts: {
      own: {
        destination: './dist/fonts',
        files: [
          './app/fonts/*.{eot,svg,ttf,woff,woff2}',
          './app/fonts/**/*.{eot,svg,ttf,woff,woff2}'
        ]
      },
      vendor: {
        destination: './dist/fonts/vendor/',
        files: []
      }
    },
    images: {
      own: {
        destination: './dist/images',
        files: [
          './app/images/*.{png,jpeg,jpg,gif,svg}',
          './app/images/**/*.{png,jpeg,jpg,gif,svg}'
        ]
      },
      vendor: {
        destination: './dist/images/vendor',
        files: []
      }
    },
    scripts: {
      own: {
        destination: './dist/scripts',
        distribution: [
          './dist/scripts/all.min.js',
          './dist/scripts/all.min.js.map'
        ],
        files: [
          './app/scripts/*.js',
          './app/scripts/**/*.js'
        ]
      },
      vendor: {
        destination: './dist/scripts/vendor',
        distribution: [
          './dist/scripts/vendor/all.vendor.min.js'
        ],
        files: [
			"./node_modules/jquery/dist/jquery.js",
			"./node_modules/angular/angular.js",
			"./node_modules/angular-animate/angular-animate.js",
			"./node_modules/angular-ui-mask/dist/mask.js",
			"./node_modules/bootstrap-sass/assets/javascripts/bootstrap.js",
		]
      }
    },
    media: {
      own: {
        destination: './dist/media',
        files: [
          './app/media/*.{mp4,ogg,ogv,webm,png,jpeg,jpg,gif,svg}',
          './app/media/**/*.{mp4,ogg,ogv,webm,png,jpeg,jpg,gif,svg}'
        ]
      },
      vendor: {
        destination: './dist/media/vendor',
        files: []
      }
    },
    miscellaneous: {
      own: {
        destination: './dist',
        distribution: [
          './dist/favicon.ico',
          './dist/robots.txt',
          './dist/sitemap.xml'
        ],
        files: [
          './app/miscellaneous/favicon.ico',
          './app/miscellaneous/robots.txt',
          './app/miscellaneous/sitemap.xml'
        ]
      },
      vendor: {
        destination: './dist',
        distribution: [],
        files: []
      }
    },
    stylesheets: {
      own: {
        destination: './dist/stylesheets',
        distribution: [
          './dist/stylesheets/all.min.{css,map}'
        ],
        files: [
          '!./app/stylesheets/vendor.scss',
          './app/stylesheets/*.scss',
          './app/stylesheets/**/*.scss'
        ]
      },
      vendor: {
        destination: './dist/stylesheets/vendor',
        distribution: [
          './dist/stylesheets/vendor/all.vendor.min.{css,map}'
        ],
        files: [
          './app/stylesheets/vendor.scss'
        ]
      }
    },
    views: {
      own: {
        destination: './dist',
        files: [
          '!./app/views/index.html',
          '!./app/views/_*.html',
          '!./app/views/**/_*.html',
          './app/views/*.html',
          './app/views/**/*.html'
        ]
      },
      vendor: {
        destination: './dist',
        files: []
      }
    },
    distribution: {
      path: './dist'
    }
  };

  // common timestamp function
  exports.timestamp = function() {
    return (new Date()).toISOString().replace(/[^0-9]/g, '').toString();
  };

  // common log function
  exports.log = function(log) {
    this.gulp_util.log(log);
  };

  // common environments object
  exports.environments = {
    dev: this.gulp_environments.make('dev'),
    hml: this.gulp_environments.make('hml'),
    pro: this.gulp_environments.make('pro'),

    current: function() {
      if (this.hml()) {
        return this.hml;
      }

      if (this.pro()) {
        return this.pro;
      }

      // default return development environment
      return this.dev;
    }
  };
