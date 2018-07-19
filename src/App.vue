<template>
  <div id="app">
    <transition :name='transitionName'>
      <router-view class="child-view"></router-view>
    </transition>
  </div>
</template>

<script>
import VueCookies from 'vue-cookies'
import CONFIG from './js/config';
export default {
  name: 'app',
  data() {
  	return {
  		user: {},
      transitionName: 'slide-left'
  	}
  },
  beforeRouteUpdate (to, from, next) {
    console.log();
    let isBack = this.$router.isBack
    if (isBack) {
      this.transitionName = 'slide-right'
    } else {
      this.transitionName = 'slide-left'
    }
    this.$router.isBack = false
    next()
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

.child-view {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  width:100%;
  transition: all .8s cubic-bezier(.55,0,.1,1);
  }
</style>
