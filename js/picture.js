'use strict';

(function () { // генерируем картинки

  var pictures = document.querySelector('.pictures');
  var template = document.querySelector('template').content.querySelector('.picture__link');
  var templateImgUrl = document.querySelector('template').content.querySelector('.picture__img');
  var templateComment = document.querySelector('template').content.querySelector('.picture__stat--comments');
  var templateLike = document.querySelector('template').content.querySelector('.picture__stat--likes');
  var imgFilterNew = document.getElementById('filter-new');
  var imgFilterPopular = document.getElementById('filter-popular');
  var imgFilterDiscussed = document.getElementById('filter-discussed');
  var imgFilter = document.querySelector('.img-filters');
  var fragment = document.createDocumentFragment();
  var imgFilterForm = document.querySelector('.img-filters__form');
  var imgFilterFormEllements = document.querySelectorAll('.img-filters__button');

  var removeOldPictures = function () {
    window.allPictureEllements = pictures.querySelectorAll('.picture__link');
    for (var i = 0; i < window.allPictureEllements.length; i++) {
      window.allPictureEllements[i].remove();
    }
  };

  var sortLikes = function () {
    window.images.sort(function (first, second) {
      return second.likes - first.likes;
    });
    removeOldPictures();
    window.renderPictures(window.images);
  };

  var sortDiscussed = function () {
    window.images.sort(function (first, second) {
      return second.comments.length - first.comments.length;
    });
    removeOldPictures();
    window.renderPictures(window.images);
  };

  var sortNew = function () {
    removeOldPictures();
    window.load(window.onLoad, window.onError);
  };

  window.renderPictures = function (images) {
    window.picturesCount = images.length;
    for (var i = 0; i < window.picturesCount; i++) {
      templateImgUrl.setAttribute('src', images[i].url);
      templateComment.innerHTML = images[i].comments.length;
      templateLike.innerHTML = images[i].likes;
      templateImgUrl.setAttribute('name', i);
      var element = template.cloneNode(true);
      fragment.appendChild(element);
      pictures.appendChild(fragment);
    }
  };

  window.onLoad = function (data) {
    imgFilter.classList.remove('img-filters--inactive');
    window.images = data;
    window.imagesCopy = window.images.slice();
    window.renderPictures(window.images);
  };

  imgFilterForm.addEventListener('click', function (evt) {
    imgFilterFormEllements.forEach(function (item) {
      item.classList.remove('img-filters__button--active');
    });
    var target = evt.target;
    if (target.id === 'filter-new') {
      imgFilterNew.classList.add('img-filters__button--active');
      window.debounce(sortNew);
    } if (target.id === 'filter-popular') {
      imgFilterPopular.classList.add('img-filters__button--active');
      window.debounce(sortLikes);
    } if (target.id === 'filter-discussed') {
      imgFilterDiscussed.classList.add('img-filters__button--active');
      window.debounce(sortDiscussed);
    }
  });

  window.load(window.onLoad, window.onError);
})();
