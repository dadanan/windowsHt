import Vue from 'vue'
import Router from 'vue-router'

const _import = require('./_import_' + process.env.NODE_ENV)
// in development env not use Lazy Loading,because Lazy Loading too many pages will cause webpack hot update too slow.so only in production use Lazy Loading

Vue.use(Router)

/* layout */
import DashboardLayout from '@/layouts/DashboardLayout'

/**
 * icon : the icon show in the sidebar
 * hidden : if `hidden:true` will not show in the sidebar
 * redirect : if `redirect:noredirect` will no redirct in the levelbar
 * noDropdown : if `noDropdown:true` will has no submenu
 * meta : { role: ['admin'] }  will control the page role
 **/
export const constantRouterMap = [
  { path: '/login', component: _import('login/index'), hidden: true },
  {
    path: '/authredirect',
    component: _import('login/authredirect'),
    hidden: true
  },
  { path: '/404', component: _import('404'), hidden: true },
  { path: '/401', component: _import('401'), hidden: true },
  {
    path: '',
    component: DashboardLayout,
    redirect: 'home',
    icon: 'component',
    noDropdown: true,
    children: [{ path: 'home', component: _import('home/index'), name: '首页' }]
  }
]

export default new Router({
  // mode: 'history', //后端支持可开
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRouterMap
})

export const asyncRouterMap = [
  {
    path: '/analytics',
    component: DashboardLayout,
    name: '数据分析',
    icon: 'component',
    children: [
      {
        path: 'analytics1',
        component: _import('blank'),
        name: '订单数据'
      },
      {
        path: 'analytics2',
        component: _import('blank'),
        name: '用户数据'
      },
      {
        path: 'analytics3',
        component: _import('blank'),
        name: '设备数据'
      },
      {
        path: 'analytics4',
        component: _import('blank'),
        name: '系统分析'
      },
      {
        path: 'analytics5',
        component: _import('blank'),
        name: '大数据看板'
      }
    ]
  },
  {
    path: '/device',
    component: DashboardLayout,
    name: '设备管理',
    icon: 'component',
    children: [
      {
        path: '',
        component: _import('device/index'),
        name: '设备列表'
      },
      {
        path: 'group',
        component: _import('device/group'),
        name: '设备组列表'
      },
      {
        path: 'type',
        component: _import('device/type'),
        name: '设备类型管理'
      },
      {
        path: 'map',
        component: _import('device/map'),
        name: '设备地图展示'
      },
      {
        path: 'device3',
        component: _import('blank'),
        name: '设备配置'
      },
      {
        path: 'device4',
        component: _import('blank'),
        name: '设备备案'
      }
    ]
  },
  {
    path: '/alarm',
    component: DashboardLayout,
    name: '售后管理',
    icon: 'component',
    children: [
      {
        path: 'device',
        component: _import('alarm/device'),
        name: '告警设备列表'
      },
      {
        path: 'alarm2',
        component: _import('blank'),
        name: '告警级别设置'
      },
      {
        path: 'alarm3',
        component: _import('blank'),
        name: '告警处理'
      }
    ]
  },
  {
    path: '/order',
    component: DashboardLayout,
    name: '订单中心',
    icon: 'component',
    children: [
      {
        path: 'order1',
        component: _import('blank'),
        name: '租凭订单列表'
      },
      {
        path: 'order2',
        component: _import('blank'),
        name: '租凭充值列表'
      },
      {
        path: 'order3',
        component: _import('blank'),
        name: '分销订单'
      },
      {
        path: 'order4',
        component: _import('blank'),
        name: '售后订单'
      }
    ]
  },
  {
    path: '/income',
    component: DashboardLayout,
    name: '分润管理',
    icon: 'component',
    children: [
      {
        path: 'income1',
        component: _import('blank'),
        name: '分润规则'
      },
      {
        path: 'income2',
        component: _import('blank'),
        name: '分润账单'
      }
    ]
  },
  {
    path: '/rent',
    component: DashboardLayout,
    name: '租赁管理',
    icon: 'component',
    children: [
      {
        path: 'rent1',
        component: _import('blank'),
        name: '微信用户管理'
      },
      {
        path: 'rent2',
        component: _import('blank'),
        name: '用户黑名单'
      },
      {
        path: 'rent3',
        component: _import('blank'),
        name: '收费管理'
      },
      {
        path: 'rent4',
        component: _import('blank'),
        name: '投放点管理'
      },
      {
        path: 'rent5',
        component: _import('blank'),
        name: '运营商管理'
      },
      {
        path: 'rent6',
        component: _import('blank'),
        name: '充值设定'
      }
    ]
  },
  {
    path: '/system',
    component: DashboardLayout,
    name: '系统管理',
    icon: 'component',
    children: [
      {
        path: 'system1',
        component: _import('blank'),
        name: '客户管理'
      },
      {
        path: 'role',
        component: _import('system/role'),
        name: '角色管理'
      },
      {
        path: 'user',
        component: _import('system/user'),
        name: '系统用户'
      },
      {
        path: 'system4',
        component: _import('blank'),
        name: '系统设置'
      }
    ]
  },
  {
    path: '/message',
    component: DashboardLayout,
    name: '消息管理',
    icon: 'component',
    children: [
      {
        path: 'message1',
        component: _import('blank'),
        name: '系统消息'
      },
      {
        path: 'message2',
        component: _import('blank'),
        name: '用户/客户反馈'
      },
      {
        path: 'message3',
        component: _import('blank'),
        name: '告警消息'
      },
      {
        path: 'message4',
        component: _import('blank'),
        name: '售后消息'
      }
    ]
  },
  { path: '*', redirect: '/404', hidden: true }
]
