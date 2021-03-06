import Vue from 'vue'
import Router from 'vue-router'


const Tabs  = () => import('../components/common/tabs')
const Home  = () => import('../components/pages/home')
const Category  = () => import('../components/pages/category')
const Cart  = () => import('../components/admin/buy/cart')
const User  = () => import('../components/admin/user')

const AdminWrapper = () => import('../components/common/adminWrapper')
const UserInfo  = () => import('../components/admin/user/userInfo')
const Modify  = () => import('../components/admin/user/modify')
const OrderList  = () => import('../components/admin/order/orderList')
const OrderBack  = () => import('../components/admin/order/orderBack')
const OrderEvaluate  = () => import('../components/admin/order/orderEvaluate')
const Integral  = () => import('../components/admin/integral/integral')
const RecordIntegral  = () => import('../components/admin/integral/recordIntegral')
const SignIn  = () => import('../components/admin/integral/signIn')
const UsedIntegral = () => import('../components/admin/integral/usedIntegral')
const IntegralOrder  = () => import('../components/admin/integral/integralOrder')
const Collect  = () => import('../components/admin/collect/collect')
const Order  = () => import('../components/admin/buy/order')

const Welcome  = () => import('../components/welcome')
const Pay  = () => import('../components/admin/buy/pay')
const Map  = () => import('../components/pages/map')
const Theme  = () => import('../components/pages/theme')
const Goods  = () => import('../components/pages/goods')
const GoodsSm  = () => import('../components/pages/goodsSm')
const GoodsList  = () => import('../components/pages/goodsList')
const GoodsSmList  = () => import('../components/pages/goodsSmList')
const IntegralShop  = () => import('../components/admin/integral/integralShop')
const Contact  = () => import('../components/admin/order/contact')

Vue.use(Router)

Router.prototype.historyLeng = 0;
Router.prototype.animationClassName = 'slide-left';

const router = new Router({
  linkActiveClass: 'active',
  routes: [
    {
      path: '/',
      name: 'default',
      redirect: '/welcome'
    },
    {
      path: '/welcome',
      name: 'welcome',
      component: Welcome
    },
    {
      path: '/goodsList/:type',
      name: 'goodsList',
      component: GoodsList
    },
    {
      path: '/goodsSmList',
      name: 'goodsSmList',
      component: GoodsSmList
    },
    {
      path: '/goods/:id',
      name: 'goods',
      component: Goods
    },
    {
      path: '/goodsSm/:id',
      name: 'goodsSm',
      component: GoodsSm
    },
    {
      path: '/theme/:tId',
      name: 'theme',
      component: Theme
    },
    {
      path: '/map',
      name: 'map',
      component: Map
    },
    {
      path: '/contact',
      name: 'contact',
      component: Contact,
      meta: { title: '联系我们'}
    },
    {
      path: '/integralShop',
      name: 'integralShop',
      component: IntegralShop,
      meta: { title: '积分商城'}
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
        {
          path: 'userInfo',
          name: 'userInfo',
          component: UserInfo,
          meta: { title: '我的信息'}
        },
        {
          path: 'modify',
          name: 'modify',
          component: Modify,
          meta: { title: '信息修改'}
        },
        {
          path: 'orderList',
          name: 'orderList',
          component: OrderList,
          meta: { title: '我的订单'}
        },
        {
          path: 'orderBack/:orderId',
          name: 'orderBack',
          component: OrderBack,
          meta: { title: '退货'}
        },
        {
          path: 'orderEvaluate/:orderId',
          name: 'orderEvaluate',
          component: OrderEvaluate,
          meta: { title: '确定收货'}
        },
        {
          path: 'integral',
          name: 'integral',
          component: Integral,
          meta: { title: '我的积分'}
        },
        {
          path: 'recordIntegral',
          name: 'recordIntegral',
          component: RecordIntegral,
          meta: { title: '积分记录'}
        },
        {
          path: 'signIn',
          name: 'signIn',
          component: SignIn,
          meta: { title: '签到'}
        },
        {
          path: 'usedIntegral',
          name: 'usedIntegral',
          component: UsedIntegral,
          meta: { title: '消费积分'}
        },
        {
          path: 'integralOrder/:gid',
          name: 'integralOrder',
          component: IntegralOrder,
          meta: { title: '订单'}
        },
        {
          path: 'collect',
          name: 'collect',
          component: Collect,
          meta: { title: '我的收藏'}
        },
      ]
    },
    {
      path: '**',
      redirect: '/home'
    }
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
