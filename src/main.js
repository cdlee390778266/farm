// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import FastClick from 'fastclick'
import router from './router/router'
import App from './App'
import { XButton, Spinner, Grid, GridItem, Tab, TabItem, Divider, Scroller, LoadMore, Cell, Group, Flexbox, FlexboxItem, XImg} from 'vux'

import './css/style.scss'
import Utils from './js/utils.js'

FastClick.attach(document.body)

Vue.prototype.$utils = Utils
Vue.component('x-button', XButton)
Vue.component('spinner', Spinner)
Vue.component('grid', Grid)
Vue.component('grid-item', GridItem)
Vue.component('tab', Tab)
Vue.component('tab-item', TabItem)
Vue.component('divider', Divider)
Vue.component('scroller', Scroller)
Vue.component('load-more', LoadMore)
Vue.component('cell', Cell)
Vue.component('group', Group)
Vue.component('flexbox', Flexbox)
Vue.component('flexbox-item', FlexboxItem)
Vue.component('x-img', XImg)

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  router,
  render: h => h(App)
}).$mount('#app-box')
