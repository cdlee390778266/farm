<template>
	<div class="cart">
		<div class="cart-body">
			<div class="goods vux-1px-b" v-for="goods in cart.goods" v-if="cart.num">
				<flexbox>
			      	<flexbox-item :span="'36px'">
			      		<check-icon :value.sync="goods.isSmChecked" v-show="!cart.isEdit" @click.native="chageAllBtnStatus(goods)"></check-icon>
			      		<check-icon :value.sync="goods.isDelChecked" v-show="cart.isEdit"  @click.native="chageAllBtnStatus(goods)"></check-icon>
			      	</flexbox-item>
			      	<flexbox-item>
			      		<flexbox class="goods-body">
					      	<flexbox-item :span="'90px'">
					      		<div :style="'background-image: url( ' + goods.imgObj.img + ')'" class="goods-img"></div>
					      	</flexbox-item>
					      	<flexbox-item class="goods-desc">
					      		<h1>{{goods.name}}</h1>
					      		<p>￥<strong class="f00">{{goods.price | toFixed(2)}}</strong></p>
					      		<p class="goods-nums gray" v-show="!cart.isEdit">数量：{{goods.num}}件</p>
					      		<group v-show="cart.isEdit">
							    	<x-number  v-model="goods.num" :min="1" align="left" width="40px"></x-number>
							    </group>
					      	</flexbox-item>
					    </flexbox>
			      	</flexbox-item>
			    </flexbox>
			   	<flexbox>
			   		<flexbox-item :span="'36px'"></flexbox-item>
			   		<flexbox-item>
					    <flexbox class="goods-footer">
					      	<flexbox-item class="f00">
					      		小计:￥{{goods.price * goods.num | toFixed(2)}}
					      	</flexbox-item>
					      	<flexbox-item class="tr">
					      		<span @click="toggleEdit">{{cart.isEdit ? '完成' : '编辑'}}</span>
					      	</flexbox-item>
					    </flexbox>
					</flexbox-item>
				</flexbox>
			</div>
			<div v-if="!cart.num" class="empty">
				空空如也，您的购物车打小怪兽去了！
			</div>
		</div>
		<div class="cart-footer vux-1px-t" v-show="cart.num">
			<!-- 结算 -->
			<flexbox class="cart-smt" v-show="!cart.isEdit">
		      	<flexbox-item span="126px">
		      		<check-icon :value.sync="cart.isSmCheckedAll" @click.native="toggleCheckedAll">全选</check-icon>
		      	</flexbox-item>
		      	<flexbox-item class="tr">
		      		<flexbox>
		      			<flexbox-item class="cart-mes">
		      				<div class="cart-all-price">合计：<span>￥{{cTotalPrice | toFixed(2)}}</span></div>
		      				<div><span>数量：{{cTotalNum}}件</span></div>
		      			</flexbox-item>
		      			<flexbox-item :span="'120px'" class="cart-btn" @click.native="goOrder">
		      				结算({{cTotalNum}})
		      			</flexbox-item>
		      		</flexbox>
		      	</flexbox-item>
		    </flexbox>
		    <!-- 编辑 -->
		    <flexbox class="cart-handle" v-show="cart.isEdit">
		      	<flexbox-item span="126px">
		      		<check-icon :value.sync="cart.isDelCheckedAll" @click.native="toggleCheckedAll">全选</check-icon>
		      	</flexbox-item>
		      	<flexbox-item class="tr">
		      		<x-button mini plain type="warn" @click.native="delGoods">删除</x-button>
		      	</flexbox-item>
		    </flexbox>
		</div>
	</div>
</template>
<script>
	import { CheckIcon, XNumber } from 'vux'
	export default {
		components: {
	    	CheckIcon,
	    	XNumber
	  	},
		data() {
			return {
				demo1: false,
				changeValue: 1,
				cart: {
					total: 0,
					num: 0,
					isEdit: false,
					isSmCheckedAll: true, 
					isDelCheckedAll: false, 
					goods: []
				}
			}
		},
		methods: {
		    toggleEdit() {
		    	this.cart.isEdit = !this.cart.isEdit;
		    },
		    chageAllBtnStatus(goods) {
		    	var _this = this;
		    	var isCheckedAll = true;
		    	switch (_this.cart.isEdit) {
		    		case true:
		    			if(goods.isDelChecked) {
			    			_this.cart.goods.forEach( function(Goods, index) {
			    				if(!Goods.isDelChecked) {
			    					isCheckedAll = false;
			    				}
			    			});
			    			_this.cart.isDelCheckedAll = isCheckedAll;
			    		}else {
			    			_this.cart.isDelCheckedAll = false;
			    		}
		    			break;
		    		case false:
		    			if(goods.isSmChecked) {
			    			_this.cart.goods.forEach( function(Goods, index) {
			    				if(!Goods.isSmChecked) {
			    					isCheckedAll = false;
			    				}
			    			});
			    			_this.cart.isSmCheckedAll = isCheckedAll;
			    		}else {
			    			_this.cart.isSmCheckedAll = false;
			    		}
		    			break;
		    	}
		    },
		    toggleCheckedAll() {
		    	var _this = this;
		    	var checkedValue = false;
		    	var checkedKey = '';

		    	if(_this.cart.isEdit) {
		    		checkedValue = _this.cart.isDelCheckedAll;
		    		checkedKey = 'isDelChecked';
		    	}else {
		    		checkedValue = _this.cart.isSmCheckedAll;
		    		checkedKey = 'isSmChecked';
		    	}

		    	this.cart.goods.forEach( function(goods, index) {
		    		goods[checkedKey] = checkedValue;
		    	})
		    },
		    delGoods() {
		    	var hasChecked = false;
		    	var _this = this;

		    	for(var i = 0; i < _this.cart.goods.length; i++) {
		    		if(_this.cart.goods[i].isDelChecked) {
		    			hasChecked = true;
		    			break;
		    		}
		    	}

		    	if(hasChecked) {
		    		var cartGoods = [];
		    		_this.$utils.showConfirm('success', '105', function() {
		    			_this.cart.goods.forEach( function(goods, index) {
		    				if(!goods.isDelChecked) {
		    					cartGoods.push(goods);
		    				}
		    			});
		    			if(!cartGoods.length) _this.cart.isEdit = false;
		    			_this.cart.goods = cartGoods;
		    			_this.$utils.delCart(cartGoods);
		    		});
		    	}else {
		    		_this.$utils.showTip('error', '-1050');
		    	}
		    },
		    goOrder() {
		    	this.$router.push('/order');
		    }
		},
		computed: {
			cTotalPrice() {
				var total = 0;
				this.cart.goods.forEach( function(goods, index) {
    				if(goods.isSmChecked) {
    					total += goods.price * goods.num;
    				}
    			});
    			this.cart.total = total;
    			return total;
			},
			cTotalNum() {
				var num = 0;
				this.cart.goods.forEach( function(goods, index) {
    				if(goods.isSmChecked) {
    					num += goods.num;
    				}
    			});
    			this.cart.num = num;
    			return num;
			}
		},
		filters: {
		  toFixed: function (value, len) {
		  	var len = parseInt(len);

		    if(!len) return value;
		    return value.toFixed(len);
		  }
		},
		created() {
			this.cart.goods = this.$utils.getCart();
			this.cart.goods.forEach(function(goods, index) {
				goods.isSmChecked = true;
				goods.isDelChecked = false;
			})
		}
	}
</script>
<style lang="scss">
	.cart {
		.weui-icon-success {
			color: #90be16;
			&:before {
				color: #90be16 !important;
			}
		}
		.vux-number-input {
			color: #3c3c3c;
			font-size: 16px;
		}
		.vux-number-selector svg {
			fill: #3c3c3c;
		}
		.weui-cells {
			margin-top: 13px;
			&:before, &:after {
				border: none;
			}
		}
		.weui-cell {
			padding: 0;
		}
		.cart-body {
			padding-bottom: 200px;
			.goods {
				padding-top: 10px;
				padding-bottom: 10px;
				background: #fff;
				.goods-body {
					.goods-img {
						padding-top: 100%;
						background-size: cover;
						border-radius: 4px;
					}
					.goods-desc {
						font-size: 14px;
						h1 {
							font-size: 14px;
							color: #3c3c3c;
						}
						.goods-nums {
							margin-top: 20px;
						}
					}
				}
				.goods-footer {
					padding-top: 10px;
					span {
						padding: 10px;
						color: #333;
					}
				}
			}
			.empty {
				padding-top: 100px;
				text-align: center;
				color: #aaa;
				font-size: 16px;
				img {
					display: block;
					margin-left: auto;
					margin-right: auto;
				}
			}
		}
		.cart-footer {
			position: fixed;
			left: 0;
			right: 0;
			bottom: 73px;
			height: 50px;
			color: #333;
			background: #fafafa;
			z-index: 9;
			.cart-smt {
				height: 50px;
				.cart-mes {
					font-size: 12px;
					color: #999999;
					.cart-all-price {
						margin-top: 5px;
						font-size: 14px;
						color: #333;
						white-space: nowrap;
						span {
							color: #fd8727;
						}
					}
				}
				.cart-btn {
					height: 50px;
					line-height: 50px;
					text-align: center;
					color: #fff;
					background: #ef4040;
				}
			}
			.cart-handle {
				height: 50px;
				.weui-btn_plain-warn {
					color: #ff0000;
					border: 1px solid #f00;
					margin-right: 10px;
				}
			}
		}
	}

</style>
