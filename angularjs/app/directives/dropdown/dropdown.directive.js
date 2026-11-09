/*
 * <app-dropdown label="Texto" options="lista" selected="valor" on-select="f(option)"></app-dropdown>
 *
 * options: array de { label, value, action, disabled }. action é o callback da opção.
 * selected: valor da opção marcada (opcional).
 * on-select: callback geral, chamado com a opção escolhida (opcional).
 *
 * A visibilidade fica em scope.isOpen. O menu fecha ao escolher uma opção, ao
 * clicar fora e ao apertar Esc.
 */
(function () {
  'use strict';

  angular.module('ui.dropdown', []).directive('appDropdown', ['$document', function ($document) {
    return {
      restrict: 'E',
      scope: {
        label: '@',
        options: '<',
        selected: '<?',
        onSelect: '&?'
      },
      template: `
        <div class="dropdown">
          <button type="button" class="dropdown-trigger" aria-haspopup="true" aria-expanded="{{ isOpen }}" ng-click="toggle()">
            <span>{{ triggerText() }}</span>
            <span class="dropdown-caret" ng-class="{ 'is-open': isOpen }" aria-hidden="true"></span>
          </button>
          <ul class="dropdown-menu" role="menu" ng-if="isOpen">
            <li role="none" ng-repeat="option in options track by $index">
              <button type="button" class="dropdown-option" role="menuitem"
                      ng-class="{ 'is-selected': option.value === selected && selected !== undefined }"
                      ng-disabled="option.disabled" ng-click="choose(option)">{{ option.label }}</button>
            </li>
          </ul>
        </div>
      `,
      link: function (scope, element) {
        scope.isOpen = false;

        scope.toggle = function () {
          scope.isOpen = !scope.isOpen;
        };

        scope.triggerText = function () {
          var current = (scope.options || []).filter(function (option) {
            return scope.selected !== undefined && option.value === scope.selected;
          })[0];
          return current ? scope.label + ': ' + current.label : scope.label;
        };

        scope.choose = function (option) {
          scope.isOpen = false;
          if (option.action) {
            option.action(option);
          }
          if (scope.onSelect) {
            scope.onSelect({ option: option });
          }
        };

        // Eventos fora do AngularJS precisam de $apply para atualizar a view.
        function close() {
          scope.$apply(function () {
            scope.isOpen = false;
          });
        }

        function onDocumentClick(event) {
          if (scope.isOpen && !element[0].contains(event.target)) {
            close();
          }
        }

        function onDocumentKeydown(event) {
          if (scope.isOpen && event.key === 'Escape') {
            close();
            element[0].querySelector('.dropdown-trigger').focus();
          }
        }

        $document.on('click', onDocumentClick);
        $document.on('keydown', onDocumentKeydown);

        // Remove os ouvintes globais quando a diretiva sai da página.
        scope.$on('$destroy', function () {
          $document.off('click', onDocumentClick);
          $document.off('keydown', onDocumentKeydown);
        });
      }
    };
  }]);
})();
