import { createApp } from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import "@/assets/main.css"
import Tres from '@tresjs/core'

createApp(App).use(store).use(Tres).use(router).mount('#app')
