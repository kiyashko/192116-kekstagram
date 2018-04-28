'use strict';

(function () { // генерируем картинки

  var pictures = document.querySelector('.pictures');
  var template = document.querySelector('template').content.querySelector('.picture__link');
  var templateImgUrl = document.querySelector('template').content.querySelector('.picture__img');
  var templateComment = document.querySelector('template').content.querySelector('.picture__stat--comments');
  var templateLike = document.querySelector('template').content.querySelector('.picture__stat--likes');
  var fragment = document.createDocumentFragment();

  var onError = function (message) {
    window.onErrorMessage(message);
  };

  window.onLoad = function (data) {
    window.images = data;
    window.picturesCount = window.images.length;
    for (var i = 0; i < window.picturesCount; i++) {
      templateImgUrl.setAttribute('src', window.images[i].url);
      templateComment.innerHTML = window.images[i].comments.length;
      templateLike.innerHTML = window.images[i].likes;
      templateImgUrl.setAttribute('name', i);
      var element = template.cloneNode(true);
      fragment.appendChild(element);
      pictures.appendChild(fragment);
    }
  };
  window.load(window.SERVER_URL, window.onLoad, onError);
})();
