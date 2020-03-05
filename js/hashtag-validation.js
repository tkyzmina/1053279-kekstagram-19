'use strict';
(function () {
  var tagsList = [];
  var inputHashtags = document.querySelector('.text__hashtags');

  var hashtagCheck = function () {
    var inputContent = inputHashtags.value.replace(/\s+/g, ' ').trim().toLowerCase();
    tagsList = inputContent ? inputContent.split(' ') : [];
    var validationMessage;
    var re = /^#[A-Za-z0-9А-Яа-я]*$/;

    if (tagsList.length > 5) {
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
      } else if (tags.length <= 2) {
        validationMessage = 'слишком короткий хештег';
      } else if (tags.length > 20) {
        validationMessage = 'длина хештега не более 20 символов';
      } else if (!re.test(tags)) {
        validationMessage = 'недопустимые символы! допустимы только буквы и цыфры';
      } else if (hasDuplicates(tagsList)) {
        validationMessage = 'хештеги не должны повторяться';
      }
    });
    if (validationMessage) {
      inputHashtags.setCustomValidity(validationMessage);
    } else {
      inputHashtags.setCustomValidity('');
    }
  };

  inputHashtags.addEventListener('change', hashtagCheck);

})();
