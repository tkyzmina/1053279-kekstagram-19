'use strict';
(function () {
  //   var PICTS_TOTAL = 25;
  //   var COMMENTATOR_NAME = ['Иван', 'Марья', 'Вася', 'Петя', 'Коля', 'Настя', 'Саша', 'Витя', 'Аня', 'Xe', 'Хуан', 'Ли', 'Франсуа', 'Егор', 'Троль', 'User', 'Демид', 'Оля', 'Ира', 'Женя', 'Гендальф', 'R2D2', 'он же Гога', 'Гоша'];
  //   var COMMENTATOR_MESSAGE = ['Всё отлично!', 'В целом всё неплохо.Но не всё.', 'Когда вы делаете фотографию, хорошо бы убирать палец из кадра.В конце концов это просто непрофессионально.', 'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.', 'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.', 'Лица у людей на фотке перекошены, как будто их избивают.Как можно было поймать такой неудачный момент ? !'];

  //   // ф-я случайное число от (min-0.5) до (max+0.5)
  //   var getRandomInteger = function (min, max) {
  //     var rand = min - 0.5 + Math.random() * (max - min + 1);
  //     return Math.round(rand);
  //   };

  //   // ф-я случайного не повторяющегося числа
  //   var makeRandNonRepeat = function (num) {
  //     var usedNumbers = [];
  //     var f = function () {
  //       if (usedNumbers.length === num) {
  //         usedNumbers = [];
  //       }
  //       var i = Math.floor(Math.random() * num) + 1;
  //       return usedNumbers.includes(i) ? f() : (usedNumbers.push(i), i);
  //     };
  //     return f;
  //   };

  //   // случайный элемент массива
  //   var arrayRandElement = function (arr) {
  //     var rand = Math.floor(Math.random() * arr.length);
  //     return arr[rand];
  //   };

  //   // создание массива с комментариями
  //   var number = getRandomInteger(0, 4);
  //   var getCommentsArr = function (num) {
  //     var comments = [];
  //     for (var i = 0; i <= num; i++) {
  //       var comment = {
  //         avatar: 'img/avatar-' + getRandomInteger(1, 6) + '.svg',
  //         message: arrayRandElement(COMMENTATOR_MESSAGE),
  //         name: arrayRandElement(COMMENTATOR_NAME),
  //       };
  //       comments.push(comment);
  //     }
  //     return comments;
  //   };

  //   // создание массива фото---------------------------
  //   var urlNum = makeRandNonRepeat(25);
  //   var getPictureData = function (total) {
  //     var picts = [];
  //     for (var i = 0; i < total; i++) {
  //       var picture = {
  //         url: 'photos/' + urlNum() + '.jpg',
  //         description: 'Описание фотографии.',
  //         likes: getRandomInteger(15, 200),
  //         comments: getCommentsArr(number),
  //       };
  //       picts.push(picture);
  //     }
  //     return picts;
  //   };

  //   var makePicts = getPictureData(PICTS_TOTAL);
  //   // ______________________________
  //   //   var pictureItemList = document.querySelector('.pictures');
  //   //   var pictureTemplate = document.querySelector('#picture').content;
  //   var fragment = document.createDocumentFragment();

  //   var main = function () {
  //     makePicts.forEach(function (pict) {
  //       var pictureElement = pictureTemplate.cloneNode(true);
  //       pictureElement.querySelector('.picture__img').src = pict.url;
  //       pictureElement.querySelector('.picture__likes').textContent = pict.likes;
  //       pictureElement.querySelector('.picture__comments').textContent = pict.comments.length;
  //       fragment.appendChild(pictureElement);
  //     });
  //   };
  //   main();
  //   pictureItemList.appendChild(fragment);
  //   _______________________

  var getPicture = function (result) {
    var pictureTemplate = document.querySelector('#picture').content.querySelector('.picture');
    var pictureElement = pictureTemplate.cloneNode(true);
    pictureElement.querySelector('.picture__img').src = result.url;
    pictureElement.querySelector('.picture__likes').textContent = result.likes;
    pictureElement.querySelector('.picture__comments').textContent = result.comments.length;

    pictureElement.addEventListener('click', function () {
      window.bigPicture.show(result);
    });

    return pictureElement;
  };

  var picturesArr = [];

  var insertPhoto = function (picts) {
    picturesArr = picts;
    var fragment = document.createDocumentFragment();
    for (var i = 0; i < picts.length; i++) {
      fragment.appendChild(getPicture(picts[i]));
      var comments = picturesArr[i].comments;
      // console.log(comments);
      // getComment(comments);

      for (var j = 0; j < comments.length; i++) {
        var socialComments = document.querySelector('.social__comments');
        var socialCommentItem = document.querySelector('.social__comment');
        var cloneComment = socialCommentItem.cloneNode(true);
        // cloneComment.querySelector('.social__picture').src = comments.avatar;
        // cloneComment.querySelector('.social__text').textContent = comments.message;

        socialComments.appendChild(cloneComment);
        // return cloneComment;
      }

    }
    picturesElement.appendChild(fragment);


  };

  // var commentsArr = [];
  // var insertComment = function (data) {
  //   commentsArr = data.comments;

  //   console.log(commentsArr);
  //   console.log(data.comments);
  // };

  window.server.load(insertPhoto);
  // window.server.load(insertComment);

  // ==============================================================
  // большое фото

  var bigPicture = document.querySelector('.big-picture');
  var picturesElement = document.querySelector('.pictures');
  var bigPictureClose = bigPicture.querySelector('.big-picture__cancel');
  var commentsCount = document.querySelector('.social__comment-count');

  // var socialComments = document.querySelector('.social__comments');
  // var socialCommentItem = document.querySelector('.social__comment');



  var getComment = function (commentData) {
    var socialComments = document.querySelector('.social__comments');
    var socialCommentItem = document.querySelector('.social__comment');
    console.log(socialComments);
    var cloneComment = socialCommentItem.cloneNode(true);
    // cloneComment.querySelector('.social__picture').src = commentData.comments.avatar;
    cloneComment.querySelector('.social__text').textContent = 'commentData.comments.message';

    socialComments.appendChild(cloneComment);
    return cloneComment;
  };


  // var getBigPicture = function (picts) {
  //   bigPicture.classList.remove('hidden');
  //   bigPicture.querySelector('.big-picture__img img').src = picts.url;
  //   bigPicture.querySelector('.likes-count').textContent = picts.likes;
  //   bigPicture.querySelector('.social__caption').textContent = picts.description;
  // };

  // var showBigPicture = function (evt) {
  //   evt.preventDefault();
  //   if (evt.target.classList.contains('picture__img')) {
  //     var attribute = evt.target.getAttribute('src');
  //     for (var i = 0; i < picturesArr.length; i++) {
  //       if (picturesArr[i].url === attribute) {
  //         getBigPicture(picturesArr[i]);
  //       }
  //     }
  //   }
  // };

  var openBigPicture = function (evt) {
    var target = evt.target;
    var picture = target.closest('.picture');
    if (!picture) {
      return;
    }
    showBigPicture(evt);
  };

  picturesElement.addEventListener('click', openBigPicture);
  bigPictureClose.addEventListener('click', function () {
    window.utils.closeElement(bigPicture);
  });

  var onOverlayEscPress = function (evt) {
    if (evt.key === window.utils.ESC_KEY) {
      window.utils.closeElement(bigPicture);
    }
  };
  document.addEventListener('keydown', onOverlayEscPress);

})();
