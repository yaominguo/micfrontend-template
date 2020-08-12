/** Just For 微前端子项目 By Guo
 * 目标是实现多实例切换的基础上尽量减少对子项目代码的侵入性修改
*/

import Vue from 'vue'
import App from './App'
import store from './store'
import router from '@/router/index'

/**
 * @description 微前端子项目构造函数
 * @param {Boolean} keepAlive 是否缓存（开启后适用于tab切换多实例页面）
 * @param {String} el 实例化的容器
 */
export default ({keepAlive = false, el = '#app'} = {}) => {
  /* eslint-disable no-new */
  let instance = null
  let setState = null
  if (keepAlive) {
    const mixin = {
      beforeRouteEnter: function(to, from, next) {
        next(vm => {
          setState && setState({
            // 将销毁组件实例和项目实例的方法暴露给主项目
            instanceInfo: {
              path: to.fullPath,
              destroyFn: () => {
                const node = vm.$vnode,
                  destroy = vm.$destroy.bind(vm),
                  {base} = router.options,
                  destroyInstance = () => {
                    if (instance) {
                      instance.$destroy.call(instance)
                      instance = null
                    }
                  }
                return [node, destroy, base, destroyInstance]
              }
            }
          })
        })
      },
    }
    Vue.mixin(mixin) // 拦截所有页面的beforeRouteEnter
  }

  /* eslint-disable no-underscore-dangle */
  const render = () => {
    if (window.__POWERED_BY_QIANKUN__ && window.__CACHE_INSTANCE_BY_QIANKUN__) {
      const cachedInstance = window.__CACHE_INSTANCE_BY_QIANKUN__
      // 从最初的Vue实例上获得_vnode
      const cachedNode = cachedInstance._vnode
      // 让当前路由在最初的Vue实例上可用
      router.apps = [...cachedInstance.$router.apps]
      instance = new Vue({
        router,
        store,
        render: () => cachedNode
      })
      // 缓存最初的Vue实例
      instance.cachedInstance = cachedInstance
    } else { // 正常的初始化
      instance = new Vue({
        router,
        store,
        render: h => h(App)
      })
    }
    instance.$mount(el)
  }

  const bootstrap = async () => {}

  const mount = async (props) => {
    if (keepAlive) {
      render()
      setState = props.setGlobalState
    } else {
      instance = new Vue({
        router,
        store,
        render: h => h(App)
      }).$mount(el)
    }
  }

  const unmount = async () => {
    if (!keepAlive) {
      instance.$destroy()
      instance = null
      return
    }
    if (!instance) {
      window.__CACHE_INSTANCE_BY_QIANKUN__ = null
      return
    }
    const cachedInstance = instance.cachedInstance || instance
    const cachedNode = cachedInstance._vnode
    window.__CACHE_INSTANCE_BY_QIANKUN__ = cachedInstance
    // 让keep-alive可用
    cachedNode.data.keepAlive = true
    cachedNode.data.hook.destroy(cachedNode)
    // 卸载当前实例，缓存的实例由于keep-alive生效，将不会真正被销毁，从而触发activated与deactivated
    if (instance.cachedInstance) {
      instance.$destroy()
      instance = null
    }
  }

  window.__POWERED_BY_QIANKUN__
    // eslint-disable-next-line no-undef
    ? __webpack_public_path__ = window.__INJECTED_PUBLIC_PATH_BY_QIANKUN__
    : mount()

  return {
    bootstrap,
    mount,
    unmount,
  }
}
