<template>
  <a-breadcrumb :routes="routes">
    <template slot="itemRender" slot-scope="{route}">
      <template v-if="$route.path.startsWith(route.path) || route.path == '/portal-home'">
        <!-- <span v-if="routes.indexOf(route) === routes.length - 1">
          {{route.meta.title}}
        </span> -->
        <span v-if="route.path != '/portal-home'">
          {{route.meta.title}}
        </span>
        <router-link v-else :to="route.path">
          {{route.meta.title}}
        </router-link>
      </template>
    </template>
  </a-breadcrumb>
</template>
<script>
import routes from '@/router/routes.js'
export default {
  name: 'NavBar',
  computed: {
    routes() {
      const result = []
      const routeList = routes[0].children.slice(1)
      if (routeList && routeList.length > 0) {
        routeList.forEach(route => {
          result.push(route)
          if (route.children && route.children.length > 0) {
            result.push(...route.children)
          }
        })
      }
      return [{path: '/portal-home', name: 'Home', meta: {title: '首页'}}, ...result]
    }
  },
}
</script>
