'use strict';

(function () { // меняем размер картинки, шаг указываем в data.js
  window.resizeValue = document.querySelector('.resize__control--value');
  var resizePlus = document.querySelector('.resize__control--plus');
  var resizeMinus = document.querySelector('.resize__control--minus');

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

  resizePlus.addEventListener('click', resizeImagePlus);
  resizeMinus.addEventListener('click', resizeImageMinus);
})();
