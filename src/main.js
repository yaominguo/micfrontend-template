// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import 'babel-polyfill'
import Vue from 'vue'
import App from './App'
import store from './store'
import router from './router'
import jscookie from 'js-cookie'
import ajax from '@/server/ajax'
import api from '@/server/api'
import {registerMicroApps, start, initGlobalState} from 'qiankun'
import {LocaleProvider, Layout, Menu, Icon, Breadcrumb, Dropdown, Badge, Spin, Button, Tag} from 'ant-design-vue'

Vue.config.productionTip = false
Vue.prototype.$ajax = ajax
Vue.prototype.$api = api
Vue.prototype.$cookie = jscookie
Vue.prototype.$global_state = initGlobalState({instanceInfo: null})
Vue.use(LocaleProvider)
Vue.use(Layout)
Vue.use(Menu)
Vue.use(Icon)
Vue.use(Breadcrumb)
Vue.use(Dropdown)
Vue.use(Badge)
Vue.use(Spin)
Vue.use(Button)
Vue.use(Tag)
/* eslint-disable no-new */
const projects = [ // 子项目信息
  {
    name: 'aaa',
    entry: 'http://localhost:7771',
    container: '#contentView',
    activeRule: '/aaa',
  },
  {
    name: 'bbb',
    entry: 'http://localhost:7772',
    container: '#contentView',
    activeRule: '/bbb',
  },
]
registerMicroApps(projects, { // 注册子项目
  beforeLoad: () => store.commit('setLoading', true),
  beforeMount: () => store.commit('setContent', true),
  afterMount: () => store.commit('setLoading', false),
  beforeUnmount: () => store.commit('setContent', false),
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#portal')

start()
