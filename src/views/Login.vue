<template>
	<div class="border mx-auto w-full sm:w-1/2 md:w-1/3 p-2">
		<h5 class="font-bold text-2xl text-center">Login App</h5>
		<form @submit="signEmail" class="flex flex-wrap">
			<input v-model="email" class="p-4 w-full border text-sm sm:text-base mt-3 focus:outline-none" type="email" placeholder="Email...">
			<input v-model="password" class="p-4 w-full border text-sm sm:text-base mt-3 focus:outline-none" type="password" placeholder="Password..." autocomplete="off">
			<button type="submit" class="bg-blue-400 p-4 w-full text-white mt-3 focus:outline-none focus:ring focus:ring-blue-300 font-medium">LOGIN</button>
		</form>
		<div class="border-b mb-2 mt-2 w-full"></div>
		<button @click="signGoogle" type="button" class="bg-gray-400 p-4 w-full text-white focus:outline-none focus:ring focus:ring-gray-300 font-medium">LOGIN WITH GOOGLE</button>
	</div>
</template>
<script>
import {auth, firebase, firestore} from '@/firebase'
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
			auth.signInWithEmailAndPassword(this.email, this.password).then(result => {
				firestore.collection(`users/${result.user.uid}/detail`).set(result.user).then(() => {
					this.$router.push({name: 'Home'})
				})
			})
		},
		signGoogle(e){
			e.preventDefault()
			let provider = new firebase.auth.GoogleAuthProvider()
			firebase.auth().signInWithPopup(provider).then(() => {
				/*firestore.ref(`users/${result.user.uid}`).get().then((res) => {
					console.log(res)
				})*/
				/*firestore.collection(`users/${result.user.uid}`).set({
					id: result.user.uid,
					name: result.user.displayName,
					email: result.user.email,
					emailVerified: result.user.emailVerified,
					photoURL: result.user.photoURL
				}).then(() => {*/
					this.$router.push({name: 'Home'})
				/*})*/
			})
		}
	}
}
</script>