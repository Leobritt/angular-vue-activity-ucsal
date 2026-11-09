<script>
import AppTabs from './AppTabs.vue';
import { formatPrice } from '../utils/format';

export default {
  name: 'ProductDetails',
  components: { AppTabs },
  props: {
    product: { type: Object, required: true },
  },
  emits: ['add-to-bag'],
  computed: {
    price() {
      return formatPrice(this.product.price);
    },
    // Monta o conteúdo que o AppTabs recebe por prop.
    tabs() {
      const { description, origin, material, size, category } = this.product;
      return [
        { title: 'Sobre a peça', content: `${description} Feita em ${origin}.` },
        { title: 'Material e medidas', content: `${material}. Medidas: ${size}.` },
        { title: 'Cuidados', content: category.care },
      ];
    },
  },
};
</script>

<template>
  <section id="detalhes" class="section section--tinted">
    <div class="container detail">
      <div class="art art--large" :class="`art--${product.categoryId}`"></div>
      <div class="detail-info">
        <h2>{{ product.name }}</h2>
        <p class="detail-price">{{ price }}</p>
        <AppTabs :tabs="tabs" />
        <button type="button" class="button" @click="$emit('add-to-bag', product)">Adicionar à sacola</button>
      </div>
    </div>
  </section>
</template>
