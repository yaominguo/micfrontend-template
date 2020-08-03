<template>
  <div class="loader" v-show="value">
    <a-spin :tip="msg" :spinning="value" size="large"/>
  </div>
</template>

<script>
export default {
  name: 'Loader',
  props: {
    msg: {
      type: String,
      default: '加载中...',
    },
    value: {
      type: Boolean,
      default: false,
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
