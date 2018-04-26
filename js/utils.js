'use strict';

(function () {
  window.util = {
    getRandomValue: function (min, max) { // функция получения случайного значения
      return Math.floor(Math.random() * (max - min + 1)) + min;
    },
    makeRandomArray: function (min, max, toRandomArray) { // функция генерации рандомных значений массива
      var getArray = toRandomArray.slice();
      var toRandomArrayCount = window.util.getRandomValue(min, max);
      var randomArray = [];
      for (var i = 0; i < toRandomArrayCount; i++) {
        var arrayRand = window.util.getRandomValue(min - 1, getArray.length - 1);
        randomArray.push(getArray[arrayRand]);
        getArray.splice(arrayRand, 1);
      }
      return randomArray;
    },
    checkDup: function (s) { // функция проверки на повтор в массиве
      var map = {};
      for (var i = 0; i < s.length; i++) {
        if (map[s[i]]) {
          return true;
        }
        map[s[i]] = 1;
      }
      return false;
    },
    hashtagCheck: function (arr) { // функция проверки налачия хештега
      var toSplit = arr.split('');
      if (toSplit[0] === '#') {
        return true;
      } else {
        return false;
      }
    },
    firstChildRemove: function (toFirstChildRemove) { // функция удаления элемента
      while (toFirstChildRemove.firstChild) {
        toFirstChildRemove.removeChild(toFirstChildRemove.firstChild);
      }
    }
  };
})();
