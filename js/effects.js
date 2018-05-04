'use strict';

(function () { // применение эффектов
  var imagePreview = document.querySelector('.img-upload__preview');
  var imageUploadScale = document.querySelector('.img-upload__scale');
  var scaleValue = document.querySelector('.scale__value');
  var scaleLevel = document.querySelector('.scale__level');
  var uploadEffectControls = document.querySelector('.img-upload__effects');
  var resizeValue = document.querySelector('.resize__control--value');
  var scalePin = document.querySelector('.scale__pin');

  var effectClasses = ['effects__preview--none', 'effects__preview--chrome', 'effects__preview-sepia', 'effects__preview-marvin', 'effects__preview-phobos', 'effects__preview-heat'];
  var effectIds = ['effect-none', 'effect-chrome', 'effect-sepia', 'effect-marvin', 'effect-phobos', 'effect-heat'];
  var effectFilters = ['none', 'grayscale', 'sepia', 'invert', 'blur', 'brightness'];

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
    scaleValue.setAttribute('value', 100);
    scalePin.style.left = 100 + '%';
    scaleLevel.style.width = 100 + '%';
    var effectFiltersValue = createEffectFiltersValue(scaleValue.value);
    var target = evt.target.parentNode;
    for (var i = 0; i < effectIds.length; i++) {
      if (target.tagName === 'div') {
        return;
      }
      if (target.previousElementSibling) {
        if (target.previousElementSibling.id === effectIds[i]) {
          imageUploadScale.classList.remove('hidden');
          imagePreview.className = '';
          imagePreview.classList.add('img-upload__preview');
          imagePreview.classList.add(effectClasses[i]);
          imagePreview.id = effectIds[i];
          imagePreview.style.filter = effectFilters[i] + '(' + effectFiltersValue[i] + ')';
        } if (target.previousElementSibling.id === 'effect-none') {
          imagePreview.removeAttribute('style');
          imagePreview.style.transform = 'scale(' + resizeValue.value.split('%')[0] / 100 + ')';
          imageUploadScale.classList.add('hidden');
        }
      }
    }
  };

  window.onMouseUpFilter = function (filterScaleValue) {
    var effectFiltersValue = createEffectFiltersValue(filterScaleValue);
    for (var i = 0; i < effectIds.length; i++) {
      if (imagePreview.id === effectIds[i]) {
        imagePreview.className = '';
        imagePreview.classList.add('img-upload__preview');
        imagePreview.classList.add(effectClasses[i]);
        imagePreview.style.filter = effectFilters[i] + '(' + effectFiltersValue[i] + ')';
      }
    }
  };

  uploadEffectControls.addEventListener('click', onImageFilter);
})();
