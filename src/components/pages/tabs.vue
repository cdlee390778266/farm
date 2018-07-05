<template>
  	<div>
  		<transition>
	   		<router-view/>
	   	</transition>
	   	<div class="nz-tab-footer">
		   	<tabbar>
		      <tabbar-item v-for="(tab, index) in tabs" :key="tab.goUrl" :link="tab.goUrl">
		        <img slot="icon" :src="tab.iconUrl">
		        <img slot="icon-active" :src="tab.iconUrlActive">
		        <span slot="label">{{tab.label}}</span>
		      </tabbar-item>
		    </tabbar>
	   	</div>
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
		    	tabs: [
		    		{
		    			label: '首页',
		    			iconUrl: '/src/assets/images/icons/icon1.png',
		    			iconUrlActive: '/src/assets/images/icons/icon2.png',
		    			goUrl: '/home'
		    		},
		    		{
		    			label: '分类',
		    			iconUrl: '/src/assets/images/icons/icon3.png',
		    			iconUrlActive: '/src/assets/images/icons/icon4.png',
		    			goUrl: '/category'
		    		},
		    		{
		    			label: '购物车',
		    			iconUrl: '/src/assets/images/icons/icon5.png',
		    			iconUrlActive: '/src/assets/images/icons/icon6.png',
		    			goUrl: '/cart'
		    		},
		    		{
		    			label: '个人中心',
		    			iconUrl: '/src/assets/images/icons/icon7.png',
		    			iconUrlActive: '/src/assets/images/icons/icon8.png',
		    			goUrl: '/user'
		    		}
		    	]
		    }
	  },
	  methods: {
	    
	  }
	}
</script>
<style scoped lang="scss">
	.nz-tab-footer {
		position: fixed;
		left: 0;
		right: 0;
		bottom: 0;
	}
	.weui-tabbar {
		padding-top: 10px;
		padding-bottom: 10px;
		background-color: #fff;
	}
	.weui-tabbar__label span {
		color: #666;
	}
</style>
