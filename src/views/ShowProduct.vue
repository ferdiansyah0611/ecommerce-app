<template>
	<div>
		<div class="flex flex-wrap bg-white p-2">
			<img class="w-full md:w-1/5" :src="product.img" alt="image">
			<div class="w-full md:w-4/5 p-4">
				<h5 class="font-bold text-lg">{{product.name}}</h5>
				<p>{{product.description}}</p>
				<div class="flex flex-wrap w-full sm:w-1/2 mb-4 mt-4">
					<div class="flex w-full">
						<div class="w-2/5 font-medium text-sm md:text-base">Category</div>
						<a href="" class="w-3/5 hover:underline text-sm md:text-base">{{product.categories}}</a>
					</div>
					<div class="flex w-full">
						<div class="w-2/5 font-medium text-sm md:text-base">Price</div>
						<p class="w-3/5 text-sm md:text-base">Rp. {{product.price}}</p>
					</div>
					<div class="flex w-full">
						<div class="w-2/5 font-medium text-sm md:text-base">Stock</div>
						<p class="w-3/5 text-sm md:text-base">{{product.stock}} items</p>
					</div>
				</div>
				<div class="flex w-full sm:w-1/2 space-x-1">
					<button @click="addCart" class="p-2 w-full md:w-2/5 lg:w-1/5 bg-blue-500 hover:bg-blue-600 transition-all duration-300 text-white text-sm md:text-base font-medium focus:outline-none focus:ring focus:ring-blue-500">Add to cart</button>
					<button class="p-2 w-full md:w-2/5 lg:w-1/5 bg-gray-500 hover:bg-gray-600 transition-all duration-300 text-white text-sm md:text-base font-medium focus:outline-none focus:ring focus:ring-gray-500">Buy Now</button>
				</div>
			</div>
			<div class="w-full md:w-1/3 bg-white md:border border-gray-300 mt-5">
				<div class="border-b border-gray-300">
					<h4 class="font-bold text-xl p-4">Image Preview</h4>
				</div>
				<div class="relative">
					<div v-if="product.imgPreview.length >= 1">
						<div>
							<ChevronLeftIcon @click="changeImgPreview" class="preview-left h-10 absolute left-0 bg-black bg-opacity-50 text-white cursor-pointer" style="margin-top: calc(50%);"></ChevronLeftIcon>
						</div>
						<div>
							<ChevronRightIcon @click="changeImgPreview" class="preview-right h-10 absolute right-0 top-0 bg-black bg-opacity-50 text-white cursor-pointer" style="margin-top: calc(50%);"></ChevronRightIcon>
						</div>
						<img class="w-full sm:w-1/2 mx-auto mt-3" :src="product.imgPreview[defaultKeyimgPreview]" alt="">
					</div>
					<div class="text-center" v-else>
						<h5 class="font-medium text-xl py-16">Image Preview Nothing</h5>
					</div>
				</div>
			</div>
			<div class="w-full md:w-2/3 bg-white md:border border-gray-300 mt-5">
				<div class="border-b border-gray-300">
					<h4 class="font-bold text-xl p-4">Comments</h4>
				</div>
				<div class="flex flex-wrap p-4">
					<form v-if="auth" @submit="createComment" class="w-full">
						<input @change="changeFile" name="imageComment" type="file" class="hidden">
						<textarea v-model="comments" class="w-full p-3 focus:outline-none" placeholder="Type here..."></textarea>
						<button @click="open" type="button" class="p-3 bg-gray-200 font-bold focus:outline-none focus:ring focus:ring-gray-50">Attach Image</button>
						<button type="submit" class="p-3 bg-blue-400 font-bold text-white focus:outline-none focus:ring focus:ring-blue-300 ml-2">Send</button>
					</form>
				</div>
				<div class="pl-4 pr-4 pb-4 max-h-screen overflow-auto">
					<div class="text-center p-10 font-medium" v-if="comment.length == 0">
						<h5>Comment Empty</h5>
					</div>
					<div v-else class="flex py-3 border-b" v-for="(data, key) in comment" v-bind:key="key">
						<img class="rounded-full w-12 h-12 sm:h-24 sm:w-24" :src="data.avatar" alt="">
						<div class="w-4/5 pl-3 pr-3 pb-3">
							<h5 class="font-bold hover:underline cursor-pointer">{{data.name}}</h5>
							<p>{{data.comments}}</p>
							<img v-if="data.img" class="w-full md:w-1/2 mt-2" :src="data.img" alt="image">
							<span class="text-sm font-light mt-2">{{new Date(data.created.seconds * 1000).getFullYear()}}/{{new Date(data.created.seconds * 1000).getMonth()}}/{{new Date(data.created.seconds * 1000).getDate()}} 
								{{new Date(data.created.seconds * 1000).getHours()}}:{{new Date(data.created.seconds * 1000).getSeconds()}}
							</span>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>
<script>
import {db, storage, auth, firebase} from '@/firebase'
import {ChevronLeftIcon, ChevronRightIcon} from '@heroicons/vue/outline'
export default{
	name: 'ShowProduct',
	components: {
		ChevronLeftIcon, ChevronRightIcon
	},
	data(){
		return{
			defaultKeyimgPreview: 0,
			product: {
				imgPreview: []
			},
			auth: auth.currentUser,
			userComment: [],
			comment: [],
			comments: '',
			img: null,
			product_id: ''
		}
	},
	created(){
		this.product_id = this.$route.params.id
	},
	mounted(){
		db.collection('products').doc(this.$route.params.id).get().then(result => this.product = result.data())
		this.fetchComment()
	},
	beforeRouteUpdate(to, from, next){
		this.getContent(to.params.id)
		next()
	},
	methods: {
		fetchComment(){
			db.collection('comments').where('product_id', '==', this.$route.params.id).get().then(result => {
				this.comment = []
				result.forEach((res) => {
					let data = res.data()
					db.collection('users').where('id', '==', data.user_id).get().then(resultUser => {
						resultUser.forEach((dataUser) => {
							console.log(dataUser)
							data.avatar = dataUser.data().photo
							data.name = dataUser.data().name
							this.comment = [...this.comment, data].reverse()
						})
					})
				})
			})
		},
		addCart(){
			if(!this.txtAddCart){
				this.$store.commit('addCart', this.product)
				this.txtAddCart = true
			}
			else{
				this.$store.commit('removeCart', this.product.id)
				this.txtAddCart = false
			}
		},
		changeImgPreview(e){
			e.preventDefault()
			if(e.target.classList.contains('preview-left')){
				if(this.defaultKeyimgPreview !== 0){
					this.defaultKeyimgPreview -= 1
				}
			}else{
				if(this.defaultKeyimgPreview < (this.product.imgPreview.length - 1)){
					this.defaultKeyimgPreview += 1
				}
			}
		},
		createComment(e){
			e.preventDefault()
				const comments = db.collection('comments').doc()
				console.log(this.img)
				if(this.img){
					const upload = storage.ref(`/images/${this.img.name}`).put(this.img)
					upload.then(() => {
						upload.snapshot.ref.getDownloadURL().then((url) => {
							comments.set({
								id: comments.id,
								product_id: this.product_id,
								user_id: auth.currentUser.uid,
								comments: this.comments,
								img: url,
								created: firebase.firestore.FieldValue.serverTimestamp()
							}).then(() => {
								this.comments = ''
								this.img = ''
								this.fetchComment()
							})
						})
					})
				}else{
					comments.set({
						id: comments.id,
						product_id: this.product_id,
						user_id: auth.currentUser.uid,
						comments: this.comments,
						created: firebase.firestore.FieldValue.serverTimestamp()
					}).then(() => {
						this.comments = ''
						this.img = ''
						this.fetchComment()
					})
				}
		},
		changeFile(e){
			this.img = e.target.files[0]
		},
		open(){
			document.querySelector('input[name="imageComment"]').click()
		}
	}
}
</script>