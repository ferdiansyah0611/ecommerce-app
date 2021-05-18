<template>
	<nav class="shadow w-full fixed left-0 top-0 flex bg-white z-30">
		<div class="w-full md:w-1/2 flex justify-start">
			<router-link class="p-4 text-black font-bold" to="/">0611 Store</router-link>
			<form class="p-2">
				<input class="border p-2 text-sm focus:outline-none" placeholder="Search product..." type="search">
			</form>
			<a href="/" class="hidden md:block p-4 hover:bg-gray-100 font-medium">Category</a>
			<a href="/" class="hidden md:block p-4 hover:bg-gray-100 font-medium">Best Product</a>
		</div>
		<div class="hidden w-1/2 md:flex justify-end">
			<a @click="cartAction" class="p-4 text-black font-medium hover:bg-gray-100 border-l" href="/">My Cart</a>
			<a class="p-4 text-black font-medium hover:bg-gray-100 border-l" href="/">Login</a>
			<a class="p-4 text-black font-medium hover:bg-gray-100" href="/">Register</a>
		</div>
	</nav>
	<div class="list-cart fixed right-0 top-0 w-60 bg-white mt-14 shadow-md overflow-auto border-l transition-all duration-300 mr-min-full">
		<h5 class="p-2 text-center font-bold border-b">List Cart</h5>
		<CartProductItem v-for="(data, key) in carts" v-bind:key="key" :data="data"></CartProductItem>
	</div>
</template>
<script>
import CartProductItem from '@/components/CartProductItem'
export default{
	name: 'Navbar',
	components: {
		CartProductItem
	},
	data(){
		return{
			statusCart: false
		}
	},
	computed: {
		carts: {
			get(){
				return this.$store.state.cart
			}
		}
	},
	methods: {
		cartAction(e){
			const listCart = document.querySelector('.list-cart')
			e.preventDefault()
			if(!this.statusCart){
				this.statusCart = true
				listCart.classList.remove('mr-min-full')
			}else{
				this.statusCart = false
				listCart.classList.add('mr-min-full')
			}
		}
	}
}
</script>
<style>
.list-cart{
	height: calc(100vh - 8.5vh);
}
.mr-min-full{
	margin-right: -100%;
}
</style>