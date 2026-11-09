/*
 * Módulo principal da aplicação.
 *
 * Declara os módulos internos (serviços, filtros e controladores) e reúne tudo
 * no módulo lojaApp, usado em ng-app no index.html. Os componentes visuais têm
 * módulos próprios (ui.*) para poderem ser levados a outra aplicação.
 */
(function () {
  'use strict';

  angular.module('loja.services', []);
  angular.module('loja.filters', []);
  angular.module('loja.controllers', ['loja.services', 'ui.toast']);

  angular.module('lojaApp', [
    // Dados, regras de negócio e telas
    'loja.services',
    'loja.filters',
    'loja.controllers',

    // Componentes visuais
    'ui.accordion',
    'ui.pagination',
    'ui.progressBar',
    'ui.tabs',
    'ui.dropdown',
    'ui.toast',
    'ui.fileChange'
  ]);
})();
