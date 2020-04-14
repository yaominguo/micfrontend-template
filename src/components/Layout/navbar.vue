<template>
  <a-breadcrumb :routes="routes">
    <template slot="itemRender" slot-scope="{route}">
      <template v-if="$route.path.startsWith(route.path) || route.path == '/portal-home'">
        <span v-if="routes.indexOf(route) === routes.length - 1">
          {{route.name}}
        </span>
        <router-link v-else :to="route.path">
          {{route.name}}
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
      return [{path: '/portal-home', name: 'Home'}, ...routes[0].children.slice(1)]
    }
  }
}
</script>
