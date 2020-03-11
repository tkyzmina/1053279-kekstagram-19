'use strict';
(function () {
  var URL = 'https://js.dump.academy/kekstagram';
  var TIME_OUT = 10000;
  var GOOD_STATUS = 200;

  var upload = function (data, onSuccess, onError) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      if (xhr.staus === GOOD_STATUS) {
        onSuccess(xhr.response);
      } else {
        onError('Статус ответа: ' + xhr.status + ' ' + xhr.statusText);
      }

    });
    xhr.addEventListener('error', function () {
      onError('Произошла ошибка соединения');
    });
    xhr.addEventListener('timeout', function () {
      onError('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
    });

    xhr.timeout = TIME_OUT; // 10s

    xhr.open('POST', URL);
    xhr.send(data);
  };

  window.upload = {
    upload: upload,
  };


  var uploadForm = document.querySelector('.img-upload__form');
  var hashtag = uploadForm.querySelector('.text__hashtags');
  var comment = document.querySelector('.text__descriptions');

  // var successMessage = document.querySelector('.success');
  // console.log(successMessage);

  uploadForm.addEventListener('submit', function (evt) {
    upload(new FormData(uploadForm), succesUpload, errorUpload);
    evt.preventDefault();
  });


  var clearUploadForm = function () {
    hashtag.value = '';
    // comment.value = '';
  };


  var errorUpload = function () {
    window.dialog.overlayClose();


    var main = document.querySelector('main');
    var templateError = document.querySelector('#error').content.querySelector('.error');
    var element = templateError.cloneNode(true);
    main.appendChild(element);

    var errorBtn = element.querySelector('.error__button');
    var errorMessage = document.querySelector('.error');

    errorBtn.addEventListener('click', function () {
      errorMessage.remove();
      clearUploadForm();
    });

    document.addEventListener('keydown', function (evtEsc) {
      if (evtEsc.key === window.utils.ESC_KEY) {
        errorMessage.remove();
        clearUploadForm();
      }
    });

    document.addEventListener('click', function () {
      errorMessage.remove();
      clearUploadForm();
    });
  };


  var succesUpload = function () {
    window.dialog.overlayClose();

    var main = document.querySelector('main');
    var templateSuccess = document.querySelector('#success').content.querySelector('.success');
    var element = templateSuccess.cloneNode(true);
    main.appendChild(element);


    var closeBtn = element.querySelector('.success__button');
    console.log(closeBtn);
    var successMessage = document.querySelector('.success');
    console.log(successMessage);
    closeBtn.addEventListener('click', function () {
      successMessage.remove();
      // clearUploadForm();
    });

    document.addEventListener('keydown', function (evtEsc) {
      if (evtEsc.key === window.utils.ESC_KEY) {
        successMessage.remove();
        // clearUploadForm();
      }
    });

    document.addEventListener('click', function () {
      successMessage.remove();
      // clearUploadForm();
    });
  };

})();
