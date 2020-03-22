'use strict';
(function () {
  var main = document.querySelector('main');
  var templateError = document.querySelector('#error').content.querySelector('.error');
  var templateSuccess = document.querySelector('#success').content.querySelector('.success');

  var showSuccess = function () {
    var element = templateSuccess.cloneNode(true);
    var successButton = element.querySelector('.success__button');

    element.addEventListener('click', function (evt) {
      if (evt.target.classList.contains('success')) {
        close();
      }
    });

    successButton.addEventListener('click', function () {
      close();
    });

    main.appendChild(element);
    document.addEventListener('keydown', onEscPress);
  };

  var showError = function () {
    var element = templateError.cloneNode(true);
    var errorButton = element.querySelector('.error__button');

    element.addEventListener('click', function (evt) {
      if (evt.target.classList.contains('error')) {
        close();
      }
    });

    errorButton.addEventListener('click', function () {
      close();
    });

    main.appendChild(element);
    document.addEventListener('keydown', onEscPress);
  };

  var onEscPress = function (evt) {
    if (evt.key === window.utils.ESC_KEY) {
      close();
    }
  };

  var close = function () {
    var element = main.querySelector('.error,.success');
    if (element) {
      element.remove();
      document.removeEventListener('keydown', onEscPress);
    }
  };

  window.message = {
    showSuccess: showSuccess,
    showError: showError
  };
})();
