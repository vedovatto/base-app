'use strict';

if (!String.prototype.isEmpty) {
  String.prototype.isEmpty = function() {
    return this === '' || this.length === 0;
  };
}

if (!String.prototype.toArray) {
  String.prototype.toArray = function() {
    return this.split('');
  };
}

// http://stackoverflow.com/a/4673436
if (!String.prototype.format) {
  String.prototype.format = function() {
    var args = arguments;

    return this.replace(/{(\d+)}/g, function(match, number) {
      return typeof(args[ number ]) !== 'undefined' ? args[ number ] : match;
    });
  };
}

// http://stackoverflow.com/a/4673436
if (!String.format) {
  String.format = function(format) {
    var args = Array.prototype.slice.call(arguments, 1);

    return format.replace(/{(\d+)}/g, function(match, number) {
      return typeof(args[ number ]) !== 'undefined' ? args[ number ] : match;
    });
  };
}

// http://stackoverflow.com/a/1978419
if (!String.prototype.contains) {
  String.prototype.contains = function(it) {
    return this.indexOf(it) !== -1;
  };
}
