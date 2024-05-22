import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import { createHead } from '@unhead/vue';

const app = createApp(App);

app.use(router);

const head = createHead();
app.use(head);

app.mount('#app');
