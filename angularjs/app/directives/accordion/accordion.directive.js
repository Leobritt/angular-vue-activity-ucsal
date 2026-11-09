/*
 * <app-accordion items="lista" initial-open="0"></app-accordion>
 *
 * items: array de { title, content } recebido por binding.
 * initial-open: índice do item aberto ao iniciar (opcional).
 *
 * A diretiva guarda em $scope qual item está aberto. Como é um único índice,
 * abrir um item fecha o anterior. A transição suave está no CSS.
 */
(function () {
  'use strict';

  angular.module('ui.accordion', []).directive('appAccordion', function () {
    return {
      restrict: 'E',
      scope: {
        items: '<',
        initialOpen: '<?'
      },
      template: `
        <div class="accordion">
          <div class="accordion-item" ng-repeat="item in items track by $index" ng-class="{ 'is-open': isOpen($index) }">
            <h3 class="accordion-heading">
              <button type="button" class="accordion-trigger" id="{{ uid }}-trigger-{{ $index }}"
                      aria-expanded="{{ isOpen($index) }}" aria-controls="{{ uid }}-panel-{{ $index }}"
                      ng-click="toggle($index)">
                <span>{{ item.title }}</span>
                <span class="accordion-icon" aria-hidden="true"></span>
              </button>
            </h3>
            <div class="accordion-panel" id="{{ uid }}-panel-{{ $index }}" role="region"
                 aria-labelledby="{{ uid }}-trigger-{{ $index }}">
              <div class="accordion-content"><p>{{ item.content }}</p></div>
            </div>
          </div>
        </div>
      `,
      link: function (scope) {
        scope.uid = 'accordion-' + scope.$id;
        scope.openIndex = angular.isNumber(scope.initialOpen) ? scope.initialOpen : -1;

        scope.isOpen = function (index) {
          return scope.openIndex === index;
        };

        // Clicar no item aberto fecha; clicar em outro troca o item aberto.
        scope.toggle = function (index) {
          scope.openIndex = scope.isOpen(index) ? -1 : index;
        };
      }
    };
  });
})();
