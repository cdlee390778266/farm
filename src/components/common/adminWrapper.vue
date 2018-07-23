<template>
  	<div>
  		<transition :name="transitionName">
	   		<router-view class="child-view"></router-view>
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
		    	transitionName: 'slide-left'
		    }
	  },
	  watch: {
	    '$route' (to, from) {
	    	console.log("9985");
	      const toDepth = to.path.split('/').length;
	      const fromDepth = from.path.split('/').length;
	      this.transitionName = toDepth < fromDepth ? 'slide-right' : 'slide-left';
	    }
	  },
	  methods: {
	    
	  }
	}
</script>
<style scoped lang="scss">
</style>
