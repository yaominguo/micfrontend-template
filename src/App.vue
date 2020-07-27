<template>
  <div id="root">
    <Loader />
    <router-view/>
  </div>
</template>

<script>
import Loader from '@/components/Layout/loader'
import {mapMutations} from 'vuex'
export default {
  name: 'App',
  components: {
    Loader,
  },
  props: {
    content: String,
    loading: Boolean,
  },
  methods: {
    ...mapMutations([
      'setContent',
      'setLoading',
    ])
  },
  mounted() {
    /** 持久化存储vuex 使其页面刷新后数据不丢失 */
    //在页面加载时读取sessionStorage里的状态信息
    // if (sessionStorage.getItem('VuexStore')) {
    //   this.$store.replaceState(Object.assign({}, this.$store.state, JSON.parse(sessionStorage.getItem('VuexStore'))))
    // }
    // //在页面刷新时将vuex里的信息保存到sessionStorage里
    // window.addEventListener('beforeunload', () => {
    //   sessionStorage.setItem('VuexStore', JSON.stringify(this.$store.state))
    // })
    this.getRouteMenu()
  },
  beforeDestroy() {
    window.removeEventListener('beforeunload', () => {
      sessionStorage.setItem('VuexStore', JSON.stringify(this.$store.state))
    })
  },
  methods: {
    getRouteMenu() {
      const addRoutes = (data) => {
        const {routes} = this.$router.options
        const parent = routes.find(item => item.name === 'Layout')
        parent.children.push(...data)
        this.$router.addRoutes([parent])
      }

      if(this.$store.state.routes.length > 0) {
        addRoutes(this.$store.state.routes)
        return
      }

      // 模拟动态获取路由
      setTimeout(() => {
        const res = [
          {
            path: '/pudong',
            name: 'pudong',
            meta: {
              title: 'A菜单',
            },
            children: [
              {
                path: '/pudong/caidan1',
                name: 'login',
                meta: {
                  title: '登录'
                }
              },
              {
                path: '/pudong/caidan2',
                name: 'register',
                meta: {
                  title: '注册'
                }
              },
              {
                path: '/pudong/home',
                name: 'aaa-home',
                meta: {
                  title: '页面'
                }
              },
            ]
          },
          {
            path: '/ecologicalFishery',
            name: 'dyzh',
            meta: {
              title: 'dyzh',
            },
            children: [
              {
                path: '/ecologicalFishery/BasicInfor',
                name: 'BasicInfor',
                meta: {
                  title: '基本信息'
                }
              },
            ]
          },
          {
            path: '/webview',
            name: 'webview',
            meta: {
              title: '传统项目',
            },
            children: [
              {
                path: '/webview/html',
                name: 'html',
                meta: {
                  title: 'html页面',
                  src: 'http://localhost:7770'
                  // src: 'http://962121.fgj.sh.gov.cn/wyweb/mngplat/cspinfodeclare/query/cspinfodeclarequery/index.do',
                }
              },
            ]
          },
        ]
        this.$store.commit('setRoutes', res)
        addRoutes(res)
      }, 3000)
    }
  },
  watch: {
    content(cur) {
      this.setContent(cur)
    },
    loading(cur) {
      this.setLoading(cur)
    }
  }
}
</script>

<style>
#root {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  width: 100%;
  height: 100%;
  overflow: hidden;
}
</style>
