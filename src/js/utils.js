import Vue from 'vue'
import axios from 'axios'
import CONFIG from './config'
import store from '../store/vuex'
import  { LoadingPlugin, AlertPlugin, ToastPlugin } from 'vux'

Vue.use(LoadingPlugin)
Vue.use(AlertPlugin)
Vue.use(ToastPlugin)

var Utils = {}

Utils.$http = axios;

Utils.$store = store;

/**
 * Gets the tip text 获取提示文字
 *
 * @param      {<string>}  type    提示类型
 * @param      {<string>}  code    提示代码
 * @return     {<string>}  提示文字
 */
Utils.getTipText = function(type, code) {
	if(!type || !code) return;
	return CONFIG[type][code] || '';
}

/**
 * Shows the tip. 显示提示
 *
 * @param      {<string>}  type    	   提示框类型
 * @param      {<string>}  code        提示代码
 */
Utils.showTip = function(type, code) {
	if(!type || !code) return;
	this.$vux.toast.show({
		text: Utils.getTipText(type, code),
		position: 'middle'
	})
}

/**
 * Hides the tip. 关闭提示框
 */
Utils.hideTip = function() {
	Vue.$vux.toast.hide()
}

/**
 * Shows the alert.
 *
* @param      {<type>}  type      弹出框类型
 * @param      {<string>}  code   提示文字key
 * @param      {Function}  showFn  显示回调
 * @param      {Function}  hideFn  隐藏回调
 */
Utils.showAlert = function(type, code, showFn, hideFn) {
	if(!type || !code) return;
	this.$vux.alert.show({
	  	title: '提示',
	  	content: Utils.getTipText(type, code),
	  	onShow () {
	    	if(typeof showFn == 'function') showFn();
	  	},
	  	onHide () {
	    	if(typeof hideFn == 'function') hideFn();
	  	}
	})

}

/**
 * Gets the json. 获取json数据
 *
 * @param      {<type>}    url      url
 * @param      {Function}  success  成功回调
 * @param      {Function}  error    失败回调
 * @param      {string}    params   参数
 */
Utils.getJson = function(url, success, error, params = {}) {
	if(!url) return;
	Vue.$vux.loading.show()
	Utils.$http.get(url, {params: params})
		.then(function(res){
			Vue.$vux.loading.hide()
            if(typeof success == 'function') success(res)
        })
        .catch(function(err){
        	Vue.$vux.loading.hide()
        	Utils.showTip('error', 'error', '-1');
            if(typeof error == 'function') error(err)
        })
}

/**
 * Sets the user.设置登录用户
 *
 * @param      {<type>}  user    The user
 */
Utils.setUser = function(user) {
	store.dispatch('setUser', Object.assign({}, user))
}

/**
 * Gets the user.获取登录用户信息
 *
 * @return     {<type>}  The user.
 */
Utils.getUser = function() {
	return store.getters.getUser;
}

/**
 * Sets the login.设置是否登录
 *
 * @param      {boolean}  isLogin  Indicates if login
 */
Utils.setLogin = function(isLogin) {
	store.dispatch('setLogin', isLogin)
}

/**
 * Gets the login.获取是否登录
 *
 * @return     {<type>}  The login.
 */
Utils.getLogin = function() {
	return store.getters.getLogin;
}

export default Utils