<script>
import { formatPrice } from '../utils/format';

export default {
  name: 'ProductCard',
  props: {
    product: { type: Object, required: true },
  },
  emits: ['add', 'details'],
  computed: {
    price() {
      return formatPrice(this.product.price);
    },
  },
};
</script>

<template>
  <li class="product">
    <div class="art" :class="`art--${product.categoryId}`"></div>
    <h3 class="product-name">{{ product.name }}</h3>
    <p class="product-meta">{{ product.category.label }}, de {{ product.origin }}</p>
    <p class="product-price">{{ price }}</p>
    <div class="product-actions">
      <button type="button" class="button button--small" @click="$emit('add', product)">Adicionar</button>
      <button type="button" class="button button--small button--ghost" @click="$emit('details', product)">Ver detalhes</button>
    </div>
  </li>
</template>
