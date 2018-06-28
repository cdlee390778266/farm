<template>
  <div class="home">
  	<!-- 广告图 -->
    <swiper :loop="true" :auto="false" :interval="3000" :list="bannerList" style="width:100%;" :aspect-ratio="280/640" :show-desc-mask="false" dots-class="home-dot"></swiper>
    <!-- 九宫格 -->
    <div class="lattice">
	    <grid :show-vertical-dividers="false" :show-lr-borders="false">
	      <grid-item v-for="lattice in lattices" :key="lattice.imgUrl" :link="lattice.link">
	      	<span class="lattice-icon" :class="lattice.bgClass"><img :src="lattice.imgUrl"></span>
	        <span class="lattice-label">{{lattice.label}}</span>
	      </grid-item>
	    </grid>
    </div>
    <!-- 商品推荐 -->
    <div class="goods" v-for="(item, i) in goods" :key="i">
    	<div class="home-bar">
    		<i :class="item.iBgClass"></i><strong>{{item.title}}</strong><span>/{{item.titleEn | uppercase}}</span>
    		<router-link :to="item.moreLink">更多 »</router-link>
    	</div>
    	<div class="goods-wrapper">
			<grid :show-vertical-dividers="false" :show-lr-borders="false" :cols="3">
		      <grid-item v-for="(g, i) in item.goods" :key="i">
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
  			bannerList: [
	  			{
				  url: 'javascript:',
				  img: '/src/assets/images/home-banner1.png',
				  title: '',
				  fallbackImg: '/src/assets/images/default.gif'
				},
				{
				  url: 'javascript:',
				  img: '/src/assets/images/home-banner1.png',
				  title: '',
				  fallbackImg: '/src/assets/images/default.gif'
				},
				{
				  url: 'javascript:',
				  img: '/src/assets/images/home-banner1.png',
				  title: '',
				  fallbackImg: '/src/assets/images/default.gif'
				}
			],
			lattices: [
	  			{
				  label: '全部食材',
				  imgUrl: '/src/assets/images/icons/icon9.png',
				  bgClass: 'bg1',
				  link: '/category/1'
				},
				{
				  label: '新品上架',
				  imgUrl: '/src/assets/images/icons/icon10.png',
				  bgClass: 'bg2',
				  link: '/category/2'
				},
				{
				  label: '营养套餐',
				  imgUrl: '/src/assets/images/icons/icon11.png',
				  bgClass: 'bg3',
				  link: '/category/3'
				},
				{
				  label: '积分商城',
				  imgUrl: '/src/assets/images/icons/icon12.png',
				  bgClass: 'bg4',
				  link: '/category/4'
				},
				{
				  label: '网点分布',
				  imgUrl: '/src/assets/images/icons/icon13.png',
				  bgClass: 'bg5',
				  link: '/category/5'
				}
			],
			goods: [
				{
					iBgClass: 'bg1',
					title: '商品推荐',
					titleEn: 'Recommend',
					moreLink: '',
					goods: [
						{
							imgUrl: '/src/assets/images/goods1.png',
							title: '野生鲜洋葱',
							link: '/goods/100'
						},
						{
							imgUrl: '/src/assets/images/goods2.png',
							title: 'EKU香菇',
							link: '/goods/100'
						},
						{
							imgUrl: '/src/assets/images/goods3.png',
							title: '巴山有机土青',
							link: '/goods/100'
						},
						{
							imgUrl: '/src/assets/images/goods4.png',
							title: '有机从岭藏红鱼',
							link: '/goods/100'
						},
						{
							imgUrl: '/src/assets/images/goods5.png',
							title: '有机牛心鸡蛋',
							link: '/goods/100'
						},
						{
							imgUrl: '/src/assets/images/goods6.png',
							title: '有机红椒',
							link: '/goods/100'
						}
					]
				},
				{
					iBgClass: 'bg2',
					title: '套餐推荐',
					titleEn: 'set meal',
					moreLink: '',
					goods: [
						{
							imgUrl: '/src/assets/images/goods7.png',
							title: '有机从岭藏南瓜',
							link: '/goods/100'
						},
						{
							imgUrl: '/src/assets/images/goods8.png',
							title: '五常有机稻花大蒜',
							link: '/goods/100'
						},
						{
							imgUrl: '/src/assets/images/goods9.png',
							title: '月意情浓.蔬荟萝卜',
							link: '/goods/100'
						}
					]
				}
			],
			theme: {
				iBgClass: 'bg3',
				title: '最新主题',
				titleEn: 'theme',
				moreLink: '',
				theme: [
					{
						src: '/src/assets/images/theme1.png',
						fallbackSrc: '/src/assets/images/default.gif',
						title: '有"肌"生活,健康享"瘦"',
						desc: '量身定制，合理搭配，让健身餐不再无奈',
						url: '/goods/100'
					},
					{
						src: '/src/assets/images/theme2.png',
						fallbackSrc: '/src/assets/images/default.gif',
						title: '有机香葵鸡',
						desc: '一尝香葵鸡，满口葵籽香',
						url: '/goods/100'
					},
					{
						src: '/src/assets/images/theme3.png',
						fallbackSrc: '/src/assets/images/default.gif',
						title: '巴山土猪肉',
						desc: '一场舌尖上的世纪邂逅',
						url: '/goods/100'
					},
					{
						src: '/src/assets/images/theme4.png',
						fallbackSrc: '/src/assets/images/default.gif',
						title: '有"肌"生活,健康享"瘦"',
						desc: '量身定制，合理搭配，让健身餐不再无奈',
						url: '/goods/100'
					}
				]
			}
  		}
  	},
  	filters: {
	  uppercase: function (value) {
	    if (!value) return ''
	    return value.toUpperCase();
	  }
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
