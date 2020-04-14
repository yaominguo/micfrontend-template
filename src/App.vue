<template>
  <div id="root">
    <Loader />
    <router-view/>
  </div>
</template>

<script>
import Loader from '@/components/Layout/loader'
import {mapMutations} from 'vuex'
export default {
  name: 'App',
  components: {
    Loader,
  },
  props: {
    content: String,
    loading: Boolean,
  },
  methods: {
    ...mapMutations([
      'setContent',
      'setLoading',
    ])
  },
  watch: {
    content(cur) {
      this.setContent(cur)
    },
    loading(cur) {
      this.setLoading(cur)
    }
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
  overflow: hidden;
}
</style>
