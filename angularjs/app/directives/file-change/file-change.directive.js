/*
 * <input type="file" app-file-change="funcao(file)">
 *
 * ng-model e ng-change não funcionam em input de arquivo, então esta diretiva
 * de atributo escuta o evento nativo e entrega o arquivo ao $scope.
 */
(function () {
  'use strict';

  angular.module('ui.fileChange', []).directive('appFileChange', ['$parse', function ($parse) {
    return {
      restrict: 'A',
      link: function (scope, element, attrs) {
        var callback = $parse(attrs.appFileChange);

        element.on('change', function (event) {
          var file = event.target.files[0];

          scope.$apply(function () {
            callback(scope, { file: file });
          });

          // Limpa o campo para que o mesmo arquivo possa ser escolhido de novo.
          event.target.value = '';
        });
      }
    };
  }]);
})();
