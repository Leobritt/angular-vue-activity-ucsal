/*
 * Factory que valida a imagem e simula o envio.
 * O andamento chega ao controlador pelo notify da promise ($q) e o tempo é
 * controlado por $interval, que já dispara o ciclo de digest do AngularJS.
 */
(function () {
  'use strict';

  angular.module('loja.services').factory('UploadService', ['$interval', '$q', function ($interval, $q) {
    var MAX_FILE_SIZE = 5 * 1024 * 1024;
    var STEP_INTERVAL_MS = 120;

    function validate(file) {
      if (!/^image\//.test(file.type)) {
        return 'Esse arquivo não é uma imagem. Escolha um JPG, PNG ou WebP.';
      }
      if (file.size > MAX_FILE_SIZE) {
        return 'A imagem passa de 5 MB. Escolha um arquivo menor.';
      }
      return null;
    }

    function send(file) {
      var deferred = $q.defer();
      var progress = 0;

      var timer = $interval(function () {
        progress = Math.min(100, progress + 4 + Math.random() * 8);
        deferred.notify(Math.round(progress));

        if (progress === 100) {
          $interval.cancel(timer);
          deferred.resolve(file);
        }
      }, STEP_INTERVAL_MS);

      return {
        promise: deferred.promise,
        cancel: function () {
          $interval.cancel(timer);
          deferred.reject('cancelled');
        }
      };
    }

    return { validate: validate, send: send };
  }]);
})();
