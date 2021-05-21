<template>
	<div class="bg-white border mx-auto w-full md:w-1/3 p-3">
		<h5 class="text-center font-bold text-2xl">Create Products</h5>
		<form @submit="upload">
			<input @change="openImg" name="img" type="file" class="hidden">
			<input @change="openImg" name="imgPreview" type="file" class="hidden" multiple>
			<input v-model="name" class="p-3 border w-full focus:outline-none mt-3" type="text" placeholder="Name product">
			<input v-model="price" class="p-3 border w-full focus:outline-none mt-3" type="number" placeholder="Price">
			<input v-model="stock" class="p-3 border w-full focus:outline-none mt-3" type="number" placeholder="Stock">
			<textarea v-model="description" class="p-3 border w-full focus:outline-none mt-3" placeholder="Description"></textarea>
			<select @change="changeCategory" class="p-3 border bg-white w-full focus:outline-none">
				<option value="" disabled selected>Select Category</option>
				<option v-for="(data, key) in categories" v-bind:key="key" :value="data.name">{{data.name}}</option>
			</select>
			<button @click="open" data-type="img" type="button" class="p-3 bg-gray-400 w-full font-medium focus:outline-none focus:ring focus:ring-gray-300 mt-1 text-white">Upload Images</button>
			<button @click="open" data-type="imgPreview" type="button" class="p-3 bg-gray-400 w-full font-medium focus:outline-none focus:ring focus:ring-gray-300 mt-1 text-white">Upload Images Preview</button>
			<button type="submit" class="p-3 bg-blue-400 w-1/2 font-medium focus:outline-none focus:ring focus:ring-blue-300 mt-3 text-white">Create</button>
			<button type="reset" class="p-3 bg-red-400 w-1/2 font-medium focus:outline-none focus:ring focus:ring-red-300 mt-3 text-white">Cancel</button>
		</form>
	</div>
</template>
<script>
export default{
	name: 'CreateProduct',
	data(){
		return{
			name: 'Vivo ' + Math.floor(Math.random() * 100000) ,
			price: Math.floor(Math.random() * 100000),
			description: 'My Description',
			img: {},
			imgPreview: [],
			categoriesData: '',
			stock: Math.floor(Math.random() * 100000)
		}
	},
	computed: {
		categories: {
			get(){
				return this.$store.state.categories
			}
		}
	},
	methods: {
		upload(e){
			e.preventDefault()
			this.$store.commit('createProduct', {
				name: this.name,
				price: this.price,
				description: this.description,
				img: this.img,
				imgPreview: this.imgPreview,
				categories: this.categoriesData,
				stock: this.stock,
			})
		},
		open(e){
			if(e.target.dataset.type == 'img'){
				document.querySelector('input[name="img"]').click()
			}else{
				document.querySelector('input[name="imgPreview"]').click()
			}
		},
		openImg(e){
			if(e.target.name === 'img'){
				this.img = e.target.files[0]
			}else{
				e.target.files.forEach((data) => {
					this.imgPreview = [...this.imgPreview, data]
				})
			}
		},
		changeCategory(e){
			this.categoriesData = e.target.value
		}
	}
}
</script>