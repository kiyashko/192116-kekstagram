'use strict';

var allComments = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'];
var allDescriptions = [
  'Тестим новую камеру!',
  'Затусили с друзьями на море',
  'Как же круто тут кормят',
  'Отдыхаем...',
  'Цените каждое мгновенье. Цените тех, кто рядом с вами и отгоняйте все сомненья. Не обижайте всех словами......',
  'Вот это тачка!']
var images = [];

function getRandomValue (min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// функция генерации рандомных комментов
function makeRandomComments (min, max) {
var getComments = allComments.slice();
var commentsCount = getRandomValue(min, max);
var comments = [];
  for(var i = 0; i < commentsCount; i++) {
  var commRand = Math.floor(Math.random() * getComments.length);
  comments.push(getComments[commRand]);
  getComments.splice(commRand, 1);
  }
  return comments;
}

// генерация массива
var getInfo = function (totalImages) {
  for (var i = 0; i < totalImages; i++) {
    var getUrl = 'photos/' + (i + 1) + '.jpg';
    var getLike = getRandomValue(15, 200);
    var getDescription = getRandomValue(0, allDescriptions.length - 1);
    var imageInfo = {
      url: getUrl,
      like: getLike,
      comment: makeRandomComments (1, 2),
      description: [allDescriptions[getDescription]]
    }
  images[i] = imageInfo;
  }

}
getInfo(25);

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
renderImages(25);

// большая картинка
var bigPicture = document.querySelector('.big-picture');
var bigPictureImg = document.querySelector('.big-picture__img img');
var bigPictureLikesCount = document.querySelector('.likes-count');
var bigPictureCommentsCount = document.querySelector('.comments-count');
var bigPictureComments = document.querySelector('.social__comments');
document.querySelector('.social__comment-count').classList.add('visually-hidden');
document.querySelector('.social__comment-loadmore').classList.add('visually-hidden');
bigPicture.classList.remove('hidden');
while (bigPictureComments.firstChild) {
    bigPictureComments.removeChild(bigPictureComments.firstChild);
}
bigPictureImg.setAttribute('src', images[0].url);
bigPictureLikesCount.innerHTML = images[0].like;
bigPictureCommentsCount.innerHTML = images[0].comment.length;

// комменты к большой картинке
for (var i = 0; i < images[0].comment.length; i++) {
  var fragment = document.createDocumentFragment();
  var newCommentElement = document.createElement('li');
  var getAvatar = '<img class="social__picture" src="img/avatar-' + getRandomValue(1, 6) + '.svg" alt="Аватар комментатора фотографии" width="35" height="35">'
  newCommentElement.className = 'social__comment social__comment--text';
  newCommentElement.innerHTML = getAvatar + images[0].comment[i];
  fragment.appendChild(newCommentElement);
  bigPictureComments.appendChild(fragment);
}
