<template>
	<div class="grid grid-cols-2 md:grid-cols-4 grid-flow-row gap-x-3 gap-y-4">
		<CardProduct v-for="(data, key) in item" v-bind:key="key" :data="data"></CardProduct>
	</div>
</template>

<script>
// @ is an alias to /src
import CardProduct from '@/components/CardProduct'

export default {
	name: 'Home',
	components: {
		CardProduct,
	},
	created(){
		document.title = 'The Best Ecommerce Platform | 0611 Store'
	},
	computed: {
		item: {
			get(){
				return this.$store.state.item
			}
		}
	},
	mounted(){
		this.$store.commit('getProducts', {reset: true})
		window.store = this.$store
		/*for (var i = 0; i < 8; i++) {
			this.$store.commit('addData', {
				name: 'item',
				data: {
				id: Math.floor(Math.random() * 1000000),
				name: 'My Product',
				img: '/emil-widlund-xrbbXIXAWY0-unsplash.jpg',
				price: 1000000,
				category: 'Computer',
				description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Numquam rem, sunt nisi eum. At harum odit et id perferendis temporibus aliquid ratione omnis. Maxime cupiditate veniam modi nihil? Libero, corporis.'
			}
			})
		}*/
	}
}
</script>
