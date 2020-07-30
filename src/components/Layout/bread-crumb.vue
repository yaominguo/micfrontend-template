<template>
  <a-breadcrumb>
    <a-breadcrumb-item v-for="item in list" :key="`bread-crumb-${item.name}`">
      <router-link v-if="item.to" :to="item.to">
        {{showTitle(item)}}
      </router-link>
      <span v-else>{{showTitle(item)}}</span>
    </a-breadcrumb-item>
  </a-breadcrumb>
</template>

<script>
export default {
  name: 'BreadCrumb',
  computed: {
    list() {
      return this.$store.state.breadCrumbList
    }
  },
  methods: {
    showTitle(item) {
      return (item.meta && item.meta.title) || item.name
    },
  },
}
</script>
