<template>
<a-locale-provider :locale="zh_CN">
  <a-layout id="layout">
    <a-layout-sider v-model="collapsed" :trigger="null" breakpoint="lg" collapsible>
      <div class="logo" />
      <SideMenu />
    </a-layout-sider>
    <a-layout>
      <a-layout-header class="layout-head">
        <div>
          <a-icon class="trigger" :type="collapsed ? 'menu-unfold' : 'menu-fold'" @click="collapsed = !collapsed" />
          <NavBar />
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
              <a-menu-item key="/person">账户信息</a-menu-item>
              <a-menu-item key="/logout">退出登录</a-menu-item>
            </a-menu>
          </a-dropdown>
        </div>
      </a-layout-header>
      <a-layout-content class="layout-content">
        <!-- 子项目在此加载 -->
        <div v-if="content" id="contentView" v-html="content" />
        <router-view v-else></router-view>
      </a-layout-content>
    </a-layout>
  </a-layout>
</a-locale-provider>
</template>
<script>
import SideMenu from './sidemenu'
import NavBar from './navbar'
import zh_CN from 'ant-design-vue/lib/locale-provider/zh_CN'
export default {
  name: 'Layout',
  components: {
    SideMenu,
    NavBar,
  },
  computed: {
    content() {
      return this.$store.state.content
    }
  },
  data() {
    return {
      zh_CN,
      collapsed: false,
    }
  },
  methods: {
    onUserSelect({key}) {
      this.$router.push({
        path: key,
      })
    }
  },
}
</script>

<style>
#contentView {
  width: 100%;
  height: 100%;
}
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
  margin: 14px;
}
</style>
