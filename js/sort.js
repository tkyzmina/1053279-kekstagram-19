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


  var sortHandler = window.debounce(function (evt) {
    buttonStyleApply(evt.target);
    var choosenFilter = evt.target;
    switch (choosenFilter) {
      case defaultFilter:
        console.log('defaultFilter');
        break;
      case randomFilter:
        console.log('randomFilter');
        sortRandom();
        break;
      case discussedFilter:
        sortPopular();
        console.log('discussedFilter');
        break;
    }
  });

  imgFilters.addEventListener('click', sortHandler);

  var sortRandom = function () {
    var array = window.pictures.data;

    console.log(array);
    var sortedArray = shuffle(array).slice(0, QUANTITY_RANDOM);
    console.log(sortedArray);

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
    var array = window.pictures.data;
    array.sort(function (a, b) {
      return b.comments.length - a.comments.length;
    });
    console.log(array);
    window.pictures.insertPhoto(array);
  };

})();
