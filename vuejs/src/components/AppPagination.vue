<script>
// Recebe o total e a página atual por props. O componente não altera a página:
// ele emite page-change e o componente pai decide o que fazer.
export default {
  name: 'AppPagination',
  props: {
    totalPages: { type: Number, required: true },
    currentPage: { type: Number, required: true },
  },
  emits: ['page-change'],
  computed: {
    isFirstPage() {
      return this.currentPage <= 1;
    },
    isLastPage() {
      return this.currentPage >= this.totalPages;
    },
    // Monta a lista de botões. Com muitas páginas, null representa as reticências.
    pageItems() {
      const items = [];
      let previous = 0;

      for (let page = 1; page <= this.totalPages; page++) {
        const isEdge = page === 1 || page === this.totalPages;
        const isNearCurrent = Math.abs(page - this.currentPage) <= 1;

        if (isEdge || isNearCurrent) {
          if (page - previous > 1) {
            items.push(null);
          }
          items.push(page);
          previous = page;
        }
      }
      return items;
    },
  },
  methods: {
    goTo(page) {
      if (page >= 1 && page <= this.totalPages && page !== this.currentPage) {
        this.$emit('page-change', page);
      }
    },
  },
};
</script>

<template>
  <nav class="pagination" aria-label="Paginação">
    <button
      type="button"
      class="pagination-button pagination-button--step"
      :disabled="isFirstPage"
      @click="goTo(currentPage - 1)"
    >
      Anterior
    </button>

    <template v-for="(page, index) in pageItems" :key="index">
      <span v-if="page === null" class="pagination-gap" aria-hidden="true">…</span>
      <button
        v-else
        type="button"
        class="pagination-button"
        :class="{ 'is-current': page === currentPage }"
        :aria-current="page === currentPage ? 'page' : undefined"
        :aria-label="`Página ${page}`"
        @click="goTo(page)"
      >
        {{ page }}
      </button>
    </template>

    <button
      type="button"
      class="pagination-button pagination-button--step"
      :disabled="isLastPage"
      @click="goTo(currentPage + 1)"
    >
      Próxima
    </button>
  </nav>
</template>

<style scoped>
.pagination {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  gap: 0.375rem;
  margin-top: 2.5rem;
}

.pagination-button {
  min-width: 44px;
  min-height: 44px;
  padding: 0 0.75rem;
  border: 2px solid var(--noite);
  border-radius: 3px;
  background: transparent;
  color: var(--noite);
  font: 700 1rem/1 var(--font-body);
  cursor: pointer;
}

.pagination-button:hover:not(:disabled):not(.is-current) {
  background: var(--gema);
}

.pagination-button.is-current {
  background: var(--noite);
  color: var(--cal);
}

.pagination-button:disabled {
  border-color: var(--linha);
  color: var(--apagado);
  cursor: not-allowed;
}

.pagination-gap {
  display: inline-block;
  min-width: 24px;
  text-align: center;
}

/* No celular, Anterior e Próxima ficam juntos e os números vão para a linha de baixo. */
@media (max-width: 479px) {
  .pagination-button--step {
    order: -1;
    flex: 1 1 calc(50% - 0.25rem);
  }
}
</style>
