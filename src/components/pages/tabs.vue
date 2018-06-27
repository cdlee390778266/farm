<template>
  	<div>
	   	<router-view />
	   	<div class="nz-tab-footer">
		   	<tabbar>
		      <tabbar-item>
		        <img slot="icon" src="/static/images/icons/icon1.png">
		        <span slot="label">Wechat</span>
		      </tabbar-item>
		      <tabbar-item>
		        <img slot="icon" src="/static/images/icons/icon1.png">
		        <span slot="label">Wechat</span>
		      </tabbar-item>
		      <tabbar-item>
		        <img slot="icon" src="/static/images/icons/icon1.png">
		        <span slot="label">Wechat</span>
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
		    			iconUrl: '/static/images/icons/icon1.png',
		    			goUrl: ''
		    		},
		    		{
		    			label: '分类',
		    			iconUrl: '/static/images/icons/icon1.png',
		    			goUrl: ''
		    		},
		    		{
		    			label: '购物车',
		    			iconUrl: '/static/images/icons/icon1.png',
		    			goUrl: ''
		    		},
		    		{
		    			label: '个人中心',
		    			iconUrl: '/static/images/icons/icon1.png',
		    			goUrl: ''
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
</style>
