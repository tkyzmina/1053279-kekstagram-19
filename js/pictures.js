'use strict';
(function () {
  var imgFilters = document.querySelector('.img-filters');

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
    }
    picturesElement.appendChild(fragment);
    imgFilters.classList.remove('img-filters--inactive');

    window.pictures = {
      picturesArr: picturesArr,
    };
    console.log(picturesArr);
  };

  window.server.load(insertPhoto);

  var bigPicture = document.querySelector('.big-picture');
  var picturesElement = document.querySelector('.pictures');
  var bigPictureClose = bigPicture.querySelector('.big-picture__cancel');

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
