<template>
	<div class="border mx-auto bg-white rounded w-full sm:w-1/2 md:w-1/3 p-8 sm:p-10 mb-20">
		<h5 class="font-bold text-2xl text-center mb-5">Register App</h5>
		<form @submit="signUp" class="flex flex-wrap">
			<div v-if="!img" @click="open" class="bg-gray-200 h-48 w-full p-4 text-center">
				<h5 class="font-medium mt-16">Choose Photo Profile</h5>
			</div>
			<img v-else :src="imgShow" alt="">
			<input @change="changeFile" type="file" name="avatar" class="hidden">
			<input v-model="name" class="p-4 w-full border mt-3 focus:outline-none" type="text" placeholder="Name...">
			<input v-model="email" class="p-4 w-full border mt-3 focus:outline-none" type="email" placeholder="Email...">
			<input v-model="password" class="p-4 w-full border mt-3 focus:outline-none" type="password" placeholder="Password..." autocomplete="off">
			<div class="flex mt-2 mb-2">
				<input type="checkbox" class="border mt-1" required>
				<span class="ml-2">Accepted to aggreement this app</span>
			</div>
			<button type="submit" class="bg-blue-400 p-4 w-full text-white mt-3 focus:outline-none 
			focus:ring focus:ring-blue-300 font-medium">REGISTER</button>
			<div class="mt-4">
			<h5>
				<span>Have a account ? </span>
				<router-link class="hover:underline" to="/login">Login</router-link>
			</h5>
		</div>
		</form>
	</div>
</template>
<script>
import {auth, storage, db} from '@/firebase'
export default{
	name: 'Register',
	data(){
		return{
			name: '',
			email: '',
			password: '',
			img: null,
			imgShow: null
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
				storage.ref(`/images/${this.img.name}`).put(this.img).then(snapshot => {
					snapshot.ref.getDownloadURL().then(url => {
						auth.currentUser.updateProfile({
							displayName: this.name,
							photoURL: url
						}).then(() => {
							db.collection('users').doc(auth.currentUser.uid).set({
								id: auth.currentUser.uid,
								name: auth.currentUser.displayName,
								email: auth.currentUser.email,
								photo: auth.currentUser.photoURL,
								role: 'users'
							}).then(() => {
								this.$router.push({name: 'Home'})
								window.location.reload(false);
							})
						})
					})
				})
			})
		},
		open(){
			document.querySelector('input[name=avatar]').click()
		},
		changeFile(e){
			console.log(e.target.files[0])
			this.img = e.target.files[0]
			this.imgShow = URL.createObjectURL(e.target.files[0])
		}
	}
}
</script>