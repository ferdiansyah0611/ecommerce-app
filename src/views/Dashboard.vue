<template>
	<div>
		<div class="border-b pb-2">
			<h3 class="font-bold text-2xl">Dashboard Pages</h3>
		</div>
		<div class="w-full flex flex-wrap">
			<div class="product">
				<div class="edit bg-black bg-opacity-75 w-full h-screen overflow-auto fixed left-0 top-0 z-30 overflow-auto hidden">
					<div class="bg-white rounded w-full sm:w-1/3 mx-auto p-4 mt-16">
						<h5 class="font-medium mb-4">Edit Data</h5>
						<form @submit="edit">
							<img :src="edit.img" alt="photo">
							<input @change="openImg" name="img" type="file" class="hidden">
							<input @change="openImg" name="imgPreview" type="file" class="hidden" multiple>
							<input v-model="edit.name" class="p-3 border w-full focus:outline-none mt-3" type="text" placeholder="Name product">
							<input v-model="edit.price" class="p-3 border w-full focus:outline-none mt-3" type="number" placeholder="Price">
							<input v-model="edit.stock" class="p-3 border w-full focus:outline-none mt-3" type="number" placeholder="Stock">
							<textarea v-model="edit.description" class="p-3 border w-full focus:outline-none mt-3" placeholder="Description"></textarea>
							<select @change="changeCategory" class="p-3 border w-full focus:outline-none">
								<option value="" disabled selected>Select Category</option>
								<option v-for="(data, key) in categories" v-bind:key="key" :value="data.name">{{data.name}}</option>
							</select>
							<button @click="open" data-type="img" type="button" class="p-3 bg-gray-400 w-full font-medium focus:outline-none focus:ring focus:ring-gray-300 mt-1 text-white">Upload Images</button>
							<button @click="open" data-type="imgPreview" type="button" class="p-3 bg-gray-400 w-full font-medium focus:outline-none focus:ring focus:ring-gray-300 mt-1 text-white">Upload Images Preview</button>
							<button type="submit" class="p-3 bg-blue-400 w-1/2 font-medium focus:outline-none focus:ring focus:ring-blue-300 mt-3 text-white">Create</button>
							<button @click="editProduct" type="button" class="p-3 bg-red-400 w-1/2 font-medium focus:outline-none focus:ring focus:ring-red-300 mt-3 text-white">Cancel</button>
						</form>
					</div>
				</div>
				<div class="delete bg-black bg-opacity-75 w-full h-screen overflow-auto fixed left-0 top-0 z-30 overflow-auto hidden">
					<div class="bg-white rounded w-full sm:w-1/3 mx-auto p-4 mt-16">
						<h5 class="font-medium mb-4">Are you sure ?</h5>
						<div class="flex">
							<button @click="deleteProduct" data-type="ok" type="button" class="p-3 bg-blue-400 w-1/2 font-medium focus:outline-none focus:ring focus:ring-blue-300 mt-3 text-white">Yes</button>
							<button @click="deleteProduct" data-type="cancel" type="button" class="p-3 bg-red-400 w-1/2 font-medium focus:outline-none focus:ring focus:ring-red-300 mt-3 text-white">No</button>
						</div>
					</div>
				</div>
			</div>
			<div class="w-full mt-5 bg-white p-4">
				<h4 class="font-bold  mb-4">Data Products</h4>
				<form class="mb-4">
					<router-link class="bg-blue-400 p-2 text-white border border-blue-300" to="/product/create">Create Produts</router-link>
					<select class="border ml-2 p-2 focus:outline-none">
						<option value="" selected="" disabled="">Jump to:</option>
						<option value="">Jump to: 1</option>
						<option value="">Jump to: 2</option>
						<option value="">Jump to: 4</option>
					</select>
					<select class="border ml-2 p-2 focus:outline-none">
						<option value="" selected="" disabled="">Pagination:</option>
						<option value="">Pagination: 10</option>
						<option value="">Pagination: 25</option>
						<option value="">Pagination: 50</option>
						<option value="">Pagination: 100</option>
					</select>
				</form>
				<table class="border w-full overflow-auto">
					<thead>
						<td class="border p-2 font-medium">Name</td>
						<td class="border p-2 font-medium">Price</td>
						<td class="border p-2 font-medium">Stock</td>
						<td class="border p-2 font-medium">Created</td>
						<td class="border p-2 font-medium">Action</td>
					</thead>
					<tbody>
						<tr v-for="(data, key) in products" v-bind:key="key">
							<td class="border p-2">{{data.name}}</td>
							<td class="border p-2">{{data.price}}</td>
							<td class="border p-2">{{data.stock}}</td>
							<td class="border p-2">
								{{new Date(data.created.seconds * 1000).getFullYear()}}-{{new Date(data.created.seconds * 1000).getMonth()}}-{{new Date(data.created.seconds * 1000).getDate()}} 
								{{new Date(data.created.seconds * 1000).getHours()}}:{{new Date(data.created.seconds * 1000).getSeconds()}}
							</td>
							<td class="border-b p-2 flex justify-center space-x-1">
								<button @click="editProduct" :data-id="data.id" type="button" class="p-2 bg-blue-400 font-medium text-white focus:outline-none focus:ring focus:ring-blue-200">Edit</button>
								<button @click="deleteProduct" data-type="open" :data-id="data.id" type="button" class="p-2 bg-red-400 font-medium text-white focus:outline-none focus:ring focus:ring-red-200">Remove</button>
							</td>
						</tr>
					</tbody>
				</table>
				<div class="flex pt-4 space-x-1">
					<button class="p-3 font-medium bg-blue-400 text-white focus:outline-none focus:ring focus:ring-blue-300">Previous</button>
					<button class="p-3 font-medium bg-blue-400 text-white focus:outline-none focus:ring focus:ring-blue-300">Next</button>
				</div>
			</div>
		</div>
	</div>
</template>
<script>
import {db} from '@/firebase'
export default{
	name: 'Dashbbard',
	data(){
		return{
			products: [],
			keyDelete: null,
			edit: {
				name: '',
				price: '',
				stock: '',
				description: '',
				img: ''
			}
		}
	},
	mounted(){
		db.collection('products').get().then(result => {
			result.forEach(data => {
				this.products.push(data.data())
				console.log(data.data())
			})
		})
	},
	computed: {
		categories: {
			get(){
				return this.$store.state.categories
			}
		}
	},
	methods: {
		editProduct(e){
			const classes = document.querySelector('.product>.edit')
			if(classes.classList.contains('hidden')){
				classes.classList.remove('hidden')
				this.edit = this.products.find((data) => data.id === e.target.dataset.id)
			}else{
				classes.classList.add('hidden')
			}
		},
		deleteProduct(e){
			const classes = document.querySelector('.product>.delete')
			if(e.target.dataset.type == 'open'){
				classes.classList.remove('hidden')
				this.keyDelete = e.target.dataset.id
			}
			if(e.target.dataset.type == 'cancel'){
				classes.classList.add('hidden')
				this.keyDelete = null
			}
			if(e.target.dataset.type == 'ok'){
				classes.classList.add('hidden')
				db.collection('products').doc(this.keyDelete).delete().then(() => {
					this.products = this.products.filter((data) => data.id !== this.keyDelete)
				})
			}
		}
	}
}
</script>