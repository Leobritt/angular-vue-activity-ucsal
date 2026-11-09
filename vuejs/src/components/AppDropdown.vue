<script>
// A visibilidade fica em data. O menu fecha ao escolher uma opção, ao clicar
// fora e ao apertar Esc. A opção escolhida é entregue ao pai pelo evento select.
export default {
  name: 'AppDropdown',
  props: {
    label: { type: String, required: true },
    // Lista de { label, value, disabled }
    options: { type: Array, required: true },
    // Valor da opção marcada. Fica indefinido em menus de ações.
    selected: { type: String, default: undefined },
  },
  emits: ['select'],
  data() {
    return {
      isOpen: false,
    };
  },
  computed: {
    triggerText() {
      const current = this.options.find((option) => this.isSelected(option));
      return current ? `${this.label}: ${current.label}` : this.label;
    },
  },
  mounted() {
    document.addEventListener('click', this.onDocumentClick);
    document.addEventListener('keydown', this.onDocumentKeydown);
  },
  beforeUnmount() {
    // Remove os ouvintes globais quando o componente sai da página.
    document.removeEventListener('click', this.onDocumentClick);
    document.removeEventListener('keydown', this.onDocumentKeydown);
  },
  methods: {
    isSelected(option) {
      return this.selected !== undefined && option.value === this.selected;
    },
    toggle() {
      this.isOpen = !this.isOpen;
    },
    choose(option) {
      this.isOpen = false;
      this.$emit('select', option);
    },
    onDocumentClick(event) {
      if (this.isOpen && !this.$el.contains(event.target)) {
        this.isOpen = false;
      }
    },
    onDocumentKeydown(event) {
      if (this.isOpen && event.key === 'Escape') {
        this.isOpen = false;
        this.$refs.trigger.focus();
      }
    },
  },
};
</script>

<template>
  <div class="dropdown">
    <button
      ref="trigger"
      type="button"
      class="dropdown-trigger"
      aria-haspopup="true"
      :aria-expanded="isOpen"
      @click="toggle"
    >
      <span>{{ triggerText }}</span>
      <span class="dropdown-caret" :class="{ 'is-open': isOpen }" aria-hidden="true"></span>
    </button>
    <ul v-if="isOpen" class="dropdown-menu" role="menu">
      <li v-for="option in options" :key="option.value" role="none">
        <button
          type="button"
          class="dropdown-option"
          role="menuitem"
          :class="{ 'is-selected': isSelected(option) }"
          :disabled="option.disabled"
          @click="choose(option)"
        >
          {{ option.label }}
        </button>
      </li>
    </ul>
  </div>
</template>

<style scoped>
.dropdown {
  position: relative;
}

.dropdown-trigger {
  display: inline-flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.75rem;
  width: 100%;
  min-height: 46px;
  padding: 0 0.875rem;
  border: 2px solid var(--noite);
  border-radius: 3px;
  background: var(--branco);
  color: var(--noite);
  font: 700 1rem/1.2 var(--font-body);
  cursor: pointer;
}

.dropdown-trigger:hover {
  background: var(--gema);
}

.dropdown-caret {
  width: 0;
  height: 0;
  border-right: 5px solid transparent;
  border-left: 5px solid transparent;
  border-top: 6px solid currentColor;
  transition: transform 0.15s ease;
}

.dropdown-caret.is-open {
  transform: rotate(180deg);
}

.dropdown-menu {
  position: absolute;
  z-index: 20;
  top: calc(100% + 4px);
  left: 0;
  min-width: 100%;
  width: max-content;
  max-width: min(320px, 80vw);
  margin: 0;
  padding: 0.25rem;
  border: 2px solid var(--noite);
  border-radius: 3px;
  background: var(--branco);
  list-style: none;
}

.dropdown--end .dropdown-menu {
  right: 0;
  left: auto;
}

.dropdown-option {
  display: block;
  width: 100%;
  padding: 0.625rem 0.75rem;
  border: 0;
  border-radius: 2px;
  background: none;
  color: var(--noite);
  font: 500 1rem/1.25 var(--font-body);
  text-align: left;
  cursor: pointer;
}

.dropdown-option:hover:not(:disabled) {
  background: var(--gema);
}

.dropdown-option.is-selected {
  font-weight: 800;
  box-shadow: inset 4px 0 0 var(--rosa);
}

.dropdown-option:disabled {
  color: var(--apagado);
  cursor: not-allowed;
}
</style>
