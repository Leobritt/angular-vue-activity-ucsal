<script>
let instanceCount = 0;

// Guarda em data qual item está aberto. Como é um único índice, abrir um item
// fecha o anterior. A transição suave está no CSS.
export default {
  name: 'AppAccordion',
  props: {
    // Lista de { title, content }
    items: { type: Array, required: true },
    initialOpen: { type: Number, default: -1 },
  },
  data() {
    return {
      openIndex: this.initialOpen,
    };
  },
  created() {
    // Identificador único para ligar cada botão ao seu painel (acessibilidade).
    instanceCount += 1;
    this.uid = `accordion-${instanceCount}`;
  },
  methods: {
    isOpen(index) {
      return this.openIndex === index;
    },
    toggle(index) {
      this.openIndex = this.isOpen(index) ? -1 : index;
    },
  },
};
</script>

<template>
  <div class="accordion">
    <div
      v-for="(item, index) in items"
      :key="item.title"
      class="accordion-item"
      :class="{ 'is-open': isOpen(index) }"
    >
      <h3 class="accordion-heading">
        <button
          :id="`${uid}-trigger-${index}`"
          type="button"
          class="accordion-trigger"
          :aria-expanded="isOpen(index)"
          :aria-controls="`${uid}-panel-${index}`"
          @click="toggle(index)"
        >
          <span>{{ item.title }}</span>
          <span class="accordion-icon" aria-hidden="true"></span>
        </button>
      </h3>
      <div
        :id="`${uid}-panel-${index}`"
        class="accordion-panel"
        role="region"
        :aria-labelledby="`${uid}-trigger-${index}`"
      >
        <div class="accordion-content"><p>{{ item.content }}</p></div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.accordion {
  border-top: 2px solid var(--noite);
}

.accordion-item {
  border-bottom: 2px solid var(--noite);
}

.accordion-heading {
  margin: 0;
  font: inherit;
}

.accordion-trigger {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  width: 100%;
  padding: 1.1rem 0.25rem;
  border: 0;
  background: none;
  color: inherit;
  font: 700 1.125rem/1.3 var(--font-body);
  text-align: left;
  cursor: pointer;
}

.accordion-trigger:hover {
  color: var(--primaria);
}

.accordion-icon {
  position: relative;
  flex: none;
  width: 18px;
  height: 18px;
  transition: transform 0.3s ease;
}

.accordion-icon::before,
.accordion-icon::after {
  content: '';
  position: absolute;
  background: currentColor;
}

.accordion-icon::before {
  top: 8px;
  left: 0;
  width: 18px;
  height: 3px;
}

.accordion-icon::after {
  top: 0;
  left: 8px;
  width: 3px;
  height: 18px;
  transition: transform 0.3s ease;
}

.is-open > .accordion-heading .accordion-icon::after {
  transform: scaleY(0);
}

/* grid-template-rows permite animar até a altura real do conteúdo. */
.accordion-panel {
  display: grid;
  grid-template-rows: 0fr;
  visibility: hidden;
  transition: grid-template-rows 0.3s ease, visibility 0.3s;
}

.is-open > .accordion-panel {
  grid-template-rows: 1fr;
  visibility: visible;
}

.accordion-content {
  overflow: hidden;
}

.accordion-content p {
  max-width: 65ch;
  margin: 0;
  padding: 0 0.25rem 1.25rem;
}
</style>
