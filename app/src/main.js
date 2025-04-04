// import 'framework7/css/framework7.bundle.css';
// Import Vue
import { createApp } from 'vue';
// Import Framework7 Bundle
import Framework7 from 'framework7/lite-bundle';
// Import Framework7-Vue with helper to register all components
import Framework7Vue, { registerComponents } from 'framework7-vue/bundle';
import { createPinia } from 'pinia';
import App from './App.vue'


Framework7.use(Framework7Vue);
const app = createApp(App);
const pinia = createPinia();

app.use(pinia);

registerComponents(app);

app.mount('#app')
