'use strict';

(function () { // показываем форму после загрузки картинки
  window.bigPicture = document.querySelector('.big-picture');
  window.bigPictureImg = document.querySelector('.big-picture__img img');
  window.bigPictureLikesCount = document.querySelector('.likes-count');
  window.bigPictureComments = document.querySelector('.social__comments');
  window.pictureLinkClose = document.querySelector('.big-picture__cancel');
  document.querySelector('.social__comment-count').classList.add('visually-hidden');
  document.querySelector('.social__comment-loadmore').classList.add('visually-hidden');

  var showBigPicture = function (pictureIndex) {
    window.bigPictureImg.setAttribute('src', window.images[pictureIndex].url);
    window.bigPictureLikesCount.innerHTML = window.images[pictureIndex].like;
    window.util.firstChildRemove(window.bigPictureComments);
    for (var j = 0; j < window.images[pictureIndex].comment.length; j++) {
      var fragment = document.createDocumentFragment();
      var newCommentElement = document.createElement('li');
      var getAvatar = '<img class="social__picture" src="img/avatar-' + window.util.getRandomValue(1, 6) + '.svg" alt="Аватар комментатора фотографии" width="35" height="35">';
      newCommentElement.className = 'social__comment social__comment--text';
      newCommentElement.innerHTML = getAvatar + window.images[pictureIndex].comment[j];
      fragment.appendChild(newCommentElement);
      window.bigPictureComments.appendChild(fragment);
    }
    window.bigPicture.classList.remove('hidden');
  };

  var onBigPictureClose = function () {
    window.bigPicture.classList.add('hidden');
  };

  window.pictureLinkClose.addEventListener('click', onBigPictureClose);

  document.addEventListener('click', function (evt) {
    var target = evt.target;
    if (target.className !== 'picture__img') {
      return;
    }
    var pictureIndex = evt.target.name;
    showBigPicture(pictureIndex);

    document.addEventListener('keydown', function (keyEvt) {
      if (keyEvt.keyCode === 27) {
        window.bigPicture.classList.add('hidden');
      }
    });
  });
})();
