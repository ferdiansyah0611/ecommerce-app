import { createApp } from 'vue'
import App from './App.vue'
import './assets/tailwind.css'
import {auth} from '@/firebase'
import router from './router'

var app
auth.onAuthStateChanged(() => {
	if(!app){
		createApp(App).use(router).use(router).mount('#app')
	}
})