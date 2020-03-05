'use strict';
(function () {
  var effectsList = document.querySelector('.effects__list');
  var imgUpload = document.querySelector('.img-upload__preview');
  var imgEffects = document.querySelector('.img-upload__effect-level');
  imgEffects.classList.add('hidden');

  // очищает классы начинающиеся на effects
  var clearClass = function () {
    var startsWith = 'effects';
    var classes = imgUpload.className.split(' ').filter(function (v) {
      return v.lastIndexOf(startsWith, 0) !== 0;
    });
    imgUpload.className = classes.join(' ').trim();
  };

  effectsList.addEventListener('change', function (evt) {

    for (var i = 0; i < 6; i++) {
      if (evt.target.value === 'chrome') {
        clearClass();
        imgUpload.classList.add('effects__preview--chrome');
        imgUpload.style.filter = '';
        imgEffects.classList.remove('hidden');
      } else if (evt.target.value === 'sepia') {
        clearClass();
        imgUpload.classList.add('effects__preview--sepia');
        imgUpload.style.filter = '';
        imgEffects.classList.remove('hidden');
      } else if (evt.target.value === 'marvin') {
        clearClass();
        imgUpload.classList.add('effects__preview--marvin');
        imgUpload.style.filter = '';
        imgEffects.classList.remove('hidden');
      } else if (evt.target.value === 'phobos') {
        clearClass();
        imgUpload.classList.add('effects__preview--phobos');
        imgUpload.style.filter = '';
        imgEffects.classList.remove('hidden');
      } else if (evt.target.value === 'heat') {
        clearClass();
        imgUpload.classList.add('effects__preview--heat');
        imgUpload.style.filter = '';
        imgEffects.classList.remove('hidden');
      } else if (evt.target.value === 'none') {
        clearClass();
        imgUpload.style.filter = 'none';
        imgEffects.classList.add('hidden');
      }
    }
  });


  // бегунок слайдера
  // на базе решения из учебника https://learn.javascript.ru/task/move-ball-field

  var sliderField = document.querySelector('.effect-level__line');
  var vrapperField = document.querySelector('.img-upload__preview-container');
  var sliderPin = document.querySelector('.effect-level__pin');
  var effectLevel = document.querySelector('.effect-level__depth');

  sliderField.onmouseup = function (event) {
    // координаты поля относительно окна браузера
    vrapperField = this.getBoundingClientRect();
    var sliderCoords = {
      left: event.clientX - vrapperField.left - sliderField.clientLeft - sliderPin.clientWidth / 2
    };
    if (sliderCoords.left < 0) {
      sliderCoords.left = 0;
    }

    // // запрещаем пересекать правую границу поля
    if (sliderCoords.left + sliderPin.clientWidth > sliderField.clientWidth) {
      sliderCoords.left = sliderField.clientWidth - sliderPin.clientWidth;
    }

    sliderPin.style.left = sliderCoords.left + 'px';
    effectLevel.style.width = sliderCoords.left + 'px';

    var effectNumber = effectLevel.clientWidth;

    // --------------применение уровня эффекта--------------
    var levelLength = 436;
    // Для эффекта «Хром» — filter: grayscale(0..1);
    // Для эффекта «Сепия» — filter: sepia(0..1);
    // Для эффекта «Марвин» — filter: invert(0..100%);
    // Для эффекта «Фобос» — filter: blur(0..3px);
    // Для эффекта «Зной» — filter: brightness(1..3);
    var grayAndSepiaLevel = effectNumber / levelLength;
    var invertLevel = effectNumber / levelLength * 100;
    var blurBrigtnessLevel = 3 * (effectNumber / levelLength);

    var chrome = document.querySelector('#effect-chrome');
    var sepia = document.querySelector('#effect-sepia');
    var marvin = document.querySelector('#effect-marvin');
    var phobos = document.querySelector('#effect-phobos');
    var heat = document.querySelector('#effect-heat');

    if (chrome.checked) {
      imgUpload.style.filter = '';
      imgUpload.style.filter = 'grayscale(' + grayAndSepiaLevel + ')';
    } else if (sepia.checked) {
      imgUpload.style.filter = '';
      imgUpload.style.filter = 'sepia(' + grayAndSepiaLevel + ')';
    } else if (marvin.checked) {
      imgUpload.style.filter = '';
      imgUpload.style.filter = 'invert(' + invertLevel + '%)';
    } else if (phobos.checked) {
      imgUpload.style.filter = '';
      imgUpload.style.filter = 'blur(' + blurBrigtnessLevel + 'px)';
    } else if (heat.checked) {
      imgUpload.style.filter = '';
      imgUpload.style.filter = 'brightness(' + blurBrigtnessLevel + ')';
    }
  };
})();
