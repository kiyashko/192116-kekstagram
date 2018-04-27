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
