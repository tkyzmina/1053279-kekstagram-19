'use strict';
(function () {
  var ESC_KEY = 'Escape';
  var uploadFilePress = document.querySelector('#upload-file');
  var body = document.querySelector('body');
  var overlay = document.querySelector('.img-upload__overlay');
  var overlayCloseBtn = overlay.querySelector('.img-upload__cancel');
  var inputHashtags = document.querySelector('.text__hashtags');
  var inputTextComment = document.querySelector('.text__description');
  var booleanHashtagsInput = true;
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

  });

  var onOverlayEscPress = function (evt) {
    if (!booleanHashtagsInput === true && !booleanTextComment === true && evt.key === ESC_KEY) {
      overlayClose();
    }
  };

  var overlayClose = function () {
    // window.utils.closeElement(overlay);
    overlay.classList.add('hidden');
    document.addEventListener('keydown', onOverlayEscPress);
    body.classList.remove('modal-open');
    uploadFilePress.value = '';
  };

  overlayCloseBtn.addEventListener('keydown', function (evt) {
    if (evt.key) {
      overlayClose();
    }
  });

  overlayCloseBtn.addEventListener('click', function () {
    overlayClose();
  });

  window.dialog = {
    overlayClose: overlayClose,
  };

})();
