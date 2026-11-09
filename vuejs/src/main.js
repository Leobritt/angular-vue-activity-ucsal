import { createApp } from 'vue';
import App from './App.vue';
import toastPlugin from './services/toastService';
import './assets/base.css';
import './assets/layout.css';

createApp(App).use(toastPlugin).mount('#app');
