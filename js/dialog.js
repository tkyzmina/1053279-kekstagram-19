'use strict';
(function () {
  var uploadFilePress = document.querySelector('#upload-file');
  var body = document.querySelector('body');
  var overlay = document.querySelector('.img-upload__overlay');
  var overlayCloseButton = overlay.querySelector('.img-upload__cancel');
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
    // debugger;
    body.classList.add('modal-open');
    overlay.classList.remove('hidden');
    window.previewScale.setDefaultSize();
    window.effectsApply.clearFilter();
    document.addEventListener('keydown', onOverlayEscPress);
  });

  var onOverlayEscPress = function (evt) {
    if (!booleanHashtagsInput === true && !booleanTextComment === true && evt.key === window.utils.ESC_KEY) {
      overlayClose();
    }
  };

  var overlayClose = function () {
    overlay.classList.add('hidden');
    body.classList.remove('modal-open');
    uploadFilePress.value = '';
    window.previewScale.setDefaultSize();
    window.effectsApply.clearFilter();
    document.removeEventListener('keydown', onOverlayEscPress);
  };

  overlayCloseButton.addEventListener('click', function () {
    overlayClose();
  });

  // UPLOAD
  var uploadForm = document.querySelector('.img-upload__form');
  var hashtag = uploadForm.querySelector('.text__hashtags');
  var descriptionText = uploadForm.querySelector('.text__description');

  uploadForm.addEventListener('submit', function (evt) {
    evt.preventDefault();
    window.server.upload(new FormData(uploadForm), onSuccess, onError);
  });

  var onSuccess = function () {
    clearUploadForm();
    overlayClose();
    window.message.showSuccess();
  };

  var onError = function (error) {
    clearUploadForm();
    overlayClose();
    window.message.showError(error);
  };

  var clearUploadForm = function () {
    hashtag.value = '';
    descriptionText.value = '';
  };

  window.dialog = {
    overlayClose: overlayClose,
  };
})();
