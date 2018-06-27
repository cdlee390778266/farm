import Vue from 'vue'
import Router from 'vue-router'


const Welcome  = () => import('../components/welcome')
const Tabs  = () => import('../components/pages/tabs.vue')

Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '/welcome',
      name: 'welcome',
      component: Welcome
    },
    {
      path: '/tabs',
      name: 'tabs',
      component: Tabs
    },
    // {
    //   path: '/quotation',
    //   name: 'quotation',
    //   component: Quotation,
    //   meta: { title: '行情导出'},
    //   beforeEnter: (to, from, next) => {
    //     if(Utils.getUser().name) next()
    //   }
    // },
  ],
  scrollBehavior (to, from, savedPosition) {
    return { x: 0, y: 0 }
  }
})

router.beforeEach((to, from, next) => {
  /* 路由发生变化修改页面title */
  document.title = to.meta.title || '水域农庄'
  next()
})

export default router;
