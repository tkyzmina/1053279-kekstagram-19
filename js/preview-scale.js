'use strict';
(function () {
  var STEP = 25;
  var MIN = 25;
  var MAX = 100;
  var onScaleSmaller = document.querySelector('.scale__control--smaller');
  var onScaleBigger = document.querySelector('.scale__control--bigger');
  var scaleValue = document.querySelector('.scale__control--value');
  var previewSize = document.querySelector('.img-upload__preview');

  var getScaleValue = function () {
    var value = scaleValue.value;
    var valueNumber = value.slice(0, -1);
    console.log(typeof valueNumber);
    return parseInt(valueNumber, 10);

  };

  var setScaleValue = function (value) {
    scaleValue.value = value + '%';
  };

  onScaleSmaller.addEventListener('click', function () {
    var num = scaleValue.value;
    if (num > 25) {
      num = num - 25;
    }
    scaleValue.value = num;
    var numScale = scaleValue.value / 100;
    previewSize.style.transform = 'scale(' + numScale + ')';

  });

  onScaleBigger.addEventListener('click', function () {
    var num = scaleValue.value;
    if (num < 100) {
      num = +num + 25;
    }
    scaleValue.value = num;
    var numScale = scaleValue.value / 100;

    previewSize.style.transform = 'scale(' + numScale + ')';
  });
})();
