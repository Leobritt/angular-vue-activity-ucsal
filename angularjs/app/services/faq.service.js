/* Factory que entrega as perguntas frequentes ao FaqController. */
(function () {
  'use strict';

  angular.module('loja.services').factory('FaqService', ['CATALOG_DATA', function (CATALOG_DATA) {
    return {
      getQuestions: function () {
        return CATALOG_DATA.faq;
      }
    };
  }]);
})();
