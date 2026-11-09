<script>
import AppAccordion from './components/AppAccordion.vue';
import CustomOrder from './components/CustomOrder.vue';
import ProductCatalog from './components/ProductCatalog.vue';
import ProductDetails from './components/ProductDetails.vue';
import SiteHeader from './components/SiteHeader.vue';
import ToastContainer from './components/ToastContainer.vue';
import { categories, faq, products } from './data/catalog';

// Componente principal: guarda o estado compartilhado (peças, sacola e peça
// selecionada), repassa aos filhos por props e reage aos eventos que eles emitem.
export default {
  name: 'App',
  components: {
    AppAccordion,
    CustomOrder,
    ProductCatalog,
    ProductDetails,
    SiteHeader,
    ToastContainer,
  },
  data() {
    return {
      categories: [],
      products: [],
      questions: [],
      selectedProduct: null,
      bag: [],
      freeShippingMinimum: 300,
    };
  },
  computed: {
    bagCount() {
      return this.bag.reduce((sum, item) => sum + item.quantity, 0);
    },
    bagTotal() {
      return this.bag.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
    },
  },
  // Carrega os dados antes da primeira renderização.
  created() {
    const categoriesById = Object.fromEntries(categories.map((category) => [category.id, category]));

    this.categories = categories;
    this.questions = faq;
    this.products = products.map((product) => ({
      ...product,
      category: categoriesById[product.categoryId],
    }));
    this.selectedProduct = this.products[0];
  },
  methods: {
    addToBag(product) {
      const existing = this.bag.find((item) => item.product.id === product.id);

      if (existing) {
        existing.quantity += 1;
      } else {
        this.bag.push({ product, quantity: 1 });
      }
      this.$toast.success(`Adicionado à sacola: ${product.name}.`);
    },
    clearBag() {
      this.bag = [];
      this.$toast.info('Sacola esvaziada.');
    },
    viewDetails(product) {
      this.selectedProduct = product;
      this.$refs.details.$el.scrollIntoView();
    },
  },
};
</script>

<template>
  <SiteHeader :bag-count="bagCount" :bag-total="bagTotal" @clear-bag="clearBag" />

  <main>
    <ProductCatalog
      :products="products"
      :categories="categories"
      :bag-total="bagTotal"
      :free-shipping-minimum="freeShippingMinimum"
      @add-to-bag="addToBag"
      @view-details="viewDetails"
    />

    <ProductDetails ref="details" :product="selectedProduct" @add-to-bag="addToBag" />

    <CustomOrder />

    <section id="duvidas" class="section section--tinted">
      <div class="container faq">
        <h2>Dúvidas frequentes</h2>
        <AppAccordion :items="questions" :initial-open="0" />
      </div>
    </section>
  </main>

  <footer class="footer">
    <div class="container">
      <p>Loja e peças fictícias. Atividade III da disciplina Tópicos Avançados em Programação, UCSal. Versão Vue.js.</p>
    </div>
  </footer>

  <ToastContainer />
</template>
