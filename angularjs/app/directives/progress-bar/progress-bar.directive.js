/*
 * <app-progress-bar value="n" label="Texto" show-percent="true"></app-progress-bar>
 *
 * value: progresso de 0 a 100 recebido por binding.
 * show-percent: exibe o percentual (padrão: true).
 */
(function () {
  'use strict';

  angular.module('ui.progressBar', []).directive('appProgressBar', function () {
    // Valores inválidos viram 0 e valores fora da faixa ficam entre 0 e 100.
    function clampPercent(value) {
      var number = Number(value);
      if (!isFinite(number)) {
        return 0;
      }
      return Math.round(Math.min(100, Math.max(0, number)));
    }

    return {
      restrict: 'E',
      scope: {
        value: '<',
        label: '@',
        showPercent: '<?'
      },
      template: `
        <div class="progress">
          <div class="progress-head">
            <span class="progress-label">{{ label }}</span>
            <span class="progress-percent" ng-if="showPercent !== false">{{ percent }}%</span>
          </div>
          <div class="progress-track" role="progressbar" aria-valuemin="0" aria-valuemax="100"
               aria-valuenow="{{ percent }}" aria-label="{{ label }}">
            <div class="progress-fill" ng-style="{ width: percent + '%' }"></div>
          </div>
        </div>
      `,
      link: function (scope) {
        scope.$watch('value', function (value) {
          scope.percent = clampPercent(value);
        });
      }
    };
  });
})();
