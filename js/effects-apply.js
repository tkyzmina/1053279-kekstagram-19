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
    setEffectLevel(100);
    clearClass();
    imgEffects.classList.remove('hidden');
    if (evt.target.value === 'none') {
      imgEffects.classList.add('hidden');
    }

    // for (var i = 0; i < 6; i++) {
    //   if (evt.target.value === 'chrome') {
    //     clearClass();
    //     imgUpload.classList.add('effects__preview--chrome');
    //     imgUpload.style.filter = '';
    //     imgEffects.classList.remove('hidden');
    //   } else if (evt.target.value === 'sepia') {
    //     clearClass();
    //     imgUpload.classList.add('effects__preview--sepia');
    //     imgUpload.style.filter = '';
    //     imgEffects.classList.remove('hidden');
    //   } else if (evt.target.value === 'marvin') {
    //     clearClass();
    //     imgUpload.classList.add('effects__preview--marvin');
    //     imgUpload.style.filter = '';
    //     imgEffects.classList.remove('hidden');
    //   } else if (evt.target.value === 'phobos') {
    //     clearClass();
    //     imgUpload.classList.add('effects__preview--phobos');
    //     imgUpload.style.filter = '';
    //     imgEffects.classList.remove('hidden');
    //   } else if (evt.target.value === 'heat') {
    //     clearClass();
    //     imgUpload.classList.add('effects__preview--heat');
    //     imgUpload.style.filter = '';
    //     imgEffects.classList.remove('hidden');
    //   } else if (evt.target.value === 'none') {
    //     clearClass();
    //     imgUpload.style.filter = 'none';
    //     imgEffects.classList.add('hidden');
    //   }
    // }
  });

  var sliderField = document.querySelector('.effect-level__line');
  var sliderPin = document.querySelector('.effect-level__pin');
  var effectLevel = document.querySelector('.effect-level__depth');

  var setEffectLevel = function (level) {
    var x = level / 100 * sliderField.offsetWidth;
    sliderPin.style.left = x + 'px';
    effectLevel.style.width = x + 'px';

    //  Для эффекта «Хром» — filter: grayscale(0..1);
    // Для эффекта «Сепия» — filter: sepia(0..1);
    // Для эффекта «Марвин» — filter: invert(0..100%);
    // Для эффекта «Фобос» — filter: blur(0..3px);
    // Для эффекта «Зной» — filter: brightness(1..3);

    var blurBrigtnessLevel = 3 * level / 100;
    var heatmin = 1;
    var heatmax = 3;
    var brightness = heatmin + (heatmax - heatmin) * level / 100;

    var checkedEffect = effectsList.querySelector('.effects__radio:checked');
    switch (checkedEffect.value) {
      case 'chrome':
        imgUpload.style.filter = '';
        imgUpload.style.filter = 'grayscale(' + (level) / 100 + ')';
        break;
      case 'sepia':
        imgUpload.style.filter = '';
        imgUpload.style.filter = 'sepia(' + (level) / 100 + ')';
        break;
      case 'marvin':
        imgUpload.style.filter = '';
        imgUpload.style.filter = 'invert(' + (level) + '%)';
        break;
      case 'phobos':
        imgUpload.style.filter = '';
        imgUpload.style.filter = 'blur(' + blurBrigtnessLevel + 'px)';
        break;
      case 'heat':
        imgUpload.style.filter = '';
        imgUpload.style.filter = 'brightness(' + brightness + ')';
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

      var percentage = sliderLocation / sliderField.offsetWidth * 100;
      setEffectLevel(percentage);
    };

    var onMouseUp = function () {
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);

  });
})();
