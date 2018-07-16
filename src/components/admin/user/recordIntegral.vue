<template>
	<div class="recordIntegral">
		<h1>积分记录</h1>
		<x-table :cell-bordered="true" style="background-color:#fff;">
			<thead style="background-color: #fbead8">
				<tr>
					<th v-for="(head, index) in recordIntegral.head" :key="index">{{head}}</th>
				</tr>
			</thead>
			<tbody>
				<tr v-for="(tr, index) in recordIntegral.tbody" :key="index">
					<td v-for="(td, index) in tr" :key="index">{{td}}</td>
				</tr>
			</tbody>
		</x-table>
	</div>
</template>
<script>
	import { XTable } from 'vux'
	export default {
		components: {
		    XTable
		},
		data() {
			return {
				recordIntegral: {}
			}
		},
		created() {
			var _this = this;
			var user = this.$utils.getUser();
			_this.$utils.getJson('recordIntegral', function(res) {
				if(res.data.ResData) {
					_this.recordIntegral = res.data.ResData;
				}
			}, function(error) {}, {userId: user.userId})
		}
	}
</script>
<style lang="scss">
  	.recordIntegral {
  		color: #999;
  		h1 {
  			color: #333;
  			font-size: 16px;
  			padding: 15px;
  			margin-top: 10px;
  		}
  	}
</style>
