<template>
  <div class="goods">
  	<!-- 商品图片 -->
    <swiper :loop="true" :auto="false" :interval="3000" :list="goods.imgs" style="width:100%;" :aspect-ratio="551/758" :show-dots="false"></swiper>
   	
   	<div class="bar vux-1px-t vux-1px-b">
   		<div class="bar-l">￥<span>{{goods.price}}</span></div>
   		<div class="bar-r">
   			<x-icon type="ios-heart-outline" size="30" v-show="!goods.isCollect" @click="toggleCollect"></x-icon>
   			<x-icon type="ios-heart" size="30" v-show="goods.isCollect" @click="toggleCollect"></x-icon>
   			<x-button mini type="warn" @click.native="addCart">加入购物车</x-button>
   		</div>
   	</div>

   	<tab :line-width=2 v-model="index" custom-bar-width="60%" bar-active-color="#87cb62" default-color="#333333" active-color="#87cb62" class="nz-tab">
    	<tab-item class="vux-center" :selected="index == 0 ? true : false"  v-for="(tab, index) in tabs" :class="{'vux-1px-r nz-vux-1px-r': index===0}"  :key="index" @on-item-click="toggleTab(index)">{{tab}}</tab-item>
  	</tab>

  	<div class="tab-content">
  		<transition-group name="fade">
		  	<div class="content-item" v-show="index == 0" key="0">
				<div class="pd10">
					<p class="gray">规格：<span class="c1">{{details.type}}</span></p>
					<p class="gray">库存: <span class="red">{{details.Stock}}</span></p><br>
					<p>{{details.detail}}</p>
				</div>
			</div>
		  	<div class="content-item" v-show="index == 1" key="1">
				<div class="evaluate-wrapper">
					<div class="evaluate-item vux-1px-b" v-for="evaluate in evaluates">
						<div class="evaluate-header">
							<span class="user-face" :style="'background-image: url(' + evaluate.faceUrl + ')'"></span><span>{{evaluate.name}}</span><i>{{evaluate.date}}</i>
						</div>
						<div class="evaluate-body">
							{{evaluate.comment}}
						</div>
					<div class="evaluate-footer">
						规格：{{evaluate.type}}
					</div>
					</div>
					<div class="loader" @click="getMore">
						<div v-show="!onLoading">加载更多</div>
						<div v-show="onLoading"><spinner type="ios-small" size="'40px"></spinner>加载中...</div>
					</div>
				</div>
			</div>
		</transition-group>
  	</div>
  </div>
</template>
<script>
  import { Swiper, SwiperItem } from 'vux'
  export default {
  	components: {
  		Swiper, 
  		SwiperItem
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
  			goods: {
		      id: "",
		      name: "",
		      price: "",
		      isCollect: false,
		      imgs: []
		    },
		    details: {},
		    evaluates: [],
  			tabs: ['商品详情', '评价'],
  			index: 0,
  			onLoading: false,
  			page: 1,
  			pageSize: 10
  		}
  	},
  	methods: {
  		toggleTab(index) {
  			if(index == 1 && !this.evaluates.length) {
  				var _this = this;
				//评价
				this.$utils.getJson('/src/assets/data/goods/evaluates.json', function(res) {
					_this.evaluates = res.data.ResData;
					_this.page++;
				}, function(error) {}, {gid: _this.$route.params.id, page: _this.page, pageSize: _this.pageSize})
  			}
  		},
		toggleCollect() {
			var _this = this;
			//goodsImgs
			this.$utils.getJson('/src/assets/data/goods/goods.json', function(res) {
				_this.goods.isCollect = !_this.goods.isCollect;
				_this.$utils.showTip('success', '101');
			}, function(error) {
				_this.$utils.showTip('error', '-1010');
			})
		},
		addCart() {
			if(!this.goods.id) {
				_this.$utils.showTip('error', '-1010');
				return;
			}
			this.$utils.addCart({
				id: this.goods.id,
				price: this.goods.price,
				num: 1, 
				total: this.goods.price
			})
			this.$utils.showTip('success', '101');
		},
		getMore() {
			if(!this.onLoading) {
				this.onLoading = true;
				var _this = this;
				this.$utils.getJson('/src/assets/data/goods/evaluates.json', function(res) {
					if(res.data.ResData) {
						_this.evaluates = _this.evaluates.concat(res.data.ResData);
						_this.page++;
						_this.onLoading = false;
					}
				}, function(error) {
					_this.onLoading = false;
				}, {gid: _this.$route.params.id, page: _this.page, pageSize: _this.pageSize})
			}
		}
  	},
	created() {
		var _this = this;
		//goods
		this.$utils.getJson('/src/assets/data/goods/goods.json', function(res) {
			if(res.data.ResData) {
				_this.goods = res.data.ResData;
			}else {
				_this.goods.imgs = _this.defaultImg;
			}
		}, function(error) {
			_this.goods.imgs = _this.defaultImg;
		}, {gid: _this.$route.params.id})
		//商品详情
		this.$utils.getJson('/src/assets/data/goods/details.json', function(res) {
			if(res.data.ResData) {
				_this.details = res.data.ResData;
			}
		}, function(error) {}, {gid: _this.$route.params.id})
	}
  }
</script>
<style lang="scss">
	.goods {
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
				color: #3c3c3c;
				span {
					color: #ff0000;
				}
			}
			.bar-r {
				float: right;
				svg {
					position: relative;
					top: 10px;
					fill: #b7b5b5;
					margin-right: 10px;
					&.vux-x-icon-ios-heart {
						fill: #ee4646;
					}
				}
			}
		}
		.nz-vux-1px-r:after {
			top: 8px;
			bottom: 8px;
		}
		.nz-tab {
			.vux-tab {
				background: #f5f2f2;
				.vux-tab-item {
					font-size: 16px;
				}
			}
		}
		.tab-content {
			position: relative;
			.content-item {
				position: absolute;
				top: 0;
				left: 0;
				right: 0;
				color: #3c3c3c;
				font-size: 14px;
				p {
					text-indent: 2rem;
				}
				.gray {
					font-size: 13px;
					text-indent: 0;
				}
			}
		}
		.evaluate-wrapper {
			.evaluate-item {
				padding: 0 10px;
				.evaluate-header {
					line-height: 60px;
					font-size: 16px;
					color: #202020;
					.user-face {
						position: relative;
						top: 14px;
						display: inline-block;
						width: 40px;
						height: 40px;
						border-radius: 100%;
						margin-right: 10px;
						background-size: cover;
					}
					i {
						position: relative;
						top: 5px;
						font-style: normal;
						float: right;
						font-size: 12px;
						color: #909090;
					}
				}
				.evaluate-body {
					color: #5c5c5c;
					font-size: 14px;
				}
				.evaluate-footer {
					color: #909090;
					padding: 10px 0;
				}
			}
		}
		.loader {
			line-height: 50px;
			text-align: center;
			color: #999;
			svg {
				position: relative;
				top: -2px;
			}
		}
	}
</style>
