'use strict';

(function () {
  window.util = {
    getRandomValue: function (min, max) { // функция получения случайного значения
      return Math.floor(Math.random() * (max - min + 1)) + min;
    },
    checkDuplicate: function (s) { // функция проверки на повтор в массиве
      var map = {};
      for (var i = 0; i < s.length; i++) {
        if (map[s[i]]) {
          return true;
        }
        map[s[i]] = 1;
      }
      return false;
    },
    checkHashtag: function (arr) { // функция проверки налачия хештега
      var toSplit = arr.split('');
      return (toSplit[0] === '#') ? true : false;
    },
    removeFirstChild: function (toFirstChildRemove) { // функция удаления элемента
      while (toFirstChildRemove.firstChild) {
        toFirstChildRemove.removeChild(toFirstChildRemove.firstChild);
      }
    }
  };
})();
