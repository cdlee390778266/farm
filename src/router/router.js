import Vue from 'vue'
import Router from 'vue-router'

const Welcome  = () => import('../components/welcome')
const Tabs  = () => import('../components/pages/tabs')
const Home  = () => import('../components/pages/home')
const Category  = () => import('../components/pages/category')
const Cart  = () => import('../components/admin/buy/cart')
const User  = () => import('../components/admin/user/user')
const AdminWrapper = () => import('../components/common/adminWrapper.vue')
const Goods  = () => import('../components/pages/goods')
const GoodsList  = () => import('../components/pages/goodsList.vue')
const Order  = () => import('../components/admin/buy/order.vue')
const Pay  = () => import('../components/admin/buy/pay.vue')

Vue.use(Router)

const router = new Router({
  linkActiveClass: 'active',
  routes: [
    {
      path: '/welcome',
      name: 'welcome',
      component: Welcome
    },
    {
      path: '/tabs',
      name: 'tabs',
      component: Tabs,
      redirect: '/home',
      children: [
        {
          path: '/home',
          name: 'home',
          component: Home
        },
        {
          path: '/category',
          name: 'category',
          component: Category,
          meta: { title: '分类'}
        },
        {
          path: '/cart',
          name: 'cart',
          component: Cart,
          meta: { title: '购物车'}
        },
        {
          path: '/user',
          name: 'user',
          component: User,
          meta: { title: '个人中心'}
        }
      ]
    },
    {
      path: '/admin',
      name: 'admin',
      component: AdminWrapper,
      children: [
        {
          path: 'order',
          name: 'order',
          component: Order,
          meta: { title: '结算中心'}
        },
        {
          path: 'pay/:orderId',
          name: 'pay',
          component: Pay,
          meta: { title: '支付'}
        },
      ]
    },
    {
      path: '/goodsList/:type',
      name: 'goodsList',
      component: GoodsList
    },
    {
      path: '/goods/:id',
      name: 'goods',
      component: Goods
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
