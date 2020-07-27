import Vue from 'vue'
import Router from 'vue-router'
import routes from './routes'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  // base: process.env.NODE_ENV === 'development' ? '/' : '/portal/',
  routes,
})

router.beforeEach((to, from, next) => {
  if (to.path === '/' && to.name !== 'home') { // 默认引导到home页面
    next('/portal-home')
  }
  next()
})

export default router
