// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import 'babel-polyfill'
import Vue from 'vue'
import App from './App'
import router from './router'
import {registerMicroApps, setDefaultMountApp, start} from 'qiankun'

Vue.config.productionTip = false

/* eslint-disable no-new */
let app = null
function render({appContent, loading} = {}) {
  if (!app) {
    app = new Vue({
      el: '#portal',
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

function genActiveRule(routerPrefix) {
  return location => location.pathname.startsWith(routerPrefix)
}

render()

registerMicroApps([
  {
    name: 'aaa',
    entry: 'http://portal.tao.com/',
    render,
    activeRule: genActiveRule('/aaa'),
  },
], {
  beforeLoad: [
    app => {
      console.log('before load', app)
    }
  ], // 挂载前回调
  beforeMount: [
    app => {
      console.log('before mount', app)
    }
  ], // 挂载后回调
  afterUnmount: [
    app => {
      console.log('after unload', app)
    }
  ] // 卸载后回调
})

setDefaultMountApp('/aaa')

start()
