<template>
	<div>
		<div class="flex flex-wrap">
			<img class="w-full md:w-1/5" :src="data.img" alt="image">
			<div class="w-full md:w-4/5 p-4 bg-gray-100">
				<h5 class="font-bold text-lg">{{data.name}}</h5>
				<p>{{data.description}}</p>
				<div class="flex flex-wrap w-full sm:w-1/2 mb-4 mt-4">
					<div class="flex w-full">
						<div class="w-2/5 font-medium text-sm md:text-base">Category</div>
						<a href="" class="w-3/5 hover:underline text-sm md:text-base">{{data.category}}</a>
					</div>
					<div class="flex w-full">
						<div class="w-2/5 font-medium text-sm md:text-base">Price</div>
						<p class="w-3/5 text-sm md:text-base">Rp. {{data.price}}</p>
					</div>
				</div>
				<div class="flex w-full sm:w-1/2 space-x-1">
					<button @click="addCart" class="p-2 w-1/5 bg-blue-500 hover:bg-blue-600 transition-all duration-300 text-white text-sm md:text-base font-medium focus:outline-none focus:ring focus:ring-blue-500">Add to cart</button>
					<button class="p-2 w-1/5 bg-gray-500 hover:bg-gray-600 transition-all duration-300 text-white text-sm md:text-base font-medium focus:outline-none focus:ring focus:ring-gray-500">Buy Now</button>
				</div>
			</div>
		</div>
	</div>
</template>
<script>
export default{
	name: 'ShowProduct',
	data(){
		return{
			data: {
				id: Math.floor(Math.random() * 1000000),
				name: 'My Product',
				img: '/emil-widlund-xrbbXIXAWY0-unsplash.jpg',
				price: 1000000,
				category: 'Computer',
				description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Numquam rem, sunt nisi eum. At harum odit et id perferendis temporibus aliquid ratione omnis. Maxime cupiditate veniam modi nihil? Libero, corporis.'
			}
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