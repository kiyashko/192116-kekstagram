'use strict';

(function () { // генерируем массив
  window.images = [];
  var getInfo = function (picturesCount) {
    for (var i = 0; i < picturesCount; i++) {
      var getUrl = 'photos/' + (i + 1) + '.jpg';
      var getLike = window.util.getRandomValue(window.MIN_LIKE, window.MAX_LIKE);
      var getDescription = window.util.getRandomValue(0, window.DESCRIPTIONS.length - 1);
      var imageInfo = {
        url: getUrl,
        like: getLike,
        comment: window.util.makeRandomArray(1, 2, window.COMMENTS),
        description: [window.DESCRIPTIONS[getDescription]]
      };
      window.images[i] = imageInfo;
    }
  };
  getInfo(window.TOTAL_IMAGES);
})();

(function () { // рендер картинок
  var renderImages = function (picturesCount) {
    var pictures = document.querySelector('.pictures');
    var template = document.querySelector('template').content.querySelector('.picture__link');
    var templateImgUrl = document.querySelector('template').content.querySelector('.picture__img');
    var templateComment = document.querySelector('template').content.querySelector('.picture__stat--comments');
    var templateLike = document.querySelector('template').content.querySelector('.picture__stat--likes');
    var fragment = document.createDocumentFragment();

    for (var i = 0; i < picturesCount; i++) {
      templateImgUrl.setAttribute('src', window.images[i].url);
      templateComment.innerHTML = window.images[i].comment.length;
      templateLike.innerHTML = window.images[i].like;
      templateImgUrl.setAttribute('name', i);
      var element = template.cloneNode(true);
      fragment.appendChild(element);
      pictures.appendChild(fragment);
    }
  };
  renderImages(window.TOTAL_IMAGES);
})();
