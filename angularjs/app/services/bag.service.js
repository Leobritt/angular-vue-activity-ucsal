/*
 * Sacola de compras, criada com .service(): o AngularJS instancia a função com
 * new, por isso os métodos são definidos em this. O ProductService, em
 * comparação, usa .factory() e devolve um objeto.
 */
(function () {
  'use strict';

  angular.module('loja.services').service('BagService', function () {
    var items = [];

    this.FREE_SHIPPING_MINIMUM = 300;

    this.add = function (product) {
      var existing = items.filter(function (item) {
        return item.product.id === product.id;
      })[0];

      if (existing) {
        existing.quantity += 1;
      } else {
        items.push({ product: product, quantity: 1 });
      }
    };

    this.clear = function () {
      items.length = 0;
    };

    this.count = function () {
      return items.reduce(function (sum, item) {
        return sum + item.quantity;
      }, 0);
    };

    this.total = function () {
      return items.reduce(function (sum, item) {
        return sum + item.product.price * item.quantity;
      }, 0);
    };
  });
})();
