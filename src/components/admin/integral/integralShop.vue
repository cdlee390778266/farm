<template>
	<div class="integralShop">
			<scroller lock-x  @on-scroll-bottom="onScrollBottom" ref="scrollerBottom" :scroll-bottom-offst="0" height="-0" class="hot-wrapper">
			  	<div class="box">
			  		<grid :show-vertical-dividers="false" :show-lr-borders="false" :cols="2">
				      <grid-item v-for="(goods, i) in goodsList" :key="i">
				      	<router-link :to="'/goods/'+goods.gid" class="goods-mes">
				      		<div class="goods-img" :style="'background-image: url('+ goods.imgUrl +')'">
				      			<div class="goods-text">
						      		<span class="ellipsis">{{goods.title}}</span>
						      		<span><strong>{{goods.price}}积分</strong>/{{goods.weight}}</span>
						      	</div>
				      		</div>
				      	</router-link>
				      	<div class="goods-handle">
				      		<x-button mini type="warn" @click.native="jump(goods)">立即兑换</x-button>
				      	</div>
				      </grid-item>
				    </grid>
				    <div class="nz-loading" v-if="hasMore">
				  		<spinner type="bubbles" size="25px"></spinner>
				  		<span class="nz-loading-text">加载中...</span>
				  	</div>
				</div>
		  	</scroller>
	</div>
</template>
<script>
	import { Grid, GridItem, Scroller, LoadMore} from 'vux'
	export default {
		components: {
			Grid,
  			GridItem,
  			Scroller,
  			LoadMore
		},
		data() {
			return {
				index: 1,
				goodsList: [],
				hasMore: true,
			    onLoading: false
			}
		},
		methods: {
			onScrollBottom () {
		      if (this.onLoading) {
		        // do nothing
		      } else {
		      	var _this = this;
		        this.onLoading = true
				this.$utils.getJson('integralShop', function(res) {
					if(res.data.ResData) {
						if(res.data.ResData.length) {
							_this.goodsList = _this.goodsList.concat(res.data.ResData);
							_this.currentPage++;
						}else {
							_this.hasMore = false;
						}
					}
					_this.$nextTick(() => {
			        	_this.$refs.scrollerBottom.reset()
			        })
					_this.onLoading = false;
				}, function(error) {
					_this.onLoading = false;
				}, _this.currentPage)
		      }
		    },
		    addCart(goods) {

				if(!goods.gid) {
					this.$utils.showTip('error', '-1010');
					return;
				}
				this.$utils.showTip('success', '101');
			},
			jump(goods) {
				this.$router.push('/admin/integralOrder/' + goods.gid);
			}
		},
		created() {
			var _this = this;
			//获取积分商品
			_this.$utils.getJson('integralShop', function(res) {
				if(res.data.ResData) {
					_this.goodsList = res.data.ResData;
					_this.currentPage++;
				}else {

				}
			}, function(error) {}, _this.currentPage)
		}
	}
</script>
<style lang="scss">
	.integralShop {
		.weui-grids:before {
			border-top: none;
		}
		.vux-tab-wrap {
			position: fixed;
			left: 0;
			right: 0;
			top: 0;
			padding-top: 50px;
			z-index: 88;
		}
		.vux-tab, .vux-tab-container {
			background-color: #87cb62;
			height: 50px;
			line-height: 50px;
		}
		.vux-tab-ink-bar {
			bottom: 1px;
		}
		.hot-wrapper {
			position: absolute;
			left: 0;
			right: 0;
			top: 0;
			bottom: 0;
			background: #fafafa;
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
