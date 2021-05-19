<template>
	<nav class="shadow w-full fixed left-0 top-0 flex bg-white z-20">
		<div class="w-4/5 md:w-2/3 flex justify-start">
			<router-link class="p-4 text-black font-bold" to="/">0611 Store</router-link>
			<form class="p-2 hidden md:block">
				<input class="border p-2 text-sm focus:outline-none" placeholder="Search product..." type="search">
			</form>
			<a href="/" class="hidden md:block p-4 hover:bg-gray-100 font-medium">Category</a>
			<a href="/" class="hidden md:block p-4 hover:bg-gray-100 font-medium">Best Product</a>
		</div>
		<div v-if="users" class="menu-desktop fixed right-0 top-0 mt-14 bg-white shadow border hidden">
			<div class="flex flex-wrap">
				<a class="w-auto flex hover:bg-gray-100 cursor-pointer transition-all duration-300 p-3">
					<ShoppingCartIcon class="h-6"></ShoppingCartIcon>
					<span class="font-medium ml-3">My Payment</span>
				</a>
				<a class="w-auto flex hover:bg-gray-100 cursor-pointer transition-all duration-300 p-3 border-b">
					<UserIcon class="h-6"></UserIcon>
					<span class="font-medium ml-3">My Profile</span>
				</a>
				<div @click="logout" class="w-auto flex hover:bg-gray-100 cursor-pointer transition-all duration-300 p-3">
					<LogoutIcon class="h-6"></LogoutIcon>
					<span class="font-medium ml-3">Logout</span>
				</div>
			</div>
		</div>
		<div @click="menuMobile" class="w-1/5 flex justify-center md:hidden cursor-pointer">
			<MenuIcon v-if="!statusCart" class="h-13 w-10 transition-all duration-500"></MenuIcon>
			<XIcon v-else class="h-13 w-10 transition-all duration-500"></XIcon>
		</div>
		<div class="hidden w-1/3 md:w-1/3 md:flex justify-end">
			<a @click="cartAction" class="p-4 text-black font-medium hover:bg-gray-100 border-l" href="/">My Cart</a>
			<a @click="menuDesktop" v-if="users" class="p-4 text-black font-medium hover:bg-gray-100 border-l flex" href="/">
				<img class="w-6 rounded-full" :src="users.photoURL" alt="">
				<span class="ml-2">{{users.displayName}}</span>
			</a>
			<router-link v-if="!users" class="p-4 text-black font-medium hover:bg-gray-100 border-l" to="/login">Login</router-link>
			<a v-if="!users" class="p-4 text-black font-medium hover:bg-gray-100" href="/">Register</a>
		</div>
	</nav>
	<div class="list-cart fixed right-0 top-0 w-60 bg-white mt-14 shadow-md overflow-auto border-l transition-all duration-300 mr-min-full z-10">
		<h5 class="p-2 text-center font-bold border-b">List Cart</h5>
		<CartProductItem v-for="(data, key) in carts" v-bind:key="key" :data="data"></CartProductItem>
	</div>
	<div class="menu-mobile fixed right-0 top-0 bg-white h-screen w-48 z-50 transition-all duration-500 overflow-auto mr-min-full">
		<div class="text-center mt-3 mb-3">
			<h5 class="font-bold mb-3">0611 Store</h5>
			<form>
				<input type="search" class="p-3 text-sm border focus:outline-none" placeholder="Search product...">
			</form>
		</div>
		<div class="flex flex-wrap">
			<div @click="userMenu" v-if="users" class="w-full flex hover:bg-gray-100 cursor-pointer transition-all duration-300 p-3">
				<img class="w-6 rounded-full" :src="users.photoURL" alt="">
				<span class="font-medium ml-3">{{users.displayName}}</span>
			</div>
			<a v-if="users" class="w-full hover:bg-gray-100 cursor-pointer transition-all duration-300 p-3 menu-user hidden">
				<ShoppingCartIcon class="h-6"></ShoppingCartIcon>
				<span class="font-medium ml-3">My Payment</span>
			</a>
			<a v-if="users" class="w-full hover:bg-gray-100 cursor-pointer transition-all duration-300 p-3 border-b menu-user hidden">
				<UserIcon class="h-6"></UserIcon>
				<span class="font-medium ml-3">My Profile</span>
			</a>
			<router-link to="/" class="w-full flex hover:bg-gray-100 cursor-pointer transition-all duration-300 p-3">
				<HomeIcon class="h-6"></HomeIcon>
				<span class="font-medium ml-3">Home</span>
			</router-link>
			<a @click="categoryAction" href="/" class="w-full flex hover:bg-gray-100 cursor-pointer transition-all duration-300 p-3">
				<FilterIcon class="h-6"></FilterIcon>
				<span class="font-medium ml-3">Category</span>
			</a>
			<div class="w-full flex hover:bg-gray-100 cursor-pointer transition-all duration-300 p-3 border-b">
				<ChartPieIcon class="h-6"></ChartPieIcon>
				<span class="font-medium ml-3">Best Products</span>
			</div>
			<a @click="cartAction" class="w-full flex hover:bg-gray-100 cursor-pointer transition-all duration-300 p-3 border-b">
				<ShoppingCartIcon class="h-6"></ShoppingCartIcon>
				<span class="font-medium ml-3">My Cart</span>
			</a>
			<div @click="logout" v-if="users" class="w-full flex hover:bg-gray-100 cursor-pointer transition-all duration-300 p-3">
				<LogoutIcon class="h-6"></LogoutIcon>
				<span class="font-medium ml-3">Logout</span>
			</div>
			<router-link v-if="!users" to="/login" class="w-full flex hover:bg-gray-100 cursor-pointer transition-all duration-300 p-3">
				<LoginIcon class="h-6"></LoginIcon>
				<span class="font-medium ml-3">Login</span>
			</router-link>
			<router-link v-if="!users" to="/register" class="w-full flex hover:bg-gray-100 cursor-pointer transition-all duration-300 p-3 border-b">
				<UserAddIcon class="h-6"></UserAddIcon>
				<span class="font-medium ml-3">Register</span>
			</router-link>
		</div>
		<div id="category" class="fixed right-0 top-0 bg-white h-screen w-48 z-50 transition-all duration-500 overflow-auto mr-min-full">
			<div @click="categoryAction" class="flex mb-2 mt-2 border-b p-2 cursor-pointer">
				<ChevronLeftIcon class="h-8"></ChevronLeftIcon>
				<h4 class="font-bold mt-1 ml-2">Category</h4>
			</div>
			<div class="flex flex-wrap">
				<router-link class="w-full flex hover:bg-gray-100 cursor-pointer transition-all duration-300 p-3" v-for="(data, key) in category" v-bind:key="key"  :to="{path: '/categories/' + data.toLowerCase()}">
					<FilterIcon class="h-6"></FilterIcon>
					<span class="font-medium ml-3">{{data}}</span>
				</router-link>
			</div>
		</div>
	</div>
	<div @click="menuMobile" class="menu-mobile-opacity fixed right-0 top-0 h-screen bg-black bg-opacity-50 z-20 w-full mr-min-full"></div>
	<div @click="chatAction" class="action-bottom fixed bottom-0 left-0 mb-5 ml-5 cursor-pointer">
		<div class="mx-auto flex">
			<div class="p-2 bg-white rounded-3xl shadow-3xl flex border">
				<ChatAlt2Icon class="h-7"></ChatAlt2Icon>
			</div>
		</div>
	</div>
	<div class="chat-action fixed top-0 left-0 w-full h-screen bg-black bg-opacity-50 p-5 z-50 transition-all duration-1000 mt-min-full">
		<div class="bg-white w-full sm:w-1/2 md:1/3 p-2 mx-auto overflow-auto" style="height: calc(100vh - 6vh);">
			<div class="bg-gray-50 overflow-auto" style="height: 63%;">
				<div class="flex flex-wrap w-full">
					<div class="w-full flex flex-wrap justify-start border-b pb-3 pt-3">
						<div class="w-1/5 flex justify-center">
							<img class="rounded-full w-14 h-14" src="/emil-widlund-xrbbXIXAWY0-unsplash.jpg" alt="avatar">
						</div>
						<div class="w-4/5 text-left">
							<h5 class="font-bold p-1 text-sm">Administrator</h5>
							<div>
								<p class="p-1 text-sm">Hello Ferdiansyah</p>
							</div>
						</div>
					</div>
					<div class="w-full flex flex-wrap justify-start border-b pb-3 pt-3">
						<div class="w-4/5 text-right">
							<h5 class="font-bold p-1 text-sm">Administrator</h5>
							<div>
								<p class="p-1 text-sm">Hello Ferdiansyah</p>
							</div>
						</div>
						<div class="w-1/5 flex justify-center">
							<img class="rounded-full w-14 h-14" src="/emil-widlund-xrbbXIXAWY0-unsplash.jpg" alt="avatar">
						</div>
					</div>
				</div>
			</div>
			<form>
				<input @change="fileChange" type="file" accept="image/*" class="hidden chat-file-attach">
				<textarea class="w-full border focus:outline-none p-3 mt-1" style="min-height: 100px;max-height: 400px;" placeholder="Type here..."></textarea>
				<button @click="fileAction" type="button" class="p-4 bg-gray-200 font-bold focus:outline-none focus:ring focus:ring-gray-50 w-full">Attach Image</button>
				<div class="flex space-x-1 mt-1">
					<button type="submit" class="p-3 bg-blue-400 font-bold text-white focus:outline-none focus:ring focus:ring-blue-300 w-1/2">Send</button>
					<button @click="chatAction" type="button" class="p-3 bg-red-400 font-bold text-white focus:outline-none focus:ring focus:ring-red-300 w-1/2">Cancel</button>
				</div>
			</form>
		</div>
	</div>
</template>
<script>
import { auth } from '@/firebase'
import CartProductItem from '@/components/CartProductItem'
import {
	MenuIcon,
	HomeIcon,
	XIcon,
	ChatAlt2Icon,
	ShoppingCartIcon,
	LoginIcon,
	LogoutIcon,
	UserAddIcon,
	ChartPieIcon,
	FilterIcon,
	ChevronLeftIcon,
	UserIcon
} from '@heroicons/vue/outline'
export default{
	name: 'Navbar',
	components: {
		CartProductItem,
		MenuIcon,
		HomeIcon,
		XIcon,
		ChatAlt2Icon,
		ShoppingCartIcon,
		LoginIcon,
		LogoutIcon,
		UserAddIcon,
		ChartPieIcon,
		FilterIcon,
		ChevronLeftIcon,
		UserIcon
	},
	data(){
		return{
			statusCart: false,
			statusMenu: false,
			statusCategory: false,
			statusChat: false,
			statusMenuUser: false,
			statusMenuDesktop: false,
			category: ['Laptops', 'Computer', 'Smartphone', 'Shirt', 'Dress'],
			txt: '',
			file: []
		}
	},
	computed: {
		carts: {
			get(){
				return this.$store.state.cart
			}
		},
		users: {
			get(){
				return auth.currentUser
			}
		}
	},
	methods: {
		cartAction(e){
			const listCart = document.querySelector('.list-cart')
			if(e){
				e.preventDefault()
			}
			if(!this.statusCart){
				if(this.statusMenu){
					this.menuMobile()
				}
				this.statusCart = true
				listCart.classList.remove('mr-min-full')
			}else{
				if(this.statusMenu){
					this.menuMobile()
				}
				this.statusCart = false
				listCart.classList.add('mr-min-full')
			}
		},
		menuMobile(e){
			if(e){
				e.preventDefault()
			}
			const menu = document.querySelector('.menu-mobile')
			const opacity = document.querySelector('.menu-mobile-opacity')
			if(!this.statusMenu){
				if(this.statusCart){
					this.cartAction()
				}
				else{
					document.body.classList.add('overflow-hidden')
					document.body.classList.remove('overflow-auto')
					this.statusMenu = true
					menu.classList.remove('mr-min-full')
					opacity.classList.remove('mr-min-full')
				}
			}else{
				if(this.statusCategory){
					this.categoryAction()
				}
				setTimeout(() => {
					document.body.classList.remove('overflow-hidden')
					document.body.classList.add('overflow-auto')
					this.statusMenu = false
					menu.classList.add('mr-min-full')
					opacity.classList.add('mr-min-full')
				}, 300)
			}
		},
		categoryAction(e){
			if(e){
				e.preventDefault()
			}
			const category = document.querySelector('#category')
			if(!this.statusCategory){
				this.statusCategory = true
				category.classList.remove('mr-min-full')
			}else{
				this.statusCategory = false
				category.classList.add('mr-min-full')
			}
		},
		chatAction(){
			const action = document.querySelector('.chat-action')
			if(!this.statusChat){
				this.statusChat = true
				action.classList.remove('mt-min-full')
				document.body.classList.add('overflow-hidden')
				document.body.classList.remove('overflow-auto')
			}else{
				this.statusChat = false
				action.classList.add('mt-min-full')
				document.body.classList.remove('overflow-hidden')
				document.body.classList.add('overflow-auto')
			}
		},
		fileAction(){
			document.querySelector('.chat-file-attach').click()
		},
		fileChange(e){
			this.file = [...this.file, e.target.files]
		},
		userMenu(){
			const menu = document.querySelectorAll('.menu-user')
			menu.forEach((data) => {
				if(!this.statusMenuUser){
					data.classList.remove('hidden')
					data.classList.add('flex')
				}else{
					data.classList.add('hidden')
					data.classList.remove('flex')
				}
			})
			if(!this.statusMenuUser){
				this.statusMenuUser = true
			}else{
				this.statusMenuUser = false
			}
		},
		menuDesktop(e){
			e.preventDefault()
			const menu = document.querySelector('.menu-desktop')
			if(!this.statusMenuDesktop){
				this.statusMenuDesktop = true
				menu.classList.remove('hidden')
				menu.classList.add('block')
			}else{
				this.statusMenuDesktop = false
				menu.classList.add('hidden')
				menu.classList.remove('block')
			}
		},
		logout(e){
			e.preventDefault()
			auth.signOut()
			window.location.reload(false);
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
.mt-min-full{
	margin-top: -500vh;
}
</style>