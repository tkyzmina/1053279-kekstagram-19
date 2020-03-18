'use strict';
(function () {
  var ESC_KEY = 'Escape';
  var ENTER_KEY = 'Enter';

  var closeElement = function (element) {
    if (element) {
      element.classList.add('hidden');
    }
  };

  window.utils = {
    ESC_KEY: ESC_KEY,
    ENTER_KEY: ENTER_KEY,
    closeElement: closeElement,
  };
})();
