<template>
	<div class="orderBack">
		<div class="order-body">
			<flexbox class="vux-1px-b order-user">
		      <flexbox-item span="50px" class="tc">
		      	<img src="/src/assets/images/icons/icon14.png" width="20px">
		      </flexbox-item>
		      <flexbox-item>
				<p>收货人：{{order.userInfo.rRelName}} <span>{{order.userInfo.rMPhone}}</span></p>
				<p class="gray">{{order.userInfo.rAddress}}</p>
		      </flexbox-item>
		    </flexbox>
			
			<div class="goods-wrapper vux-1px-t">
			    <flexbox class="goods vux-1px-b">
			      	<flexbox-item :span="'90px'" class="goods-img">
			      		<router-link :to="'/goods/' + order.goods.id" :style="'background-image: url( ' + order.goods.imgObj.img + ')'"></router-link>
			      	</flexbox-item>
			      	<flexbox-item class="goods-desc">
			      		<h1 class="ellipsis">{{order.goods.name}}</h1>
			      		<p>￥<strong class="f00">{{order.goods.price}}</strong><i>х<span>{{order.goods.num}}</span></i></p>
			      		<p class="goods-nums gray">小计：{{order.goods.price * order.goods.num}}</p>
			      	</flexbox-item>
				</flexbox>
			</div>

			<group label-width="4.5em">
		      <cell title="支付方式" value="微信支付"></cell>
		      <cell title="下单时间" class="order-time">2017-8-10 <span>15:10:30</span></cell>
		    </group>

		    <group>
		       <cell title="订单状态" value="已完成"></cell>
		    </group>

		    <div class="contact">
		    	<x-button link="/contact"><img  src="/src/assets/images/icons/icon20.png"/>联系客服</x-button>
		    </div>

		</div>
		<div class="order-footer vux-1px-t">
	  		<flexbox class="order-smt">
	  			<flexbox-item class="order-btn" @click.native="backGoods">
	  				退货
	  			</flexbox-item>
	  		</flexbox>
		</div>
	</div>
</template>
<script>
	export default {
		data() {
			return {
				order: {
					total: 0,
					num: 0,
					isPay: false,
					userInfo: {},
					dDate: (new Date()).toLocaleDateString().replace(/\//g, '-'),
					pDate: (new Date()).toLocaleDateString().replace(/\//g, '-'),
					goods: {
				      "id": 0,
				      "name": "",
				      "num": 0,
				      "price": 0,
				      "imgObj": {
				      }
				    },
					pay: {
						label: '',
						value: ''
					},
					address: {
						value: ["510000", "510100", "510104"],
						address: ''
					},
					bValue: ''
				},
				pay: {
					show: false,
					menu: [
						{
					        label: '微信支付',
					        value: 'pay0'
					    },
					    {
					        label: '支付宝支付',
					        value: 'pay1'
					    },
					    {
					        label: 'QQ支付',
					        value: 'pay2'
					    }
			      	],
				},
				address: {
					title: '',
					
				},
				date: {
					title: '配送时间',
					clearText: '选择配送时间',
					desc: '提前2天下单享98折优惠(周末不配送）'
				}
			}
		},
		methods: {
		    backGoods() {
		    	var _this = this;
		    	this.$utils.showConfirm('success', '110', function() {
		    		_this.$utils.showAlert('success', '1100', function() {}, function() {
		    			_this.$router.push({ name: 'orderList'})
		    		})
		    		
		    	});
		    }
		},
		created() {
			var _this = this;
			var gid = _this.$route.params.gid;
			var user = _this.$utils.getUser();
			//获取用户信息
			_this.$utils.getJson('userInfo', function(res) {
				if(res.data.ResData) {
					_this.order.userInfo = res.data.ResData;
				}
			}, function(error) {}, {userId: user.userId})
			//获取积分商品
			_this.$utils.getJson('integralOrderGoods', function(res) {
				if(res.data.ResData) {
					_this.order.goods = res.data.ResData;
				}
			}, function(error) {}, {userId: user.userId})
			this.order.pay = this.pay.menu[0];
		}
	}
</script>
<style lang="scss">
  	.orderBack {
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
			.order-time {
				span {
					display: block;
					font-size: 12px;
				}
			}
			.contact {
				padding: 15px;
				margin-top: 20px;
				button {
					color: #999;
					padding-top: 5px;
					padding-bottom: 5px;
					font-size: 16px;
					background: #fafafa;
					border: 1px solid #7c7c7c;
					img {
						position: relative;
						top: 4px;
						width: 14px;
						margin-right: 10px;
					}
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
			.order-smt {
				height: 50px;
				.order-smt-l {
					padding-left: 10px;
				}
				.order-mes {
					height: 50px;
					line-height: 50px;
					color: #999999;
					background: #7d7d7d;
					.order-all-price {
						font-size: 16px;
						color: #fff;
						padding-left: 10px;
						white-space: nowrap;
					}
				}
				.order-btn {
					height: 50px;
					line-height: 50px;
					text-align: center;
					color: #fff;
					margin-left: 0 !important;
					background: #ef4040;
				}
			}
  		}
  	}
</style>
