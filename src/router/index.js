import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/views/layout/Layout'

/** note: submenu only apppear when children.length>=1
 *   detail see  https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 **/

/**
 * hidden: true                   if `hidden:true` will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu, whatever its child routes length
 *                                if not set alwaysShow, only more than one route under the children
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noredirect           if `redirect:noredirect` will no redirct in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']     will control the page roles (you can set multiple roles)
    title: 'title'               the name show in submenu and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar,
    noCache: true                if true ,the page will no be cached(default is false)
  }
 **/
export const constantRouterMap = [
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },
  {
    path: '/authredirect',
    component: () => import('@/views/login/authredirect'),
    hidden: true
  },
  {
    path: '/404',
    component: () => import('@/views/errorPage/404'),
    hidden: true
  },
  {
    path: '/401',
    component: () => import('@/views/errorPage/401'),
    hidden: true
  },
  {
    path: '',
    component: Layout,
    redirect: 'dashboard',
    children: [
      {
        path: 'dashboard',
        component: () => import('@/views/dashboard'),
        name: 'dashboard',
        meta: { title: 'dashboard', icon: 'tachometer-alt', noCache: true }
      }
    ]
  }
]

export default new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRouterMap
})

export const asyncRouterMap = [
  {
    path: '/big-picture-mode',
    component: () => import('@/views/big-picture-mode'),
    name: 'big-picture-mode',
    hidden: true,
    meta: {
      roles: ['admin', 'normal']
    },
    children: [
      {
        path: 'solution',
        component: () => import('@/views/big-picture-mode/solution'),
        name: 'big-picture-mode-solution',
        hidden: true,
        meta: {
          roles: ['admin']
        }
      },
      {
        path: 'project',
        component: () => import('@/views/big-picture-mode/project'),
        name: 'big-picture-mode-project',
        hidden: true,
        meta: {
          roles: ['normal']
        }
      }
    ]
  },
  {
    path: '/analytics',
    component: Layout,
    name: 'analytics',
    redirect: 'noredirect',
    alwaysShow: true,
    meta: {
      title: 'analytics',
      icon: 'chart-bar',
      roles: ['admin']
    },
    children: [
      {
        path: 'order',
        component: () => import('@/views/analytics/order'),
        name: 'orderAnalytics',
        meta: {
          title: 'orderAnalytics'
        }
      },
      {
        path: 'user',
        component: () => import('@/views/analytics/user'),
        name: 'userAnalytics',
        meta: {
          title: 'userAnalytics'
        }
      },
      {
        path: 'device',
        component: () => import('@/views/analytics/device'),
        name: 'deviceAnalytics',
        meta: {
          title: 'deviceAnalytics'
        }
      },
      {
        path: 'system',
        component: () => import('@/views/blank'),
        name: 'systemAnalytics',
        meta: {
          title: 'systemAnalytics'
        }
      }
      // {
      //   path: 'bigDataPanel',
      //   component: () => import('@/views/analytics/bigDataPanel'),
      //   name: 'bigDataPanel',
      //   meta: {
      //     title: 'bigDataPanel'
      //   }
      // },
      // {
      //   path: 'newBigDataPanel',
      //   component: () => import('@/views/analytics/bigDataPanel/new'),
      //   name: 'newBigDataPanel',
      //   meta: {
      //     title: 'newBigDataPanel'
      //   }
      // }
    ]
  },
  // device: '设备管理',
  // deviceList: '设备列表',
  // deviceGroup: '设备组管理',
  // deviceCluster: '设备集群管理',
  // deviceConfig: '设备配置管理',
  // deviceModel: '设备备案管理',
  // deviceFunction: '设备功能管理',
  {
    path: '/device',
    component: Layout,
    name: 'device',
    redirect: 'noredirect',
    alwaysShow: true,
    meta: {
      title: 'device',
      icon: 'hdd',
      roles: ['normal']
    },
    children: [
      {
        path: 'list',
        component: () => import('@/views/device/list'),
        name: 'deviceList',
        meta: {
          title: 'deviceList'
        }
      },
      {
        path: 'group',
        component: () => import('@/views/device/group'),
        name: 'deviceGroup',
        meta: {
          title: 'deviceGroup'
        }
      },
      {
        path: 'cluster',
        component: () => import('@/views/device/cluster'),
        name: 'deviceCluster',
        meta: {
          title: 'deviceCluster'
        }
      },
      {
        path: 'config',
        component: () => import('@/views/device/config'),
        name: 'deviceConfig',
        meta: {
          title: 'deviceConfig'
        }
      },
      {
        path: 'model',
        component: () => import('@/views/device/model'),
        name: 'deviceModel',
        meta: {
          title: 'deviceModel'
        }
      },
      {
        path: 'function',
        component: () => import('@/views/device/function'),
        name: 'deviceFunction',
        meta: {
          title: 'deviceFunction'
        }
      }
    ]
  },
  {
    path: '/alarm',
    component: Layout,
    name: 'alarm',
    redirect: 'noredirect',
    alwaysShow: true,
    meta: {
      title: 'alarm',
      icon: 'people-carry',
      roles: ['super_admin']
    },
    children: [
      {
        path: 'device',
        component: () => import('@/views/alarm/device'),
        name: 'alarmDevice',
        meta: {
          title: 'alarmDevice'
        }
      },
      {
        path: 'level',
        component: () => import('@/views/alarm/level'),
        name: 'alarmConfig',
        meta: {
          title: 'alarmConfig'
        }
      },
      {
        path: 'process',
        component: () => import('@/views/blank'),
        name: 'alarmProcess',
        meta: {
          title: 'alarmProcess'
        }
      }
    ]
  },
  {
    path: '/order',
    component: Layout,
    name: 'order',
    redirect: 'noredirect',
    alwaysShow: true,
    meta: {
      title: 'order',
      icon: 'file-invoice',
      roles: ['admin']
    },
    children: [
      {
        path: 'rent',
        component: () => import('@/views/order/rent'),
        name: 'rentOrder',
        meta: {
          title: 'rentOrder'
        }
      },
      {
        path: 'payment',
        component: () => import('@/views/order/payment'),
        name: 'paymentOrder',
        meta: {
          title: 'paymentOrder'
        }
      },
      {
        path: 'sales',
        component: () => import('@/views/blank'),
        name: 'salesOrder',
        meta: {
          title: 'salesOrder'
        }
      },
      {
        path: 'after-sale',
        component: () => import('@/views/blank'),
        name: 'afterSaleOrder',
        meta: {
          title: 'afterSaleOrder'
        }
      }
    ]
  },
  {
    path: '/income',
    component: Layout,
    name: 'income',
    redirect: 'noredirect',
    alwaysShow: true,
    meta: {
      title: 'income',
      icon: 'bezier-curve',
      roles: ['admin']
    },
    children: [
      {
        path: 'rule',
        component: () => import('@/views/blank'),
        name: 'incomeRule',
        meta: {
          title: 'incomeRule'
        }
      },
      {
        path: 'bill',
        component: () => import('@/views/blank'),
        name: 'incomeBill',
        meta: {
          title: 'incomeBill'
        }
      }
    ]
  },
  {
    path: '/rent',
    component: Layout,
    name: 'rent',
    redirect: 'noredirect',
    alwaysShow: true,
    meta: {
      title: 'rent',
      icon: 'hand-holding-usd',
      roles: ['normal']
    },
    children: [
      {
        path: 'wechat',
        component: () => import('@/views/blank'),
        name: 'rentWechat',
        meta: {
          title: 'rentWechat'
        }
      },
      {
        path: 'blacklist',
        component: () => import('@/views/blank'),
        name: 'rentBlacklist',
        meta: {
          title: 'rentBlacklist'
        }
      },
      {
        path: 'toll',
        component: () => import('@/views/blank'),
        name: 'rentToll',
        meta: {
          title: 'rentToll'
        }
      },
      {
        path: 'putin',
        component: () => import('@/views/blank'),
        name: 'rentPutin',
        meta: {
          title: 'rentPutin'
        }
      },
      {
        path: 'operator',
        component: () => import('@/views/blank'),
        name: 'rentOperator',
        meta: {
          title: 'rentOperator'
        }
      },
      {
        path: 'payment',
        component: () => import('@/views/blank'),
        name: 'rentPayment',
        meta: {
          title: 'rentPayment'
        }
      }
    ]
  },
  {
    path: '/system',
    component: Layout,
    name: 'system',
    redirect: 'noredirect',
    alwaysShow: true,
    meta: {
      title: 'system',
      icon: 'wrench',
      roles: ['super_admin']
    },
    children: [
      {
        path: 'client',
        component: () => import('@/views/system/client'),
        name: 'systemClient',
        meta: {
          title: 'systemClient'
        }
      },
      {
        path: 'role',
        component: () => import('@/views/system/role'),
        name: 'systemRole',
        meta: {
          title: 'systemRole'
        }
      },
      {
        path: 'user',
        component: () => import('@/views/system/user'),
        name: 'systemUser',
        meta: {
          title: 'systemUser'
        }
      },
      {
        path: 'setting',
        component: () => import('@/views/blank'),
        name: 'systemSetting',
        meta: {
          title: 'systemSetting'
        }
      }
    ]
  },
  {
    path: '/message',
    component: Layout,
    name: 'message',
    redirect: 'noredirect',
    alwaysShow: true,
    meta: {
      title: 'message',
      icon: 'comment-alt',
      roles: ['super_admin']
    },
    children: [
      {
        path: 'system',
        component: () => import('@/views/blank'),
        name: 'systemMessage',
        meta: {
          title: 'systemMessage'
        }
      },
      {
        path: 'user',
        component: () => import('@/views/blank'),
        name: 'userMessage',
        meta: {
          title: 'userMessage'
        }
      },
      {
        path: 'alarm',
        component: () => import('@/views/blank'),
        name: 'alarmMessage',
        meta: {
          title: 'alarmMessage'
        }
      },
      {
        path: 'after-sale',
        component: () => import('@/views/blank'),
        name: 'afterSaleMessage',
        meta: {
          title: 'afterSaleMessage'
        }
      }
    ]
  },
  { path: '*', redirect: '/404', hidden: true }
]
