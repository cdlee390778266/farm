<template>
	<div class="category">
		<div class="nz-header">
			<flexbox>
		      	<flexbox-item :span="'58px'" class="address">
		      		<i></i><span class="nz-x-address-text">{{address}}</span>
		      		<x-address :title="title" v-model="value" :list="addressData" @on-shadow-change="onShadowChange" class="nz-x-address"></x-address>
		      	</flexbox-item>
		      	<flexbox-item class="search-wrapper">
		      		<form>
		      			<div class="search">
	      					<flexbox>
	      						<flexbox-item :span="'58px'" class="search-l">
	      							<i></i>
	      						</flexbox-item>
	      						<flexbox-item class="search-r">
									<input type="" name="">
	      						</flexbox-item>
	      					</flexbox>
		      			</div>
		      		</form>
		      	</flexbox-item>
		    </flexbox>
		</div>
		<div class="category-body">
			<div class="category-menu">
				<div class="category-line"></div>
				<ul>
					<li v-for="category in categorys" @click="changeTab(category.id)" :class="activeTabId == category.id ? 'active' : ''">{{category.name}}</li>
				</ul>
			</div>
			<div class="category-box">
				<transition-group name="fade">
					<div class="category-goods" :key="category.id" v-for="category in categorys" v-show="category.id == activeTabId">
						<grid :show-lr-borders="false" :show-vertical-dividers="false">
					      	<grid-item>
					       		<router-link :to="{ path:'/goodsList/CAll', query: { cid: category.id} }" class="more">查看全部 ></router-link>
					      	</grid-item>
					    </grid>
					    <grid :cols="3" :show-lr-borders="false" :show-vertical-dividers="false" class="goods-wrapper">
					      	<grid-item v-for="(goods, i) in category.goods" :span="'33.33333%'" :link="'/goods/' + goods.id" :key="i">
					       		<div class="goods">
      								<div class="goods-img" :style="'background-image: url(' + goods.imgUrl + ')'"></div>
      								<div class="ellipsis">{{goods.name}}</div>
      							</div>
					      	</grid-item>
					    </grid>
					</div>
			   	</transition-group>
			</div>
		</div>
	</div>
</template>
<script>
	import { XAddress, XInput, ChinaAddressV4Data} from 'vux'

	export default {
		components: {
			XAddress,
			XInput
		},
		data() {
			return {
				title: '',
				value: ["510100"],
				address: '',
				activeTabId: 0,
				addressData: ChinaAddressV4Data,
				showAddress: false,
				categorys: []
			}
		},
		methods: {
		    onShadowChange (ids, names) {
		      this.address = names[names.length - 1];
		    },
		    changeTab(categoryId) {
		    	this.activeTabId = categoryId;
		    }
		},
		created() {
			var _this = this;
			this.$utils.getJson('categoryUrl', function(res) {
				if(res.data.ResData) {
					_this.categorys = res.data.ResData;
					_this.activeTabId = _this.categorys[0].id;
				}
			}, function(error) {})
		}
	}
</script>
<style lang="scss">
  	.nz-header {
  		height: 50px;
  		line-height: 50px;
  	}
  	.category {
  		.nz-header {
  			position: fixed;
	  		top: 0;
	  		left: 0;
	  		right: 0;
  			background: #87cb62;
  		}
  		.address {
  			position: relative;
  			color: #fff;
  			font-size: 14px;
  			height: 50px;
  			line-height: 50px;
  			padding-left: 10px;
  			padding-right: 10px;
  			i {
  				display: inline-block;
  				width: 30px;
  				height: 40px;
  				background: url('/src/assets/images/icons.png') 0px -66px;
  			}
  			.nz-x-address-text {
  				position: relative;
  				top: -10px;
  			}
  			.nz-x-address {
  				position: absolute;
  				top: 0;
  				left: 0;
  				right: 0;
  				bottom: 0;
  				opacity: 0;
  			}
  		}
  		.search {
  			position: relative;
  			height: 36px;
  			line-height: 36px;
  			margin-right: 10px;
  			background: #b5df9e;
  			border-radius: 4px;
  			.search-l {
				i {
					position: relative;
					top: 6px;
					display: inline-block;
	  				width: 50px;
	  				height: 24px;
	  				background: url('/src/assets/images/icons.png') 11px -141px;
	  				border-right: 1px solid #9ed580;
				}
  			}
  			.search-r {
  				position: relative;
  				top: -1px;
  				height: 36px;
  				input {
  					border: none;
  					outline: none;
  					height: 36px;
  					width: 100%;
  					box-sizing:border-box;
					-moz-box-sizing:border-box; /* Firefox */
					-webkit-box-sizing:border-box; /* Safari */
  					padding-left: 20px;
  					padding-right: 20px;
  					background: transparent;
  					color: #94cb75;
  				}
  			}
  		}
  		.category-body {
  			position: fixed;
  			top: 50px;
  			left: 0;
  			bottom: 73px;
  			right: 0;
  			background: #fff;
  			.category-menu {
  				position: absolute;
  				top: 0;
  				left: 0;
  				bottom: 0;
  				width: 100px;
  				background: #eff4e3;
  				//border-right: 1px solid #dadada;
  				//box-shadow: 0px 3px 9px 0px #ddd;
  				overflow-y: auto;
  				overflow-x: hidden;
  				z-index: 2;
  				.category-line {
  					position: absolute;
	  				top: 0;
	  				right: 0;
	  				bottom: 0;
	  				width: 1px;
	  				background: #dadada;
  				}
  				li {
  					position: relative;
  					height: 60px;
  					line-height: 60px;
  					text-align: center;
  					border-bottom: 1px solid #dadada;
  					font-size: 14px;
  					color: #3c3c3c;
  					&.active {
  						background: #fff;
  						&:after {
  							content: '';
  							display: block;
  							position: absolute;
  							top: 0;
  							right: -5px;
  							bottom: 0;
  							width: 5px;
  							background: #fff;
  						}
  					}
  				}
  			}
  		}
  		.category-box {
  			position: absolute;
			top: 0;
			left: 108px;
			bottom: 0;
			right: 8px;
			padding-top: 10px;
			overflow-y: auto;
  			overflow-x: hidden;
  			.category-goods {
  				position: absolute;
  			}
			.weui-grids:before {
				border-top: none;
			}
			.more {
				padding: 8px 20px; 
				border: 1px solid #fd8727;
				color: #fd8727;
				border-radius: 4px;
			}
			.goods-wrapper {
				padding-top: 10px;
				.weui-grid {
					padding-top: 0;
				}
				.goods {
					text-align: center;
					color: #3c3c3c;
					.goods-img {
						padding-top: 100%;
						border-radius: 4px;
						border: 1px solid #f1f1f1;
						background-size: cover;
						margin-bottom: 10px;
					}
				}
			}
  		}
  	}
</style>
