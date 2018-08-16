import router from './router'
import store from './store'
import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css' // progress bar style
import { getToken } from '@/utils/auth' // getToken from cookie

NProgress.configure({ showSpinner: false }) // NProgress Configuration

// permission judge function
function hasPermission(permission, permissionRoles) {
  if (permission.indexOf('admin') >= 0) return true // admin permission passed directly
  if (!permissionRoles) return true
  return permission.some(role => permissionRoles.indexOf(role) >= 0)
}

const whiteList = ['/login', '/authredirect'] // no redirect whitelist

router.beforeEach((to, from, next) => {
  NProgress.start() // start progress bar
  if (getToken()) {
    // determine if there has token
    /* has token*/
    if (to.path === '/login') {
      next({ path: '/' })
      NProgress.done() // if current page is dashboard will not trigger	afterEach hook, so manually handle it
    } else {
      if (store.getters.permission.length === 0) {
        // 判断当前用户是否已拉取完user_info信息
        const permission = [
          'big-picture-mode:solution:get',
          'big-picture-mode:project:get',
          'analytics:order:get',
          'analytics:user:post',
          'analytics:device:post',
          'analytics:system:post',
          'device:list:get',
          'device:group:post',
          'device:cluster:post',
          'device:config:post',
          'device:model:post',
          'device:function:post',
          'alarm:device:get',
          'alarm:level:get',
          'alarm:process:get',
          'order:rent:get',
          'order:payment:get',
          'order:sales:get',
          'order:after-sale:get',
          'income:rule:get',
          'income:bill:get',
          'rent:wechat:get',
          'rent:blacklist:get',
          'rent:toll:get',
          'rent:putin:get',
          'rent:operator:get',
          'rent:payment:get',
          'system:client:get',
          'system:role:get',
          'system:user:get',
          'system:setting:get',
          'message:system:get',
          'message:user:get',
          'message:alarm:get',
          'message:after-sale:get'
        ]
        store.commit('SET_PERMISSION', permission)
        store.dispatch('GenerateRoutes', { permission }).then(() => {
          // 根据permission权限生成可访问的路由表
          router.addRoutes(store.getters.addRouters) // 动态添加可访问路由表
          next({ ...to, replace: true }) // hack方法 确保addRoutes已完成 ,set the replace: true so the navigation will not leave a history record
        })
      } else {
        // 没有动态改变权限的需求可直接next() 删除下方权限判断 ↓
        if (hasPermission(store.getters.permission, to.meta.permission)) {
          next()
        } else {
          next({ path: '/401', replace: true, query: { noGoBack: true }})
        }
        // 可删 ↑
      }
    }
  } else {
    /* has no token*/
    if (whiteList.indexOf(to.path) !== -1) {
      // 在免登录白名单，直接进入
      next()
    } else {
      next('/login') // 否则全部重定向到登录页
      NProgress.done() // if current page is login will not trigger afterEach hook, so manually handle it
    }
  }
})

router.afterEach(() => {
  NProgress.done() // finish progress bar
})
