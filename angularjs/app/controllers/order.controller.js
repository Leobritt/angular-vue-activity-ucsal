/* Controla o formulário de encomenda, o envio da foto e o simulador de produção. */
(function () {
  'use strict';

  angular.module('loja.controllers').controller('OrderController', [
    '$scope', 'UploadService', 'ToastService',
    function ($scope, UploadService, ToastService) {
      var currentUpload = null;
      var pieceReadyNotified = false;

      function emptyOrder() {
        return { customerName: '', description: '' };
      }

      $scope.order = emptyOrder();
      $scope.upload = { file: null, progress: 0 };
      $scope.production = { progress: 20 };

      $scope.isUploading = function () {
        return currentUpload !== null;
      };

      $scope.onFileSelected = function (file) {
        if (!file) {
          return;
        }

        var validationError = UploadService.validate(file);
        if (validationError) {
          ToastService.error(validationError);
          return;
        }

        $scope.upload = { file: file, progress: 0 };
        currentUpload = UploadService.send(file);

        currentUpload.promise.then(function () {
          currentUpload = null;
          ToastService.success('Foto enviada: ' + file.name + '.');
        }, function () {
          currentUpload = null;
          $scope.upload = { file: null, progress: 0 };
          ToastService.info('Envio da foto cancelado.');
        }, function (progress) {
          $scope.upload.progress = progress;
        });
      };

      $scope.cancelUpload = function () {
        currentUpload.cancel();
      };

      $scope.showError = function (form, field) {
        return field.$invalid && (field.$touched || form.$submitted);
      };

      $scope.submitOrder = function (form) {
        if (form.$invalid) {
          form.$setSubmitted();
          ToastService.error('Preencha seu nome e descreva a peça para enviar a encomenda.');
          return;
        }

        if ($scope.isUploading()) {
          ToastService.info('Aguarde o envio da foto terminar.');
          return;
        }

        ToastService.success('Encomenda enviada, ' + $scope.order.customerName + '. O ateliê responde em até 3 dias úteis.');
        $scope.order = emptyOrder();
        $scope.upload = { file: null, progress: 0 };
        form.$setPristine();
        form.$setUntouched();
      };

      // Avisa uma vez quando a peça chega a 100%.
      $scope.onProductionChange = function () {
        var isReady = $scope.production.progress === 100;
        if (isReady && !pieceReadyNotified) {
          ToastService.success('Peça pronta para envio.');
        }
        pieceReadyNotified = isReady;
      };

      // Interrompe a simulação se o controlador for destruído no meio do envio.
      $scope.$on('$destroy', function () {
        if (currentUpload) {
          currentUpload.cancel();
        }
      });
    }
  ]);
})();
