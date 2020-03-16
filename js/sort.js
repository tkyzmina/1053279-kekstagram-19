'use strict';
(function () {
  var QUANTITY_RANDOM = 10;
  var imgFilters = document.querySelector('.img-filters');
  var defaultFilter = imgFilters.querySelector('#filter-default');
  var randomFilter = imgFilters.querySelector('#filter-random');
  var discussedFilter = imgFilters.querySelector('#filter-discussed');

  var shuffleArray = function (array) {
    var arrayCopy = array.slice();

    for (var i = 0; i < arrayCopy.length; i++) {
      var randomIndex = Math.floor(Math.random() * (i + 1));
      var currentElement = arrayCopy[i];

      arrayCopy[i] = arrayCopy[randomIndex];
      arrayCopy[randomIndex] = currentElement;
    }

    return arrayCopy;
  };

  var arrayCopy = window.pictures.picturesArr;
  console.log(arrayCopy);



})();
