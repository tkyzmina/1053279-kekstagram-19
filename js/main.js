'use strict';
var PICTS_TOTAL = 25;
var COMMENTATOR_NAME = ['Иван', 'Марья', 'Вася', 'Петя', 'Коля', 'Настя', 'Саша', 'Витя', 'Аня', 'Xe', 'Хуан', 'Ли', 'Франсуа', 'Егор', 'Троль', 'User', 'Демид', 'Оля', 'Ира', 'Женя', 'Гендальф', 'R2D2', 'он же Гога', 'Гоша'];
var COMMENTATOR_MESSAGE = ['Всё отлично!', 'В целом всё неплохо.Но не всё.', 'Когда вы делаете фотографию, хорошо бы убирать палец из кадра.В конце концов это просто непрофессионально.', 'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.', 'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.', 'Лица у людей на фотке перекошены, как будто их избивают.Как можно было поймать такой неудачный момент ? !'];
var ESC_KEY = 'Escape';
// var ENTER_KEY = 'Enter';

// ф-я случайное число от (min-0.5) до (max+0.5)
var getRandomInteger = function (min, max) {
  var rand = min - 0.5 + Math.random() * (max - min + 1);
  return Math.round(rand);
};

// ф-я случайного не повторяющегося числа
var makeRandNonRepeat = function (num) {
  var usedNumbers = [];
  var f = function () {
    if (usedNumbers.length === num) {
      usedNumbers = [];
    }
    var i = Math.floor(Math.random() * num) + 1;
    return usedNumbers.includes(i) ? f() : (usedNumbers.push(i), i);
  };
  return f;
};

// случайный элемент массива
var arrayRandElement = function (arr) {
  var rand = Math.floor(Math.random() * arr.length);
  return arr[rand];
};

// создание массива с комментариями
var number = getRandomInteger(0, 4);
var getCommentsArr = function (num) {
  var comments = [];
  for (var i = 0; i <= num; i++) {
    var comment = {
      avatar: 'img/avatar-' + getRandomInteger(1, 6) + '.svg',
      message: arrayRandElement(COMMENTATOR_MESSAGE),
      name: arrayRandElement(COMMENTATOR_NAME),
    };
    comments.push(comment);
  }
  return comments;
};

// создание массива фото
var urlNum = makeRandNonRepeat(25);
var getPictureData = function (total) {
  var picts = [];
  for (var i = 0; i < total; i++) {
    var picture = {
      url: 'photos/' + urlNum() + '.jpg',
      description: 'Описание фотографии.',
      likes: getRandomInteger(15, 200),
      comments: getCommentsArr(number),
    };
    picts.push(picture);
  }
  return picts;
};

var makePicts = getPictureData(PICTS_TOTAL);

var pictureItemList = document.querySelector('.pictures');
var pictureTemplate = document.querySelector('#picture').content;
var fragment = document.createDocumentFragment();

var main = function () {
  makePicts.forEach(function (pict) {
    var pictureElement = pictureTemplate.cloneNode(true);
    pictureElement.querySelector('.picture__img').src = pict.url;
    pictureElement.querySelector('.picture__likes').textContent = pict.likes;
    pictureElement.querySelector('.picture__comments').textContent = pict.comments.length;
    fragment.appendChild(pictureElement);
  });
};
main();
pictureItemList.appendChild(fragment);

// 9. Личный проект: доверяй, но проверяй(часть 1)
// Рабочая ветка module4-task2

var uploadFilePress = document.querySelector('#upload-file');
var body = document.querySelector('body');
var overlay = document.querySelector('.img-upload__overlay');
var overlayCloseBtn = overlay.querySelector('.img-upload__cancel');
var inputHashtags = document.querySelector('.text__hashtags');
var inputTextComment = document.querySelector('.text__description');
var booleanHashtagsInput;
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

// 2.1. Масштаб
var onScaleSmaller = document.querySelector('.scale__control--smaller');
var onScaleBigger = document.querySelector('.scale__control--bigger');
var scaleValue = document.querySelector('.scale__control--value');
var previewSize = document.querySelector('.img-upload__preview');

onScaleSmaller.addEventListener('click', function () {
  var num = scaleValue.value;
  if (num > 25) {
    num = num - 25;
  }
  scaleValue.value = num;
  var numScale = scaleValue.value / 100;
  previewSize.style.transform = 'scale(' + numScale + ')';
});

onScaleBigger.addEventListener('click', function () {
  var num = scaleValue.value;
  if (num < 100) {
    num = +num + 25;
  }
  scaleValue.value = num;
  var numScale = scaleValue.value / 100;
  previewSize.style.transform = 'scale(' + numScale + ')';
});

// 2.2. Наложение эффекта на изображение:
var effectsList = document.querySelector('.effects__list');
var imgUpload = document.querySelector('.img-upload__preview');
var imgEffects = document.querySelector('.img-upload__effect-level');
imgEffects.classList.add('hidden');

// очищает классы начинающиеся на effects
var clearClass = function () {
  var startsWith = 'effects';
  var classes = imgUpload.className.split(' ').filter(function (v) {
    return v.lastIndexOf(startsWith, 0) !== 0;
  });
  imgUpload.className = classes.join(' ').trim();
};

effectsList.addEventListener('change', function (evt) {

  for (var i = 0; i < 6; i++) {
    if (evt.target.value === 'chrome') {
      clearClass();
      imgUpload.classList.add('effects__preview--chrome');
      imgUpload.style.filter = '';
      imgEffects.classList.remove('hidden');
    } else if (evt.target.value === 'sepia') {
      clearClass();
      imgUpload.classList.add('effects__preview--sepia');
      imgUpload.style.filter = '';
      imgEffects.classList.remove('hidden');
    } else if (evt.target.value === 'marvin') {
      clearClass();
      imgUpload.classList.add('effects__preview--marvin');
      imgUpload.style.filter = '';
      imgEffects.classList.remove('hidden');
    } else if (evt.target.value === 'phobos') {
      clearClass();
      imgUpload.classList.add('effects__preview--phobos');
      imgUpload.style.filter = '';
      imgEffects.classList.remove('hidden');
    } else if (evt.target.value === 'heat') {
      clearClass();
      imgUpload.classList.add('effects__preview--heat');
      imgUpload.style.filter = '';
      imgEffects.classList.remove('hidden');
    } else if (evt.target.value === 'none') {
      clearClass();
      imgUpload.style.filter = 'none';
      imgEffects.classList.add('hidden');
    }
  }
});


// бегунок слайдера
// на базе решения из учебника https://learn.javascript.ru/task/move-ball-field

var sliderField = document.querySelector('.effect-level__line');
var vrapperField = document.querySelector('.img-upload__preview-container');
var sliderPin = document.querySelector('.effect-level__pin');
var effectLevel = document.querySelector('.effect-level__depth');

sliderField.onmouseup = function (event) {
  // координаты поля относительно окна браузера
  vrapperField = this.getBoundingClientRect();
  var sliderCoords = {
    left: event.clientX - vrapperField.left - sliderField.clientLeft - sliderPin.clientWidth / 2
  };
  if (sliderCoords.left < 0) {
    sliderCoords.left = 0;
  }

  // // запрещаем пересекать правую границу поля
  if (sliderCoords.left + sliderPin.clientWidth > sliderField.clientWidth) {
    sliderCoords.left = sliderField.clientWidth - sliderPin.clientWidth;
  }

  sliderPin.style.left = sliderCoords.left + 'px';
  effectLevel.style.width = sliderCoords.left + 'px';

  var effectNumber = effectLevel.clientWidth;

  // --------------применение уровня эффекта--------------
  var levelLength = 436;
  // Для эффекта «Хром» — filter: grayscale(0..1);
  // Для эффекта «Сепия» — filter: sepia(0..1);
  // Для эффекта «Марвин» — filter: invert(0..100%);
  // Для эффекта «Фобос» — filter: blur(0..3px);
  // Для эффекта «Зной» — filter: brightness(1..3);
  var grayAndSepiaLevel = effectNumber / levelLength;
  var invertLevel = effectNumber / levelLength * 100;
  var blurBrigtnessLevel = 3 * (effectNumber / levelLength);

  var chrome = document.querySelector('#effect-chrome');
  var sepia = document.querySelector('#effect-sepia');
  var marvin = document.querySelector('#effect-marvin');
  var phobos = document.querySelector('#effect-phobos');
  var heat = document.querySelector('#effect-heat');

  if (chrome.checked) {
    imgUpload.style.filter = '';
    imgUpload.style.filter = 'grayscale(' + grayAndSepiaLevel + ')';
  } else if (sepia.checked) {
    imgUpload.style.filter = '';
    imgUpload.style.filter = 'sepia(' + grayAndSepiaLevel + ')';
  } else if (marvin.checked) {
    imgUpload.style.filter = '';
    imgUpload.style.filter = 'invert(' + invertLevel + '%)';
  } else if (phobos.checked) {
    imgUpload.style.filter = '';
    imgUpload.style.filter = 'blur(' + blurBrigtnessLevel + 'px)';
  } else if (heat.checked) {
    imgUpload.style.filter = '';
    imgUpload.style.filter = 'brightness(' + blurBrigtnessLevel + ')';
  }
};

// ------------------- валидация хештега -----------------

// var inputHashtags = document.querySelector('.text__hashtags');
var tagsList = [];

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
