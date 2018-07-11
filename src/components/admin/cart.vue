<template>
	<div class="cart">
		<div class="cart-body">
			<flexbox class="goods vux-1px-b">
		      	<flexbox-item :span="'36px'" class="tc">
		      		<check-icon :value.sync="demo1"></check-icon>
		      	</flexbox-item>
		      	<flexbox-item>
		      		<flexbox class="goods-body">
				      	<flexbox-item :span="'120px'">
				      		<div style="background-image: url(/src/assets/images/goods6.png)" class="goods-img"></div>
				      	</flexbox-item>
				      	<flexbox-item class="goods-desc">
				      		<h1>巴山有机土猪后腿肉500g</h1>
				      		<p>￥<strong class="f00">90.00</strong></p>
				      		<p class="goods-nums gray">数量：1件</p>
				      	</flexbox-item>
				    </flexbox>
				    <flexbox class="goods-footer">
				      	<flexbox-item class="f00">
				      		<strong>小计:￥100.00</strong>
				      	</flexbox-item>
				      	<flexbox-item class="tr">
				      		<a href="">编辑</a>
				      	</flexbox-item>
				    </flexbox>
		      	</flexbox-item>
		    </flexbox>
		    <flexbox class="goods vux-1px-b">
		      	<flexbox-item :span="'36px'" class="tc">
		      		<check-icon :value.sync="demo1"></check-icon>
		      	</flexbox-item>
		      	<flexbox-item>
		      		<flexbox class="goods-body">
				      	<flexbox-item :span="'120px'">
				      		<div style="background-image: url(/src/assets/images/goods6.png)" class="goods-img"></div>
				      	</flexbox-item>
				      	<flexbox-item class="goods-desc">
				      		<h1>巴山有机土猪后腿肉500g</h1>
				      		<p>￥<strong class="f00">90.00</strong></p>
				      		<p class="goods-nums gray">数量：1件</p>
				      	</flexbox-item>
				    </flexbox>
				    <flexbox class="goods-footer">
				      	<flexbox-item class="f00">
				      		<strong>小计:￥100.00</strong>
				      	</flexbox-item>
				      	<flexbox-item class="tr">
				      		<a href="">编辑</a>
				      	</flexbox-item>
				    </flexbox>
		      	</flexbox-item>
		    </flexbox>
		</div>
		<div class="cart-footer">
			
		</div>
	</div>
</template>
<script>
	import { CheckIcon } from 'vux'
	export default {
		components: {
	    	CheckIcon
	  	},
		data() {
			return {
				demo1: false,
			}
		}
	}
</script>
<style lang="scss">
	.cart-body {
		.goods {
			padding-top: 10px;
			padding-bottom: 10px;
			.weui-icon-success {
				color: #90be16;
				&:before {
					color: #90be16;
				}
			}
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
				a {
					margin-right: 10px;
					color: #333;
				}
			}
		}
	}
</style>
