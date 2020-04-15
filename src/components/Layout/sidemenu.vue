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
export default {
  name: 'SideMenu',
  data() {
    return {
      openKeys: [],
      selectedKeys: [],
      menus: [],
    }
  },
  // computed: {
  //   menus() {
  //     return [
  //       {
  //         key: 'sub1',
  //         icon: 'mail',
  //         title: '菜单1',
  //         children: [
  //           {
  //             key: 'aaa',
  //             title: '子菜单1'
  //           },
  //           {
  //             key: 'register',
  //             title: '注册'
  //           },
  //           {
  //             key: 'test',
  //             title: '子菜单2'
  //           },
  //           {
  //             key: 'error',
  //             title: '404'
  //           },
  //         ],
  //       },
  //     ]
  //   }
  // },
  methods: {
    // 点击菜单，收起其他展开的菜单
    onOpenChange(keys) {
      if (keys.length >= 2) {
        this.openKeys = keys.slice(1)
      } else {
        this.openKeys = keys
      }
    },
    onSelect({key}) {
      this.$router.push({
        name: key,
      })
    }
  },
  watch: {
    $route(cur) {
      if (cur.name === 'home') {
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
              icon: 'mail',
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
