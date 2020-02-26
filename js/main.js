'use strict';
var PICTS_TOTAL = 25;
var COMMENTATOR_NAME = ['Иван', 'Марья', 'Вася', 'Петя', 'Коля', 'Настя', 'Саша', 'Витя', 'Аня', 'Xe', 'Хуан', 'Ли', 'Франсуа', 'Егор', 'Троль', 'User', 'Демид', 'Оля', 'Ира', 'Женя', 'Гендальф', 'R2D2', 'он же Гога', 'Гоша'];
var COMMENTATOR_MESSAGE = ['Всё отлично!', 'В целом всё неплохо.Но не всё.', 'Когда вы делаете фотографию, хорошо бы убирать палец из кадра.В конце концов это просто непрофессионально.', 'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.', 'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.', 'Лица у людей на фотке перекошены, как будто их избивают.Как можно было поймать такой неудачный момент ? !'];
var ESC_KEY = 'Escape';
var ENTER_KEY = 'Enter';

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

var onUploadFilePress = document.querySelector('#upload-file');
var body = document.querySelector('body');
var overlay = document.querySelector('.img-upload__overlay');
var overlayCloseBtn = overlay.querySelector('.img-upload__cancel');

onUploadFilePress.addEventListener('change', function () {
  body.classList.add('modal-open');
  overlay.classList.remove('hidden');
  document.addEventListener('keydown', onOverlayEscPress);
});

var onOverlayEscPress = function (evt) {
  if (evt.key === ESC_KEY) {
    overlayClose();
  }
};

var overlayClose = function () {
  overlay.classList.add('hidden');
  document.addEventListener('keydown', onOverlayEscPress);
  body.classList.remove('modal-open');
  onUploadFilePress.value = '';
};

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
    } else if (evt.target.value === 'sepia') {
      clearClass();
      imgUpload.classList.add('effects__preview--sepia');
      imgUpload.style.filter = '';
    } else if (evt.target.value === 'marvin') {
      clearClass();
      imgUpload.classList.add('effects__preview--marvin');
      imgUpload.style.filter = '';
    } else if (evt.target.value === 'phobos') {
      clearClass();
      imgUpload.classList.add('effects__preview--phobos');
      imgUpload.style.filter = '';
    } else if (evt.target.value === 'heat') {
      clearClass();
      imgUpload.classList.add('effects__preview--heat');
      imgUpload.style.filter = '';
    } else if (evt.target.value === 'none') {
      clearClass();
      imgUpload.style.filter = 'none';
    }
  }
});

// валидация хештега

var inputHashtags = document.querySelector('.text__hashtags');
var tagsList = [];
inputHashtags.addEventListener('change', function () {
  var inputContent = inputHashtags.value;
  console.log(inputContent);
  tagsList = inputContent.split(' ', 5);
  console.log(tagsList);

  for (var i = 0; i < tagsList.length; i++) {

    // проверка на наличие # и добавление если ее нет // tagsList[i] = '#' + tagsList[i];
    if (tagsList[i].charAt(0) !== '#') {
      inputHashtags.setCustomValidity('хештег должен начинаться с # !!!');
    }

    // проверка на длину более одного символа #
    if (tagsList[i].length <= 1) {
      // console.log('слишком короткий хештег!');
      inputHashtags.setCustomValidity('слишком короткий хештег!');
    };

    // проверка на допустимые символы
    var re = /^#[A-Za-z0-9А-Яа-я]+$/;
    if (!re.test(tagsList[i])) {
      console.log('недопустимые символы!');
      inputHashtags.setCustomValidity('недопустимые символы!');
    }


    // обрезка элента до 20ти символов
    tagsList[i] = tagsList[i].slice(0, 20);

  }
  console.log(tagsList);
});

