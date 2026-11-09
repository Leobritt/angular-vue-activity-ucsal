/*
 * Notificações temporárias, formadas por duas partes:
 *
 * ToastService: guarda a lista e pode ser injetado em qualquer controlador.
 *   ToastService.success('Mensagem'), .error('Mensagem'), .info('Mensagem')
 *
 * <app-toast-container>: desenha a lista. Basta um na página.
 */
(function () {
  'use strict';

  var DEFAULT_DURATION_MS = 4000;
  var LEAVE_ANIMATION_MS = 200;
  var MAX_VISIBLE_TOASTS = 4;

  angular.module('ui.toast', [])
    .factory('ToastService', ['$timeout', function ($timeout) {
      var toasts = [];
      var nextId = 1;

      function remove(toast) {
        var index = toasts.indexOf(toast);
        if (index !== -1) {
          toasts.splice(index, 1);
        }
      }

      // Marca a saída antes de remover, para a animação do CSS ter tempo de rodar.
      function dismiss(toast) {
        if (toast.leaving) {
          return;
        }
        $timeout.cancel(toast.timer);
        toast.leaving = true;
        $timeout(function () {
          remove(toast);
        }, LEAVE_ANIMATION_MS);
      }

      function show(type, message, duration) {
        var toast = { id: nextId++, type: type, message: message, leaving: false };

        toast.timer = $timeout(function () {
          dismiss(toast);
        }, duration || DEFAULT_DURATION_MS);

        toasts.push(toast);

        if (toasts.length > MAX_VISIBLE_TOASTS) {
          dismiss(toasts[0]);
        }
        return toast;
      }

      return {
        toasts: toasts,
        show: show,
        dismiss: dismiss,
        success: function (message, duration) { return show('success', message, duration); },
        error: function (message, duration) { return show('error', message, duration); },
        info: function (message, duration) { return show('info', message, duration); }
      };
    }])

    .directive('appToastContainer', ['ToastService', function (ToastService) {
      return {
        restrict: 'E',
        scope: {},
        template: `
          <div class="toast-stack" aria-live="polite">
            <div class="toast" ng-repeat="toast in toasts track by toast.id"
                 ng-class="['toast--' + toast.type, { 'is-leaving': toast.leaving }]"
                 role="{{ toast.type === 'error' ? 'alert' : 'status' }}">
              <span class="toast-mark" aria-hidden="true">{{ marks[toast.type] }}</span>
              <p class="toast-message">{{ toast.message }}</p>
              <button type="button" class="toast-close" aria-label="Fechar notificação" ng-click="dismiss(toast)">×</button>
            </div>
          </div>
        `,
        link: function (scope) {
          scope.toasts = ToastService.toasts;
          scope.dismiss = ToastService.dismiss;
          scope.marks = { success: '✓', error: '!', info: 'i' };
        }
      };
    }]);
})();
