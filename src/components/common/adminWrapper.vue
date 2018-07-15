<template>
  	<div>
  		<transition>
	   		<router-view/>
	   	</transition>
	</div>
</template>

<script> 
	import { Tabbar, TabbarItem } from 'vux'
	export default {
	   	components: {
		    Tabbar,
			TabbarItem
		},
	  	data () {
		    return {
		    }
	  },
	  methods: {
	    
	  }
	}
</script>
<style scoped lang="scss">
</style>
