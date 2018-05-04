'use strict';

(function () { // показываем форму после загрузки картинки
  window.body = document.getElementsByTagName('body');
  window.bigPicture = document.querySelector('.big-picture');
  window.bigPictureImg = document.querySelector('.big-picture__img img');
  window.bigPictureLikesCount = document.querySelector('.likes-count');
  window.bigPictureDescription = document.querySelector('.social__caption');
  window.bigPictureComments = document.querySelector('.social__comments');
  window.pictureLinkClose = document.querySelector('.big-picture__cancel');
  document.querySelector('.social__comment-count').classList.add('visually-hidden');
  document.querySelector('.social__comment-loadmore').classList.add('visually-hidden');

  window.showBigPicture = function (pictureIndex) {

    window.bigPictureImg.setAttribute('src', window.images[pictureIndex].url);
    window.bigPictureLikesCount.innerHTML = window.images[pictureIndex].likes;
    window.util.firstChildRemove(window.bigPictureComments);
    for (var j = 0; j < window.images[pictureIndex].comments.length; j++) {
      window.bigPictureDescription.textContent = window.images[pictureIndex].comments[0];
      var fragment = document.createDocumentFragment();
      var newCommentElement = document.createElement('li');
      var getAvatar = '<img class="social__picture" src="img/avatar-' + window.util.getRandomValue(1, 6) + '.svg" alt="Аватар комментатора фотографии" width="35" height="35">';
      newCommentElement.className = 'social__comment social__comment--text';
      newCommentElement.innerHTML = getAvatar + window.images[pictureIndex].comments[j];
      fragment.appendChild(newCommentElement);
      window.bigPictureComments.appendChild(fragment);
    }
    window.bigPicture.classList.remove('hidden');
    window.body[0].classList.add('modal-open');
  };

  var onBigPictureClose = function () {
    window.bigPicture.classList.add('hidden');
    window.body[0].removeAttribute('class');
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
    window.showBigPicture(pictureIndex);
  });

  document.addEventListener('keydown', function (evt) {
    if (evt.target.className !== 'picture__link') {
      return;
    }
    if (evt.keyCode === 13) {
      var pictureIndex = evt.target.name;
      window.showBigPicture(pictureIndex);
    }
  });
  window.pictureLinkClose.addEventListener('click', onBigPictureClose);
})();
