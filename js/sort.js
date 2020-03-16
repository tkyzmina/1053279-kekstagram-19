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

  imgFilters.addEventListener('click', function (evt) {
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
        console.log('discussedFilter');
        break;
    }
  });

  var sortRandom = function () {
    var array = window.pictures.data;
    console.log(array);
    array.sort();
    console.log(array);
    array.slice(0, QUANTITY_RANDOM);
    console.log(array);
    window.pictures.insertPhoto(array);
  };

})();
