<template>
	<div class="border mx-auto w-full sm:w-1/2 md:w-1/3 p-2 mb-20">
		<h5 class="font-bold text-2xl text-center mb-5 mt-5">Register App</h5>
		<form @submit="signUp" class="flex flex-wrap">
			<input v-model="email" class="p-4 w-full border mt-3 focus:outline-none" type="email" placeholder="Email...">
			<input v-model="password" class="p-4 w-full border mt-3 focus:outline-none" type="password" placeholder="Password..." autocomplete="off">
			<div class="flex mt-2 mb-2">
				<input type="checkbox" class="border mt-1" required>
				<span class="ml-2">Accepted required to aggreement this app</span>
			</div>
			<button type="submit" class="bg-blue-400 p-4 w-full text-white mt-3 focus:outline-none 
			focus:ring focus:ring-blue-300 font-medium">REGISTER</button>
		</form>
	</div>
</template>
<script>
import {auth} from '@/firebase'
export default{
	name: 'Register',
	data(){
		return{
			email: '',
			password: ''
		}
	},
	beforeMount(){
		if(auth.currentUser){
			this.$router.push({name: 'Home'})
		}
	},
	methods: {
		signUp(e){
			e.preventDefault()
			auth.createUserWithEmailAndPassword(this.email, this.password).then(() => {
				this.$router.push({name: 'Login'})
			})
		},
	}
}
</script>