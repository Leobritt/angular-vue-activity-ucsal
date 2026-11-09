# Atividade III: AngularJS e Vue.js

Disciplina Tópicos Avançados em Programação, UCSal.

As duas pastas têm a mesma aplicação, uma loja fictícia de artesanato chamada Fita & Barro, com os seis componentes pedidos: acordeão, paginação, barra de progresso, abas, menu suspenso e notificação toast.

| Pasta | Conteúdo |
| --- | --- |
| [`angularjs/`](angularjs) | Atividade principal, em AngularJS 1.8 |
| [`vuejs/`](vuejs) | Desafio extra, em Vue 3 com Options API |

## Como executar

### AngularJS

Não precisa instalar nada. Abra `angularjs/index.html` no navegador ou sirva a pasta:

```bash
cd angularjs
python3 -m http.server 8080
```

Depois acesse http://localhost:8080.

### Vue.js

Requer Node.js 20.19 ou superior.

```bash
cd vuejs
npm install
npm run dev
```

Depois acesse http://localhost:5173. No GitHub Codespaces, abra a porta 5173 encaminhada.

## Onde encontrar cada requisito

### AngularJS

| Requisito | Arquivo |
| --- | --- |
| Módulo principal | `app/app.js` |
| Diretivas | `app/directives/<componente>/` |
| Controladores e `$scope` | `app/controllers/` |
| Serviços e factories | `app/services/` e `ToastService` em `app/directives/toast/toast.js` |
| Filtros (`brl`, `fileSize`, `productionStage`, `productSearch`) | `app/filters/filters.js` |
| `ng-model`, `ng-change`, `ng-click`, `ng-submit` | `index.html` |
| Responsividade | `css/layout.css` |

### Vue.js

| Requisito | Arquivo |
| --- | --- |
| Componente principal | `src/App.vue` |
| Componentes obrigatórios | `src/components/App*.vue` e `ToastContainer.vue` |
| Props, `data` e `computed` | todos os componentes; `ProductCatalog.vue` concentra a listagem |
| `$emit` | `AppPagination.vue`, `AppDropdown.vue`, `ProductCard.vue` |
| Lifecycle hooks | `created` em `App.vue`; `mounted` e `beforeUnmount` em `AppDropdown.vue` |
| Serviço global de toast | `src/services/toastService.js` (`this.$toast`) |
| Responsividade | `src/assets/layout.css` |

## Como testar cada notificação

- Sucesso: adicione uma peça à sacola.
- Erro: clique em "Enviar encomenda" com o formulário vazio.
- Informação: abra o menu da sacola e escolha "Ver total da sacola".

O envio da foto é simulado. Nenhum arquivo sai do computador.

As fontes Alfa Slab One e Karla têm licença SIL Open Font License e ficam na própria aplicação, sem acesso à internet.
