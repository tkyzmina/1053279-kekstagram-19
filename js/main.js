'use strict';
var PICTS_TOTAL = 25;
var COMMENTATOR_NAME = ['Иван', 'Марья', 'Вася', 'Петя', 'Коля', 'Настя', 'Саша', 'Витя', 'Аня', 'Xe', 'Хуан', 'Ли', 'Франсуа', 'Егор', 'Троль', 'User', 'Демид', 'Оля', 'Ира', 'Женя', 'Гендальф', 'R2D2', 'он же Гога', 'Гоша'];
var COMMENTATOR_MESSAGE = ['Всё отлично!', 'В целом всё неплохо.Но не всё.', 'Когда вы делаете фотографию, хорошо бы убирать палец из кадра.В конце концов это просто непрофессионально.', 'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.', 'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.', 'Лица у людей на фотке перекошены, как будто их избивают.Как можно было поймать такой неудачный момент ? !'];


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
    pictureElement.querySelector('.picture__comments').textContent = pict.comments;
    fragment.appendChild(pictureElement);
  });
};
main();
pictureItemList.appendChild(fragment);
