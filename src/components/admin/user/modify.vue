<template>
	<div class="userInfo">
		<group>
	      <x-input :title="field.keyName" name="username" :placeholder="'请输入' + field.keyName" v-model="field.value"></x-input>
	    </group>
	    <div class="save">
	    	<x-button @click.native="save" type="warn">保存/修改</x-button>
	    </div>
	</div>
</template>
<script>
	import { XInput } from 'vux'
	export default {
		components: {
			XInput
		},
		data() {
			return {
				field: {
					key: '',
					keyName: '',
					value: ''
				}
			}
		},
		methods: {
		    save() {
		    	var _this = this;
				var user = _this.$utils.getUser();
				if(!_this.field.value) {
					_this.$utils.showTip('error', '-1080');
					return;
				}
				_this.$utils.getJson('saveModify', function(res) {
					if(res.data.ResData) {
						_this.$utils.showTip('success', '108', function(){}, function() {
							_this.$router.go(-1);
						});
					}
				}, function(error) {}, Object.assign({}, {userId: user.userId}, _this.field))
			    }
		},
		created() {
			this.field = this.$route.query;
		}
	}
</script>
<style lang="scss">
  	.userInfo {
  		.save {
  			position: absolute;
  			left: 0;
  			right: 0;
  			bottom: 40px;
  			padding: 15px;
  		}
  	}
</style>
