import {
  getRouteTitleHandler,
  routeHasExist,
  setTagNavListInLocalstorage,
  getTagNavListFromLocalstorage,
  getBreadCrumbList,
} from '@/libs/util'

const homeName = 'home'
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
  },
  addTag(state, {route, type = 'unshift'}) {
    const router = getRouteTitleHandler(route)
    if (routeHasExist(state.tagNavList, router)) return
    if (type === 'push') state.tagNavList.push(router)
    else {
      if (router.name === homeName) state.tagNavList.unshift(router)
      else state.tagNavList.splice(1, 0, router)
    }
    setTagNavListInLocalstorage([...state.tagNavList])
  },
  setTagNavList(state, list) {
    let tagList = []
    if (list) tagList = [...list]
    else tagList = getTagNavListFromLocalstorage()
    if (tagList[0] && tagList[0].name !== homeName) tagList.shift()
    const homeTagIndex = tagList.findIndex(item => item.name === homeName)
    if (homeTagIndex > 0) {
      tagList.unshift(tagList.splice(homeTagIndex, 1)[0])
    }
    state.tagNavList = tagList
    setTagNavListInLocalstorage([...tagList])
  },
  setBreadCrumb(state, route) {
    state.breadCrumbList = getBreadCrumbList(route, state.homeRoute)
  },
}
