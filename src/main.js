import { createApp } from 'vue'
import App from './App.vue' // root component
import "./index.css";
import router from './router'
import store from './store/index'
import 'es6-promise/auto'

createApp(App)
    .use(router)
    .use(store)
    .mount('#app');