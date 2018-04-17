'use strict';

var totalImages = 25;
var minLike = 15;
var maxLike = 200;
var ESC_KEYCODE = 27;

var comments = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'];

var descriptions = [
  'Тестим новую камеру!',
  'Затусили с друзьями на море',
  'Как же круто тут кормят',
  'Отдыхаем...',
  'Цените каждое мгновенье. Цените тех, кто рядом с вами и отгоняйте все сомненья. Не обижайте всех словами......',
  'Вот это тачка!'];

var images = [];

var getRandomValue = function (min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

// функция генерации рандомных значений массива
var makeRandomArray = function (min, max, toRandomArray) {
  var getArray = toRandomArray.slice();
  var toRandomArrayCount = getRandomValue(min, max);
  var randomArray = [];
  for (var i = 0; i < toRandomArrayCount; i++) {
    var arrayRand = getRandomValue(min - 1, getArray.length - 1);
    randomArray.push(getArray[arrayRand]);
    getArray.splice(arrayRand, 1);
  }
  return randomArray;
};

// функция удаления элемента
var firstChildRemove = function (toFirstChildRemove) {
  while (toFirstChildRemove.firstChild) {
    toFirstChildRemove.removeChild(toFirstChildRemove.firstChild);
  }
};

// генерация массива
var getInfo = function (picturesCount) {
  for (var i = 0; i < picturesCount; i++) {
    var getUrl = 'photos/' + (i + 1) + '.jpg';
    var getLike = getRandomValue(minLike, maxLike);
    var getDescription = getRandomValue(0, descriptions.length - 1);
    var imageInfo = {
      url: getUrl,
      like: getLike,
      comment: makeRandomArray(1, 2, comments),
      description: [descriptions[getDescription]]
    };
    images[i] = imageInfo;
  }
};
getInfo(totalImages);


// рендер картинок
var renderImages = function (picturesCount) {
  var pictures = document.querySelector('.pictures');
  var template = document.querySelector('template').content.querySelector('.picture__link');
  var templateImgUrl = document.querySelector('template').content.querySelector('.picture__img');
  var templateComment = document.querySelector('template').content.querySelector('.picture__stat--comments');
  var templateLike = document.querySelector('template').content.querySelector('.picture__stat--likes');
  var fragment = document.createDocumentFragment();

  for (var i = 0; i < picturesCount; i++) {
    templateImgUrl.setAttribute('src', images[i].url);
    templateComment.innerHTML = images[i].comment.length;
    templateLike.innerHTML = images[i].like;

    var element = template.cloneNode(true);
    fragment.appendChild(element);
    pictures.appendChild(fragment);
  }
};
renderImages(totalImages);

// большая картинки
var bigPicture = document.querySelector('.big-picture');
var bigPictureImg = document.querySelector('.big-picture__img img');
var bigPictureLikesCount = document.querySelector('.likes-count');
var bigPictureComments = document.querySelector('.social__comments');
var pictureLink = document.querySelectorAll('.picture__link');
var pictureLinkClose = document.querySelector('.big-picture__cancel');
document.querySelector('.social__comment-count').classList.add('visually-hidden');
document.querySelector('.social__comment-loadmore').classList.add('visually-hidden');


pictureLink.forEach(function (elem, i) {

  elem.addEventListener('click', function (e) {

    e.preventDefault();
    bigPictureImg.setAttribute('src', images[i].url);
    bigPictureLikesCount.innerHTML = images[i].like;
    firstChildRemove(bigPictureComments);
    for (var j = 0; j < images[i].comment.length; j++) {
      var fragment = document.createDocumentFragment();
      var newCommentElement = document.createElement('li');
      var getAvatar = '<img class="social__picture" src="img/avatar-' + getRandomValue(1, 6) + '.svg" alt="Аватар комментатора фотографии" width="35" height="35">';
      newCommentElement.className = 'social__comment social__comment--text';
      newCommentElement.innerHTML = getAvatar + images[i].comment[j];
      fragment.appendChild(newCommentElement);
      bigPictureComments.appendChild(fragment);
    }
    bigPicture.classList.remove('hidden');
    elem.addEventListener('keydown', function (evt) {
      if (evt.keyCode === 27) {
        bigPicture.classList.add('hidden');
      }
    });
  });
});

var onBigPictureClose = function () {
  bigPicture.classList.add('hidden');
};

pictureLinkClose.addEventListener('click', onBigPictureClose);

// загружаем картинку и закрываем окно
var uploadButton = document.getElementById('upload-file');
var imageUploadOverlay = document.querySelector('.img-upload__overlay');
var imageUploadOverlayClose = document.getElementById('upload-cancel');

var onImageUpload = function () {
  imageUploadOverlay.classList.remove('hidden');
  document.addEventListener('keydown', function (evt) {
    if (evt.keyCode === ESC_KEYCODE) {
      imageUploadOverlay.classList.add('hidden');
      uploadButton.value = '';
    }
  });
};

var onImageUploadClose = function () {
  imageUploadOverlay.classList.add('hidden');
};

uploadButton.addEventListener('change', onImageUpload);
imageUploadOverlayClose.addEventListener('click', onImageUploadClose);

// эффекты
var imagePreview = document.querySelector('.img-upload__preview');
var uploadEffectControls = document.querySelector('.img-upload__effects');
var scaleValue = document.querySelector('.scale__value');

var grayscaleValue = 1 / 100 * scaleValue.value;
var sepiaValue = 1 / 100 * scaleValue.value;
var marvinValue = scaleValue.value + '%';
var phobosValue = 3 / 100 * scaleValue.value + 'px';
var heatValue = (2 / 100 * scaleValue.value) + 1;

var effectFiltersValue = ['0', grayscaleValue, sepiaValue, marvinValue, phobosValue, heatValue];
var effectClass = ['effects__preview--none', 'effects__preview--chrome', 'effects__preview-sepia', 'effects__preview-marvin', 'effects__preview-phobos', 'effects__preview-heat'];
var effectId = ['effect-none', 'effect-chrome', 'effect-sepia', 'effect-marvin', 'effect-phobos', 'effect-heat'];
var effectFilter = ['none', 'grayscale', 'sepia', 'invert', 'blur', 'brightness'];

var onImageFilter = function (e) {
  imagePreview.classList.add('img-upload__preview');
  var target = e.target.parentNode;
  for (var i = 0; i < effectId.length; i++) {
    if (target.tagName === 'div') {
      return;
    }
    if (target.previousElementSibling) {
      if (target.previousElementSibling.id === effectId[i]) {
        if (target.previousElementSibling.id === 'effect-none') {
          imagePreview.removeAttribute('style');
        }
        imagePreview.className = '';
        imagePreview.classList.add(effectClass[i]);
        imagePreview.id = effectClass[i];
        imagePreview.style.filter = effectFilter[i] + '(' + effectFiltersValue[i] + ')';
      }
    }
  }
};

uploadEffectControls.addEventListener('click', onImageFilter);
