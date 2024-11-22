
import { createApp } from 'vue'
import { createPinia } from 'pinia';
import App from './App.vue'
import router from './routes.js'
import './assets/main.css'

const app = createApp(App);

app.use(createPinia()); // pinia store instance
app.use(router);
app.mount('#app');