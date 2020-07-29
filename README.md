# micfrontend-template

## 微前端项目用模板

<i> 记得主项目需将/config/index.js中的build.assetsPublicPath修改为主项目的生产环境地址。</i>


> ## 子项目接入须知

### 1. 建立子项目唯一标识，下面都将以‘child’为例

### 2. 在/build/webpack.base.conf.js文件中的output对象添加如下配置:

```javascript
output: {
  library: 'child',
  libraryTarget: 'umd',
  // 原来的配置项此处省略了，别删掉了
}
```

### 3. 在/router/index.js文件中的router实例添加如下配置：

```javascript
new Router({
  mode: 'history',
  base: window.__POWERED_BY_QIANKUN__ ? "/child/" : "/",
  // 原来的配置项此处省略了，别删掉了
})
```

### 4. 修改项目入口文件/src/main.js文件代码，暴露出3个生命周期函数：

```javascript
// 原来的方法
/* eslint-disable no-new */
// new Vue({
//   el: '#app',
//   router,
//   store,
//   components: { App },
//   template: '<App/>'
// })

// 替换为如下代码
/* eslint-disable no-new */
let instance = null
export async function bootstrap() {}
export async function mount() {
  instance = new Vue({
    router,
    store,
    render: h => h(App)
  }).$mount('#app')
}
export async function unmount() {
  instance.$destroy()
  instance = null
}
if (window.__POWERED_BY_QIANKUN__) {
  __webpack_public_path__ = window.__INJECTED_PUBLIC_PATH_BY_QIANKUN__
} else {
  mount()
}
```

---

## Build Setup

``` bash
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
