<template>
	<div class="hot">
		<tab :line-width=2 active-color='#fff' v-model="index" bar-active-color="#fff" default-color="#abf384">
        	<tab-item @on-item-click="onScrollBottom(tab, index, 'click')" class="vux-center" :selected="index == 0 ? true : false"  v-for="(tab, index) in tabs"  :key="index">{{tab.title}}</tab-item>
      	</tab>
		
		<transition name="fade" v-for="(tab, i) in tabs" :key="i">
			<scroller lock-x  @on-scroll-bottom="onScrollBottom(tab, index, 'scroll')" ref="scrollerBottom" :scroll-bottom-offst="0" height="-0" class="hot-wrapper" v-show="i == index">
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
				      		<x-button mini type="warn" @click.native="addCart(goods)">加入购物车</x-button>
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
				type: 'New',
				tabKey: 'glNewTabsUrl',
				goodsKey: 'glNewGoodsUrl',
				glAllType: ['New', 'CAll'],
				query: {},
				tabs: [],
				index: 0,
			    onLoading: false
			}
		},
		methods: {
			onScrollBottom (tab, index, type) {
		      if (this.onLoading) {
		        // do nothing
		      } else {
		      	var _this = this;
		      	if(type == 'click'){
		      		this.query.tabId = tab.tabId;
		      		this.query.currentPage = tab.currentPage
		      		if(tab.goods.length) return;
		      	} 
		        this.onLoading = true;
		        if(!tab.hasMore) return;
				this.$utils.getJson(_this.goodsKey, function(res) {
					if(res.data.ResData) {
						if(res.data.ResData.length) {
							tab.goods = tab.goods.concat(res.data.ResData);
							tab.currentPage++;
		      				_this.query.currentPage = tab.currentPage;
						}else {
							tab.hasMore = false;
						}
					}
					_this.$nextTick(() => {
			        	_this.$refs.scrollerBottom[index].reset()
			        })
					_this.onLoading = false;
				}, function(error) {
					_this.onLoading = false;
				}, _this.query)
		      }
		    },
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
			for(var i = 0; i < _this.glAllType.length; i++) {
				if(_this.glAllType[i] == _this.$route.params.type) {
					_this.type = _this.$route.params.type;
					_this.tabKey = 'gl' + _this.type + 'TabsUrl';
					_this.goodsKey = 'gl' + _this.type + 'GoodsUrl';
					break;
				}
			}
			_this.query.cid =  _this.$route.query.cid || '';

			//获取tabs
			_this.$utils.getJson(_this.tabKey, function(res) {
				if(res.data.ResData) {
					_this.tabs = res.data.ResData;

					_this.tabs.forEach(function(tab,i){
					　　tab.currentPage = 1;
					})

					_this.query.tabId = _this.tabs[0].tabId;
					_this.query.currentPage = _this.tabs[0].currentPage;
					//获取tabs第一项商品数据
					_this.$utils.getJson(_this.goodsKey, function(res) {
						if(res.data.ResData) {
							_this.tabs[0].goods = res.data.ResData;
							_this.tabs[0].currentPage++;
		      				_this.query.currentPage = _this.tabs[0].currentPage;
						}else {

						}
					}, function(error) {}, _this.query)
				}else {

				}
			}, function(error) {}, _this.query)
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
