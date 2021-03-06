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

  var insertPhoto = function (pictures) {
    var fragment = document.createDocumentFragment();

    pictures.forEach(function (item) {
      fragment.appendChild(getPicture(item));
    });


    picturesElement.appendChild(fragment);
    imgFilters.classList.remove('img-filters--inactive');

  };

  var onSuccess = function (pictures) {
    picturesArr = pictures;
    insertPhoto(pictures);
  };

  var clearPictures = function () {
    picturesElement.querySelectorAll('.picture').forEach(function (element) {
      element.remove();
    });
  };

  window.server.load(onSuccess);
  var picturesElement = document.querySelector('.pictures');

  var getArray = function () {
    return picturesArr;
  };

  window.pictures = {
    insertPhoto: insertPhoto,
    getArray: getArray,
    clearPictures: clearPictures,
  };
})();
