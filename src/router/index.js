import Vue from 'vue'
import Router from 'vue-router'
import routes from './routes'
import {checkRouteChange} from '@/libs/util'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  // base: process.env.NODE_ENV === 'development' ? '/' : '/portal/',
  routes,
})

router.beforeEach((to, from, next) => {
  checkRouteChange(from, window.location) // 页面跳转时候检查路由和真实地址是否有变化
  if (to.path === '/' && to.name !== 'home') { // 默认引导到home页面
    next('/portal-home')
  }
  next()
})

export default router
