<template>
	<div>
		<Navbar></Navbar>
		<div class="p-3 mt-14">
			<router-view/>
		</div>
		<Footer></Footer>
	</div>
</template>
<script>
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
export default{
	components: {
		Navbar,
		Footer
	}
}
</script>