<template>
	<div class="p-2 border-b">
		<h5 class="text-center mb-2 font-medium">{{data.name}}</h5>
		<img :src="data.img" alt="image">
		<div class="flex flex-wrap mt-2">
			<div class="w-full flex">
				<p class="text-sm w-2/5">Total Price</p>
				<p class="text-sm w-3/5">Rp. {{price}}</p>
			</div>
			<div class="w-full flex">
				<p class="text-sm w-2/5">Total Items</p>
				<p class="text-sm w-3/5">{{total}}</p>
			</div>
		</div>
		<div class="flex space-x-1 mt-2">
			<button @click="increment" class="w-1/2 p-2 bg-gray-200 focus:outline-none focus:ring focus:ring-gray-100">+</button>
			<button @click="decrement" class="w-1/2 p-2 bg-gray-200 focus:outline-none focus:ring focus:ring-gray-100">-</button>
			<button @click="remove" class="w-1/2 p-2 bg-red-400 focus:outline-none focus:ring focus:ring-red-300 font-medium text-white">Remove</button>
		</div>
	</div>
</template>
<script>
export default{
	name: 'CartProductItem',
	props: ['data'],
	data(){
		return{
			total: 1,
			price: this.data.price,
			defaultPrice: this.data.price
		}
	},
	methods: {
		increment(){
			this.total += 1
			if(this.price == 0){
				this.price = this.defaultPrice
			}
			else{
				this.price += this.defaultPrice
			}
		},
		decrement(){
			if(this.price !== 0){
				this.total -= 1
				this.price -= this.defaultPrice
			}
		},
		remove(){
			this.$store.commit('removeCart', this.data.id)
		}
	}
}
</script>