import './main.css';

import { createApp } from 'vue';
import App from './App.vue';
import router from './Presentation/router';
import { createPinia } from 'pinia';

createApp(App)
  .use(router)
  .use(createPinia())
  .mount('#app')
;
