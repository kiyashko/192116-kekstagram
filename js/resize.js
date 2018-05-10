'use strict';

(function () { // меняем размер картинки, шаг указываем в data.js
  var imagePreview = document.querySelector('.img-upload__preview');
  var resizeValue = document.querySelector('.resize__control--value');
  var resizePlus = document.querySelector('.resize__control--plus');
  var resizeMinus = document.querySelector('.resize__control--minus');

  var resizeImage = function (resizeScale) {
    resizeValue.value = resizeScale + '%';
    imagePreview.style.transform = 'scale(' + resizeScale / 100 + ')';
  };

  var resizeImagePlus = function () {
    var getResizeValue = parseInt(resizeValue.value.split('%')[0], 10);
    if (getResizeValue < 100) {
      var getResizeScale = getResizeValue + window.RESIZE_STEP;
      resizeImage(getResizeScale);
    }
  };

  var resizeImageMinus = function () {
    var getResizeValue = parseInt(resizeValue.value.split('%')[0], 10);
    if (getResizeValue > 25) {
      var getResizeScale = getResizeValue - window.RESIZE_STEP;
      resizeImage(getResizeScale);
    }
  };

  resizePlus.addEventListener('click', resizeImagePlus);
  resizeMinus.addEventListener('click', resizeImageMinus);
})();
