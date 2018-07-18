<template>
	<div class="collect">
		<swipeout>
			<swipeout-item ref="swipeoutItem" :right-menu-width="210" :sensitivity="15" class="goods vux-1px-b" v-for="(goods, index) in collect" :key="index">
		        <div slot="right-menu">
		          <swipeout-button @click.native="deleteCollect(goods)" type="warn" :width="70">删除</swipeout-button>
		        </div>

		        <div slot="content" class="demo-content">
					<flexbox>
				      	<flexbox-item :span="'80px'">
				      		<router-link :to="'/goods/' + goods.gid" :style="'background-image: url( ' + goods.imgUrl + ')'" class="goods-img"></router-link>
				      	</flexbox-item>
				      	<flexbox-item class="goods-desc">
				      		<h1>{{goods.title}}</h1>
				      		<p class="goods-date">收藏于：{{goods.date}}</p>
				      	</flexbox-item>
				    </flexbox>
		        </div>
		      </swipeout-item>
		</swipeout>
	</div>
</template>
<script>
	import { Swipeout, SwipeoutItem, SwipeoutButton } from 'vux'
	export default {
		components: {
		    Swipeout,
		    SwipeoutItem,
		    SwipeoutButton
		},
		data() {
			return {
				collect: []
			}
		},
		methods: {
			deleteCollect(goods) {
				var _this = this;
		    	_this.$utils.showConfirm('success', '112', function() {
	    			_this.collect.splice(_this.collect.indexOf(goods), 1);
	    		});
			}
		},
		created() {
			var _this = this;
			var user = _this.$utils.getUser();
			_this.$utils.getJson('collectUrl', function(res) {
				if(res.data.ResData) {
					_this.collect = res.data.ResData;
				}
			}, function(error) {}, {userId: user.userId})
		}
	}
</script>
<style lang="scss">
  	.collect {
  		.goods {
			.vux-swipeout-content {
				padding: 15px;
			}
			.goods-img {
				display: block;
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
				.goods-date {
					margin-top: 20px;
					color: #727272;
				}
			}
		}
  	}
</style>
