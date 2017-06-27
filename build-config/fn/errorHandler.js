'use strict';

module.exports = function(common) {

  // PRIVATE PROPERTIES
  var BEEPS_ON_ERROR = 4;
  // -->

  return function(error) {
    common.plugins.gulpUtil.log(common.plugins.gulpUtil.colors.red((error.stack || error.message)));

    common.plugins.nodeNotifier.notify({
      title: 'something wrong in ' + (error.path || error.file || error.plugin) + ':',
      message: error.stack,
      sound: true
    });

    common.plugins.beepbeep(BEEPS_ON_ERROR);

    // End
    var handleErrors = common.environments.dev();

    if (handleErrors) {
      this.emit('end');
    } else {
      process.exit(1);
    }
  };

};
