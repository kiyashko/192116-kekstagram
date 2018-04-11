'use strict';

var totalImages = 25;
var minLike = 15;
var maxLike = 200;

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
  'Вот это тачка!']

var images = [];

var getRandomValue = function (min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// функция генерации рандомных значений массива
var makeRandomArray = function (min, max, toRandomArray) {
  var getArray = toRandomArray.slice();
  var toRandomArrayCount = getRandomValue(min, max);
  var randomArray = [];
    for (var i = 0; i < toRandomArrayCount; i++) {
      var arrayRand = getRandomValue (min - 1, getArray.length - 1);
      randomArray.push(getArray[arrayRand]);
      getArray.splice(arrayRand, 1);
    }
  return randomArray;
}

// генерация массива
var getInfo = function (totalImages) {
  for (var i = 0; i < totalImages; i++) {
    var getUrl = 'photos/' + (i + 1) + '.jpg';
    var getLike = getRandomValue(minLike, maxLike);
    var getDescription = getRandomValue(0, descriptions.length - 1);
    var imageInfo = {
      url: getUrl,
      like: getLike,
      comment: makeRandomArray(1, 2, comments),
      description: [descriptions[getDescription]]
    }
images[i] = imageInfo;
  }
}
getInfo(totalImages);


// рендер картинок
var renderImages = function (totalImages) {
  var pictures = document.querySelector('.pictures');
  var template = document.querySelector('template').content.querySelector('.picture__link');
  var templateImgUrl = document.querySelector('template').content.querySelector('.picture__img');
  var templateComment = document.querySelector('template').content.querySelector('.picture__stat--comments');
  var templateLike = document.querySelector('template').content.querySelector('.picture__stat--likes');
  var fragment = document.createDocumentFragment();

  for (var i = 0; i < totalImages; i++) {
    templateImgUrl.setAttribute('src', images[i].url);
    templateComment.innerHTML = images[i].comment.length;
    templateLike.innerHTML = images[i].like;

    var element = template.cloneNode(true);
    fragment.appendChild(element);
    pictures.appendChild(fragment);
  }
}
renderImages(totalImages);

var firstChildRemove = function(toFirstChildRemove) {
  while (toFirstChildRemove.firstChild) {
      toFirstChildRemove.removeChild(toFirstChildRemove.firstChild);
  }
}

// подготовка большой картинки
var bigPicture = document.querySelector('.big-picture');
var bigPictureImg = document.querySelector('.big-picture__img img');
var bigPictureLikesCount = document.querySelector('.likes-count');
var bigPictureCommentsCount = document.querySelector('.comments-count');
var bigPictureComments = document.querySelector('.social__comments');
document.querySelector('.social__comment-count').classList.add('visually-hidden');
document.querySelector('.social__comment-loadmore').classList.add('visually-hidden');
bigPicture.classList.remove('hidden');
firstChildRemove(bigPictureComments);

// рендер большой картинки
var renderBigPicture = function () {
  bigPictureImg.setAttribute('src', images[0].url);
  bigPictureLikesCount.innerHTML = images[0].like;
  bigPictureCommentsCount.innerHTML = images[0].comment.length;
}
renderBigPicture(); // данные пока не передаю, как я понял в следующих заданиях сообщат какие конкретно данные передавать

var generateComments = function (commentsCount) {
  for (var i = 0; i < commentsCount; i++) {
    var fragment = document.createDocumentFragment();
    var newCommentElement = document.createElement('li');
    var getAvatar = '<img class="social__picture" src="img/avatar-' + getRandomValue(1, 6) + '.svg" alt="Аватар комментатора фотографии" width="35" height="35">'
    newCommentElement.className = 'social__comment social__comment--text';
    newCommentElement.innerHTML = getAvatar + images[0].comment[i];
    fragment.appendChild(newCommentElement);
    bigPictureComments.appendChild(fragment);
  }
}
generateComments(images[0].comment.length);
