'use strict';
(function () {
  var QUANTITY_RANDOM = 10;
  var imgFilters = document.querySelector('.img-filters__form');
  var defaultFilter = imgFilters.querySelector('#filter-default');
  var randomFilter = imgFilters.querySelector('#filter-random');
  var discussedFilter = imgFilters.querySelector('#filter-discussed');


  var buttonStyleApply = function (selectedFilter) {
    var activeFilter = imgFilters.querySelector('.img-filters__button--active');
    activeFilter.classList.remove('img-filters__button--active');
    selectedFilter.classList.add('img-filters__button--active');
  };


  var onSortButtonClick = window.debounce(function (evt) {
    window.pictures.clearPictures();
    buttonStyleApply(evt.target);
    var chosenFilter = evt.target;
    switch (chosenFilter) {
      case defaultFilter:
        defaultPictures();
        break;
      case randomFilter:
        sortRandom();
        break;
      case discussedFilter:
        sortPopular();
        break;
    }
  });

  imgFilters.addEventListener('click', onSortButtonClick);

  var defaultPictures = function () {
    window.pictures.insertPhoto(window.pictures.getArray());
  };

  var sortRandom = function () {
    var array = window.pictures.getArray();
    var sortedArray = shuffle(array).slice(0, QUANTITY_RANDOM);
    window.pictures.insertPhoto(sortedArray);
  };


  var shuffle = function (array) {
    var arrayCopy = array.slice();

    for (var i = 0; i < arrayCopy.length; i++) {
      var randomIndex = Math.floor(Math.random() * (i + 1));
      var currentElement = arrayCopy[i];
      arrayCopy[i] = arrayCopy[randomIndex];
      arrayCopy[randomIndex] = currentElement;
    }
    return arrayCopy;
  };


  var sortPopular = function () {
    var array = window.pictures.getArray();
    var copyArray = array.slice();
    copyArray.sort(function (a, b) {
      return b.comments.length - a.comments.length;
    });
    window.pictures.insertPhoto(copyArray);
  };

})();
