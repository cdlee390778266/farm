<template>
  	<div>
  		
	   <div id="container"></div> 
	</div>
</template>

<script> 
	import AMap from 'AMap'
	export default {
	  	data () {
		    return {
		    	
		    }
	  },
	  methods: {
	    init() {
	    	var map = new AMap.Map('container', {
		        zoom:11,//级别
		        center: [116.397428, 39.90923],//中心点坐标
		        viewMode:'3D'//使用3D视图
		    });
	    }
	  },
	  mounted() {
	  	this.init()
	  }
	}
</script>
<style scoped lang="scss">
	#container {
		position: absolute;
		top: 0;
		right: 0;
		bottom: 0;
		left: 0;
	}  
</style>
