<template>
  <a-menu
    class="layout-side-menu"
    mode="inline"
    theme="dark"
    :openKeys="openKeys"
    v-model="selectedKeys"
    @openChange="onOpenChange"
    @select="onSelect"
  >
    <template v-if="menus && menus.length > 0">
      <a-sub-menu v-for="menu in menus" :key="menu.key">
        <span slot="title"><a-icon :type="menu.icon" /><span>{{menu.title}}</span></span>
        <template v-if="menu.children && menu.children.length > 0">
          <a-menu-item v-for="child in menu.children" :key="child.key">{{child.title}}</a-menu-item>
        </template>
      </a-sub-menu>
    </template>
  </a-menu>
</template>

<script>
import {homeName, isInRoutes} from '@/libs/util.js'
export default {
  name: 'SideMenu',
  data() {
    return {
      openKeys: [],
      selectedKeys: [],
      menus: [],
    }
  },
  methods: {
    // 点击菜单，收起其他展开的菜单
    onOpenChange(keys) {
      if (keys.length >= 2) {
        this.openKeys = keys.slice(1)
      } else {
        this.openKeys = keys
      }
    },
    // 更新打开及选中的菜单
    updateOpenKey(name) {
      if (name === homeName) this.openKeys = []
      else if (!isInRoutes(this.$route.path)) {
        const result = this.$store.state.tagNavList.find(tag => tag._jump && tag._jump.startsWith(this.$route.path))
        this.openKeys = result._matched.map(item => item.name).filter(item => item !== name)
        this.selectedKeys = [result.name]
      } else {
        this.openKeys = this.$route.matched.map(item => item.name).filter(item => item !== name)
        this.selectedKeys = [name]
      }
    },
    onSelect({key}) {
      const result = this.$store.state.tagNavList.find(tag => tag.name === key)
      if (result && result._jump) {
        this.$router.push({
          path: result._jump,
        })
        return
      }
      this.$router.push({
        name: key,
      })
    }
  },
  computed: {
    notInSideMenus() { // 不需要在侧边栏展示的路由
      const {routes} = this.$router.options
      const parent = routes.find(item => item.name === 'Layout')
      return parent.children.filter(route => !route.children).map(item => item.name)
    },
  },
  watch: {
    $route(cur) {
      if (this.notInSideMenus.indexOf(cur.name) >= 0) {
        this.openKeys = []
        this.selectedKeys = []
      }
    },
    '$store.state.routes': { // 根据动态获取的路由生成菜单
      handler(cur) {
        this.menus = cur.map(route => {
          if (route.children && route.children.length > 0) {
            return {
              key: route.name,
              icon: route.meta.icon || 'folder',
              title: route.meta.title,
              children: route.children.map(child => {
                return {
                  key: child.name,
                  title: child.meta.title,
                }
              })
            }
          }
        })
      },
      immediate: true,
    }
  }
}
</script>

<style>
  .layout-side-menu {
    height: 90%;
    overflow-y: auto;
    scrollbar-arrow-color: #00284e; /*三角箭头的颜色*/
    scrollbar-face-color: #00284e; /*立体滚动条的颜色（包括箭头部分的背景色）*/
    scrollbar-3dlight-color: #00284e; /*立体滚动条亮边的颜色*/
    scrollbar-highlight-color: #00284e; /*滚动条的高亮颜色（左阴影？）*/
    scrollbar-shadow-color: #00284e; /*立体滚动条阴影的颜色*/
    scrollbar-darkshadow-color: #00284e; /*立体滚动条外阴影的颜色*/
    scrollbar-track-color: #000c17; /*立体滚动条背景颜色*/
    scrollbar-base-color:#00284e; /*滚动条的基色*/
  }
  /* 设置滚动条的样式 */
  .layout-side-menu::-webkit-scrollbar {
    width: 10px;
  }
  /* 滚动条滑块 */
  .layout-side-menu::-webkit-scrollbar-thumb {
    background:#00284e;
  }
</style>
