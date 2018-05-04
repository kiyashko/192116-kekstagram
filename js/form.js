'use strict';

(function () { // показываем форму после загрузки картинки и проверяем ее на правильность заполнения
  var imagePreview = document.querySelector('.img-upload__preview');
  var imageUploadForm = document.querySelector('.img-upload__form');
  var uploadButton = document.getElementById('upload-file');
  var imageUploadOverlay = document.querySelector('.img-upload__overlay');
  var imageUploadOverlayClose = document.getElementById('upload-cancel');
  var imageUploadScale = document.querySelector('.img-upload__scale');
  var resizeValue = document.querySelector('.resize__control--value');
  var scaleLevel = document.querySelector('.scale__level');
  var scalePin = document.querySelector('.scale__pin');
  var commentHashtagArea = document.querySelector('.text__hashtags');
  var commentTextArea = document.querySelector('.text__description');

  var onImageUploadClose = function () {
    imageUploadOverlay.classList.add('hidden');
    resetEffects();
  };

  var onEscPress = function (evt) {
    if (evt.keyCode === window.ESC_KEYCODE) {
      if (document.activeElement !== commentHashtagArea) {
        if (document.activeElement !== commentTextArea) {
          onImageUploadClose();
          imageUploadOverlay.classList.add('hidden');
          resetEffects();
        }
      }
    }
  };

  var onImageUpload = function () {
    imageUploadOverlay.classList.remove('hidden');
    imageUploadScale.classList.add('hidden');
    imagePreview.id = 'effect-none';
    resizeValue.setAttribute('value', 50 + '%');
    imagePreview.style.transform = 'scale(' + resizeValue.value.split('%')[0] / 100 + ')';
    document.addEventListener('keydown', onEscPress);
    scalePin.style.left = 100 + '%';
    scaleLevel.style.width = 100 + '%';
  };

  var resetEffects = function () {
    uploadButton.value = '';
    imagePreview.className = '';
    imagePreview.classList.add('img-upload__preview');
    imagePreview.removeAttribute('id');
    imagePreview.removeAttribute('style');
  };

  uploadButton.addEventListener('change', onImageUpload);
  imageUploadOverlayClose.addEventListener('click', onImageUploadClose);

  var hashtagErrors = function (evt) {
    var target = evt.target;
    var hashtag = target.value.toString().replace(/\s{2,}/g, ' ').toLowerCase().split(' ');
    if (window.util.checkDuplicate(hashtag) === true) {
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
      } else if (window.util.checkHashtag(hashtag[i]) === !true) {
        target.setCustomValidity('Вы забыли добавить решетку к хештегу!');
      }
    });
  };

  commentHashtagArea.addEventListener('input', hashtagErrors);
  imageUploadForm.addEventListener('submit', function (evt) {
    window.upload(new FormData(imageUploadForm), function () {
      imageUploadOverlay.classList.add('hidden');
      resetEffects();
    }, window.onError);
    evt.preventDefault();
  });
})();
