<template>
  	<div class="map">
  		<div class="nz-header">
			<flexbox>
		      	<flexbox-item :span="'36px'" class="tr">
		      		<img src="/src/assets/images/icons/icon22.png">
		      	</flexbox-item>
		      	<flexbox-item class="search-wrapper">
		      		<input v-model="address">
		      	</flexbox-item>
		      	<flexbox-item :span="'36px'" class="tl" @click.native="changeAddress">
					<img src="/src/assets/images/icons/icon23.png">
		      	</flexbox-item>
		    </flexbox>
		</div>
	   <div id="container"></div> 
	</div>
</template>

<script> 
	import AMap from 'AMap'
	export default {
	  	data () {
		    return {
		    	map: {},
		    	address: ''
		    }
	  	},
		methods: {
			init() {
				var _this = this;
				this.map = new AMap.Map('container', {
			        zoom:11,//级别
			        viewMode:'3D',
			        resizeEnable: true
			    })

				this.map.plugin(['AMap.Geolocation','AMap.Geocoder'], function() {
			        var geolocation = new AMap.Geolocation({
			            enableHighAccuracy: true,//是否使用高精度定位，默认:true
			            timeout: 10000,          //超过10秒后停止定位，默认：无穷大
			            buttonOffset: new AMap.Pixel(10, 20),//定位按钮与设置的停靠位置的偏移量，默认：Pixel(10, 20)
			            zoomToAccuracy: true,      //定位成功后调整地图视野范围使定位位置及精度范围视野内可见，默认：false
			            buttonPosition:'RB'
			        });
			        _this.map.addControl(geolocation);
			        geolocation.getCurrentPosition();
			        AMap.event.addListener(geolocation, 'complete', onComplete);//返回定位信息
			        AMap.event.addListener(geolocation, 'error', onError);      //返回定位出错信息

			    });

			    //解析定位结果
			    function onComplete(data) {
			        var str=['定位成功'];
			        str.push('经度：' + data.position.getLng());
			        str.push('纬度：' + data.position.getLat());
			        var address=[data.position.getLng(),data.position.getLat()];
			        console.log(address);
			         // 定位信息解析成地址
			         var geocoder = new AMap.Geocoder({
			            city: "010"//城市，默认：“全国”
			        });
			        var marker = new AMap.Marker({
			            map:_this.map,
			            bubble:true
			        })
			        marker.setPosition(address);
		            geocoder.getAddress(address,function(status,result){
		              if(status=='complete'){
		                _this.address = result.regeocode.formattedAddress;
		                _this.$utils.showTip('success', '113');
		                console.log(result);
		              }else{
		                 _this.$utils.showTip('error', '-1130');
		              }
		            })
			    }
			    //解析定位错误信息
			    function onError(data) {
			    	_this.$utils.showTip('error', '-1131');
			    }
			},
			changeAddress() {
				if(this.address) {
					this.map.setCity(this.address);
				}
			}
		},
		mounted() {
			this.init()
		}
	}
</script>
<style lang="scss">
	.nz-header {
  		height: 50px;
  		line-height: 50px;
  	}
	.map {
		.nz-header {
  			position: fixed;
	  		top: 0;
	  		left: 0;
	  		right: 0;
  			background: #87cb62;
  			z-index: 99;
  			img {
  				width: 20px;
  				vertical-align: middle;
  			}
  			input {
  				box-sizing: border-box;
  				width: 100%;
  				height: 30px;
  				padding: 0 10px;
  				line-height: 30px;
  				text-align: left;
  				outline: none;
  				border: none;
  				border-bottom: 2px solid #fff;
  				background: transparent;
  				color: #fff;
  			}
  		}
	}
	#container {
		position: absolute;
		top: 0;
		right: 0;
		bottom: 0;
		left: 0;
	}  
</style>
