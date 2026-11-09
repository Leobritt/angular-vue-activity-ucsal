<script>
// Recebe o progresso (0 a 100) por prop e calcula a largura da barra.
export default {
  name: 'AppProgressBar',
  props: {
    value: { type: Number, default: 0 },
    label: { type: String, default: '' },
    showPercent: { type: Boolean, default: true },
  },
  computed: {
    // Valores inválidos viram 0 e valores fora da faixa ficam entre 0 e 100.
    percent() {
      if (!Number.isFinite(this.value)) {
        return 0;
      }
      return Math.round(Math.min(100, Math.max(0, this.value)));
    },
  },
};
</script>

<template>
  <div class="progress">
    <div class="progress-head">
      <span class="progress-label">{{ label }}</span>
      <span v-if="showPercent" class="progress-percent">{{ percent }}%</span>
    </div>
    <div
      class="progress-track"
      role="progressbar"
      aria-valuemin="0"
      aria-valuemax="100"
      :aria-valuenow="percent"
      :aria-label="label"
    >
      <div class="progress-fill" :style="{ width: `${percent}%` }"></div>
    </div>
  </div>
</template>

<style scoped>
.progress-head {
  display: flex;
  justify-content: space-between;
  gap: 1rem;
  margin-bottom: 0.375rem;
  font-weight: 700;
}

.progress-label {
  overflow-wrap: anywhere;
}

.progress-percent {
  font-variant-numeric: tabular-nums;
}

.progress-track {
  height: 14px;
  overflow: hidden;
  border: 2px solid var(--noite);
  border-radius: 3px;
  background: var(--branco);
}

.progress-fill {
  height: 100%;
  background: var(--primaria);
  transition: width 0.2s ease;
}
</style>
