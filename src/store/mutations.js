export default {
  setContent(state, data) {
    state.content = data
  },
  setLoading(state, val) {
    state.showLoading = val
  },
  setRoutes(state, data) {
    state.routes = data
  }
}
