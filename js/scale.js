'use strict';

(function () { // перемещение ползунка
  var scaleValue = document.querySelector('.scale__value');
  var scaleLine = document.querySelector('.scale__line');
  var scalePin = document.querySelector('.scale__pin');
  var scaleLevel = document.querySelector('.scale__level');

  scalePin.addEventListener('mousedown', function (evt) {
    evt.preventDefault();
    var startCoordX = evt.clientX;
    var scaleWidth = scaleLine.offsetWidth;

    var getCoord = function (shiftX) {
      var newCoord = (scalePin.offsetLeft - shiftX) / scaleWidth * 100;
      if (newCoord < 0) {
        newCoord = 0;
      } else if (newCoord > 100) {
        newCoord = 100;
      }
      var newScaleValue = Math.round(newCoord);
      scaleValue.setAttribute('value', newScaleValue);
      return newCoord;
    };

    var onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();
      var shiftX = startCoordX - moveEvt.clientX;
      startCoordX = moveEvt.clientX;
      var newCoordX = getCoord(shiftX);
      scalePin.style.left = newCoordX + '%';
      scaleLevel.style.width = newCoordX + '%';
      window.onMouseUpFilter(scaleValue.value);
    };

    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();
      window.onMouseUpFilter(scaleValue.value);
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };
    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  });
})();
