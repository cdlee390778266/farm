import Vue from 'vue';
import Vuex from 'vuex';
import CONFIG from '../js/config';
import VueCookies from 'vue-cookies'

Vue.use(Vuex);

// 不建议线上使用
const debug = process.env.NODE_ENV !== 'production';

/**
 * export一个store的单例
 */
var cookie = JSON.parse(VueCookies.get(CONFIG.cookieKey));

export default new Vuex.Store({
	state: {
		isLogin: cookie ? true : false ,
		user: cookie ? cookie : {name: '', password: '', isRemember: false},
		cart: []
	},
	mutations: {
		setUser: function(state, payload) {
			state.user = payload;
			if(payload.name) {
				VueCookies.set(CONFIG.cookieKey, JSON.stringify(payload), '2d');
			}else {
				$cookies.remove(CONFIG.cookieKey);
			}
		},
		setLogin: function(state, payload) {
			state.isLogin = payload;
		},
		addCart: function(state, payload) {
			var hasGoods = false;
			for(var i = 0; i < state.cart.length; i++) {
				if(state.cart[i].id == payload.id) {
					state.cart[i].num++;
					state.cart[i].isChecked = payload.isChecked;
					hasGoods = true;
					break;
				}
			}
			if(!hasGoods) {
				state.cart.push(payload);
			}
		},
		delCart: function(state, payload) {
			if(payload) {
				state.cart = payload;
			}
		}
	},
	actions: {
		setUser: function(context, payload) {
			context.commit('setUser', payload);
		},
		setLogin: function(context, payload) {
			context.commit('setLogin', payload);
		},
		addCart: function(context, payload) {
			context.commit('addCart', payload);
		},
		delCart: function(context, payload) {
			context.commit('delCart', payload);
		}
	},
	getters: {
	    getUser(state) {
	    	return state.user;
	    },
	    getLogin(state) {
	    	return state.isLogin;
	    }
	}
});
