<template>
	<div class="integral">
		<group class="integral-bar">
	      <cell title="我的积分" value="积分记录" link="/admin/recordIntegral" :inline-desc="user.integral"></cell>
	    </group>
	    <group>
	      <cell title="赚积分" value="签到" is-link link="/admin/signIn"></cell>
	      <cell title="积分商城" value="积分兑换" is-link link="/integralShop"></cell>
	    </group>
	    <group title="账单：">
	      <cell title="消费积分" :value="user.usedIntegral" is-link link="/admin/usedIntegral"></cell>
	    </group>
	</div>
</template>
<script>
	export default {
		data() {
			return {
				user: {}
			}
		},
		methods: {
		    
		},
		created() {
			var _this = this;
			var user = this.$utils.getUser();
			_this.$utils.getJson('user', function(res) {
				if(res.data.ResData) {
					_this.user = res.data.ResData;
				}
			}, function(error) {}, {userId: user.userId})
		}
	}
</script>
<style lang="scss">
  	.integral {
  		.integral-bar{
  			.vux-label {
  				font-size: 16px;
  			}
  			.vux-label-desc {
	  			color: #ffca11;
	  		}
  		}
  	}
</style>
