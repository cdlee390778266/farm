<template>
  <div class="goods">
  	<!-- 商品图片 -->
    <swiper :loop="true" :auto="false" :interval="3000" :list="goodsImgs" style="width:100%;" :aspect-ratio="551/758" :show-dots="false"></swiper>
   	
   	<div class="bar vux-1px-t vux-1px-b">
   		<div class="bar-l">￥<span>90.0</span></div>
   		<div class="bar-r">
   			<x-icon type="ios-heart-outline" size="30"></x-icon>
   			<x-icon type="ios-heart" size="30"></x-icon>
   			<x-button mini type="warn">加入购物车</x-button>
   		</div>
   	</div>
  </div>
</template>
<script>
  import { Swiper, Grid, GridItem, Panel, XButton } from 'vux'
  export default {
  	components: {
  		Swiper,
  		Grid,
  		GridItem,
  		Panel,
  		XButton
  	},
  	data() {
  		return {
  			defaultImg:  [
  				{
		          "url": "javascript:",
		          "img": "/src/assets/images/home-banner1.png",
		          "title": "",
		          "fallbackImg": "/src/assets/images/default.gif"
		        }
  			],
  			goodsImgs: [],
  		}
  	},
	created() {
		var _this = this;
		//goodsImgs
		this.$utils.getJson('/src/assets/data/goods/goods.json', function(res) {
			if(res.data.ResData) {
				_this.goodsImgs = res.data.ResData.imgs;
			}else {
				_this.goodsImgs = _this.defaultImg;
			}
		}, function(error) {
			_this.goodsImgs = _this.defaultImg;
		})
		
	}
  }
</script>
<style lang="scss">
	.bar {
		height: 50px;
		line-height: 50px;
		padding-left: 10px;
		padding-right: 10px;
		color: #3c3c3c;
		background: #fff;
		.bar-l {
			font-size: 20px;
			float: left;
			span {
				color: #ff0000;
			}
		}
		.bar-r {
			float: right;
		}
	}
</style>
