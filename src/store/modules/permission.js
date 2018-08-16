import { asyncRouterMap, constantRouterMap } from '@/router'

/**
 * 通过meta.role判断是否与当前用户权限匹配
 * @param permission  权限对象
 * @param route  某个特定路由配置数据
 */
function hasPermission(permission, route) {
  return permission.some(item => item.path === route.path.replace('/', ''))
}

const transformType = data => {
  const result = []
  data.forEach(item => {
    item = item.split(':')
    // 判断是否在result中已经添加过该一级路由对象
    const index = result.findIndex(obj => obj.path === item[0])
    if (index >= 0) {
      result[index].children.push({
        path: item[1],
        method: item[2]
      })
      return
    }
    // 如果没有找到
    result.push({
      path: item[0],
      children: [
        {
          path: item[1],
          method: item[2]
        }
      ]
    })
  })
  return result
}

/**
 * 递归过滤异步路由表，返回符合权限的路由表
 * @param asyncRouterMap
 * @param permission
 */
function filterAsyncRouter(asyncRouterMap, permission) {
  const accessedRouters = asyncRouterMap.filter(route => {
    if (hasPermission(permission, route)) {
      if (route.children && route.children.length) {
        const thePermission = permission.filter(
          item => item.path === route.path.replace('/', '')
        )[0]
        route.children = filterAsyncRouter(
          route.children,
          thePermission && thePermission.children
        )
      }
      return true
    }
    return false
  })
  return accessedRouters
}

const thePermission = {
  state: {
    routers: constantRouterMap,
    addRouters: []
  },
  mutations: {
    SET_ROUTERS: (state, routers) => {
      state.addRouters = routers
      state.routers = constantRouterMap.concat(routers)
    }
  },
  actions: {
    GenerateRoutes({ commit }, data) {
      return new Promise(resolve => {
        let { permission } = data
        permission = transformType(permission)
        let accessedRouters
        if (permission.indexOf('admin') >= 0) {
          accessedRouters = asyncRouterMap
        } else {
          accessedRouters = filterAsyncRouter(asyncRouterMap, permission)
        }
        commit('SET_ROUTERS', accessedRouters)
        resolve()
      })
    }
  }
}

export default thePermission
