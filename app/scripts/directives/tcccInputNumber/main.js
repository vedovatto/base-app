'use strict';

app.directive('tcccInputNumber', function(CONFIG, VALUES) {

  // PRIVATE OPERATIONS
  var link = function(scope, element, attrs, ctl, transcludeFn) {

    // EVENTS
    element.keydown(function(e) {
      var LETTER_A = 65;

      var ALLOWED_KEYS = [
        VALUES.KEYCODE.DELETE,
        VALUES.KEYCODE.BACKSPACE,
        VALUES.KEYCODE.TAB,
        VALUES.KEYCODE.ENTER,
        VALUES.KEYCODE.ESCAPE,
        VALUES.KEYCODE.DECIMAL_POINT,
        VALUES.KEYCODE.PERIOD,
        VALUES.KEYCODE.PAGE_UP,
        VALUES.KEYCODE.PAGE_DOWN,
        VALUES.KEYCODE.END,
        VALUES.KEYCODE.HOME,
        VALUES.KEYCODE.LEFT_ARROW,
        VALUES.KEYCODE.UP_ARROW,
        VALUES.KEYCODE.RIGHT_ARROW,
        VALUES.KEYCODE.DOWN_ARROW
      ];

      // allow: backspace, delete, tab, escape, enter, home, end, left, right, down, up and .
      var isAllowedKey = ALLOWED_KEYS.indexOf(e.keyCode) >= 0;

      // allow: Ctrl+A, Command+A
      var isSelectionAction = e.keyCode === LETTER_A && (e.ctrlKey || e.metaKey);

      var isNumKey = e.keyCode >= VALUES.KEYCODE.NUM_0 && e.keyCode <= VALUES.KEYCODE.NUM_9;
      var isNumPadKey = e.keyCode >= VALUES.KEYCODE.NUMPAD_0 && e.keyCode <= VALUES.KEYCODE.NUMPAD_9;

      // allow: only numbers
      var isNumberKey = isNumKey || isNumPadKey;

      if (isAllowedKey || isSelectionAction) {
        return; // let it happen, don't do anything
      }

      // ensure that it is a number and stop the keypress
      if (!isNumberKey || e.shiftKey) {
        e.preventDefault();
      }
    });
    // -->

  };
  // -->

  return {
    restrict: 'A',
    replace: CONFIG.DIRECTIVES.REPLACE_HTML,
    link: link
  };

});
