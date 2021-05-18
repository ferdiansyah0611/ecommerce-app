<template>
	<Navbar></Navbar>
	<div class="p-3 mt-14">
		<router-view/>
	</div>
	<div class="flex bg-gray-800 p-2 text-white">
		<div class="sm:w-full md:w-1/2">
			<p>&copy; {{new Date().getFullYear()}} <a href="/" class="hover:underline">ferdiansyah0611</a></p>
		</div>
		<div class="sm:w-full md:w-1/2">
			
		</div>
	</div>
</template>
<script>
import Navbar from '@/components/Navbar'
export default{
	components: {
		Navbar
	}
}
</script>