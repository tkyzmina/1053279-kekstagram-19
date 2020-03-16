'use strict';
(function () {
  var URL = {
    URL_LOAD: 'https://js.dump.academy/kekstagram/data',
    URL_UPLOAD: 'https://js.dump.academy/kekstagram',
  };
  var TIME_OUT = 10000;
  var GOOD_STATUS = 200;

  var createXHR = function (onSuccess, onError) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      if (xhr.status === GOOD_STATUS) {
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

    xhr.timeout = TIME_OUT;

    return xhr;
  };


  var load = function (onSuccess, onError) {
    var xhr = createXHR(onSuccess, onError);

    xhr.open('GET', URL.URL_LOAD);
    xhr.send();
  };


  var upload = function (data, onSuccess, onError) {
    var xhr = createXHR(onSuccess, onError);

    xhr.open('POST', URL.URL_UPLOAD);
    xhr.send(data);
  };

  window.server = {
    load: load,
    upload: upload,
  };
})();
