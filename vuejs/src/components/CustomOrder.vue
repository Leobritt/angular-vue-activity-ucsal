<script>
import AppProgressBar from './AppProgressBar.vue';
import { simulateUpload, validateImage } from '../services/uploadService';
import { formatFileSize, productionStage } from '../utils/format';

// Formulário de encomenda, envio da foto e simulador de produção.
export default {
  name: 'CustomOrder',
  components: { AppProgressBar },
  data() {
    return {
      customerName: '',
      description: '',
      touched: { customerName: false, description: false },
      submitted: false,
      upload: { file: null, progress: 0 },
      cancelCurrentUpload: null,
      productionProgress: 20,
    };
  },
  computed: {
    isUploading() {
      return this.cancelCurrentUpload !== null;
    },
    uploadLabel() {
      const { file } = this.upload;
      return `${file.name} (${formatFileSize(file.size)})`;
    },
    productionLabel() {
      return productionStage(this.productionProgress);
    },
    isFormValid() {
      return Boolean(this.customerName.trim() && this.description.trim());
    },
    showNameError() {
      return !this.customerName.trim() && (this.touched.customerName || this.submitted);
    },
    showDescriptionError() {
      return !this.description.trim() && (this.touched.description || this.submitted);
    },
  },
  watch: {
    // Avisa uma vez quando a peça chega a 100%.
    productionProgress(progress, previous) {
      if (progress === 100 && previous !== 100) {
        this.$toast.success('Peça pronta para envio.');
      }
    },
  },
  beforeUnmount() {
    // Interrompe a simulação se o componente sair da página no meio do envio.
    if (this.cancelCurrentUpload) {
      this.cancelCurrentUpload();
    }
  },
  methods: {
    onFileSelected(event) {
      const file = event.target.files[0];

      // Limpa o campo para que o mesmo arquivo possa ser escolhido de novo.
      event.target.value = '';

      if (!file) {
        return;
      }

      const validationError = validateImage(file);
      if (validationError) {
        this.$toast.error(validationError);
        return;
      }

      this.upload = { file, progress: 0 };
      this.cancelCurrentUpload = simulateUpload({
        onProgress: (progress) => {
          this.upload.progress = progress;
        },
        onDone: () => {
          this.cancelCurrentUpload = null;
          this.$toast.success(`Foto enviada: ${file.name}.`);
        },
      });
    },
    cancelUpload() {
      this.cancelCurrentUpload();
      this.cancelCurrentUpload = null;
      this.upload = { file: null, progress: 0 };
      this.$toast.info('Envio da foto cancelado.');
    },
    resetForm() {
      this.customerName = '';
      this.description = '';
      this.touched = { customerName: false, description: false };
      this.submitted = false;
      this.upload = { file: null, progress: 0 };
    },
    submitOrder() {
      if (!this.isFormValid) {
        this.submitted = true;
        this.$toast.error('Preencha seu nome e descreva a peça para enviar a encomenda.');
        return;
      }

      if (this.isUploading) {
        this.$toast.info('Aguarde o envio da foto terminar.');
        return;
      }

      this.$toast.success(`Encomenda enviada, ${this.customerName}. O ateliê responde em até 3 dias úteis.`);
      this.resetForm();
    },
  },
};
</script>

<template>
  <section id="encomenda" class="section">
    <div class="container order">
      <form class="order-form" novalidate @submit.prevent="submitOrder">
        <h2>Encomende uma peça</h2>

        <label class="field">
          <span class="field-label">Seu nome</span>
          <input
            v-model="customerName"
            type="text"
            name="customerName"
            autocomplete="name"
            required
            @blur="touched.customerName = true"
          >
          <span v-show="showNameError" class="field-error">Informe seu nome.</span>
        </label>

        <label class="field">
          <span class="field-label">Descreva a peça</span>
          <textarea
            v-model="description"
            name="description"
            rows="4"
            maxlength="300"
            required
            placeholder="Formato, cor, medidas e para quando precisa"
            @blur="touched.description = true"
          ></textarea>
          <span class="field-hint">{{ description.length }} de 300 caracteres</span>
          <span v-show="showDescriptionError" class="field-error">Descreva a peça que você quer.</span>
        </label>

        <div class="field">
          <span class="field-label">Foto de referência (opcional)</span>
          <label v-show="!isUploading" class="button button--small button--ghost file-button">
            Escolher imagem
            <input type="file" class="visually-hidden" accept="image/*" @change="onFileSelected">
          </label>
          <span class="field-hint">JPG, PNG ou WebP de até 5 MB. O envio é simulado e o arquivo não sai do seu computador.</span>
        </div>

        <div v-if="upload.file" class="upload-status">
          <AppProgressBar :value="upload.progress" :label="uploadLabel" />
          <button v-if="isUploading" type="button" class="button button--small button--ghost" @click="cancelUpload">Cancelar envio</button>
        </div>

        <button type="submit" class="button">Enviar encomenda</button>
      </form>

      <aside class="production">
        <h2>Acompanhe a produção</h2>
        <p>Arraste para simular o andamento de uma peça no ateliê.</p>
        <label class="field">
          <span class="field-label">Andamento</span>
          <input v-model.number="productionProgress" type="range" min="0" max="100" step="1">
        </label>
        <AppProgressBar :value="productionProgress" :label="productionLabel" />
      </aside>
    </div>
  </section>
</template>
