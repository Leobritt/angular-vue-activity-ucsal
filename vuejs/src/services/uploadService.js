// Valida a imagem e simula o envio. Nenhum arquivo sai do computador.

const MAX_FILE_SIZE = 5 * 1024 * 1024;
const STEP_INTERVAL_MS = 120;

export function validateImage(file) {
  if (!file.type.startsWith('image/')) {
    return 'Esse arquivo não é uma imagem. Escolha um JPG, PNG ou WebP.';
  }
  if (file.size > MAX_FILE_SIZE) {
    return 'A imagem passa de 5 MB. Escolha um arquivo menor.';
  }
  return null;
}

// Chama onProgress a cada passo e onDone ao chegar em 100. Devolve a função que cancela.
export function simulateUpload({ onProgress, onDone }) {
  let progress = 0;

  const timer = setInterval(() => {
    progress = Math.min(100, progress + 4 + Math.random() * 8);
    onProgress(Math.round(progress));

    if (progress === 100) {
      clearInterval(timer);
      onDone();
    }
  }, STEP_INTERVAL_MS);

  return () => clearInterval(timer);
}
