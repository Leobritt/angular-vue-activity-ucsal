/*
 * <app-pagination total-pages="n" current-page="p" on-page-change="ir(page)"></app-pagination>
 *
 * Recebe o total e a página atual por binding de uma via. A diretiva não altera
 * a página: ela chama o callback e quem a usa decide o que fazer.
 */
(function () {
  'use strict';

  angular.module('ui.pagination', []).directive('appPagination', function () {
    // Monta a lista de botões. Com muitas páginas, null representa as reticências.
    function buildPageItems(currentPage, totalPages) {
      var items = [];
      var previous = 0;

      for (var page = 1; page <= totalPages; page++) {
        var isEdge = page === 1 || page === totalPages;
        var isNearCurrent = Math.abs(page - currentPage) <= 1;

        if (isEdge || isNearCurrent) {
          if (page - previous > 1) {
            items.push(null);
          }
          items.push(page);
          previous = page;
        }
      }
      return items;
    }

    return {
      restrict: 'E',
      scope: {
        totalPages: '<',
        currentPage: '<',
        onPageChange: '&'
      },
      template: `
        <nav class="pagination" aria-label="Paginação">
          <button type="button" class="pagination-button pagination-button--step" ng-disabled="currentPage <= 1" ng-click="goTo(currentPage - 1)">Anterior</button>
          <span class="pagination-pages" ng-repeat="page in pageItems track by $index">
            <span class="pagination-gap" ng-if="page === null" aria-hidden="true">…</span>
            <button type="button" class="pagination-button" ng-if="page !== null"
                    ng-class="{ 'is-current': page === currentPage }"
                    ng-attr-aria-current="{{ page === currentPage ? 'page' : undefined }}"
                    aria-label="Página {{ page }}" ng-click="goTo(page)">{{ page }}</button>
          </span>
          <button type="button" class="pagination-button pagination-button--step" ng-disabled="currentPage >= totalPages" ng-click="goTo(currentPage + 1)">Próxima</button>
        </nav>
      `,
      link: function (scope) {
        scope.$watchGroup(['currentPage', 'totalPages'], function () {
          scope.pageItems = buildPageItems(scope.currentPage, scope.totalPages);
        });

        scope.goTo = function (page) {
          if (page >= 1 && page <= scope.totalPages && page !== scope.currentPage) {
            scope.onPageChange({ page: page });
          }
        };
      }
    };
  });
})();
