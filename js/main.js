'use strict';

console.log(document.getElementById('picture'));

// ф-я случайное число от (min-0.5) до (max+0.5)
var getRandomInteger = function (min, max) {
  var rand = min - 0.5 + Math.random() * (max - min + 1);
  return Math.round(rand);
};

// ф-я случайного не повторяющегося числа
var makeRandNonRepeat = function (num) {
  var usedNumbers = [];
  function f() {
    if (usedNumbers.length === num) usedNumbers = [];
    var i = Math.floor(Math.random() * num) + 1;
    return usedNumbers.includes(i) ? f() : (usedNumbers.push(i), i);
  }
  return f;
};

var urlNum = makeRandNonRepeat(25);
var COMMENTATOR_NAME = ['Иван', 'Марья', 'Вася', 'Петя', 'Коля', 'Настя', 'Саша', 'Витя', 'Аня', 'Xe', 'Хуан', 'Ли', 'Франсуа', 'Егор', 'Троль', 'User', 'Демид', 'Оля', 'Ира', 'Женя', 'Гендальф', 'R2D2', 'он же Гога', 'Гоша'];
var COMMENTATOR_MESSAGE = ['Всё отлично!', 'В целом всё неплохо.Но не всё.', 'Когда вы делаете фотографию, хорошо бы убирать палец из кадра.В конце концов это просто непрофессионально.', 'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.', 'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.', 'Лица у людей на фотке перекошены, как будто их избивают.Как можно было поймать такой неудачный момент ? !'];

var shuffle = function (myArray) {
  var index;
  var valueIndex;
  for (var i = 0; i <= myArray.length - 1; i++) {
    index = Math.floor(Math.random() * i);
    valueIndex = myArray[index];
    myArray[index] = myArray[i];
    myArray[i] = valueIndex;
  }
};
shuffle(COMMENTATOR_NAME);
shuffle(COMMENTATOR_MESSAGE);

// создание массива с комментариями
var number = getRandomInteger(0, 4);
var getCommentsArr = function (num) {
  var comments = [];
  for (var i = 0; i <= num; i++) {
    var comment = {
      avatar: 'img/avatar-' + getRandomInteger(1, 6) + '.svg',
      message: COMMENTATOR_MESSAGE[i],
      name: COMMENTATOR_NAME[i],
    };
    comments.push(comment);
  }
  return comments;
  console.log(comments);
};
var commnetsList = getCommentsArr(number);
console.log(commnetsList);


// создание массива фото
var PICTS_TOTAL = 25;
var getPictureData = function (total) {
  var picts = [];
  for (var i = 0; i < total; i++) {
    var picture = {
      url: 'photos/' + urlNum() + '.jpg',
      description: 'Описание фотографии.',
      likes: getRandomInteger(15, 200),
      comments: commnetsList,
    };
    picts.push(picture);
  }
  return picts;
};

var makePicts = getPictureData(PICTS_TOTAL);
console.log(makePicts);


var pictureItem = document.querySelector('.picture');

var pictureTemplate = document.querySelector('#picture').content;
console.log(pictureTemplate);

var renderPicture = function (picture) {
  var fragment = document.createDocumentFragment();

  for (var i = 0; i < PICTS_TOTAL; i++) {
    var pictureElement = pictureTemplate.cloneNode(true);
    pictureElement.querySelector('.picture__img').src = makePicts[i].url;
    pictureElement.querySelector('.picture__likes').textContent = makePicts[i].likes;
    pictureElement.querySelector('.picture__comments').textContent = makePicts[i].comments;
    fragment.appendChild(pictureElement);
    console.log(fragment);
  }

  // pictureItem.appendChild(fragment);
};
console.log(renderPicture(makePicts));

