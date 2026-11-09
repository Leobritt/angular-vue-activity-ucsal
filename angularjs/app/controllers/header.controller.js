/* Controla o menu da sacola. Cada opção do menu tem o próprio callback. */
(function () {
  'use strict';

  angular.module('loja.controllers').controller('HeaderController', [
    '$scope', '$filter', 'BagService', 'ToastService',
    function ($scope, $filter, BagService, ToastService) {
      var formatPrice = $filter('brl');

      var totalOption = {
        label: 'Ver total da sacola',
        action: function () {
          ToastService.info('Total da sacola: ' + formatPrice(BagService.total()));
        }
      };

      var clearOption = {
        label: 'Esvaziar sacola',
        action: function () {
          BagService.clear();
          ToastService.info('Sacola esvaziada.');
        }
      };

      $scope.bagOptions = [totalOption, clearOption];

      // Mantém o rótulo do menu e as opções de acordo com a sacola.
      $scope.$watch(BagService.count, function (count) {
        $scope.bagCount = count;
        totalOption.disabled = count === 0;
        clearOption.disabled = count === 0;
      });
    }
  ]);
})();
