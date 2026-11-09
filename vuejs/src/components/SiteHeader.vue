<script>
import ladeira from '../assets/ladeira.svg';
import AppDropdown from './AppDropdown.vue';
import { formatPrice } from '../utils/format';

export default {
  name: 'SiteHeader',
  components: { AppDropdown },
  props: {
    bagCount: { type: Number, required: true },
    bagTotal: { type: Number, required: true },
  },
  emits: ['clear-bag'],
  data() {
    return {
      ladeira,
    };
  },
  computed: {
    bagOptions() {
      const disabled = this.bagCount === 0;
      return [
        { label: 'Ver total da sacola', value: 'total', disabled },
        { label: 'Esvaziar sacola', value: 'clear', disabled },
      ];
    },
  },
  methods: {
    // Cada opção do menu tem a própria ação.
    runBagAction(option) {
      const actions = {
        total: () => this.$toast.info(`Total da sacola: ${formatPrice(this.bagTotal)}`),
        clear: () => this.$emit('clear-bag'),
      };
      actions[option.value]();
    },
  },
};
</script>

<template>
  <header id="inicio" class="hero">
    <div class="container topbar">
      <a class="brand" href="#inicio">Fita &amp; Barro</a>
      <nav class="topnav" aria-label="Seções da página">
        <a href="#pecas">Peças</a>
        <a href="#detalhes">Detalhes</a>
        <a href="#encomenda">Encomenda</a>
        <a href="#duvidas">Dúvidas</a>
      </nav>
      <AppDropdown class="dropdown--end" :label="`Sacola (${bagCount})`" :options="bagOptions" @select="runBagAction" />
    </div>

    <div class="container hero-copy">
      <h1>Artesanato da Bahia, direto de quem faz</h1>
      <p>Cerâmica, cestaria, renda, madeira e fitas de ateliês do Recôncavo e do sertão.</p>
      <a class="button" href="#pecas">Ver as peças</a>
    </div>

    <div class="hero-street">
      <img :src="ladeira" alt="" width="1600" height="520">
    </div>
  </header>
</template>
