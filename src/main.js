import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import { createHead } from '@unhead/vue';
import MainTitle from './components/MainTitle.vue';

const app = createApp(App);

app.use(router);

const head = createHead();
app.use(head);

app.component('MainTitle', MainTitle);

app.mount('#app');
