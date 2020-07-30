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
Vue.prototype.$global_state = initGlobalState({destroy: false}) // 初始化是否销毁子项目keep-alive标签
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
let app = null
const render = ({appContent, loading} = {}) => { // 渲染方法
  if (!app) {
    app = new Vue({
      el: '#portal',
      store,
      router,
      data() {
        return {
          content: appContent,
          loading,
        }
      },
      render(h) {
        return h(App, {
          props: {
            content: this.content,
            loading: this.loading,
          }
        })
      }
    })
  } else {
    app.content = appContent
    app.loading = loading
  }
}
const projects = [ // 子项目信息
  {
    name: 'aaa',
    entry: 'http://localhost:7771',
    render,
    activeRule: '/aaa',
  },
  {
    name: 'bbb',
    entry: 'http://localhost:7772',
    render,
    activeRule: '/bbb',
  },
]

registerMicroApps(projects) // 注册子项目

render()

start({singular: false})
