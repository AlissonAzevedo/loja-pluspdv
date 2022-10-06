import { createApp } from 'vue'
import App from './App.vue'
import './assets/tailwind.css'
import 'vue-toast-notification/dist/theme-default.css';
import 'vue3-carousel/dist/carousel.css';
import router from './router'
import store from './store'
import ToastPlugin from 'vue-toast-notification';
import VueTheMask from 'vue-the-mask'

createApp(App)
    .use(VueTheMask)
    .use(ToastPlugin)
    .use(store)
    .use(router)
    .mount('#app')
