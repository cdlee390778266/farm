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
				if(this.$router.historyNameArr.length && (to.name == this.$router.historyNameArr[this.$router.historyNameArr.length - 1])) {
					this.transitionName = 'slide-right';
					this.$router.historyNameArr.length = this.$router.historyNameArr.length - 1;
				}else {
					this.transitionName = 'slide-left';
					this.$router.historyNameArr.push(from.name);
				}
			}
		}
	}
</script>
<style scoped lang="scss">
</style>
