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

// функция получения случайного значения
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

// функция проверки на повтор в массиве
var checkDup = function (s) {
  var map = {};
  for (var i = 0; i < s.length; i++) {
    if (map[s[i]]) {
      return true;
    }
    map[s[i]] = 1;
  }
  return false;
};

// функция проверки налачия хештега
var hashtagCheck = function (arr) {
  var toSplit = arr.split('');
  if (toSplit[0] === '#') {
    return true;
  } else {
    return false;
  }
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
    templateImgUrl.setAttribute('name', i);
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
var pictureLinkClose = document.querySelector('.big-picture__cancel');
document.querySelector('.social__comment-count').classList.add('visually-hidden');
document.querySelector('.social__comment-loadmore').classList.add('visually-hidden');

document.addEventListener('click', function (event) {
  var target = event.target;
  if (target.className !== 'picture__img') {
    return;
  }
  var pictureIndex = event.target.name;
  showBigPicture(pictureIndex);
  document.addEventListener('keydown', function (evt) {
    if (evt.keyCode === 27) {
      bigPicture.classList.add('hidden');
    }
  });
});

var showBigPicture = function (pictureIndex) {
  bigPictureImg.setAttribute('src', images[pictureIndex].url);
  bigPictureLikesCount.innerHTML = images[pictureIndex].like;
  firstChildRemove(bigPictureComments);
  for (var j = 0; j < images[pictureIndex].comment.length; j++) {
    var fragment = document.createDocumentFragment();
    var newCommentElement = document.createElement('li');
    var getAvatar = '<img class="social__picture" src="img/avatar-' + getRandomValue(1, 6) + '.svg" alt="Аватар комментатора фотографии" width="35" height="35">';
    newCommentElement.className = 'social__comment social__comment--text';
    newCommentElement.innerHTML = getAvatar + images[pictureIndex].comment[j];
    fragment.appendChild(newCommentElement);
    bigPictureComments.appendChild(fragment);
  }
  bigPicture.classList.remove('hidden');
};

var onBigPictureClose = function () {
  bigPicture.classList.add('hidden');
};

pictureLinkClose.addEventListener('click', onBigPictureClose);

// загружаем картинку и закрываем окно
var uploadButton = document.getElementById('upload-file');
var imageUploadOverlay = document.querySelector('.img-upload__overlay');
var imageUploadOverlayClose = document.getElementById('upload-cancel');
var commentHashtagArea = document.querySelector('.text__hashtags');
var commentTextArea = document.querySelector('.text__description');

var onImageUploadClose = function () {
  imageUploadOverlay.classList.add('hidden');
};

var onEscPress = function (evt) {
  if (evt.keyCode === ESC_KEYCODE && document.activeElement !== commentHashtagArea && document.activeElement !== commentTextArea) {
    onImageUploadClose();
    imageUploadOverlay.classList.add('hidden');
    uploadButton.value = '';
  }
};

var onImageUpload = function () {
  imageUploadOverlay.classList.remove('hidden');
  document.addEventListener('keydown', onEscPress);
};

uploadButton.addEventListener('change', onImageUpload);
imageUploadOverlayClose.addEventListener('click', onImageUploadClose);

// эффекты
var imagePreview = document.querySelector('.img-upload__preview');
var uploadEffectControls = document.querySelector('.img-upload__effects');
var scaleValue = document.querySelector('.scale__value');


var createEffectFiltersValue = function (filterValue) {
  var effectFiltersValue = ['0',
    1 / 100 * filterValue,
    1 / 100 * filterValue,
    filterValue + '%',
    3 / 100 * filterValue + 'px',
    (2 / 100 * filterValue) + 1];
  return effectFiltersValue;
};

var effectFiltersValue = createEffectFiltersValue(scaleValue.value);
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

// ошибки при заполнении формы
commentHashtagArea.addEventListener('input', function (evt) {
  var target = evt.target;
  var hashtag = target.value.toString().replace(/\s{2,}/g, ' ').toLowerCase().split(' ');
  if (checkDup(hashtag) === true) {
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
    } else if (hashtagCheck(hashtag[i]) === !true) {
      target.setCustomValidity('Вы забыли добавить решетку к хештегу!');
    }
  });

});
