'use strict';
(function () {
  var ESC_KEY = 'Escape';

  var closeElement = function (element) {
    if (element) {
      element.classList.add('hidden');
    }
  };

  window.utils = {
    ESC_KEY: ESC_KEY,
    closeElement: closeElement,
  };

})();
