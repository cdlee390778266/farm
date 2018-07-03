<template>
	<div class="hot">
		<tab :line-width=2 active-color='#fff' v-model="index" bar-active-color="#fff" default-color="#abf384">
        	<tab-item @on-item-click="onScrollBottom(index, 'click')" class="vux-center" :selected="index == 0 ? true : false"  v-for="(tab, index) in tabs"  :key="index">{{tab.title}}</tab-item>
      	</tab>
		
		<transition name="fade" v-for="(tab, i) in tabs" :key="i">
			<scroller lock-x  @on-scroll-bottom="onScrollBottom(index, 'scroll')" ref="scrollerBottom" :scroll-bottom-offst="0" height="-0" class="hot-wrapper" v-show="i == index">
			  	<div class="box">
			  		<grid :show-vertical-dividers="false" :show-lr-borders="false" :cols="2">
				      <grid-item v-for="(goods, i) in tab.goods" :key="i">
				      	<router-link :to="'/goods/'+goods.gid" class="goods-mes">
				      		<div class="goods-img" :style="'background-image: url('+ goods.imgUrl +')'">
				      			<div class="goods-text">
						      		<span class="ellipsis">{{goods.title}}</span>
						      		<span><strong>￥{{goods.price}}</strong>/{{goods.weight}}</span>
						      	</div>
				      		</div>
				      	</router-link>
				      	<div class="goods-handle">
				      		<x-button mini type="warn">加入购物车</x-button>
				      	</div>
				      </grid-item>
				    </grid>
				    <div class="nz-loading" v-if="tab.hasMore">
				  		<spinner type="bubbles" size="25px"></spinner>
				  		<span class="nz-loading-text">加载中...</span>
				  	</div>
				</div>
		  	</scroller>
		</transition>
	</div>
</template>
<script>
	import { Tab, TabItem, Sticky, Divider, Swiper, SwiperItem, Grid, GridItem, Scroller, LoadMore} from 'vux'
	export default {
		components: {
			Tab,
			TabItem,
			Sticky,
			Divider,
			Swiper,
			SwiperItem,
			Grid,
  			GridItem,
  			Scroller,
  			LoadMore
		},
		data() {
			return {
				tabs: [
					{
						title: '最新商品',
						cid: '0',
						hasMore: true,
						goods: []
					},
					{
						title: '热销商品',
						cid: '1',
						hasMore: true,
						goods: []
					},
					{
						title: '时令商品',
						cid: '2',
						hasMore: true,
						goods: []
					}
				],
				index: 0,
			    onLoading: false
			}
		},
		methods: {
			onScrollBottom (index, type) {
		      if (this.onLoading) {
		        // do nothing
		      } else {
		      	if(type == 'click' && this.tabs[index].goods.length) return;
		        this.onLoading = true
		        var _this = this;
				this.$utils.getJson('/src/assets/data/hot/hot.json', function(res) {
					if(res.data.ResData) {
						if(res.data.ResData.length) {
							_this.tabs[index].goods = _this.tabs[index].goods.concat(res.data.ResData);
						}else {
							_this.tabs[index].hasMore = false;
						}
					}
					_this.$nextTick(() => {
			        	_this.$refs.scrollerBottom[index].reset()
			        })
					_this.onLoading = false;
				}, function(error) {
					_this.onLoading = false;	
				})
		      }
		    }
		},
		created() {
			var _this = this;
			this.$utils.getJson('/src/assets/data/hot/hot.json', function(res) {
				if(res.data.ResData) {
					_this.tabs[0].goods = res.data.ResData;
				}else {
					_this.tabs[0].goods = [];
				}
			}, function(error) {})
		}
	}
</script>
<style lang="scss">
	.hot {
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
		.box {
			padding-top: 50px;
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
