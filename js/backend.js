'use strict';

(function () {
  var POST_URL = 'https://js.dump.academy/kekstagram';
  var SERVER_URL = 'https://js.dump.academy/kekstagram/data';

  var setup = function (onLoad, onError) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      return (xhr.status === 200) ? onLoad(xhr.response) : onError(xhr.response);
    });
    xhr.addEventListener('error', function () {
      onError('Произошла ошибка соединения');
    });
    xhr.addEventListener('timeout', function () {
      onError('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
    });

    xhr.timeout = 10000;
    return xhr;
  };

  window.load = function (onLoad, onError) {
    var xhr = setup(onLoad, onError);
    xhr.open('GET', SERVER_URL);
    xhr.send();
  };

  window.upload = function (data, onLoad, onError) {
    var xhr = setup(onLoad, onError);
    xhr.open('POST', POST_URL);
    xhr.send(data);
  };

  var onErrorMessage = function (errorMessage) {
    var node = document.createElement('div');
    node.style = 'z-index: 5; margin: 10px auto; text-align: center; background-color: red;';
    node.style.position = 'fixed';
    node.style.left = 0;
    node.style.right = 0;
    node.style.fontSize = '50px';
    node.textContent = errorMessage;
    document.body.insertAdjacentElement('afterbegin', node);
  };

  window.onError = function (message) {
    onErrorMessage(message);
  };
})();
