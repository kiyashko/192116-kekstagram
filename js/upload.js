'use strict';

(function () {

  window.upload = function (data, onLoad, onError) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      onLoad(xhr.response);
    });

    xhr.addEventListener('error', function () {
      onError('Произошла ошибка отправки');
    });

    xhr.open('POST', window.POST_URL);
    xhr.send(data);
  };
})();
