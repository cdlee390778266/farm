<template>
  <div class="theme">
	<div class="theme-wrapper">
		<img :src="img" v-for="(img, index) in imgs" class="img-responsive">
	</div>
	<div>
		<grid :show-vertical-dividers="false" :show-lr-borders="false" :cols="2">
	      <grid-item v-for="(goods, i) in themeGoods" :key="i">
	      	<router-link :to="'/goods/'+goods.gid" class="goods-mes">
	      		<div class="goods-img" :style="'background-image: url('+ goods.imgUrl +')'">
	      			<div class="goods-text">
			      		<span class="ellipsis">{{goods.title}}</span>
			      		<span><strong>￥{{goods.price}}</strong>/{{goods.weight}}</span>
			      	</div>
	      		</div>
	      	</router-link>
	      	<div class="goods-handle">
	      		<x-button mini type="warn" @click.native="addCart(goods)">加入购物车</x-button>
	      	</div>
	      </grid-item>
	    </grid>
	</div>
  </div>
</template>
<script>
  export default {
  	data() {
  		return {
  			imgs: ['/src/assets/images/theme5.png', '/src/assets/images/theme6.png', '/src/assets/images/theme7.png'],
  			themeGoods: []
  		}
  	},
  	methods: {
  		addCart(goods) {
			if(!goods.gid) {
				this.$utils.showTip('error', '-1010');
				return;
			}
			this.$utils.addCart({
				id: goods.gid,
				name: goods.title,
				price: goods.price,
				num: 1,
				imgObj: {
					img: goods.imgUrl
				}
			})
			this.$utils.showTip('success', '101');
		}
  	},
	created() {
		var _this = this;
		//goods
		_this.$utils.getJson('themeGoodsUrl', function(res) {
			if(res.data.ResData) {
				_this.themeGoods = res.data.ResData;
			}else {

			}
		}, function(error) {}, {})
	}
  }
</script>
<style lang="scss">
	.theme {
		padding-bottom: 66px;
		.theme-wrapper {
			padding: 10px;
		}
		.goods-mes {
			display: block;
			box-shadow: 0 1px 2px 0px #bbb;
			border-radius: 4px;
			text-align: center;
			.goods-img {
				position: relative;
				padding-top: 100%;
				background-size: cover;
				.goods-text {
					position: absolute;
					bottom: 0;
					left: 0;
					right: 0;
					line-height: 18px;
					padding-top: 5px;
					padding-bottom: 5px;
					font-size: 12px;
					color: #5d5d5d;
					background: rgba(255, 255, 255, .6);
					.ellipsis {
						font-size: 16px;
						color: #3c3c3c;
					}
					strong {
						font-weight: normal;
						color: #ff0101;
					}
				}
			}
		}
		.goods-handle {
			padding-top: 20px;
			text-align: center;
			.weui-btn_warn {
				background-color: #ee4646;
			}
		}
	}
</style>
