'use strict';

(function () { // показываем форму после загрузки картинки и проверяем ее на правильность заполнения
  window.imageUploadForm = document.querySelector('.img-upload__form');
  window.uploadButton = document.getElementById('upload-file');
  window.imageUploadOverlay = document.querySelector('.img-upload__overlay');
  window.imageUploadOverlayClose = document.getElementById('upload-cancel');
  window.commentHashtagArea = document.querySelector('.text__hashtags');
  window.commentTextArea = document.querySelector('.text__description');

  var onImageUploadClose = function () {
    window.imageUploadOverlay.classList.add('hidden');
    resetEffects();
  };

  var onEscPress = function (evt) {
    if (evt.keyCode === window.ESC_KEYCODE && document.activeElement !== window.commentHashtagArea && document.activeElement !== window.commentTextArea) {
      onImageUploadClose();
      window.imageUploadOverlay.classList.add('hidden');
      resetEffects();
    }
  };

  var onImageUpload = function () {
    window.imageUploadOverlay.classList.remove('hidden');
    window.imageUploadScale.classList.add('hidden');
    window.imagePreview.id = 'effect-none';
    window.resizeValue.setAttribute('value', 50 + '%');
    window.imagePreview.style.transform = 'scale(' + window.resizeValue.value.split('%')[0] / 100 + ')';
    document.addEventListener('keydown', onEscPress);
    window.scalePin.style.left = 100 + '%';
    window.scaleLevel.style.width = 100 + '%';
  };

  var resetEffects = function () {
    window.uploadButton.value = '';
    window.imagePreview.className = '';
    window.imagePreview.classList.add('img-upload__preview');
    window.imagePreview.removeAttribute('id');
    window.imagePreview.removeAttribute('style');
  };

  window.uploadButton.addEventListener('change', onImageUpload);
  window.imageUploadOverlayClose.addEventListener('click', onImageUploadClose);

  var hashtagErrors = function (evt) {
    var target = evt.target;
    var hashtag = target.value.toString().replace(/\s{2,}/g, ' ').toLowerCase().split(' ');
    if (window.util.checkDup(hashtag) === true) {
      target.setCustomValidity('Не повторяйте хештеги!');
    } else {
      target.setCustomValidity('');
    }
    if (hashtag.length > 5) {
      target.setCustomValidity('Вы можете добавить не более пяти хештегов!');
    }
    hashtag.forEach(function (item, i) {
      if (hashtag[i].length > 20) {
        target.setCustomValidity('Максимальная длина хештега 20 символов!');
      } else if (hashtag[i] === '#') {
        target.setCustomValidity('Вы забыли добавить символы к хештегу!');
      } else if (window.util.hashtagCheck(hashtag[i]) === !true) {
        target.setCustomValidity('Вы забыли добавить решетку к хештегу!');
      }
    });
  };

  window.commentHashtagArea.addEventListener('input', hashtagErrors);
  window.imageUploadForm.addEventListener('submit', function (evt) {
    window.upload(new FormData(window.imageUploadForm), function () {
      window.imageUploadOverlay.classList.add('hidden');
      resetEffects();
    }, window.onError);
    evt.preventDefault();
  });
})();
