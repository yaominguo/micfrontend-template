export const homeName = 'home'

export const getRouteTitleHandled = route => {
  const router = {...route}
  const meta = {...route.meta}
  let {title} = meta
  if (title && typeof meta.title === 'function') {
    title = meta.title(router)
  }
  meta.title = title
  router.meta = meta
  return router
}

/**
 * @description 判断两个对象是否相等，这两个对象的值只能是数字或字符串
 * @param {*} obj1 对象
 * @param {*} obj2 对象
 */
export const objEqual = (obj1, obj2) => {
  const keysArr1 = Object.keys(obj1)
  const keysArr2 = Object.keys(obj2)
  if (keysArr1.length !== keysArr2.length) return false
  else if (keysArr1.length === 0 && keysArr2.length === 0) return true
  /* eslint-disable-next-line */
  else return !keysArr1.some(key => obj1[key] != obj2[key])
}

/**
 *
 * @param {Number} times 回调函数需要执行的次数
 * @param {Function} cb 回调函数
 */
export const doCustomTimes = (times, cb) => {
  let i = -1
  while (++i < times) {
    cb(i)
  }
}

/**
 * @description 根据name、params、query判断两个路由对象是否相等
 * @param {*} route1
 * @param {*} route2
 */
export const routeEqual = (route1, route2) => {
  const params1 = route1.params || {}
  const params2 = route2.params || {}
  const query1 = route1.query || {}
  const query2 = route2.query || {}
  return (route1.name === route2.name) && objEqual(params1, params2) && objEqual(query1, query2)
}

// 判断打开的标签列表里是否已存在该路由对象
export const routeHasExist = (tagNavList, routeItem) => {
  const len = tagNavList.length
  let res = false
  doCustomTimes(len, index => {
    if (routeEqual(tagNavList[index], routeItem)) res = true
  })
  return res
}

/**
 * @description 如果newRoute已经存在则不再添加
 * @param {*} list 现有标签导航列表
 * @param {*} newRoute 新添加的路由原信息对象
 */
export const getNewTagList = (list, newRoute) => {
  const {name, path, meta} = newRoute
  const newList = [...list]
  if (newList.findIndex(item => item.name === homeName) >= 0) return newList
  else newList.push({name, path, meta})
  return newList
}

/**
 * @description 用于查找路由列表中name为home的对象
 * @param {*} routers
 * @param {*} home
 */
export const getHomeRoute = (routers, home = 'home') => {
  let i = -1
  const len = routers.length
  let homeRoute = {}
  while (++i < len) {
    const item = routers[i]
    if (item.children && item.children.length) {
      const res = getHomeRoute(item.children, home)
      if (res.name) return res
    } else {
      if (item.name === home) homeRoute = item
    }
  }
  return homeRoute
}

/**
 * @param {*} list 当行标签列表
 * @param {*} route 当前关闭的标签
 */
export const getNextRoute =(list, route) => {
  let res = {}
  if (list.length === 2) {
    res = getHomeRoute(list)
  } else {
    const index = list.findIndex(item => routeEqual(item, route))
    if (index === list.length - 1) res = list[list.length - 2]
    else res = list[index + 1]
  }
  return res
}

export const getBreadCrumbList = (route, homeRoute) => {
  const homeItem = {...homeRoute}
  const routeMatched = route.matched
  if (routeMatched.some(item => item.name === homeRoute.name)) return [homeItem]
  let res = routeMatched.filter(item => item.parent !== undefined).map(item => {
    const meta = {...item.meta}
    if (meta.title && typeof meta.title === 'function') meta.title = meta.title(route)
    return {
      name: item.name,
      meta,
    }
  })
  res = res.filter(item => !item.meta.hideInBread)
  return [{...homeItem, to: homeRoute.path}, ...res]
}

// 本地存储和获取标签导航列表
export const setTagNavListInLocalstorage = list => {
  localStorage.tagNavList = JSON.stringify(list)
}
export const getTagNavListFromLocalstorage = () => {
  const list = localStorage.tagNavList
  return list ? JSON.parse(list) : []
}
