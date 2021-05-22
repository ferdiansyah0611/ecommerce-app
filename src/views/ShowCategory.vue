<template>
	<div>
		<div class="mb-5 bg-gray-100 p-5">
			<h4 class="font-bold">Category {{id}}</h4>
		</div>
		<CartProduct></CartProduct>
		<div class="grid grid-cols-2 md:grid-cols-4 grid-flow-row gap-x-3 gap-y-4">
			<CardProduct v-for="(data, key) in item" v-bind:key="key" :data="data"></CardProduct>
		</div>
	</div>
</template>

<script>
// @ is an alias to /src
import CardProduct from '@/components/CardProduct'

export default {
	name: 'ShowCategory',
	components: {
		CardProduct,
	},
	data(){
		return{
			id: ''
		}
	},
	created(){
		document.title = `Category ${this.$route.params.id} | 0611 Store`
		this.id = this.$route.params.id
	},
	beforeRouteUpdate(to, from, next){
		this.id = to.params.id
		next()
	},
	computed: {
		item: {
			get(){
				return this.$store.state.item
			}
		}
	},
	mounted(){
		this.$store.commit('whereProducts', {where: 'categories', value: this.id})
	}
}
</script>
