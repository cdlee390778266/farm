<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
import VueCookies from 'vue-cookies'
import CONFIG from './js/config';
export default {
  name: 'app',
  data() {
  	return {
  		user: {}
  	}
  },
  created() {
  	var user = JSON.parse(VueCookies.get(CONFIG.cookieKey)) || {};
  	if(user && user.userId) {
  		this.$utils.getJson('userInfo', function(res) {
  			if(res.data.ResData) {
  				user.isLogin = true;
  			}
  		}, function(error) {}, {userId: user.userId})
  	}else {
  		user.userId = 0;
  		user.isLogin = false;
  	}
  	this.$utils.setUser(user);
  }
}
</script>

<style lang="less">
@import '~vux/src/styles/reset.less';
@import '~vux/src/styles/1px.less';

body {
  color: #3c3c3c;
  font-size: 14px;
  background-color: #fafafa;
}
</style>
