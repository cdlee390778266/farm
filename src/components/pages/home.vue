<template>
  <div class="home">
  	<!-- 广告图 -->
    <swiper :loop="true" :auto="false" :interval="3000" :list="bannerList" style="width:100%;" :aspect-ratio="280/640" :show-desc-mask="false" dots-class="home-dot"></swiper>
    <!-- 九宫格 -->
    <div class="lattice">
	    <grid :show-vertical-dividers="false" :show-lr-borders="false">
	      <grid-item v-for="lattice in lattices" :key="lattice.imgUrl" :link="lattice.link">
	      	<span class="lattice-icon" :class="lattice.bgClass">
	      		<!-- <img :src="lattice.imgUrl"> -->
	      		<x-img :src="lattice.imgUrl" :default-src="'/src/assets/images/default.gif'"></x-img>
	      	</span>
	        <span class="lattice-label">{{lattice.label}}</span>
	      </grid-item>
	    </grid>
    </div>
    <!-- 商品推荐 -->
    <div class="goods">
    	<div class="home-bar">
    		<i :class="hotGoods.iBgClass"></i><strong>{{hotGoods.title}}</strong><span>/{{hotGoods.titleEn | uppercase}}</span>
    		<router-link to="/hot">更多 »</router-link>
    	</div>
    	<div class="goods-wrapper">
			<grid :show-vertical-dividers="false" :show-lr-borders="false" :cols="3">
		      <grid-item v-for="(g, i) in hotGoods.goods" :key="i">
		      	<router-link :to="g.link" class="goods-item">
			      	<div class="good-img" :style="'background-image: url('+ g.imgUrl +')'"></div>
			      	<span class="ellipsis">{{g.title}}</span>
		      	</router-link>
		      </grid-item>
		    </grid>
    	</div>
    </div>
    <!-- 套餐推荐 -->
    <div class="goods">
    	<div class="home-bar">
    		<i :class="hotSm.iBgClass"></i><strong>{{hotSm.title}}</strong><span>/{{hotSm.titleEn | uppercase}}</span>
    		<router-link to="/hot">更多 »</router-link>
    	</div>
    	<div class="goods-wrapper">
			<grid :show-vertical-dividers="false" :show-lr-borders="false" :cols="3">
		      <grid-item v-for="(g, i) in hotSm.goods" :key="i">
		      	<router-link :to="g.link" class="goods-item">
			      	<div class="good-img" :style="'background-image: url('+ g.imgUrl +')'"></div>
			      	<span class="ellipsis">{{g.title}}</span>
		      	</router-link>
		      </grid-item>
		    </grid>
    	</div>
    </div>
    <!-- 最新主题 -->
    <div class="theme">
    	<div class="home-bar">
    		<i :class="theme.iBgClass"></i><strong>{{theme.title}}</strong><span>/{{theme.titleEn | uppercase}}</span>
    	</div>
    	<div class="theme-wrapper">
    		<panel :list="theme.theme"></panel>
    	</div>
    </div>
    <!-- 电话 -->
    <div class="theme-phone">
    	<x-button type="primary">400-607-1177</x-button>
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
  			defaultBanner:  [
  				{
		          "url": "javascript:",
		          "img": "/src/assets/images/home-banner1.png",
		          "title": "",
		          "fallbackImg": "/src/assets/images/default.gif"
		        }
  			],
  			bannerList: [],
			lattices: [
	  			{
				  label: '全部食材',
				  imgUrl: '/src/assets/images/icons/icon9.png',
				  bgClass: 'bg1',
				  link: '/goodsList/1'
				},
				{
				  label: '新品上架',
				  imgUrl: '/src/assets/images/icons/icon10.png',
				  bgClass: 'bg2',
				  link: '/goodsList/2'
				},
				{
				  label: '营养套餐',
				  imgUrl: '/src/assets/images/icons/icon11.png',
				  bgClass: 'bg3',
				  link: '/goodsList/3'
				},
				{
				  label: '积分商城',
				  imgUrl: '/src/assets/images/icons/icon12.png',
				  bgClass: 'bg4',
				  link: '/goodsList/4'
				},
				{
				  label: '网点分布',
				  imgUrl: '/src/assets/images/icons/icon13.png',
				  bgClass: 'bg5',
				  link: '/goodsList/5'
				}
			],
			hotGoods: {},
			hotSm: {},
			theme: {}
  		}
  	},
  	filters: {
	  uppercase: function (value) {
	    if (!value) return ''
	    return value.toUpperCase();
	  }
	},
	created() {
		var _this = this;
		//banner
		this.$utils.getJson('hBannerUrl', function(res) {
			console.log("message");
			if(res.data.ResData) {
				_this.bannerList = res.data.ResData;
			}else {
				_this.bannerList = _this.defaultBanner;
			}
		}, function(error) {
			_this.bannerList = _this.defaultBanner;
		})
		//推荐商品
		this.$utils.getJson('hHotGoodsUrl', function(res) {
			if(res.data.ResData) {
				_this.hotGoods = res.data.ResData;
			}
		})
		//推荐套餐
		this.$utils.getJson('hHotSmUrl', function(res) {
			if(res.data.ResData) {
				_this.hotSm = res.data.ResData;
			}
		})
		//最新主题
		this.$utils.getJson('hThemeUrl', function(res) {
			if(res.data.ResData) {
				_this.theme = res.data.ResData;
			}
		})
	}
  }
</script>
<style lang="scss">
  .home {
  	padding-bottom: 100px;
  	.vux-slider {
  		overflow: visible;
  	}
  	.vux-swiper {
		box-shadow: 0 0 3px 3px #9c9b9b;
  	}
	.home-dot {
		left: 0 !important;
		right: 0 !important	;
		bottom: -40px !important;
		width: 100%;
		line-height: 40px;
		background: url('/src/assets/images/home-dot-bg.png') repeat-x #f4f3f3;
		-webkit-transform: translateX(0) !important	;
    	transform: translateX(0) !important;
    	text-align: center;
    	& > a {
    		float: none !important;
    		margin-left: 10px !important;
    		i {
    			width: 16px !important;
    			height: 16px !important;
    			background: url('/src/assets/images/icons.png') -4px -4px;
    			background-color: transparent !important;
    			&.active {
    				background: url('/src/assets/images/icons.png') -4px -28px;
    				background-color: transparent !important;
    			}
    		}
    	}
	}
	.lattice {
		margin-top: 40px;
		.weui-grid {
			padding-left: 5px;
			padding-right: 5px;
			padding-top: 30px;
			padding-bottom: 30px;
		}
		.lattice-icon {
			display: block;
			width: 40px;
			height: 40px;
			line-height: 40px;
			overflow: hidden;
			margin-left: auto;
			margin-right: auto;
			text-align: center;
			border-radius: 100%;
			&:before {
				content: '';
				display: table-cell;
				vertical-align: middle;
			}
			&.bg1 {
				background-color: #d5e472;
			}
			&.bg2 {
				background-color: #e4728d;
			}
			&.bg3 {
				background-color: #72d0e4;
			}
			&.bg4 {
				background-color: #f6ae6e;
			}
			&.bg5 {
				background-color: #7ac6f2;
			}
			img {
				vertical-align: middle;
				width: 14px;
			}
		}
		.lattice-label {
			display: block;
			text-align: center;
			color: #313131;
			margin-top: 5px;
			font-size: 12px;
		}
	}
	.home-bar {
		line-height: 50px;
		padding-left: 10px;
		padding-right: 10px;
		background: url('/src/assets/images/home-bar-bg.png') repeat-x #f4f3f3;
		i {
			display: inline-block;
			width: 8px;
			height: 30px;
			margin-right: 10px;
			position: relative;
			top: 10px;
			&.bg1 {
				background-color: #ffc11c;
			}
			&.bg2 {
				background-color: #87cb62;
			}
			&.bg3 {
				background-color: #6291cb;
			} 
		}
		strong {
			font-size: 16px;
			color: #3c3c3c;
		}
		span {
			font-size: 14px;
			color: #b2afaf;
		}
		a {
			float: right;
			color: #696969;
		}
	}
	.goods {
		.goods-wrapper {
			padding-top: 10px;
			.weui-grids:before {
				border-top: none !important;
			}
			.weui-grid {
				padding-bottom: 10px;
				padding-top: 0px;
			}
			.weui-grid:nth-child(3n) {
				padding-left: 3.3333px;

			}
			.weui-grid:nth-child(3n+1) {
				padding-right: 3.3333px;
				clear: left;
			}
			.weui-grid:nth-child(3n+2) {
				padding-left: 6.6666px;
				padding-right: 6.6666px;
			}
			.goods-item {
				display: block;
				box-shadow: 0 1px 2px 0px #bbb;
				border-radius: 4px;
				.good-img {
					height: 0;
					padding-top: 100%;
					background-size: cover;
				}
				& > span {
					padding-left: 10px;
					padding-right: 10px;
					line-height: 40px;
					color: #313131;
					text-align: center;
				}
			}
		}
	}
	.theme-phone {
		margin-top: 20px;
		padding-left: 10px;
		padding-right: 10px;
		.weui-btn_primary {
			background-color: #87cb62;
		}
	}
  }
</style>
