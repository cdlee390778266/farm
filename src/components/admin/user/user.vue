<template>
	<div class="user">
		<scroller lock-x height="100%" @on-pulldown-loading="getUserInfo" :use-pulldown="true" :pulldown-config="{downContent: '下拉刷新', upContent: '释放后更新', loadingContent: '加载中...',}" ref="scroller">
      		<div class="user-scroller">
				<div class="user-top">
					<img src="/src/assets/images/face-bg.png" class="img-responsive">
					<flexbox class="user-top-body">
				      	<flexbox-item :span="'60px'">
				      		<div class="user-face" :style="'background-image: url(' + user.imgUrl + ')'"></div>
				      	</flexbox-item>
				      	<flexbox-item>
				      		<h1>{{user.name}}</h1>
				      		<p>积分:{{user.integral}}</p>
				      	</flexbox-item>
				    </flexbox>
				</div>
				<group class="mt0">
			      <cell title="我的信息" is-link link="/admin/userInfo">
			        <img slot="icon" width="15px" style="display:block;margin-right:7px;margin-left: 3px;" src="/src/assets/images/icons/icon15.png">
			      </cell>
			    </group>
			    <group>
			      <cell title="我的订单" is-link link="/admin/orderList">
			        <img slot="icon" width="20px" style="display:block;margin-right:5px;" src="/src/assets/images/icons/icon16.png">
			      </cell>
			      <cell title="我的积分" is-link link="/admin/integral">
			        <img slot="icon" width="20px" style="display:block;margin-right:5px;" src="/src/assets/images/icons/icon17.png">
			      </cell>
			      <cell title="我的收藏" is-link link="/admin/collect">
			        <img slot="icon" width="20px" style="display:block;margin-right:5px;" src="/src/assets/images/icons/icon18.png">
			      </cell>
			    </group>
			    <group>
			      <cell title="联系客服" is-link link="/admin/contact">
			        <img slot="icon" width="20px" style="display:block;margin-right:5px;" src="/src/assets/images/icons/icon19.png">
			      </cell>
			    </group>
		    </div>
	    </scroller>
	</div>
</template>
<script>
	export default {
		data() {
			return {
				user: {},
				onFetching: false
			}
		},
		methods: {
			getUserInfo() {
				var _this = this;
				var user = this.$utils.getUser();
				if(!user.isLogin) return;
				if (this.onFetching) {
			    } else {
			    	this.onFetching = true;
			    	_this.$utils.getJson('userInfo', function(res) {
						if(res.data.ResData) {
							_this.user = res.data.ResData;

							_this.$nextTick(() => {
				            	_this.$refs.scroller.donePulldown()
				          	})
				          	_this.onFetching = false
						}
					}, function(error) {
						_this.$nextTick(() => {
			            	_this.$refs.scroller.donePulldown()
			          	})
			          	_this.onFetching = false
					}, {userId: user.userId})
			    }
				
			}
		},
		created() {
			this.$options.methods.getUserInfo.bind(this)();
		}
	}
</script>
<style lang="scss">
  	.user {
		position: fixed;
		top: 0;
		right: 0;
		bottom: 73px;
		left: 0;
		.user-scroller {
			padding-bottom: 40px;
		}
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
