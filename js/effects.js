'use strict';

(function () { // применение эффектов
  window.imagePreview = document.querySelector('.img-upload__preview');
  window.imageUploadScale = document.querySelector('.img-upload__scale');
  window.scaleValue = document.querySelector('.scale__value');
  var uploadEffectControls = document.querySelector('.img-upload__effects');

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
    window.scaleValue.setAttribute('value', 100);
    window.scalePin.style.left = 100 + '%';
    window.scaleLevel.style.width = 100 + '%';
    var effectFiltersValue = createEffectFiltersValue(window.scaleValue.value);
    var target = evt.target.parentNode;
    for (var i = 0; i < effectIds.length; i++) {
      if (target.tagName === 'div') {
        return;
      }
      if (target.previousElementSibling) {
        if (target.previousElementSibling.id === effectIds[i]) {
          window.imageUploadScale.classList.remove('hidden');
          window.imagePreview.className = '';
          window.imagePreview.classList.add('img-upload__preview');
          window.imagePreview.classList.add(effectClasses[i]);
          window.imagePreview.id = effectIds[i];
          window.imagePreview.style.filter = effectFilters[i] + '(' + effectFiltersValue[i] + ')';
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
    for (var i = 0; i < effectIds.length; i++) {
      if (window.imagePreview.id === effectIds[i]) {
        window.imagePreview.className = '';
        window.imagePreview.classList.add('img-upload__preview');
        window.imagePreview.classList.add(effectClasses[i]);
        window.imagePreview.style.filter = effectFilters[i] + '(' + effectFiltersValue[i] + ')';
      }
    }
  };

  uploadEffectControls.addEventListener('click', onImageFilter);
})();
