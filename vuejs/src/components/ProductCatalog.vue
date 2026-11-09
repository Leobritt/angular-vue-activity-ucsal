<script>
import AppDropdown from './AppDropdown.vue';
import AppPagination from './AppPagination.vue';
import AppProgressBar from './AppProgressBar.vue';
import ProductCard from './ProductCard.vue';
import { formatPrice, normalizeText } from '../utils/format';

const SORT_COMPARATORS = {
  name: (a, b) => a.name.localeCompare(b.name, 'pt-BR'),
  lowestPrice: (a, b) => a.price - b.price,
  highestPrice: (a, b) => b.price - a.price,
};

// Listagem: o estado da busca fica em data e o resultado em computed properties.
export default {
  name: 'ProductCatalog',
  components: { AppDropdown, AppPagination, AppProgressBar, ProductCard },
  props: {
    products: { type: Array, required: true },
    categories: { type: Array, required: true },
    bagTotal: { type: Number, required: true },
    freeShippingMinimum: { type: Number, required: true },
  },
  emits: ['add-to-bag', 'view-details'],
  data() {
    return {
      searchTerm: '',
      categoryId: '',
      sortKey: 'name',
      pageSize: 6,
      currentPage: 1,
      pageSizes: [3, 6, 12],
      sortOptions: [
        { label: 'Nome', value: 'name' },
        { label: 'Menor preço', value: 'lowestPrice' },
        { label: 'Maior preço', value: 'highestPrice' },
      ],
    };
  },
  computed: {
    categoryOptions() {
      return [
        { label: 'Todas', value: '' },
        ...this.categories.map((category) => ({ label: category.label, value: category.id })),
      ];
    },
    filteredProducts() {
      const query = normalizeText(this.searchTerm).trim();

      return this.products.filter((product) => {
        const matchesCategory = !this.categoryId || product.categoryId === this.categoryId;
        const matchesTerm = !query
          || normalizeText(product.name).includes(query)
          || normalizeText(product.origin).includes(query);
        return matchesCategory && matchesTerm;
      });
    },
    sortedProducts() {
      return [...this.filteredProducts].sort(SORT_COMPARATORS[this.sortKey]);
    },
    totalPages() {
      return Math.max(1, Math.ceil(this.sortedProducts.length / this.pageSize));
    },
    visibleProducts() {
      const firstIndex = (this.currentPage - 1) * this.pageSize;
      return this.sortedProducts.slice(firstIndex, firstIndex + this.pageSize);
    },
    resultCount() {
      const count = this.sortedProducts.length;
      return `${count} ${count === 1 ? 'peça encontrada' : 'peças encontradas'}`;
    },
    shippingProgress() {
      return (this.bagTotal / this.freeShippingMinimum) * 100;
    },
    shippingMessage() {
      if (this.bagTotal >= this.freeShippingMinimum) {
        return 'Frete grátis garantido';
      }
      return `Faltam ${formatPrice(this.freeShippingMinimum - this.bagTotal)} para o frete grátis`;
    },
  },
  watch: {
    // Toda mudança de filtro volta para a primeira página.
    searchTerm: 'goToFirstPage',
    categoryId: 'goToFirstPage',
    sortKey: 'goToFirstPage',
    pageSize: 'goToFirstPage',
  },
  methods: {
    goToFirstPage() {
      this.currentPage = 1;
    },
    clearFilters() {
      this.searchTerm = '';
      this.categoryId = '';
    },
  },
};
</script>

<template>
  <section id="pecas" class="section">
    <div class="container">
      <h2>Peças à venda</h2>

      <div class="shipping-goal">
        <AppProgressBar :value="shippingProgress" :label="shippingMessage" :show-percent="false" />
      </div>

      <div class="toolbar">
        <label class="field field--grow">
          <span class="field-label">Buscar peça ou cidade</span>
          <input v-model="searchTerm" type="search" placeholder="Moringa, renda, Cachoeira">
        </label>

        <div class="field">
          <span class="field-label">Categoria</span>
          <AppDropdown label="Categoria" :options="categoryOptions" :selected="categoryId" @select="categoryId = $event.value" />
        </div>

        <div class="field">
          <span class="field-label">Ordenação</span>
          <AppDropdown label="Ordenar" :options="sortOptions" :selected="sortKey" @select="sortKey = $event.value" />
        </div>

        <label class="field">
          <span class="field-label">Por página</span>
          <select v-model.number="pageSize">
            <option v-for="size in pageSizes" :key="size" :value="size">{{ size }}</option>
          </select>
        </label>
      </div>

      <p class="result-count" aria-live="polite">{{ resultCount }}</p>

      <ul v-if="visibleProducts.length" class="product-grid">
        <ProductCard
          v-for="product in visibleProducts"
          :key="product.id"
          :product="product"
          @add="$emit('add-to-bag', $event)"
          @details="$emit('view-details', $event)"
        />
      </ul>

      <div v-else class="empty-state">
        <p>Nenhuma peça combina com essa busca.</p>
        <button type="button" class="button button--small" @click="clearFilters">Limpar busca e filtros</button>
      </div>

      <AppPagination :total-pages="totalPages" :current-page="currentPage" @page-change="currentPage = $event" />
    </div>
  </section>
</template>
