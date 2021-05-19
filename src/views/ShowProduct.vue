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
					<button @click="addCart" class="p-2 w-full md:w-2/5 lg:w-1/5 bg-blue-500 hover:bg-blue-600 transition-all duration-300 text-white text-sm md:text-base font-medium focus:outline-none focus:ring focus:ring-blue-500">Add to cart</button>
					<button class="p-2 w-full md:w-2/5 lg:w-1/5 bg-gray-500 hover:bg-gray-600 transition-all duration-300 text-white text-sm md:text-base font-medium focus:outline-none focus:ring focus:ring-gray-500">Buy Now</button>
				</div>
			</div>
			<div class="w-full md:w-1/3 bg-gray-100">
				<div class="border-b border-gray-300">
					<h4 class="font-bold text-xl p-4">Image Preview</h4>
				</div>
				<div class="relative">
					<div>
						<ChevronLeftIcon @click="changeImgPreview" class="preview-left h-10 absolute left-0 bg-black bg-opacity-50 text-white cursor-pointer" style="margin-top: calc(50%);"></ChevronLeftIcon>
					</div>
					<div>
						<ChevronRightIcon @click="changeImgPreview" class="preview-right h-10 absolute right-0 top-0 bg-black bg-opacity-50 text-white cursor-pointer" style="margin-top: calc(50%);"></ChevronRightIcon>
					</div>
					<img class="w-full sm:w-1/2 mx-auto mt-3" :src="data.imgPreview[defaultKeyimgPreview]" alt="">
				</div>
			</div>
			<div class="w-full md:w-2/3 bg-gray-100">
				<div class="border-b border-gray-300">
					<h4 class="font-bold text-xl p-4">Comments</h4>
				</div>
				<div class="flex flex-wrap p-4">
					<form class="w-full">
						<input type="file" class="hidden">
						<textarea class="w-full p-3 focus:outline-none" placeholder="Type here..."></textarea>
						<button type="button" class="p-4 bg-gray-200 font-bold focus:outline-none focus:ring focus:ring-gray-50">Attach Image</button>
						<button type="submit" class="p-4 bg-blue-400 font-bold text-white focus:outline-none focus:ring focus:ring-blue-300  ml-2">Send</button>
					</form>
				</div>
				<div class="pl-4 pr-4 pb-4 overflow-auto">
					<div class="flex py-3 border-b">
						<img class="rounded-full h-24 w-24" :src="data.img" alt="">
						<div class="w-4/5 pl-3 pr-3 pb-3">
							<h5 class="font-bold hover:underline cursor-pointer">Ferdiansyah</h5>
							<p>My Comments</p>
						</div>
					</div>
					<div class="flex py-3 border-b">
						<img class="rounded-full h-24 w-24" :src="data.img" alt="">
						<div class="w-4/5 pl-3 pr-3 pb-3">
							<h5 class="font-bold hover:underline cursor-pointer">Ferdiansyah</h5>
							<p>My Comments</p>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>
<script>
import {ChevronLeftIcon, ChevronRightIcon} from '@heroicons/vue/outline'
export default{
	name: 'ShowProduct',
	components: {
		ChevronLeftIcon, ChevronRightIcon
	},
	data(){
		return{
			defaultKeyimgPreview: 0,
			data: {
				id: Math.floor(Math.random() * 1000000),
				name: 'My Product',
				img: '/emil-widlund-xrbbXIXAWY0-unsplash.jpg',
				imgPreview: ['/emil-widlund-xrbbXIXAWY0-unsplash.jpg', 'https://images.unsplash.com/photo-1593642532781-03e79bf5bec2?ixid=MnwxMjA3fDF8MHxlZGl0b3JpYWwtZmVlZHwxfHx8ZW58MHx8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60', '/emil-widlund-xrbbXIXAWY0-unsplash.jpg'],
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
		},
		changeImgPreview(e){
			e.preventDefault()
			if(e.target.classList.contains('preview-left')){
				if(this.defaultKeyimgPreview !== 0){
					this.defaultKeyimgPreview -= 1
				}
			}else{
				if(this.defaultKeyimgPreview < (this.data.imgPreview.length - 1)){
					this.defaultKeyimgPreview += 1
				}
			}
		}
	}
}
</script>