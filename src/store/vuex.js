import Vue from 'vue';
import Vuex from 'vuex';
import CONFIG from '../js/config';
import VueCookies from 'vue-cookies'
import Utils from '../js/utils.js'

Vue.use(Vuex);

// 不建议线上使用
const debug = process.env.NODE_ENV !== 'production';

/**
 * export一个store的单例
 */
//模拟登录
VueCookies.set(CONFIG.cookieKey, JSON.stringify({userId: 2001, isLogin: true}), '2d');

export default new Vuex.Store({
	state: {
		user: {
			userId: 0,
			isLogin: false
		},
		cart: [],
		orderList: []
	},
	mutations: {
		setUser: function(state, payload) {
			state.user = payload;
			if(payload.isLogin) {
				VueCookies.set(CONFIG.cookieKey, JSON.stringify(payload), '2d');
			}else {
				$cookies.remove(CONFIG.cookieKey);
			}
		},
		addCart: function(state, payload) {
			var goods = state.cart.find(item => item.id == payload.id)
			if(!goods) {
				state.cart.push(payload);
			}else {
				goods.num++
			}
		},
		delCart: function(state, payload) {
			if(payload) {
				state.cart = payload;
			}
		},
		addOrder: function(state, payload) {
			if(payload) {
				state.orderList.push(payload);
				state.cart = [];
			}
		},
		delOrder: function(state, payload) {
			if(payload && payload.orderId) {
				for(var i = 0; i < state.orderList.length; i++) {
					if(payload.orderId == state.orderList[i].orderId) {
						state.orderList.splice(i, 1);
						break;
					}
				}
			}
		}
	},
	actions: {
		setUser: function(context, payload) {
			context.commit('setUser', payload);
		},
		addCart: function(context, payload) {
			context.commit('addCart', payload);
		},
		delCart: function(context, payload) {
			context.commit('delCart', payload);
		},
		addOrder: function(context, payload) {
			context.commit('addOrder', payload);
		},
		delOrder: function(context, payload) {
			context.commit('delOrder', payload);
		}
	},
	getters: {
	    getUser: state => {
	    	return state.user;
	    },
	    getCart: state => {
	    	return state.cart;
	    },
	    getOrder: state => (orderId) => {
	    	if(orderId) {
	    		return state.orderList.find(order => order.orderId == orderId);
	    	}else {
	    		return state.orderList;
	    	} 
		}
	}
});
