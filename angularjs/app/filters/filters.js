/*
 * Filtros personalizados. Na view são usados com pipe, como em
 * {{ product.price | brl }}, e no controlador com $filter('brl').
 */
(function () {
  'use strict';

  var module = angular.module('loja.filters');

  var currencyFormatter = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' });

  // Remove acentos para que "ceramica" encontre "Cerâmica".
  function normalize(text) {
    return String(text || '').normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase();
  }

  // 89.9 vira R$ 89,90
  module.filter('brl', function () {
    return function (value) {
      var amount = Number(value);
      return isFinite(amount) ? currencyFormatter.format(amount) : '';
    };
  });

  // 1536000 vira 1,5 MB
  module.filter('fileSize', function () {
    return function (bytes) {
      var size = Number(bytes) || 0;
      if (size < 1024) {
        return size + ' B';
      }
      if (size < 1024 * 1024) {
        return Math.round(size / 1024) + ' KB';
      }
      return (size / (1024 * 1024)).toFixed(1).replace('.', ',') + ' MB';
    };
  });

  // Traduz o percentual (0 a 100) para a etapa de produção da peça.
  module.filter('productionStage', function () {
    var STAGES = [
      { upTo: 0, name: 'Encomenda na fila' },
      { upTo: 25, name: 'Modelagem' },
      { upTo: 50, name: 'Secagem' },
      { upTo: 75, name: 'Queima' },
      { upTo: 99, name: 'Pintura e acabamento' },
      { upTo: 100, name: 'Peça pronta' }
    ];

    return function (progress) {
      var value = Number(progress) || 0;
      return STAGES.filter(function (stage) {
        return value <= stage.upTo;
      })[0].name;
    };
  });

  // Filtra as peças pelo texto (nome ou cidade) e pela categoria.
  module.filter('productSearch', function () {
    return function (products, term, categoryId) {
      var query = normalize(term).trim();

      return products.filter(function (product) {
        var matchesCategory = !categoryId || product.categoryId === categoryId;
        var matchesTerm = !query ||
          normalize(product.name).indexOf(query) !== -1 ||
          normalize(product.origin).indexOf(query) !== -1;
        return matchesCategory && matchesTerm;
      });
    };
  });
})();
