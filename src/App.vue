<template>
  <div id="root">
    <!-- <router-view/> -->
    <div id="root-view" class="app-view-box" v-html="content"></div>
  </div>
</template>

<script>
export default {
  name: 'App',
  props: {
    content: String,
  }
}
</script>

<style>
#root {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  width: 100%;
  height: 100%;
}
#root-view {
  width: 100%;
  height: 100%;
}
#root-view > div {
  width: 100%;
  height: 100%;
}
</style>
