import Vue from 'vue'
import Router from 'vue-router'

const _import = require('./_import_' + process.env.NODE_ENV)
// in development env not use Lazy Loading,because Lazy Loading too many pages will cause webpack hot update too slow.so only in production use Lazy Loading

Vue.use(Router)

/* layout */
import Layout from '../views/layout/Layout'

/**
 * icon : the icon show in the sidebar
 * hidden : if `hidden:true` will not show in the sidebar
 * redirect : if `redirect:noredirect` will no redirct in the levelbar
 * noDropdown : if `noDropdown:true` will has no submenu
 * meta : { role: ['admin'] }  will control the page role
 **/
export const constantRouterMap = [
  { path: '/login', component: _import('login/index'), hidden: true },
  { path: '/authredirect', component: _import('login/authredirect'), hidden: true },
  { path: '/404', component: _import('errorPage/404'), hidden: true },
  { path: '/401', component: _import('errorPage/401'), hidden: true },
  {
    path: '',
    component: Layout,
    redirect: '/dashboard',
    name: '首页',
    hidden: true,
    children: [{ path: 'dashboard', component: _import('dashboard/index') }]
  }

]

export default new Router({
  // mode: 'history', //后端支持可开
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRouterMap
})

export const asyncRouterMap = [
  {
    path: '/device',
    component: Layout,
    name: '设备管理',
    icon: 'component',
    meta: {
      title: '设备管理'
    },
    children: [
      { path: 'deviceList', component: _import('extend/device/index'), name: '设备列表', meta: { title: '设备列表' }},
      { path: 'deviceGroup', component: _import('extend/device/group'), name: '设备组列表', meta: { title: '设备组列表' }},
      { path: 'deviceType', component: _import('extend/device/type'), name: '设备类型管理', meta: { title: '设备类型管理' }},
      { path: 'deviceMap', component: _import('extend/device/deviceMap'), name: '设备地图展示', meta: { title: '设备地图展示' }}
    ]
  },

  {
    path: '/system',
    component: Layout,
    name: '系统管理',
    icon: 'component',
    meta: {
      title: '系统管理'
    },
    children: [
      { path: 'role', component: _import('systemAdmin/role'), name: '角色管理', meta: { title: '角色管理' }},
      { path: 'systemuser', component: _import('systemAdmin/system'), name: '系统用户', meta: { title: '系统用户' }}
    ]
  },

  {
    path: '/sale',
    component: Layout,
    name: '售后管理',
    icon: 'component',
    meta: {
      title: '售后管理'
    },
    children: [
      { path: 'alarm', component: _import('extend/device/warnList'), name: '告警设备列表', meta: { title: '告警设备列表' }},
      { path: 'alarmLevel', component: _import('extend/empty'), name: '告警级别管理', meta: { title: '告警级别管理' }}
    ]
  },

  {
    path: '/data',
    component: Layout,
    name: '数据分析',
    icon: 'component',
    meta: {
      title: '数据分析'
    },
    children: [
      { path: 'orderlist', component: _import('extend/empty'), name: 'orderlist', meta: { title: '订单分析' }},
      { path: 'userlist', component: _import('extend/empty'), name: 'userlist', meta: { title: '用户分析' }},
      { path: 'devicedatalist', component: _import('extend/empty'), name: 'devicedatalist', meta: { title: '数据分析' }},
      { path: 'system', component: _import('extend/empty'), name: 'system', meta: { title: '系统分析' }}
    ]
  },

  {
    path: '/order',
    component: Layout,
    name: '订单中心',
    icon: 'component',
    meta: {
      title: '订单中心'
    },
    children: [
      { path: 'saleOrder12', component: _import('extend/empty'), name: '租赁订单列表', meta: { title: '租赁订单列表' }},
      { path: 'projectList11', component: _import('extend/empty'), name: '租赁充值列表', meta: { title: '租赁充值列表' }},
      { path: 'projectList111', component: _import('extend/empty'), name: '分销订单', meta: { title: '分销订单' }},
      { path: 'projectList1111', component: _import('extend/empty'), name: '售后订单', meta: { title: '售后订单' }}
    ]
  },
  {
    path: '/profit',
    component: Layout,
    name: '分润管理',
    icon: 'component',
    meta: {
      title: '分润管理'
    },
    children: [
      { path: 'saleOrder2', component: _import('extend/empty'), name: '租赁分润账单', meta: { title: '租赁分润账单' }},
      { path: 'projectList1', component: _import('extend/empty'), name: '售后分润订单', meta: { title: '售后分润订单' }},
      { path: 'projectList2', component: _import('extend/empty'), name: '分销分润订单', meta: { title: '分销分润订单' }},
      { path: 'projectList3', component: _import('extend/empty'), name: '售后订单', meta: { title: '售后分润订单' }},
      { path: 'projectList4', component: _import('extend/empty'), name: '售后订单', meta: { title: '售后分润账单' }}
    ]
  },
  {
    path: '/chuzu',
    component: Layout,
    name: '租赁管理',
    icon: 'component',
    meta: {
      title: '租赁管理'
    },
    children: []
  },

  { path: '*', redirect: '/404', hidden: true }
]
