<template>
	<div class="border bg-white rounded mx-auto w-full sm:w-1/2 md:w-1/3 p-8 sm:p-12 mb-6">
		<h5 class="font-bold text-2xl text-center mb-5 mt-5">Login App</h5>
		<form @submit="signEmail" class="flex flex-wrap">
			<input v-model="email" class="p-4 w-full border mt-3 focus:outline-none" type="email" placeholder="Email...">
			<input v-model="password" class="p-4 w-full border mt-3 focus:outline-none" type="password" placeholder="Password..." autocomplete="off">
			<button type="submit" class="bg-blue-400 p-4 w-full text-white mt-3 focus:outline-none focus:ring focus:ring-blue-300 font-medium">LOGIN</button>
		</form>
		<div class="border-b mb-2 mt-2 w-full"></div>
		<button @click="signGoogle" type="button" class="bg-gray-400 p-4 w-full text-white focus:outline-none focus:ring focus:ring-gray-300 font-medium">LOGIN WITH GOOGLE</button>
		<div class="mt-4">
			<h5>
				<span>Don't have a account ? </span>
				<router-link class="hover:underline" to="/register">Register</router-link>
			</h5>
		</div>
	</div>
</template>
<script>
import {auth, firebase, db} from '@/firebase'
export default{
	name: 'Login',
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
		signEmail(e){
			e.preventDefault()
			auth.signInWithEmailAndPassword(this.email, this.password).then(() => {
				this.$router.push({name: 'Home'})
				window.location.reload(false);
			})
		},
		signGoogle(e){
			e.preventDefault()
			let provider = new firebase.auth.GoogleAuthProvider()
			firebase.auth().signInWithPopup(provider).then((res) => {
				db.collection('users').doc(res.user.uid).set({
					id: res.user.uid,
					name: res.user.displayName,
					email: res.user.email,
					photo: res.user.photoURL
				}).then(() => {
					this.$router.push({name: 'Home'})
					window.location.reload(false);
				})
			})
		}
	}
}
</script>