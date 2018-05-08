'use strict';

(function () { // генерируем картинки

  var pictures = document.querySelector('.pictures');
  var template = document.querySelector('template').content.querySelector('.picture__link');
  var templateImgUrl = document.querySelector('template').content.querySelector('.picture__img');
  var templateComment = document.querySelector('template').content.querySelector('.picture__stat--comments');
  var templateLike = document.querySelector('template').content.querySelector('.picture__stat--likes');
  var imgFilter = document.querySelector('.img-filters');
  var imgFilterForm = document.querySelector('.img-filters__form');
  var imgFilterFormEllements = document.querySelectorAll('.img-filters__button');

  var removeOldPictures = function () {
    var allPictureEllements = pictures.querySelectorAll('.picture__link');
    for (var i = 0; i < allPictureEllements.length; i++) {
      allPictureEllements[i].remove();
    }
  };

  var sortLikes = function () {
    window.images.sort(function (first, second) {
      return second.likes - first.likes;
    });
    removeOldPictures();
    renderPictures(window.images);
  };

  var sortDiscussed = function () {
    window.images.sort(function (first, second) {
      return second.comments.length - first.comments.length;
    });
    removeOldPictures();
    renderPictures(window.images);
  };

  var sortNew = function () {
    removeOldPictures();
    window.load(window.onLoad, window.onError);
  };

  var renderPictures = function () {
    var picturesCount = window.images.length;
    for (var i = 0; i < picturesCount; i++) {
      templateImgUrl.setAttribute('src', window.images[i].url);
      templateComment.textContent = window.images[i].comments.length;
      templateLike.textContent = window.images[i].likes;
      templateImgUrl.setAttribute('name', i);
      template.setAttribute('name', i);
      var element = template.cloneNode(true);
      pictures.appendChild(element);
    }
  };

  window.onLoad = function (data) {
    imgFilter.classList.remove('img-filters--inactive');
    window.images = data;
    renderPictures();
  };

  imgFilterForm.addEventListener('click', function (evt) {
    imgFilterFormEllements.forEach(function (item) {
      item.classList.remove('img-filters__button--active');
    });
    var target = evt.target;
    var sortType = '';
    var targetId = target.id;
    switch (targetId) {
      case 'filter-discussed':
        sortType = sortDiscussed;
        break;
      case 'filter-popular':
        sortType = sortLikes;
        break;
      default:
        sortType = sortNew;
    }
    target.classList.add('img-filters__button--active');
    window.debounce(sortType);
  });
  window.load(window.onLoad, window.onError);
})();
