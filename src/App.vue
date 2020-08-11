<template>
  <div id="root">
    <Loader :value="$store.state.showLoading"/>
    <router-view />
  </div>
</template>

<script>
import Loader from '@/components/Layout/loader'
export default {
  name: 'App',
  components: {
    Loader,
  },
  mounted() {
    /** 持久化存储vuex 使其页面刷新后数据不丢失 （根据需求放开注释）*/
    //在页面加载时读取sessionStorage里的状态信息
    // if (sessionStorage.getItem('VuexStore')) {
    //     this.$store.replaceState(Object.assign({}, this.$store.state, JSON.parse(sessionStorage.getItem('VuexStore'))))
    // }
    // //在页面刷新时将vuex里的信息保存到sessionStorage里
    // window.addEventListener('beforeunload', () => {
    //     sessionStorage.setItem('VuexStore', JSON.stringify(this.$store.state))
    // })
    this.getRouteMenu() //模拟异步获取路由列表形成侧边栏菜单
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
                path: '/aaa/table',
                name: 'aaa-table',
                meta: {
                  title: '列表页'
                }
              },
              {
                path: '/aaa/table1',
                name: 'aaa-table1',
                meta: {
                  title: '列表页1'
                }
              },
              {
                path: '/aaa/table2',
                name: 'aaa-table2',
                meta: {
                  title: '列表页2'
                }
              },
              {
                path: '/aaa/table3',
                name: 'aaa-table3',
                meta: {
                  title: '列表页3'
                }
              },
              {
                path: '/aaa/table4',
                name: 'aaa-table4',
                meta: {
                  title: '列表页4'
                }
              },
              {
                path: '/aaa/table5',
                name: 'aaa-table5',
                meta: {
                  title: '列表页5'
                }
              },
              {
                path: '/aaa/table6',
                name: 'aaa-table6',
                meta: {
                  title: '列表页6'
                }
              },
              {
                path: '/aaa/table7',
                name: 'aaa-table7',
                meta: {
                  title: '列表页7'
                }
              },
              {
                path: '/aaa/table8',
                name: 'aaa-table8',
                meta: {
                  title: '列表页8'
                }
              },
              {
                path: '/aaa/table9',
                name: 'aaa-table9',
                meta: {
                  title: '列表页9'
                }
              },
              {
                path: '/aaa/table10',
                name: 'aaa-table10',
                meta: {
                  title: '列表页10'
                }
              },
              {
                path: '/aaa/table11',
                name: 'aaa-table11',
                meta: {
                  title: '列表页11'
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
                path: '/bbb/bindPhone',
                name: 'bbb-bindPhone',
                meta: {
                  title: '绑定手机'
                }
              },
              {
                path: '/bbb/register',
                name: 'bbb-register',
                meta: {
                  title: '注册'
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
body {
  overflow: hidden;
}
</style>
