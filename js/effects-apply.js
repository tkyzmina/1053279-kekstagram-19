'use strict';
(function () {
  var PERCENT_MAX = 100;
  var HEAT_MIN = 1;
  var HEAT_MAX = 3;
  var BLUR_MAX = 3;
  var effectsList = document.querySelector('.effects__list');
  var imageUpload = document.querySelector('.img-upload__preview img');
  var imageEffects = document.querySelector('.img-upload__effect-level');
  var effectValue = document.querySelector('.effect-level__value');
  effectValue.value = PERCENT_MAX;
  var none = effectsList.querySelector('#effect-none');

  var makeCheckedNone = function () {
    none.checked = true;
  };

  imageEffects.classList.add('hidden');

  // очищает классы начинающиеся на effects
  var clearClass = function () {
    var startsWith = 'effects';
    var classes = imageUpload.className.split(' ').filter(function (nameOfClass) {
      return nameOfClass.lastIndexOf(startsWith, 0) !== 0;
    });
    imageUpload.className = classes.join(' ').trim();
  };

  effectsList.addEventListener('change', function (evt) {
    setEffectLevel(PERCENT_MAX);
    effectValue.value = 'PERCENT_MAX';
    clearClass();
    imageEffects.classList.remove('hidden');
    if (evt.target.value === 'none') {
      imageEffects.classList.add('hidden');
      imageUpload.style.filter = '';
    }
    setEffectLevel(PERCENT_MAX);
  });

  var sliderField = document.querySelector('.effect-level__line');
  var sliderPin = document.querySelector('.effect-level__pin');
  var effectLevel = document.querySelector('.effect-level__depth');

  var setEffectLevel = function (level) {
    var x = level / PERCENT_MAX * sliderField.offsetWidth;
    sliderPin.style.left = x + 'px';
    effectLevel.style.width = x + 'px';

    effectValue.value = level;

    //  Для эффекта «Хром» — filter: grayscale(0..1);
    // Для эффекта «Сепия» — filter: sepia(0..1);
    // Для эффекта «Марвин» — filter: invert(0..100%);
    // Для эффекта «Фобос» — filter: blur(0..3px);
    // Для эффекта «Зной» — filter: brightness(1..3);

    var blurBrightnessLevel = BLUR_MAX * level / PERCENT_MAX;

    var brightness = HEAT_MIN + (HEAT_MAX - HEAT_MIN) * level / PERCENT_MAX;

    var checkedEffect = effectsList.querySelector('.effects__radio:checked');
    switch (checkedEffect.value) {
      case 'chrome':
        imageUpload.style.filter = '';
        imageUpload.style.filter = 'grayscale(' + (level) / PERCENT_MAX + ')';
        break;
      case 'sepia':
        imageUpload.style.filter = '';
        imageUpload.style.filter = 'sepia(' + (level) / PERCENT_MAX + ')';
        break;
      case 'marvin':
        imageUpload.style.filter = '';
        imageUpload.style.filter = 'invert(' + (level) + '%)';
        break;
      case 'phobos':
        imageUpload.style.filter = '';
        imageUpload.style.filter = 'blur(' + blurBrightnessLevel + 'px)';
        break;
      case 'heat':
        imageUpload.style.filter = '';
        imageUpload.style.filter = 'brightness(' + brightness + ')';
        break;
    }
  };


  sliderPin.addEventListener('mousedown', function (evt) {
    var startX = evt.clientX;
    var startOffsetLeft = sliderPin.offsetLeft;

    var onMouseMove = function (moveEvt) {
      var shiftX = moveEvt.clientX - startX;

      var sliderLocation = startOffsetLeft + shiftX;
      sliderLocation = Math.min(sliderLocation, sliderField.offsetWidth);
      sliderLocation = Math.max(sliderLocation, 0);

      var percentage = Math.round(sliderLocation / sliderField.offsetWidth * PERCENT_MAX);
      setEffectLevel(percentage);

    };

    var onMouseUp = function () {
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  });

  var clearFilter = function () {
    clearClass();
    makeCheckedNone();
    setEffectLevel(PERCENT_MAX);
    effectValue.value = 'PERCENT_MAX';
    imageEffects.classList.add('hidden');
  };

  window.effectsApply = {
    clearFilter: clearFilter,
  };
})();
