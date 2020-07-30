import {homeName, getHomeRoute} from '@/libs/util'
import routers from '@/router/routes'

export default {
  homeRoute: getHomeRoute(routers, homeName),
  content: null,
  showLoading: false,
  routes: [],
  webviewSrc: null,
  tagNavList: [],
  breadCrumbList: [],
}
