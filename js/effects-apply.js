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

  var sliderField = document.querySelector('.effect-level__line');
  var vrapperField = document.querySelector('.img-upload__preview-container');
  var sliderPin = document.querySelector('.effect-level__pin');
  var effectLevel = document.querySelector('.effect-level__depth');

  var setEffectLevel = function (level) {
    var x = level / 100 * sliderField.offsetWidth;
    console.log(x + ' x');
    console.log(level + ' level');
    sliderPin.style.left = x + 'px';
    effectLevel.style.width = x + 'px';
  };

  sliderPin.addEventListener('mousedown', function (evt) {
    var startX = evt.clientX;
    var startOffsetLeft = sliderPin.offsetLeft;

    var onMouseMove = function (moveEvt) {
      var shiftX = moveEvt.clientX - startX;

      var sliderLocation = startOffsetLeft + shiftX;
      sliderLocation = Math.min(sliderLocation, sliderField.offsetWidth);
      sliderLocation = Math.max(sliderLocation, 0);

      // sliderPin.style.left = sliderLocation + 'px';
      // effectLevel.style.width = sliderLocation + 'px';
      var percentage = sliderLocation / sliderField.offsetWidth * 100;
      setEffectLevel(percentage);
      console.log(percentage + ' percentage');
    };

    var onMouseUp = function () {
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);

  });

  var effectNumber = effectLevel.clientWidth;
  console.log(effectLevel.clientWidth + 'effectNumber ');

  // --------------применение уровня эффекта--------------
  var levelLength = effectLevel.offsetWidth;
  console.log(levelLength + ' levelLength');

  // Для эффекта «Хром» — filter: grayscale(0..1);
  // Для эффекта «Сепия» — filter: sepia(0..1);
  // Для эффекта «Марвин» — filter: invert(0..100%);
  // Для эффекта «Фобос» — filter: blur(0..3px);
  // Для эффекта «Зной» — filter: brightness(1..3);
  // effectNumber / levelLength;
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
    imgUpload.style.filter = 'grayscale(' + setEffectLevel() + ')';

    setEffectLevel();
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
})();
