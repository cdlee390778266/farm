<template>
	<div class="userInfo">
		<group label-width="4.5em">
	      <cell title="真实姓名" :value="userInfo.relName" value-align="left" is-link :link="{name: 'modify', query: {key: 'relName', keyName: '真实姓名', value: userInfo.relName}}"></cell>
	      <cell title="手机号码" :value="userInfo.phone" value-align="left" is-link :link="{name: 'modify', query: {key: 'phone', keyName: '手机号码', value: userInfo.phone}}"></cell>
	      <cell title="电子邮箱" :value="userInfo.email" value-align="left" is-link :link="{name: 'modify', query: {key: 'email', keyName: '电子邮箱', value: userInfo.email}}"></cell>
	      <cell title="联系地址" :value="userInfo.address" value-align="left" is-link :link="{name: 'modify', query: {key: 'address', keyName: '联系地址', value: userInfo.address}}"></cell>
	    </group>
	    <group label-width="4.5em">
	      <cell title="收货人" :value="userInfo.rRelName" value-align="left" is-link :link="{name: 'modify', query: {key: 'rRelName', keyName: '收货人', value: userInfo.rRelName}}"></cell>
	      <cell title="手机号码" :value="userInfo.rMPhone" value-align="left" is-link :link="{name: 'modify', query: {key: 'rMPhone', keyName: '手机号码', value: userInfo.rMPhone}}"></cell>
	      <cell title="固定电话" :value="userInfo.rPhone" value-align="left" is-link :link="{name: 'modify', query: {key: 'rPhone', keyName: '固定电话', value: userInfo.rPhone}}"></cell>
	      <cell title="收货地址" :value="userInfo.rAddress" value-align="left" is-link :link="{name: 'modify', query: {key: 'rAddress', keyName: '收货地址', value: userInfo.rAddress}}"></cell>
	    </group>
	</div>
</template>
<script>
	export default {
		data() {
			return {
				userInfo: {}
			}
		},
		methods: {
		    
		},
		created() {
			var _this = this;
			var user = this.$utils.getUser();
			_this.$utils.getJson('userInfo', function(res) {
				if(res.data.ResData) {
					_this.userInfo = res.data.ResData;
				}
			}, function(error) {}, {userId: user.userId})
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
