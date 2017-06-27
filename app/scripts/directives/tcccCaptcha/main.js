'use strict';

app.directive('tcccCaptcha', function(DIRECTIVES) {

  // PRIVATE PROPERTIES
  var RENDERED_ELEMENT_SELECTOR = '.captcha-rendered-element';
  var LOADER_SCRIPT_ELEMENT_SELECTOR = '.loader-script';
  var siteKey = null;
  // -->

  // PRIVATE OPERATIONS
  var getCaptchaComponent = function() {
    return grecaptcha;
  };

  var init = function() {
    if (angular.isString(DIRECTIVES.TCCC_CAPTCHA.SITE_KEY)) {
      siteKey = DIRECTIVES.TCCC_CAPTCHA.SITE_KEY;
    } else {
      throw new Error('reCaptcha site-key could not be found.');
    }
  };
  // -->

  // COMPONENT OPERATIONS
  var preLink = function() {

    // CONSTRUCTOR
    init();
    // -->

  };

  var postLink = function(scope, element, attrs, ctl, transcludeFn) {

    // PRIVATE PROPERTIES
    var ngModelCtl = ctl[ 0 ];
    var recaptchaComponent = null;
    // -->

    // PRIVATE OPERATIONS
    var init = function() {
      if (angular.isObject(scope.control)) {
        scope.control.reset = function() {
          getCaptchaComponent().reset(recaptchaComponent);
        };
      }
    };
    // -->

    // EVENTS
    element.find(LOADER_SCRIPT_ELEMENT_SELECTOR).on('onScriptLoad', function() {
      recaptchaComponent = getCaptchaComponent().render(element.find(RENDERED_ELEMENT_SELECTOR).get(0), {
        sitekey: siteKey,
        callback: function(response) {
          scope.$apply(function() {
            ngModelCtl.$setViewValue(response);
          });
        }
      });

      element.on('reset', function() { // respond to event 'reset' to reset the reCaptcha component
        getCaptchaComponent().reset(recaptchaComponent);
      });

      getCaptchaComponent().reset(recaptchaComponent); // reset component on start
    });
    // -->

    // CONSTRUCTOR
    init();
    // -->

  };
  // -->

  return {
    restrict: 'E',
    require: [ 'ngModel' ],
    replace: false, // the option replace is not supported when working with reCaptcha
    transclude: false,
    link: {
      pre: preLink,
      post: postLink
    },
    scope: {
      control: '='
    },
    templateUrl: 'directives/tcccCaptcha/main.html'
  };

});
