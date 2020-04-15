import Vue from 'vue'
import Router from 'vue-router'
import routes from './routes'
import store from '@/store'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  // base: process.env.NODE_ENV === 'development' ? '/' : '/portal/',
  routes,
})

router.beforeEach((to, from, next) => {
  // TODO
  store.commit('setWebviewSrc', to.meta && to.meta.src) // 判断有src的话为需要嵌入iframe的子项目

  if (to.path === '/' && to.name !== 'home') { // 默认引导到home页面
    next('/portal-home')
  }
  next()
})

export default router
