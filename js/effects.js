'use strict';

(function () { // перемещение ползунка
  window.scaleLine = document.querySelector('.scale__line');
  window.scalePin = document.querySelector('.scale__pin');
  window.scaleLevel = document.querySelector('.scale__level');

  window.scalePin.addEventListener('mousedown', function (evt) {
    evt.preventDefault();
    var startCoordX = evt.clientX;
    var scaleWidth = window.scaleLine.offsetWidth;

    var getCoord = function (shiftX) {
      var newCoord = (window.scalePin.offsetLeft - shiftX) / scaleWidth * 100;
      if (newCoord < 0) {
        newCoord = 0;
      } else if (newCoord > 100) {
        newCoord = 100;
      }
      var newScaleValue = Math.round(newCoord);
      window.scaleValue.setAttribute('value', newScaleValue);
      return newCoord;
    };

    var onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();
      var shiftX = startCoordX - moveEvt.clientX;
      startCoordX = moveEvt.clientX;
      var newCoordX = getCoord(shiftX);
      window.scalePin.style.left = newCoordX + '%';
      window.scaleLevel.style.width = newCoordX + '%';
      window.onMouseUpFilter(window.scaleValue.value);
    };

    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();
      window.onMouseUpFilter(window.scaleValue.value);
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };
    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  });
})();

(function () { // применение эффектов
  window.imagePreview = document.querySelector('.img-upload__preview');
  window.uploadEffectControls = document.querySelector('.img-upload__effects');
  window.scaleValue = document.querySelector('.scale__value');
  window.imageUploadScale = document.querySelector('.img-upload__scale');

  var effectClass = ['effects__preview--none', 'effects__preview--chrome', 'effects__preview-sepia', 'effects__preview-marvin', 'effects__preview-phobos', 'effects__preview-heat'];
  var effectId = ['effect-none', 'effect-chrome', 'effect-sepia', 'effect-marvin', 'effect-phobos', 'effect-heat'];
  var effectFilter = ['none', 'grayscale', 'sepia', 'invert', 'blur', 'brightness'];

  var createEffectFiltersValue = function (filterValue) {
    var grayscaleValue = 1 / 100 * filterValue;
    var sepiaValue = 1 / 100 * filterValue;
    var marvinValue = filterValue + '%';
    var phobosValue = 3 / 100 * filterValue + 'px';
    var heatValue = (2 / 100 * filterValue) + 1;
    var effectFiltersValue = ['0', grayscaleValue, sepiaValue, marvinValue, phobosValue, heatValue];
    return effectFiltersValue;
  };

  var onImageFilter = function (evt) {
    window.scaleValue.setAttribute('value', 100);
    window.scalePin.style.left = 100 + '%';
    window.scaleLevel.style.width = 100 + '%';
    var effectFiltersValue = createEffectFiltersValue(window.scaleValue.value);
    var target = evt.target.parentNode;
    for (var i = 0; i < effectId.length; i++) {
      if (target.tagName === 'div') {
        return;
      }
      if (target.previousElementSibling) {
        if (target.previousElementSibling.id === effectId[i]) {
          window.imageUploadScale.classList.remove('hidden');
          window.imagePreview.className = '';
          window.imagePreview.classList.add('img-upload__preview');
          window.imagePreview.classList.add(effectClass[i]);
          window.imagePreview.id = effectId[i];
          window.imagePreview.style.filter = effectFilter[i] + '(' + effectFiltersValue[i] + ')';
        } if (target.previousElementSibling.id === 'effect-none') {
          window.imagePreview.removeAttribute('style');
          window.imagePreview.style.transform = 'scale(' + window.resizeValue.value.split('%')[0] / 100 + ')';
          window.imageUploadScale.classList.add('hidden');
        }
      }
    }
  };

  window.onMouseUpFilter = function (filterScaleValue) {
    var effectFiltersValue = createEffectFiltersValue(filterScaleValue);
    for (var i = 0; i < effectId.length; i++) {
      if (window.imagePreview.id === effectId[i]) {
        window.imagePreview.className = '';
        window.imagePreview.classList.add('img-upload__preview');
        window.imagePreview.classList.add(effectClass[i]);
        window.imagePreview.style.filter = effectFilter[i] + '(' + effectFiltersValue[i] + ')';
      }
    }
  };

  window.uploadEffectControls.addEventListener('click', onImageFilter);
})();
