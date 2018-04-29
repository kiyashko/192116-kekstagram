'use strict';

(function () {
  window.POST_URL = 'https://js.dump.academy/kekstagram';
  window.SERVER_URL = 'https://js.dump.academy/kekstagram/data';
  window.TOTAL_IMAGES = 25; // количество картинок
  window.MIN_LIKE = 15; // минимальное количество лайков
  window.MAX_LIKE = 200; // максимальное количество лайков
  window.ESC_KEYCODE = 27; // клавиша ESC
  window.RESIZE_STEP = 25; // значение шага для увеличения фотографии

  window.COMMENTS = [
    'Всё отлично!',
    'В целом всё неплохо. Но не всё.',
    'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
    'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
    'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
    'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'];

  window.DESCRIPTIONS = [
    'Тестим новую камеру!',
    'Затусили с друзьями на море',
    'Как же круто тут кормят',
    'Отдыхаем...',
    'Цените каждое мгновенье. Цените тех, кто рядом с вами и отгоняйте все сомненья. Не обижайте всех словами......',
    'Вот это тачка!'];
})();
