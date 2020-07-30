<template>
<a-locale-provider :locale="zh_CN">
  <a-layout id="layout">
    <a-layout-sider v-model="collapsed" :trigger="null" breakpoint="lg" collapsible>
      <div class="logo" />
      <SideMenu ref="sideMenu"/>
    </a-layout-sider>
    <a-layout>
      <a-layout-header class="layout-head">
        <div>
          <a-icon class="trigger" :type="collapsed ? 'menu-unfold' : 'menu-fold'" @click="collapsed = !collapsed" />
          <BreadCrumb />
        </div>
        <div>
          <a-badge :count="0" showZero><a><a-icon type="bell" /></a></a-badge>
          <a-dropdown class="person-center">
            <span>
              <a-icon type="user" />
              <span class="name">用户名</span>
              <a-icon type="down" />
            </span>
            <a-menu slot="overlay" @click="onUserSelect">
              <a-menu-item key="/info">用户信息</a-menu-item>
              <a-menu-item key="/logout">退出登录</a-menu-item>
            </a-menu>
          </a-dropdown>
        </div>
      </a-layout-header>
      <div class="tag-nav-wrapper">
        <TagsNav :value="$route" @select="turnToPage" :list="tagNavList" @on-close="handleCloseTag"/>
      </div>
      <a-layout-content class="layout-content">
        <!-- 子项目在此加载 -->
        <div v-if="content" id="contentView" v-html="content" />
        <template v-else>
          <!-- 传统子项目在iframe中渲染 -->
          <iframe v-if="webviewSrc" :src="webviewSrc" frameborder="0" style="width:100%;height:96%;overflow:hidden;" />
          <!-- 本项目的子页面在此渲染 -->
          <router-view v-else />
        </template>
      </a-layout-content>
    </a-layout>
  </a-layout>
</a-locale-provider>
</template>
<script>
import {mapState, mapMutations} from 'vuex'
import SideMenu from './sidemenu'
import TagsNav from './tags-nav'
import BreadCrumb from './bread-crumb'
import zh_CN from 'ant-design-vue/lib/locale-provider/zh_CN'
import {routeEqual, getNewTagList, checkRouteChange, isInRoutes} from '@/libs/util'
export default {
  name: 'Layout',
  components: {
    SideMenu,
    TagsNav,
    BreadCrumb,
  },
  computed: {
    ...mapState([
      'content',
      'webviewSrc',
      'tagNavList',
      'homeRoute',
    ])
  },
  data() {
    return {
      zh_CN,
      collapsed: false,
    }
  },
  mounted() {
    this.setTagNavList()
    this.addTag({
      route: this.homeRoute
    })
    this.setBreadCrumb(this.$route)
    window.addEventListener('beforeunload', () => checkRouteChange(this.$route, window.location)) // 刷新页面时候检查路由和真实地址是否有变化
  },
  beforeDestroy() {
    window.removeEventListener('beforeunload', () => checkRouteChange(this.$route, window.location))
  },
  beforeRouteLeave (to, from, next) { // 页面跳转时候检查路由和真实地址是否有变化
    checkRouteChange(from, window.location)
    next()
  },
  methods: {
    ...mapMutations([
      'addTag', // 添加标签
      'setTagNavList', // 设置标签列表
      'setBreadCrumb', // 设置面包屑列表
    ]),
    onUserSelect({key}) {
      this.$router.push({
        path: key,
      })
    },
    turnToPage(route) { // 点击标签跳转页面
      if (typeof route === 'string') {
        this.$router.push({name: route})
      } else if (route._jump) { // 标签路由发生改变则重定向
        this.$router.push({path: route._jump})
      } else {
        const {name, params, query} = route
        this.$router.push({
          name,
          params,
          query,
        })
      }
    },
    handleCloseTag(res, type, route) { // 关闭标签
      this.$global_state.setGlobalState({destroy: true}) // 关闭标签则设置子项目unmount时销毁keep-alive状态
      setTimeout(() => this.$global_state.setGlobalState({destroy: false}), 2000)
      /**
       * 关闭触发中的标签页面则推回首页标签
       * (原本的逻辑是关闭触发中的标签页面则触发相邻的标签页面，但是这样触发不了子项目的unmount)
       */
      if (routeEqual(this.$route, route)) {
        // const nextRoute = getNextRoute(this.tagNavList, route)
        // this.$router.push(nextRoute)
        this.$router.replace({name: 'home'})
      }
      this.setTagNavList(res)
    },
  },
  watch: {
    '$route': {
      handler(newRoute) { // 根据路由变化设置标签列表、面包屑、侧边菜单的选择状态
        const {name, query, params, meta, path} = newRoute
        /**
         * 如果路径在路由列表中存在才添加标签
         * (否则为没有配置在主项目的子项目的私有页面，例如详情页，则不再新开标签，继续在原标签页跳转显示)
         */
        if (isInRoutes(path)) {
          this.addTag({
            route: {name, query, params, meta, path},
            type: 'push',
          })
        }
        this.setBreadCrumb(newRoute)
        this.setTagNavList(getNewTagList(this.tagNavList, newRoute))
        this.$refs.sideMenu.updateOpenKey(newRoute.name)
      }
    }
  },
}
</script>

<style>
#contentView,
#contentView > div {
  width: 100%;
  height: 100%;
}
</style>

<style scoped>
#layout {
  width: 100%;
  height: 100%;
}
#layout .trigger {
  font-size: 18px;
  cursor: pointer;
  transition: color 0.3s;
  margin-right: 20px;
}
#layout .trigger:hover {
  color: #1890ff;
}
#layout .logo {
  height: 32px;
  background: rgba(255, 255, 255, 0.2);
  margin: 16px;
}

#layout .layout-head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: #fff;
  padding: 0 1.5rem;
  box-shadow: 0 0 10px 0 rgba(0,0,0,.5);
  z-index: 1;
}
#layout .layout-head > div {
  display: flex;
  align-items: center;
}
#layout .layout-head .person-center {
  margin-left: 20px;
}
#layout .layout-head .person-center .name {
  margin: 0 10px;
}

#layout .layout-content {
  height: 100%;
  margin: 14px;
  padding: 14px;
  overflow-y: auto;
  background: #fff;
}

.tag-nav-wrapper {
  padding: 10px 0 0;
  height: 40px;
}
</style>
