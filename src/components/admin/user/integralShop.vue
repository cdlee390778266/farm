<template>
	<div class="integral">
		
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
