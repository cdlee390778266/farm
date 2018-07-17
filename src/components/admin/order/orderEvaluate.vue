<template>
	<div class="orderBack">
		<group>
	      <cell title="描述相符">
	        <rater v-model="evaluate.dStar"></rater>
	      </cell>
	    </group>
	    <group class="nz-textarea">
	       <x-textarea :max="20" placeholder="输入文字评价"></x-textarea>
	    </group>
	    <group>
	      <cell title="卖家服务">
	        <rater v-model="evaluate.mStar"></rater>
	      </cell>
	      <cell title="物流服务">
	        <rater v-model="evaluate.wStar"></rater>
	      </cell>
	    </group>

		<div class="order-footer vux-1px-t">
	  		<flexbox class="order-smt">
	  			<flexbox-item class="order-btn" @click.native="save">
	  				提价评价
	  			</flexbox-item>
	  		</flexbox>
		</div>
	</div>
</template>
<script>
	import { Rater, XTextarea } from 'vux'
	export default {
		components: {
		    Rater,
		    XTextarea
		},
		data() {
			return {
				evaluate: {
					dStar: 5,
					content: '',
					mStar: 5,
					wStar: 5
				}
			}
		},
		methods: {
		    save() {
		    	var _this = this;
		    	this.$utils.showTip('success', '111', function(){}, function() {
		    			_this.$router.push({name: 'orderList'});
		    	});
		    }
		},
		created() {
			var _this = this;
			var orderId = _this.$route.params.orderId;
			var user = _this.$utils.getUser();
			//获取用户信息
			_this.$utils.getJson('userInfo', function(res) {
				if(res.data.ResData) {
				}
			}, function(error) {}, {userId: user.userId, orderId: orderId})
		}
	}
</script>
<style lang="scss">
  	.orderBack {
  		padding-bottom: 80px;
		.weui-cells {
			margin-top: 0 !important;
		}
		.nz-textarea .weui-cells:after {
			display: none;
		}
  		.vux-x-textarea {
  			background: #f6f5f5;
  			textarea {
  				background: transparent;
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
