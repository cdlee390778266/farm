<template>
	<div class="usedIntegral">
		<div class="goods vux-1px-b" v-for="(goods, index) in usedIntegral" :key="index">
			<flexbox>
		      	<flexbox-item :span="'90px'">
		      		<router-link :to="'/goods/' + goods.gid" :style="'background-image: url( ' + goods.imgUrl + ')'" class="goods-img"></router-link>
		      	</flexbox-item>
		      	<flexbox-item class="goods-desc">
		      		<h1>{{goods.name}}</h1>
		      		<p><strong>{{goods.price}} <i>积分</i></strong><span>х{{goods.num}}</span></p>
		      		<p class="goods-date">{{goods.date}}</p>
		      	</flexbox-item>
		    </flexbox>
		</div>
	</div>
</template>
<script>
	export default {
		data() {
			return {
				usedIntegral: []
			}
		},
		methods: {
		    onButtonClick () {
		      alert('on button click')
		    }
		},
		created() {
			var _this = this;
			var user = this.$utils.getUser();
			_this.$utils.getJson('usedIntegral', function(res) {
				if(res.data.ResData) {
					_this.usedIntegral = res.data.ResData;

				}
			}, function(error) {}, {userId: user.userId})
		}
	}
</script>
<style lang="scss">
  	.usedIntegral {
		background: #fff;
		.goods {
			padding: 15px;
			.goods-img {
				display: block;
				padding-top: 100%;
				background-size: cover;
				border-radius: 4px;
			}
			.goods-desc {
				font-size: 14px;
				strong {
					color: #ff0000;
					font-size: 12px;
					font-weight: normal;
					i {
						color: #333;
						font-style: normal;
					}
				}
				span {
					color: #333;
					margin-left: 10px;
				}
				h1 {
					font-size: 14px;
					color: #3c3c3c;
				}
				.goods-date {
					margin-top: 20px;
					color: #999;
				}
			}
		}
	}
</style>
