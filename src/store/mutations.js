export default {
  setContent(state, data) {
    state.content = data
  },
  setLoading(state, val) {
    state.showLoading = val
  },
  setRoutes(state, data) {
    state.routes = data
  },
  setWebviewSrc(state, src) {
    state.webviewSrc = src
  }
}
