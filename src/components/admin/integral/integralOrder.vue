<template>
	<div class="order">
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
		      <cell title="支付方式" value="积分支付"></cell>
		      <cell title="自提网点" value="value" class="nz-x-address" is-link>{{order.address.address}}
		      	<x-address :title="address.title" v-model="order.address.value" :list="address.data" @on-shadow-change="onShadowChange"></x-address>
		      </cell>
		    </group>

		    <group>
		      <datetime v-model="order.pDate" format="YYYY-MM-DD" :title="date.title" :inline-desc="date.desc" :clear-text="date.clearText"></datetime>
		    </group>

		    <div class="order-bar vux-1px-t vux-1px-b">
		    	<h1>备注</h1>
		    	<div><input v-model="order.bValue" placeholder="选填：您的喜好与其他要求"></div>
		    </div>
		</div>
		<div class="order-footer vux-1px-t">
	  		<flexbox class="order-smt">
	  			<flexbox-item class="order-mes">
	  				<div class="order-all-price">合计：{{order.goods.num * order.goods.price}}积分</div>
	  				<div></div>
	  			</flexbox-item>
	  			<flexbox-item :span="'100px'" class="order-btn" @click.native="goPay">
	  				提交订单
	  			</flexbox-item>
	  		</flexbox>
		</div>
	</div>
</template>
<script>
	import { Actionsheet, XAddress, ChinaAddressV4Data, Datetime } from 'vux'
	export default {
		components: {
		    Actionsheet,
		    XAddress,
		    Datetime
		},
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
					data: ChinaAddressV4Data
				},
				date: {
					title: '配送时间',
					clearText: '选择配送时间',
					desc: '提前2天下单享98折优惠(周末不配送）'
				}
			}
		},
		methods: {
			onShadowChange (ids, names) {
		      this.order.address.address = names.join(' ');
		    },
		    goPay() {
		    	if(!this.order.pay.value) {
		    		this.$utils.showTip('error', '-1060');
		    		return;
		    	}
		    	if(!this.order.address.address) {
		    		this.$utils.showTip('error', '-1061');
		    		return;
		    	}
		    	if(!this.order.pDate) {
		    		this.$utils.showTip('error', '-1062');
		    		return;
		    	}

		    	var _this = this;
		    	var orderId =  Math.floor(Math.random () * 10000 + 1);
		    	this.order.orderId = orderId;
		    	this.$utils.addOrder(this.order);
		    	this.$utils.showAlert('success', '106', function() {}, function() {
		    		_this.$router.push({ name: 'integralShop'})
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
