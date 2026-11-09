/*
 * <app-tabs tabs="lista"></app-tabs>
 *
 * tabs: array de { title, content } recebido por binding.
 * A aba ativa fica no $scope da própria diretiva. As setas do teclado também
 * trocam de aba, como recomenda o padrão de acessibilidade WAI-ARIA.
 */
(function () {
  'use strict';

  angular.module('ui.tabs', []).directive('appTabs', function () {
    return {
      restrict: 'E',
      scope: {
        tabs: '<'
      },
      template: `
        <div class="tabs">
          <div class="tabs-list" role="tablist">
            <button type="button" class="tabs-button" role="tab" ng-repeat="tab in tabs track by $index"
                    id="{{ uid }}-tab-{{ $index }}" aria-controls="{{ uid }}-panel"
                    aria-selected="{{ $index === activeIndex }}"
                    tabindex="{{ $index === activeIndex ? 0 : -1 }}"
                    ng-class="{ 'is-active': $index === activeIndex }"
                    ng-click="select($index)" ng-keydown="onKeydown($event)">{{ tab.title }}</button>
          </div>
          <div class="tabs-panel" id="{{ uid }}-panel" role="tabpanel" tabindex="0"
               aria-labelledby="{{ uid }}-tab-{{ activeIndex }}">
            <p>{{ tabs[activeIndex].content }}</p>
          </div>
        </div>
      `,
      link: function (scope, element) {
        scope.uid = 'tabs-' + scope.$id;
        scope.activeIndex = 0;

        scope.select = function (index) {
          scope.activeIndex = index;
        };

        scope.onKeydown = function (event) {
          var step = { ArrowRight: 1, ArrowLeft: -1 }[event.key];
          if (!step) {
            return;
          }
          event.preventDefault();
          scope.activeIndex = (scope.activeIndex + step + scope.tabs.length) % scope.tabs.length;
          element[0].querySelectorAll('[role="tab"]')[scope.activeIndex].focus();
        };

        // Se a nova lista tiver menos abas, volta para a primeira.
        scope.$watch('tabs', function (tabs) {
          if (!tabs || scope.activeIndex >= tabs.length) {
            scope.activeIndex = 0;
          }
        });
      }
    };
  });
})();
