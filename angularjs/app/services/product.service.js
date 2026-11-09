/*
 * Factory com o catálogo e a peça selecionada.
 * Como factories são singletons, todos os controladores veem o mesmo estado.
 */
(function () {
  'use strict';

  angular.module('loja.services').factory('ProductService', ['CATALOG_DATA', function (CATALOG_DATA) {
    var categoriesById = {};

    CATALOG_DATA.categories.forEach(function (category) {
      categoriesById[category.id] = category;
    });

    // Acrescenta às peças o nome da categoria, usado nos cards e nas abas.
    var products = CATALOG_DATA.products.map(function (product) {
      return angular.extend({}, product, {
        categoryLabel: categoriesById[product.categoryId].label
      });
    });

    var selectedProduct = products[0];

    return {
      getProducts: function () {
        return products;
      },
      getCategories: function () {
        return CATALOG_DATA.categories;
      },
      getSelected: function () {
        return selectedProduct;
      },
      select: function (product) {
        selectedProduct = product;
      },
      // Monta o conteúdo que a diretiva de abas recebe por binding.
      buildTabs: function (product) {
        return [
          { title: 'Sobre a peça', content: product.description + ' Feita em ' + product.origin + '.' },
          { title: 'Material e medidas', content: product.material + '. Medidas: ' + product.size + '.' },
          { title: 'Cuidados', content: categoriesById[product.categoryId].care }
        ];
      }
    };
  }]);
})();
