/*
 * Controla a listagem: busca, categoria, ordenação, paginação e meta de frete.
 * As propriedades em $scope ficam ligadas à view por ng-model (two-way binding).
 */
(function () {
  'use strict';

  angular.module('loja.controllers').controller('CatalogController', [
    '$scope', '$filter', '$document', 'ProductService', 'BagService', 'ToastService',
    function ($scope, $filter, $document, ProductService, BagService, ToastService) {
      var products = ProductService.getProducts();
      var formatPrice = $filter('brl');

      var SORT_RULES = {
        name: { field: 'name', reverse: false },
        lowestPrice: { field: 'price', reverse: false },
        highestPrice: { field: 'price', reverse: true }
      };

      $scope.pageSizes = [3, 6, 12];
      $scope.pagination = { currentPage: 1, pageSize: 6 };
      $scope.filters = { term: '', category: '', sort: 'name' };

      $scope.categoryOptions = [{ label: 'Todas', value: '' }].concat(
        ProductService.getCategories().map(function (category) {
          return { label: category.label, value: category.id };
        })
      );

      $scope.sortOptions = [
        { label: 'Nome', value: 'name' },
        { label: 'Menor preço', value: 'lowestPrice' },
        { label: 'Maior preço', value: 'highestPrice' }
      ];

      // Aplica filtro, ordenação e recorte da página, nessa ordem.
      function refreshList() {
        var rule = SORT_RULES[$scope.filters.sort];
        var matches = $filter('productSearch')(products, $scope.filters.term, $scope.filters.category);
        var sorted = $filter('orderBy')(matches, rule.field, rule.reverse);
        var pageSize = $scope.pagination.pageSize;

        $scope.filteredCount = sorted.length;
        $scope.totalPages = Math.max(1, Math.ceil(sorted.length / pageSize));
        $scope.pagination.currentPage = Math.min($scope.pagination.currentPage, $scope.totalPages);

        var firstIndex = ($scope.pagination.currentPage - 1) * pageSize;
        $scope.visibleProducts = $filter('limitTo')(sorted, pageSize, firstIndex);
      }

      // Toda mudança de filtro volta para a primeira página.
      $scope.onFiltersChange = function () {
        $scope.pagination.currentPage = 1;
        refreshList();
      };

      $scope.setCategory = function (categoryId) {
        $scope.filters.category = categoryId;
        $scope.onFiltersChange();
      };

      $scope.setSort = function (sort) {
        $scope.filters.sort = sort;
        $scope.onFiltersChange();
      };

      $scope.clearFilters = function () {
        $scope.filters.term = '';
        $scope.filters.category = '';
        $scope.onFiltersChange();
      };

      // Callback entregue à diretiva de paginação.
      $scope.goToPage = function (page) {
        $scope.pagination.currentPage = page;
        refreshList();
      };

      $scope.addToBag = function (product) {
        BagService.add(product);
        ToastService.success('Adicionado à sacola: ' + product.name + '.');
      };

      $scope.viewDetails = function (product) {
        ProductService.select(product);
        $document[0].getElementById('detalhes').scrollIntoView();
      };

      // A barra de frete acompanha o total da sacola.
      $scope.$watch(BagService.total, function (total) {
        var minimum = BagService.FREE_SHIPPING_MINIMUM;
        $scope.shippingProgress = (total / minimum) * 100;
        $scope.shippingMessage = total >= minimum
          ? 'Frete grátis garantido'
          : 'Faltam ' + formatPrice(minimum - total) + ' para o frete grátis';
      });

      refreshList();
    }
  ]);
})();
