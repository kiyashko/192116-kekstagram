'use strict';

(function () { // меняем размер картинки, шаг указываем в data.js
  window.resizePlus = document.querySelector('.resize__control--plus');
  window.resizeMinus = document.querySelector('.resize__control--minus');
  window.resizeValue = document.querySelector('.resize__control--value');

  var resizeImage = function (resizeScale) {
    window.resizeValue.value = resizeScale + '%';
    window.imagePreview.style.transform = 'scale(' + resizeScale / 100 + ')';
  };

  var resizeImagePlus = function () {
    var getResizeValue = parseInt(window.resizeValue.value.split('%')[0], 10);
    if (getResizeValue < 100) {
      var getResizeScale = getResizeValue + window.RESIZE_STEP;
      resizeImage(getResizeScale);
    }
  };

  var resizeImageMinus = function () {
    var getResizeValue = parseInt(window.resizeValue.value.split('%')[0], 10);
    if (getResizeValue > 25) {
      var getResizeScale = getResizeValue - window.RESIZE_STEP;
      resizeImage(getResizeScale);
    }
  };

  window.resizePlus.addEventListener('click', resizeImagePlus);
  window.resizeMinus.addEventListener('click', resizeImageMinus);
})();
