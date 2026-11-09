/* Entrega as perguntas frequentes à diretiva de acordeão. */
(function () {
  'use strict';

  angular.module('loja.controllers').controller('FaqController', [
    '$scope', 'FaqService',
    function ($scope, FaqService) {
      $scope.questions = FaqService.getQuestions();
    }
  ]);
})();
