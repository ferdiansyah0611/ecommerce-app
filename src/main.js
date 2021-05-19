import { createApp } from 'vue'
import App from './App.vue'
import './assets/tailwind.css'
import {auth} from '@/firebase'
import router from './router'
import store from './store'

var app
auth.onAuthStateChanged(() => {
	if(!app){
		app = createApp(App).use(store).use(router).use(router).mount('#app')
	}
})