<template>
	<div class="orderList">
		<tab :line-width=2 active-color='#fff' v-model="index" bar-active-color="#fff" default-color="#abf384">
        	<tab-item @on-item-click="onScrollBottom(tab, index, 'click')" class="vux-center" :selected="index == 0 ? true : false"  v-for="(tab, index) in tabs"  :key="index">{{tab.title}}</tab-item>
      	</tab>
		
		<transition name="fade" v-for="(tab, i) in tabs" :key="i">
			<scroller lock-x  @on-scroll-bottom="onScrollBottom(tab, index, 'scroll')" ref="scrollerBottom" :scroll-bottom-offst="0" height="-0" class="hot-wrapper" v-show="i == index">
			  	<div class="box">
			  		<div class="order" v-for="(order, index) in tab.orderList" :key="index">
						<flexbox class="vux-1px-t order-box">
					      	<flexbox-item :span="'90px'">
					      		<router-link :to="'/order/' + order.gid" :style="'background-image: url( ' + order.imgUrl + ')'" class="order-img"></router-link>
					      	</flexbox-item>
					      	<flexbox-item class="order-desc">
					      		<h1>订单号：{{order.id}}</h1>
					      		<p>
						      		共{{order.num}}件商品
						      		<span>合计：￥{{order.totalPrice}}</span>
					      		</p>
					      	</flexbox-item>
					    </flexbox>
					    <!-- 已完成 -->
					    <div class="order-handle vux-1px-tb" v-if="tabs[0].tId == tab.tId">
					    	已付款待配送
							<x-button class="order-btn" type="default"  mini @click.native="deleteOrder(order)">删除订单</x-button>
							<x-button class="order-btn" type="default"  mini :link="'/admin/orderBack/' + order.id">我要退货</x-button>
					    </div>
					    <!-- 待收货 -->
					    <div class="order-handle vux-1px-tb" v-if="tabs[1].tId == tab.tId">
					    	待收货
							<x-button class="order-btn" type="default"  mini :link="'/admin/orderEvaluate/' + order.id">确认收货</x-button>
					    </div>
					    <!-- 配送中 -->
					    <div class="order-handle vux-1px-tb" v-if="tabs[2].tId == tab.tId">
					    	配送中
					    </div>
					    <!-- 退货中 -->
					    <div class="order-handle vux-1px-tb" v-if="tabs[3].tId == tab.tId">
					    	退货处理中
					    </div>
					</div>
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
						tId: 0,
						title: '已完成',
						orderApiKey: 'orderComplete',
						orderList: [],
						currentPage: 1,
						hasMore: true
					},
					{
						tId: 10,
						title: '待收货',
						orderApiKey: 'orderReceive',
						orderList: [],
						currentPage: 1,
						hasMore: true
					},
					{
						tId: 2,
						title: '配送中',
						orderApiKey: 'orderDistribution',
						orderList: [],
						currentPage: 1,
						hasMore: true
					},
					{
						tId: 3,
						title: '退货中',
						orderApiKey: 'orderBack',
						orderList: [],
						currentPage: 1,
						hasMore: true
					}
				],
				user: {},
				index: 0,
			    onLoading: false
			}
		},
		methods: {
			onScrollBottom (tab, index, type) {
		      if (this.onLoading) {
		      } else {
		      	var _this = this;
		      	if(type == 'click'){
		      		if(tab.orderList.length) return;
		      	} 
		        if(!tab.hasMore) return;
		        this.onLoading = true;
				this.$utils.getJson(tab.orderApiKey, function(res) {
					if(res.data.ResData) {
						if(res.data.ResData.length) {
							tab.orderList = tab.orderList.concat(res.data.ResData);
							tab.currentPage++;
						}else {
							tab.hasMore = false;
						}
					}
					_this.$nextTick(() => {
			        	_this.$refs.scrollerBottom[index].reset()
			        })
					_this.onLoading = false;
					tab.hasMore = false;
				}, function(error) {
					_this.onLoading = false;
				}, {userId: _this.user.userId, orderType: tab.tId, currentPage: tab.currentPage})
		      }
		    },
		    deleteOrder(order) {
		    	var _this = this;
		    	_this.$utils.showConfirm('success', '109', function() {
	    			_this.tabs[0].orderList.splice(_this.tabs[0].orderList.indexOf(order), 1);
	    		});
		    }
		},
		created() {
			var _this = this;
			_this.user = _this.$utils.getUser();
			//获取已完成商品数据
			_this.$utils.getJson(_this.tabs[0].orderApiKey, function(res) {
				if(res.data.ResData) {
					_this.tabs[0].orderList = res.data.ResData;
					_this.tabs[0].currentPage++;
				}else {

				}
			}, function(){}, {userId: _this.user.userId, orderType: _this.tabs[0].tId, currentPage: _this.tabs[0].currentPage})
		}
	}
</script>
<style lang="scss">
	.orderList {
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
		.order {
			margin-bottom: 10px;
			background: #fff;
			.order-box {
				padding: 15px;
			}
			.order-img {
				display: block;
				padding-top: 100%;
				background-size: cover;
				border-radius: 4px;
			}
			.order-desc {
				font-size: 14px;
				h1 {
					font-size: 14px;
					color: #3c3c3c;
				}
				p {
					margin-top: 20px;
					span {
						display: block;
						font-size: 12px;
					}
				}
			}
			.order-handle {
				padding: 10px 15px;
				line-height: 28px;
				color: #87cb62;
				overflow: hidden;
				.order-btn {
					margin-top: 0px;
					float: right;
					margin-left: 10px;
					border: 1px solid #3c3c3c;
					color: #3c3c3c;
				}
			}
		}
	}
</style>
