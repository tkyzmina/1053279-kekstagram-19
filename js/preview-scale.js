'use strict';
(function () {
  var STEP = 25;
  var MIN = 25;
  var MAX = 100;
  var onScaleSmaller = document.querySelector('.scale__control--smaller');
  var onScaleBigger = document.querySelector('.scale__control--bigger');
  var scaleValue = document.querySelector('.scale__control--value');
  var previewSize = document.querySelector('.img-upload__preview');

  var defaultSize = function () {
    previewSize.style.transform = 'scale(1)';
    previewSize.style.filter = '';
  };

  onScaleSmaller.addEventListener('click', function () {
    var value = scaleValue.value.slice(0, -1);
    var valueNumber = +value;

    if (valueNumber > MIN) {
      var newValue = valueNumber - STEP;
      valueNumber = newValue;
      scaleValue.value = (newValue) + '%';
      previewSize.style.transform = 'scale(' + (newValue) / MAX + ')';
    }
  });


  onScaleBigger.addEventListener('click', function () {
    var value = scaleValue.value.slice(0, -1);
    var valueNumber = +value;

    if (valueNumber < MAX) {
      var newValue = valueNumber + STEP;
      valueNumber = newValue;
      scaleValue.value = (newValue) + '%';
      previewSize.style.transform = 'scale(' + (newValue) / MAX + ')';
    }
  });

  window.previewScale = {
    defaultSize: defaultSize,
  };
})();
