'use strict';

(function () { // показываем форму после загрузки картинки
  var body = document.querySelector('body');
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
    bigPictureLikesCount.textContent = window.images[pictureIndex].likes;
    window.util.removeFirstChild(bigPictureComments);
    for (var j = 0; j < window.images[pictureIndex].comments.length; j++) {
      var newCommentElement = document.createElement('li');
      var newCommentAvatar = document.createElement('img');
      var newCommentText = document.createTextNode(window.images[pictureIndex].comments[j]);
      bigPictureDescription.textContent = window.images[pictureIndex].comments[0];
      newCommentAvatar.className = 'social__picture';
      newCommentAvatar.src = 'img/avatar-' + window.util.getRandomValue(1, 6) + '.svg';
      newCommentAvatar.alt = 'Аватар комментатора фотографии';
      newCommentAvatar.width = '35';
      newCommentAvatar.height = '35';
      newCommentElement.className = 'social__comment social__comment--text';
      bigPictureComments.appendChild(newCommentElement);
      newCommentElement.appendChild(newCommentAvatar);
      newCommentElement.appendChild(newCommentText);
    }
    bigPicture.classList.remove('hidden');
    body.classList.add('modal-open');
  };

  var onBigPictureClose = function () {
    bigPicture.classList.add('hidden');
    body.removeAttribute('class');
  };

  document.addEventListener('keydown', function (evt) {
    if (evt.keyCode === 27) {
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
