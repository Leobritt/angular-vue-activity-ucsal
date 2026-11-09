// Serviço global de notificações.
//
// O plugin publica o serviço como this.$toast, então qualquer componente pode
// chamar this.$toast.success('Mensagem'). A lista é reativa e o ToastContainer
// a desenha.
import { reactive } from 'vue';

const DEFAULT_DURATION_MS = 4000;
const MAX_VISIBLE_TOASTS = 4;

const state = reactive({ toasts: [] });
let nextId = 1;

function dismiss(id) {
  const index = state.toasts.findIndex((toast) => toast.id === id);
  if (index !== -1) {
    clearTimeout(state.toasts[index].timer);
    state.toasts.splice(index, 1);
  }
}

function show(type, message, duration = DEFAULT_DURATION_MS) {
  const id = nextId++;
  const timer = setTimeout(() => dismiss(id), duration);

  state.toasts.push({ id, type, message, timer });

  if (state.toasts.length > MAX_VISIBLE_TOASTS) {
    dismiss(state.toasts[0].id);
  }
}

export const toastService = {
  state,
  show,
  dismiss,
  success: (message, duration) => show('success', message, duration),
  error: (message, duration) => show('error', message, duration),
  info: (message, duration) => show('info', message, duration),
};

export default {
  install(app) {
    app.config.globalProperties.$toast = toastService;
  },
};
