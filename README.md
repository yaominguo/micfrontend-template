# 微前端项目用模板

---

> ## 主项目需自行定义、设置的地方

### 1. [main.js](/src/main.js)中的 projects 子项目信息（子项目生产地址和标识等）

### 2. [App.vue](/src/App.vue)中的 getRouteMenu 获取侧边路由菜单的方法

### 3. [/config/index.js](/config/index.js)中的 build.assetsPublicPath 设置为主项目的实际生产地址

<i style="color:red">
记得主项目需将/config/index.js中的build.assetsPublicPath修改为主项目的实际生产地址，否则生产环境下在子项目刷新页面会空白。
此外需注意服务器上的项目文件路径与assetsPublicPath和router.base的关系。
</i>

---

> ## 子项目接入须知

### 1. 建立子项目唯一标识，下面都将以'child'为例

### 2. 在/build/webpack.base.conf.js 文件中的 output 对象添加如下配置:

```javascript
output: {
  library: 'child',
  libraryTarget: 'umd',
  // 原来的配置项此处省略了，别删掉了
}
```

### 3. 在/router/index.js 文件中的 router 实例添加如下配置：

```javascript
new Router({
  mode: "history",
  base: window.__POWERED_BY_QIANKUN__ ? "/child/" : "/"
  // 原来的配置项此处省略了，别删掉了
});
```

### 4. 在项目入口文件/src/main.js 中引用[generate.js](/src/generate.js)，并暴露出 3 个生命周期函数：

```javascript
// ... 上面的代码此处省略了，别删掉了 ...
// 原来的代码
/* eslint-disable no-new */
// new Vue({
//   el: '#app',
//   router,
//   store,
//   components: { App },
//   template: '<App/>'
// })

// 替换为如下代码
import generate from "./generate";
const { bootstrap, mount, unmount } = generate();
export { bootstrap, mount, unmount };
```

### 5. 如需要 tab 切换多实例页面的模式，generate 方法需传参 keepAlive，同时 router-view 需设置 keep-alive 包裹

<i style="color:red;">!没有实际在生产环境下使用过</i>

```javascript
const { bootstrap, mount, unmount } = generate({ keepAlive: true });
```

```html
<keep-alive>
  <!-- 此处的key必不可少 -->
  <router-view :key="$route.fullPath" />
</keep-alive>
```

---

## Build Setup

```bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report
```

For a detailed explanation on how things work, check out the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).
