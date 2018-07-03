// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import FastClick from 'fastclick'
import router from './router/router'
import App from './App'
import { XButton, Spinner } from 'vux'

import './css/style.scss'
import Utils from './js/utils.js'

FastClick.attach(document.body)

Vue.prototype.$utils = Utils
Vue.component('x-button', XButton)
Vue.component('spinner', Spinner)

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  router,
  render: h => h(App)
}).$mount('#app-box')
