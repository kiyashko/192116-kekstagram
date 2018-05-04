'use strict';

(function () { // показываем форму после загрузки картинки
  var body = document.getElementsByTagName('body');
  var bigPicture = document.querySelector('.big-picture');
  var bigPictureImg = document.querySelector('.big-picture__img img');
  var bigPictureLikesCount = document.querySelector('.likes-count');
  var bigPictureDescription = document.querySelector('.social__caption');
  var bigPictureComments = document.querySelector('.social__comments');
  var pictureLinkClose = document.querySelector('.big-picture__cancel');
  document.querySelector('.social__comment-count').classList.add('visually-hidden');
  document.querySelector('.social__comment-loadmore').classList.add('visually-hidden');

  var showBigPicture = function (pictureIndex) {

    bigPictureImg.setAttribute('src', window.images[pictureIndex].url);
    bigPictureLikesCount.innerHTML = window.images[pictureIndex].likes;
    window.util.removeFirstChild(bigPictureComments);
    for (var j = 0; j < window.images[pictureIndex].comments.length; j++) {
      bigPictureDescription.textContent = window.images[pictureIndex].comments[0];
      var fragment = document.createDocumentFragment();
      var newCommentElement = document.createElement('li');
      var getAvatar = '<img class="social__picture" src="img/avatar-' + window.util.getRandomValue(1, 6) + '.svg" alt="Аватар комментатора фотографии" width="35" height="35">';
      newCommentElement.className = 'social__comment social__comment--text';
      newCommentElement.innerHTML = getAvatar + window.images[pictureIndex].comments[j];
      fragment.appendChild(newCommentElement);
      bigPictureComments.appendChild(fragment);
    }
    bigPicture.classList.remove('hidden');
    body[0].classList.add('modal-open');
  };

  var onBigPictureClose = function () {
    bigPicture.classList.add('hidden');
    body[0].removeAttribute('class');
  };

  document.addEventListener('keydown', function (keyEvt) {
    if (keyEvt.keyCode === 27) {
      onBigPictureClose();
    }
  });

  document.addEventListener('click', function (evt) {
    if (evt.target.className !== 'picture__img') {
      return;
    }
    var pictureIndex = evt.target.name;
    showBigPicture(pictureIndex);
  });

  document.addEventListener('keydown', function (evt) {
    if (evt.target.className !== 'picture__link') {
      return;
    }
    if (evt.keyCode === 13) {
      var pictureIndex = evt.target.name;
      showBigPicture(pictureIndex);
    }
  });
  pictureLinkClose.addEventListener('click', onBigPictureClose);
})();
