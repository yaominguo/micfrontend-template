<template>
  <div id="root">
    <Loader />
    <router-view />
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
  mounted() {
    /** 持久化存储vuex 使其页面刷新后数据不丢失 */
    //在页面加载时读取sessionStorage里的状态信息
    // if (sessionStorage.getItem('VuexStore')) {
    //     this.$store.replaceState(Object.assign({}, this.$store.state, JSON.parse(sessionStorage.getItem('VuexStore'))))
    // }
    // //在页面刷新时将vuex里的信息保存到sessionStorage里
    // window.addEventListener('beforeunload', () => {
    //     sessionStorage.setItem('VuexStore', JSON.stringify(this.$store.state))
    // })
    this.getRouteMenu()
  },
  beforeDestroy() {
    window.removeEventListener('beforeunload', () => {
      sessionStorage.setItem('VuexStore', JSON.stringify(this.$store.state))
    })
  },
  methods: {
    ...mapMutations([
      'setContent',
      'setLoading',
    ]),
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
            path: '/aaa',
            name: 'aaa',
            meta: {
              title: 'aaa项目',
            },
            children: [
              {
                path: '/aaa/login',
                name: 'aaa-login',
                meta: {
                  title: '登录'
                }
              },
              {
                path: '/aaa/register',
                name: 'aaa-register',
                meta: {
                  title: '注册'
                }
              },
              {
                path: '/aaa/home',
                name: 'aaa-home',
                meta: {
                  title: '页面'
                }
              },
            ]
          },
          {
            path: '/bbb',
            name: 'bbb',
            meta: {
              title: 'bbb项目',
            },
            children: [
              {
                path: '/bbb/login',
                name: 'bbb-login',
                meta: {
                  title: '登录'
                }
              },
              {
                path: '/bbb/register',
                name: 'bbb-register',
                meta: {
                  title: '注册'
                }
              },
              {
                path: '/bbb/home',
                name: 'bbb-home',
                meta: {
                  title: '页面'
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
