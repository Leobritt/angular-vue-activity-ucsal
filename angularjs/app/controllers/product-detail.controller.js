/* Mostra a peça selecionada no catálogo e monta o conteúdo das abas. */
(function () {
  'use strict';

  angular.module('loja.controllers').controller('ProductDetailController', [
    '$scope', 'ProductService', 'BagService', 'ToastService',
    function ($scope, ProductService, BagService, ToastService) {
      $scope.$watch(ProductService.getSelected, function (product) {
        $scope.product = product;
        $scope.tabs = ProductService.buildTabs(product);
      });

      $scope.addToBag = function () {
        BagService.add($scope.product);
        ToastService.success('Adicionado à sacola: ' + $scope.product.name + '.');
      };
    }
  ]);
})();
