<template>
	<div class="border p-2">
		<h5 class="font-bold text-center mb-2">
			<router-link :to="{path: '/products/' + data.id}" class="hover:underline">{{data.name}}</router-link>
		</h5>
		<img :src="data.img" alt="image">
		<p class="text-sm mt-2">{{data.description}}</p>
		<div class="flex flex-wrap mb-2 mt-2">
			<div class="flex w-full">
				<div class="w-2/5 font-medium text-xs md:text-sm">Category</div>
				<router-link :to="{path: '/categories/' + data.category.toLowerCase()}" class="w-3/5 hover:underline text-xs md:text-sm">{{data.category}}</router-link>
			</div>
			<div class="flex w-full">
				<div class="w-2/5 font-medium text-xs md:text-sm">Price</div>
				<p class="w-3/5 text-xs md:text-sm">Rp. {{data.price}}</p>
			</div>
		</div>
		<div class="flex flex-wrap">
			<button @click="addCart" class="p-2 w-full lg:w-1/2 bg-blue-500 hover:bg-blue-600 transition-all duration-300 text-white text-sm md:text-base font-medium focus:outline-none focus:ring focus:ring-blue-500">Add to cart</button>
			<button class="p-2 w-full lg:w-1/2 bg-gray-500 hover:bg-gray-600 transition-all duration-300 text-white text-sm md:text-base font-medium focus:outline-none focus:ring focus:ring-gray-500">Buy Now</button>
		</div>
	</div>
</template>
<script>
export default{
	name: 'CardProduct',
	props: ['data'],
	data(){
		return{
			status: false
		}
	},
	methods: {
		addCart(){
			if(!this.txtAddCart){
				this.$store.commit('addCart', this.data)
				this.txtAddCart = true
			}
			else{
				this.$store.commit('removeCart', this.data.id)
				this.txtAddCart = false
			}
		}
	}
}
</script>