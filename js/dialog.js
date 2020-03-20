'use strict';
(function () {
  var uploadFilePress = document.querySelector('#upload-file');
  var body = document.querySelector('body');
  var overlay = document.querySelector('.img-upload__overlay');
  var overlayCloseBtn = overlay.querySelector('.img-upload__cancel');
  var inputHashtags = document.querySelector('.text__hashtags');
  var inputTextComment = document.querySelector('.text__description');
  var booleanHashtagsInput = false;
  var booleanTextComment;


  inputHashtags.addEventListener('focus', function () {
    booleanHashtagsInput = true;
  });

  inputHashtags.addEventListener('blur', function () {
    booleanHashtagsInput = false;
  });

  inputTextComment.addEventListener('focus', function () {
    booleanTextComment = true;
  });

  inputTextComment.addEventListener('blur', function () {
    booleanTextComment = false;
  });

  uploadFilePress.addEventListener('change', function () {
    body.classList.add('modal-open');
    overlay.classList.remove('hidden');
    window.previewScale.defaultSize();
    window.effectsApply.clearFilter();
    document.addEventListener('keydown', onOverlayEscPress);
  });

  var onOverlayEscPress = function (evt) {
    if (!booleanHashtagsInput === true && !booleanTextComment === true && evt.key === window.utils.ESC_KEY) {
      overlayClose();
      document.removeEventListener('keydown', onOverlayEscPress);
    }
  };

  var overlayClose = function () {
    overlay.classList.add('hidden');
    body.classList.remove('modal-open');
    uploadFilePress.value = '';
    window.previewScale.defaultSize();
    window.effectsApply.clearFilter();
  };

  overlayCloseBtn.addEventListener('keydown', function (evt) {
    if (evt.key === window.utils.ENTER_KEY) {
      overlayClose();
    }
  });

  overlayCloseBtn.addEventListener('click', function () {
    overlayClose();
    document.removeEventListener('keydown', onOverlayEscPress);
  });


  // UPLOAD
  var uploadForm = document.querySelector('.img-upload__form');
  var hashtag = uploadForm.querySelector('.text__hashtags');
  var descriptionText = uploadForm.querySelector('.text__description');

  uploadForm.addEventListener('submit', function (evt) {
    window.server.upload(new FormData(uploadForm), succesUpload, errorUpload);
    evt.preventDefault();
    clearUploadForm();
  });


  var clearUploadForm = function () {
    hashtag.value = '';
    descriptionText.value = '';
  };

  var errorUpload = function () {
    overlayClose();

    var main = document.querySelector('main');
    var templateError = document.querySelector('#error').content.querySelector('.error');
    var element = templateError.cloneNode(true);
    main.appendChild(element);

    var errorBtn = element.querySelector('.error__button');
    var errorMessage = document.querySelector('.error');

    errorBtn.addEventListener('click', function () {
      errorMessage.remove();
      removeHandlersError();
    });

    var onMessageEscPress = function (evtEsc) {
      if (evtEsc.key === window.utils.ESC_KEY) {
        errorMessage.remove();
        removeHandlersError();
      }
    };

    var onAreaAroundMessageClick = function (evt) {
      if (evt.target.classList.contains('error')) {
        errorMessage.remove();
        removeHandlersError();
      }
    };

    var removeHandlersError = function () {
      document.removeEventListener('click', onAreaAroundMessageClick);
      document.removeEventListener('keydown', onMessageEscPress);
    };
    document.addEventListener('keydown', onMessageEscPress);
    document.addEventListener('click', onAreaAroundMessageClick);
  };


  var succesUpload = function () {
    overlayClose();

    var main = document.querySelector('main');
    var templateSuccess = document.querySelector('#success').content.querySelector('.success');
    var element = templateSuccess.cloneNode(true);
    main.appendChild(element);

    var closeBtn = element.querySelector('.success__button');
    var successMessage = document.querySelector('.success');


    closeBtn.addEventListener('click', function () {
      successMessage.remove();
      removeHandlersSuccess();
    });

    var onMessageEscPress = function (evtEsc) {
      if (evtEsc.key === window.utils.ESC_KEY) {
        successMessage.remove();
        removeHandlersSuccess();
      }
    };

    var onAreaAroundMessageClick = function (evt) {
      if (evt.target.classList.contains('success')) {
        successMessage.remove();
        removeHandlersSuccess();
      }
    };

    var removeHandlersSuccess = function () {
      document.removeEventListener('click', onAreaAroundMessageClick);
      document.removeEventListener('keydown', onMessageEscPress);
    };

    document.addEventListener('keydown', onMessageEscPress);
    document.addEventListener('click', onAreaAroundMessageClick);

  };

  window.dialog = {
    overlayClose: overlayClose,
  };
})();
