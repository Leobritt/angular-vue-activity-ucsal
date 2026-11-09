<script>
let instanceCount = 0;

// A aba ativa fica no data do próprio componente. As setas do teclado também
// trocam de aba, como recomenda o padrão de acessibilidade WAI-ARIA.
export default {
  name: 'AppTabs',
  props: {
    // Lista de { title, content }
    tabs: { type: Array, required: true },
  },
  data() {
    return {
      activeIndex: 0,
    };
  },
  computed: {
    activeTab() {
      return this.tabs[this.activeIndex];
    },
  },
  watch: {
    // Se a nova lista tiver menos abas, volta para a primeira.
    tabs(newTabs) {
      if (this.activeIndex >= newTabs.length) {
        this.activeIndex = 0;
      }
    },
  },
  created() {
    instanceCount += 1;
    this.uid = `tabs-${instanceCount}`;
  },
  methods: {
    select(index) {
      this.activeIndex = index;
    },
    onKeydown(event) {
      const step = { ArrowRight: 1, ArrowLeft: -1 }[event.key];
      if (!step) {
        return;
      }
      event.preventDefault();
      this.activeIndex = (this.activeIndex + step + this.tabs.length) % this.tabs.length;
      this.$el.querySelectorAll('[role="tab"]')[this.activeIndex].focus();
    },
  },
};
</script>

<template>
  <div class="tabs">
    <div class="tabs-list" role="tablist">
      <button
        v-for="(tab, index) in tabs"
        :id="`${uid}-tab-${index}`"
        :key="tab.title"
        type="button"
        class="tabs-button"
        role="tab"
        :class="{ 'is-active': index === activeIndex }"
        :aria-controls="`${uid}-panel`"
        :aria-selected="index === activeIndex"
        :tabindex="index === activeIndex ? 0 : -1"
        @click="select(index)"
        @keydown="onKeydown"
      >
        {{ tab.title }}
      </button>
    </div>
    <div
      :id="`${uid}-panel`"
      class="tabs-panel"
      role="tabpanel"
      tabindex="0"
      :aria-labelledby="`${uid}-tab-${activeIndex}`"
    >
      <p>{{ activeTab.content }}</p>
    </div>
  </div>
</template>

<style scoped>
.tabs-list {
  display: flex;
  gap: 0.25rem;
  overflow-x: auto;
  border-bottom: 2px solid var(--noite);
}

.tabs-button {
  flex: none;
  padding: 0.75rem 1rem;
  border: 0;
  border-bottom: 5px solid transparent;
  background: none;
  color: inherit;
  font: 700 1rem/1.2 var(--font-body);
  cursor: pointer;
}

.tabs-button:hover {
  border-bottom-color: var(--linha);
}

.tabs-button.is-active {
  border-bottom-color: var(--rosa);
}

.tabs-panel {
  min-height: 7.5rem;
  padding: 1.25rem 0.25rem;
}

.tabs-panel p {
  max-width: 60ch;
  margin: 0;
}
</style>
