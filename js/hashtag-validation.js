'use strict';
(function () {
  var MAX_TAG_QUANTITY = 5;
  var MIN_TAG_LENGTH = 2;
  var MAX_TAG_LENGTH = 20;
  var MAX_COMMENT_LENGTH = 140;
  var tagsList = [];
  var inputHashtags = document.querySelector('.text__hashtags');
  var inputComment = document.querySelector('.text__description');

  var hashtagCheck = function () {
    var inputContent = inputHashtags.value.replace(/\s+/g, ' ').trim().toLowerCase();
    tagsList = inputContent ? inputContent.split(' ') : [];
    var validationMessage;
    var notAceptableSymbols = /^#[A-Za-z0-9А-Яа-я]*$/;

    if (tagsList.length > MAX_TAG_QUANTITY) {
      validationMessage = 'Нельзя указать больше пяти хэш-тегов';
    }

    // проверка на повторющиеся элементы
    var hasDuplicates = function (arr) {
      return arr.some(function (item) {
        return arr.indexOf(item) !== arr.lastIndexOf(item);
      });
    };

    tagsList.forEach(function (tags) {
      if (tags.charAt(0) !== '#') {
        validationMessage = 'хештег должен начинаться с #';
      } else if (tags.length <= MIN_TAG_LENGTH) {
        validationMessage = 'слишком короткий хештег';
      } else if (tags.length > MAX_TAG_LENGTH) {
        validationMessage = 'длина хештега не более 20 символов';
      } else if (!notAceptableSymbols.test(tags)) {
        validationMessage = 'недопустимые символы! допустимы только буквы и цыфры';
      } else if (hasDuplicates(tagsList)) {
        validationMessage = 'хештеги не должны повторяться';
      }
    });
    if (validationMessage) {
      inputHashtags.setCustomValidity(validationMessage);
      inputHashtags.style.border = '2px solid red';
    } else {
      inputHashtags.setCustomValidity('');
      inputHashtags.style.border = '';
    }
  };

  inputHashtags.addEventListener('change', hashtagCheck);

  var commentCheck = function () {
    var commentContent = inputComment.value;
    if (commentContent.length > MAX_COMMENT_LENGTH) {
      inputComment.style.border = '2px solid red';
      inputComment.setCustomValidity('длина комментария не более 140 символов, вы ввели ' + commentContent.length);
    } else {
      inputComment.setCustomValidity('');
      inputComment.style.border = '';
    }
  };
  inputComment.addEventListener('change', commentCheck);
})();
