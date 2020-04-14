<template>
  <div class="error-page">
    <h1>网络错误</h1>
    <div>
      <a-button @click="$router.back()">返回上一页</a-button>
      <a-button type="primary" @click="$router.push({name: 'home'})">返回首页</a-button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ErrorPage',
}
</script>

<style scoped>
.error-page {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
</style>
