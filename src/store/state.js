import {homeName, getHomeRoute} from '@/libs/util'
import routers from '@/router/routes'

export default {
  homeRoute: getHomeRoute(routers, homeName),
  contentIsReady: false,
  showLoading: false,
  routes: [],
  webviewSrc: null,
  tagNavList: [],
  breadCrumbList: [],
  instanceCollection: {},
}
