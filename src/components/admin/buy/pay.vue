<template>
	<div class="order">
		<div class="order-body">
			<flexbox class="vux-1px-b order-user">
		      <flexbox-item span="50px" class="tc">
		      	<img src="/src/assets/images/icons/icon14.png" width="20px">
		      </flexbox-item>
		      <flexbox-item>
				<p>收货人：点点点 <span>13684054023</span></p>
				<p class="gray">成都市青羊区西安南路88号</p>
		      </flexbox-item>
		    </flexbox>
			
			<div class="goods-wrapper vux-1px-t">
			    <flexbox class="goods vux-1px-b" v-for="(goods, index) in order.goods" :key="index">
			      	<flexbox-item :span="'90px'" class="goods-img">
			      		<router-link :to="'/goods/' + goods.id" :style="'background-image: url( ' + goods.imgObj.img + ')'"></router-link>
			      	</flexbox-item>
			      	<flexbox-item class="goods-desc">
			      		<h1 class="ellipsis">{{goods.name}}</h1>
			      		<p>￥<strong class="f00">{{goods.price}}</strong><i>х<span>{{goods.num}}</span></i></p>
			      		<p class="goods-nums gray">小计：{{goods.price * goods.num}}</p>
			      	</flexbox-item>
				</flexbox>
			</div>

			<group label-width="4.5em">
		      <cell title="支付方式" :value="order.pay.label"></cell>
		      <cell title="自提网点" :value="order.address.address"></cell>
		      <cell title="配送时间" :value="order.pDate"></cell>
		      <cell title="备注" :value="order.bValue"></cell>
		    </group>
		</div>
		<div class="order-footer vux-1px-t">
			<x-button type="warn" @click.native="togglePop">{{order.pay.label}}{{order.total}}元</x-button>
		</div>
		<div v-transfer-dom>
	      <popup v-model="isShowPop" is-transparent style="background-color:#fff;">
	        <popup-header
	        left-text="取消"
	        title="支付详情"
	        :show-bottom-border="false"
	        @on-click-left="isShowPop = false"
	        ></popup-header>
	        <group class="pay-body">
				<cell title="需支付" :value="order.total + '元'"></cell>
			</group>
	         <div style="padding:20px 15px;">
	          <x-button type="warn" @click.native="pay">确认支付</x-button>
	         </div>
	      </popup>
	    </div>
	</div>
</template>
<script>
	import { Actionsheet, PopupHeader, Popup, TransferDom} from 'vux'
	export default {
		directives: {
		    TransferDom
		},
		components: {
		    Actionsheet,
		    Popup,
		    PopupHeader
		},
		data() {
			return {
				isShowPop: false,
				order: {
					total: 0,
					num: 0,
					dDate: '',
					pDate: '',
					goods: [],
					pay: {
						label: '',
						value: ''
					},
					address: {
						value: [],
						address: ''
					},
					bValue: ''
				},
			}
		},
		methods: {
		    togglePop() {
		    	this.isShowPop = !this.isShowPop;
		    },
		    pay() {
		    	var _this = this;
		    	this.isShowPop = false;
		    	this.$utils.showTip('success', '107', function(){}, function() {
		    			_this.$router.push('/home');
		    	});
		    }
		},
		created() {
			var orderId = this.$route.params.orderId;
			var order = this.$utils.getOrder(orderId);
			if(order) {
				this.order = order;
			}
		}
	}
</script>
<style lang="scss">
  	.order {
  		.nz-x-address {
  			.weui-cell__ft {
				position: relative;
				.vux-cell-box {
					position: absolute;
		  			top: 0;
		  			right: 0;
		  			bottom: 0;
		  			left: 0;
		  			opacity: 0;
				}
  			}
  		}
  		.order-body {
  			.order-user {
  				padding-top: 15px;
  				padding-bottom: 15px;
  				background: #fff;
  				p {
  					padding-right: 10px;
  					span {
	  					float: right;
	  				}
  				}
  			}
  			.goods-wrapper {
  				margin-top: 20px;
  				background: #fff;
	  			.goods {
					.goods-img {
						padding: 10px;
						padding-right: 0;
						a {
							display: block;
							padding-top: 100%;
							background-size: cover;
							border-radius: 4px;
						}
					}
					.goods-desc {
						padding-right: 10px;
						font-size: 14px;
						h1 {
							font-size: 14px;
							color: #3c3c3c;
						}
						p {
							i {
								margin-left: 20px;
								font-size: 12px;
								color: #787878;
								font-style: normal;
							}
						}
						.goods-nums {
							margin-top: 20px;
						}
					}
				}
			}
			.order-bar {
				margin-top: 20px;
				background: #fff;
				padding: 15px 10px;
				h1 {
					font-size: 14px;
					font-weight: normal;
				}
				input {
					box-sizing: border-box;
					width: 100%;
					height: 36px;
					line-height: 36px;
					padding: 0 10px;
					margin: 0;
					margin-top: 5px;
					border: none;
					outline: none;
					border-radius: 4px;
					background: #e6e6e6;
				}
			}
  		}
  		.order-footer {
  			position: fixed;
			left: 0;
			right: 0;
			bottom: 0px;
			height: 50px;
			color: #333;
			background: #fafafa;
			z-index: 9;
  		}
  		.weui-btn_warn {
			background: #ef4040;
			border-radius: 0;
		}
  	}
  	.pay-body {
 		.weui-cell {
  			padding-top: 40px !important;
			padding-bottom: 40px !important;
  		}
		.weui-cells:after{
			display: none;
		}
	}
</style>
