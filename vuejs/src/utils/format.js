// O Vue 3 não tem filtros. Estas funções fazem a formatação nas computed properties.

const currencyFormatter = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' });

// 89.9 vira R$ 89,90
export function formatPrice(value) {
  return currencyFormatter.format(value);
}

// 1536000 vira 1,5 MB
export function formatFileSize(bytes) {
  if (bytes < 1024) {
    return `${bytes} B`;
  }
  if (bytes < 1024 * 1024) {
    return `${Math.round(bytes / 1024)} KB`;
  }
  return `${(bytes / (1024 * 1024)).toFixed(1).replace('.', ',')} MB`;
}

// Remove acentos para que "ceramica" encontre "Cerâmica".
export function normalizeText(text) {
  return text.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase();
}

const PRODUCTION_STAGES = [
  { upTo: 0, name: 'Encomenda na fila' },
  { upTo: 25, name: 'Modelagem' },
  { upTo: 50, name: 'Secagem' },
  { upTo: 75, name: 'Queima' },
  { upTo: 99, name: 'Pintura e acabamento' },
  { upTo: 100, name: 'Peça pronta' },
];

// Traduz o percentual (0 a 100) para a etapa de produção da peça.
export function productionStage(progress) {
  return PRODUCTION_STAGES.find((stage) => progress <= stage.upTo).name;
}
