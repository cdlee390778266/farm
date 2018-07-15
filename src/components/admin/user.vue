<template>
	<div class="user">
		<div class="user-top">
			<img src="/src/assets/images/face-bg.png" class="img-responsive">
			<flexbox class="user-top-body">
		      	<flexbox-item :span="'60px'">
		      		<div class="user-face" style="background-image: url(/src/assets/images/face.png)"></div>
		      	</flexbox-item>
		      	<flexbox-item>
		      		<h1>我不是黄蓉</h1>
		      		<p>积分:500</p>
		      	</flexbox-item>
		    </flexbox>
		</div>
		<group class="mt0">
	      <cell title="我的信息" is-link>
	        <img slot="icon" width="15px" style="display:block;margin-right:7px;margin-left: 3px;" src="/src/assets/images/icons/icon15.png">
	      </cell>
	    </group>
	    <group>
	      <cell title="我的订单" is-link>
	        <img slot="icon" width="20px" style="display:block;margin-right:5px;" src="/src/assets/images/icons/icon16.png">
	      </cell>
	      <cell title="我的积分" is-link>
	        <img slot="icon" width="20px" style="display:block;margin-right:5px;" src="/src/assets/images/icons/icon17.png">
	      </cell>
	      <cell title="我的收藏" is-link>
	        <img slot="icon" width="20px" style="display:block;margin-right:5px;" src="/src/assets/images/icons/icon18.png">
	      </cell>
	    </group>
	    <group>
	      <cell title="联系客服" is-link>
	        <img slot="icon" width="20px" style="display:block;margin-right:5px;" src="/src/assets/images/icons/icon19.png">
	      </cell>
	    </group>
	</div>
</template>
<script>
	export default {
		data() {
			return {
				
			}
		}
	}
</script>
<style lang="scss">
  	.user {
  		padding-bottom: 100px;
  		.user-top {
  			position: relative;
  			.user-top-body {
  				position: absolute;
  				top: 50%;
  				left: 20px;
  				margin-top: -30px;
  				.user-face {
  					width: 60px;
  					height: 60px;
  					border-radius: 100%
  				}
  				h1 {
  					padding-top: 0;
  					margin-top: 0;
					color: #fff;
					font-size: 18px;
					font-weight: normal;
				}
				p {
					margin-top: 5px;
					font-size: 12px;
					color: rgba(255, 255, 255, .5);
				}
  			}
  		}
  		.mt0 {
  			.weui-cells {
  				margin-top: 0;
  				&:before {
  					display: none;
  				}
  			}
  		}
  	}
</style>
