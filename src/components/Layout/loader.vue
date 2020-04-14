<template>
  <div class="loader" v-show="loading">
    <a-spin :tip="msg" :spinning="loading" size="large"/>
  </div>
</template>

<script>
export default {
  name: 'Loader',
  props: {
    msg: {
      type: String,
      default: '加载中...',
    }
  },
  computed: {
    loading() {
      return this.$store.state.showLoading
    }
  },
}
</script>

<style scoped>
.loader {
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background-color: rgba(255,255,255,0.4);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 999;
}
</style>
