<template>
	<div class="signIn">
		<div class="signIn-top">
			<div>
				<img src="/src/assets/images/signIn.png">
				<span>已签到<strong>{{signIn.hasSignInNum}}</strong>天</span>
			</div>
		</div>
		<div class="signIn-body">
			<div class="signIn-item vux-1px">
				<span>今日：{{today.date}}</span>
				<x-button @click.native="sign" :class="{'hasSignIn': today.hasSignIn}">{{today.hasSignIn ? '已签到' : '签到'}}</x-button>
			</div>
			<div class="signIn-item vux-1px" v-for="(item, index) in signIn.list" :key="index">
				<span>{{item.date}}</span>
				<x-button class="hasSignIn">已签到</x-button>
			</div>
		</div>
	</div>
</template>
<script>
	export default {
		data() {
			return {
				signIn: {
					hasSignInNum: 0,
    				list: []
				},
				today: {
					date: (new Date()).toLocaleDateString().replace(/\//g, '-'),
					hasSignIn: false
				}
			}
		},
		methods: {
		    sign() {
		    	var _this = this;
				var user = this.$utils.getUser();
				if(_this.today.hasSignIn) return;
				_this.today.hasSignIn = true;
				_this.$utils.getJson('signIn', function(res) {
					if(res.data.ResData) {
						_this.today.hasSignIn = true;
					}
				}, function(error) {}, Object.assign({}, {userId: user.userId}, _this.today))
		    }
		},
		created() {
			var _this = this;
			var user = this.$utils.getUser();
			_this.$utils.getJson('signIn', function(res) {
				if(res.data.ResData) {
					_this.signIn = res.data.ResData;
				}
			}, function(error) {}, {userId: user.userId})
		}
	}
</script>
<style lang="scss">
  	.signIn {
  		padding: 15px;
  		padding-bottom: 100px;
  		.signIn-top {
  			padding: 10px;
  			text-align: center;
			background: #f9b64c;
			border: 2px solid #e9972b;
			border-radius: 4px;
			overflow: hidden;
			div {
				display: inline-block;
				img {
					width: 60px;
					float: left;
				}
				span {
					line-height: 70px;
					float: left;
					margin-left: 10px;
					font-size: 20px;
					color: #fff;
					strong {
						font-size: 30px;
						margin: 0 5px;
						font-weight: normal;
					}
				}
			}
  		}
  		.signIn-body {
  			margin-top: 15px;
  			.signIn-item {
  				line-height: 30px;
  				padding: 15px 15px 25px 20px;
  				background: #fff;
	  			button {
	  				display: block;
	  				width: 90px;
	  				height: 40px;
	  				font-size: 18px;
	  				color: #fff;
	  				text-align: center;
	  				line-height: 40px;
	  				border-radius: 4px;
	  				float: right;
	  				background: #fd8727;
	  				&.hasSignIn {
	  					background: #87cb62;
	  				}
	  			}
	  		}
  		}
  	}
</style>
