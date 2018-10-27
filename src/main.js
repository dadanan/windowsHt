import Vue from 'vue'

import 'normalize.css/normalize.css' // A modern alternative to CSS resets

import Element from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

import '@/styles/weather-icons.less'
import '@/styles/index.scss' // global css

import App from './App'
import router from './router'
import store from './store'

Vue.prototype.$store = store

import i18n from './lang' // Internationalization
import './icons' // icon
import './errorLog' // error log
import './permission' // permission control
import './mock' // simulation data

import * as filters from './filters' // global filters

import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

import VueParticles from 'vue-particles'

import VueAMap from 'vue-amap'
Vue.use(VueAMap)
VueAMap.initAMapApiLoader({
  key: 'f4eeccf8a0743c91a80fd1d3046edab0',
  plugin: [
    'AMap.Autocomplete',
    'AMap.PlaceSearch',
    'AMap.Scale',
    'AMap.OverView',
    'AMap.ToolBar',
    'AMap.MapType',
    'AMap.PolyEditor',
    'AMap.CircleEditor'
  ],
  // 默认高德 sdk 版本为 1.4.4
  v: '1.4.4'
})
import VueAreaLinkage from 'vue-area-linkage'
import { pca, pcaa } from 'area-data' // v5 or higher
import 'vue-area-linkage/dist/index.css'
Vue.prototype.$pca = pca
Vue.prototype.$pcaa = pcaa
Vue.use(VueAreaLinkage)

import ECharts from 'vue-echarts'
import chinaMap from 'echarts/map/json/china'
import anhuiMap from 'echarts/map/json/province/anhui'
import aomenMap from 'echarts/map/json/province/aomen'
import beijingMap from 'echarts/map/json/province/beijing'
import chongqingMap from 'echarts/map/json/province/chongqing'
import fujianMap from 'echarts/map/json/province/fujian'
import gansuMap from 'echarts/map/json/province/gansu'
import guangdongMap from 'echarts/map/json/province/guangdong'
import guangxiMap from 'echarts/map/json/province/guangxi'
import guizhouMap from 'echarts/map/json/province/guizhou'
import hainanMap from 'echarts/map/json/province/hainan'
import hebeiMap from 'echarts/map/json/province/hebei'
import heilongjiangMap from 'echarts/map/json/province/heilongjiang'
import henanMap from 'echarts/map/json/province/henan'
import hubeiMap from 'echarts/map/json/province/hubei'
import hunanMap from 'echarts/map/json/province/hunan'
import jiangsuMap from 'echarts/map/json/province/jiangsu'
import jiangxiMap from 'echarts/map/json/province/jiangxi'
import jilinMap from 'echarts/map/json/province/jilin'
import liaoningMap from 'echarts/map/json/province/liaoning'
import neimengguMap from 'echarts/map/json/province/neimenggu'
import ningxiaMap from 'echarts/map/json/province/ningxia'
import qinghaiMap from 'echarts/map/json/province/qinghai'
import shandongMap from 'echarts/map/json/province/shandong'
import shanghaiMap from 'echarts/map/json/province/shanghai'
import shanxiMap from 'echarts/map/json/province/shanxi'
import shanxi1Map from 'echarts/map/json/province/shanxi1'
import sichuanMap from 'echarts/map/json/province/sichuan'
import taiwanMap from 'echarts/map/json/province/taiwan'
import tianjinMap from 'echarts/map/json/province/tianjin'
import xianggangMap from 'echarts/map/json/province/xianggang'
import xinjiangMap from 'echarts/map/json/province/xinjiang'
import xizangMap from 'echarts/map/json/province/xizang'
import yunnanMap from 'echarts/map/json/province/yunnan'
import zhejiangMap from 'echarts/map/json/province/zhejiang'

ECharts.registerMap('china', chinaMap)
// 全国所有省份
ECharts.registerMap('anhui', anhuiMap)
ECharts.registerMap('aomen', aomenMap)
ECharts.registerMap('beijing', beijingMap)
ECharts.registerMap('chongqing', chongqingMap)
ECharts.registerMap('fujian', fujianMap)
ECharts.registerMap('gansu', gansuMap)
ECharts.registerMap('guangdong', guangdongMap)
ECharts.registerMap('guangxi', guangxiMap)
ECharts.registerMap('guizhou', guizhouMap)
ECharts.registerMap('hainan', hainanMap)
ECharts.registerMap('hebei', hebeiMap)
ECharts.registerMap('heilongjiang', heilongjiangMap)
ECharts.registerMap('henan', henanMap)
ECharts.registerMap('hubei', hubeiMap)
ECharts.registerMap('hunan', hunanMap)
ECharts.registerMap('jiangsu', jiangsuMap)
ECharts.registerMap('jiangxi', jiangxiMap)
ECharts.registerMap('jilin', jilinMap)
ECharts.registerMap('liaoning', liaoningMap)
ECharts.registerMap('neimenggu', neimengguMap)
ECharts.registerMap('ningxia', ningxiaMap)
ECharts.registerMap('qinghai', qinghaiMap)
ECharts.registerMap('shandong', shandongMap)
ECharts.registerMap('shanghai', shanghaiMap)
ECharts.registerMap('shanxi', shanxiMap)
ECharts.registerMap('shanxi1', shanxi1Map)
ECharts.registerMap('sichuan', sichuanMap)
ECharts.registerMap('taiwan', taiwanMap)
ECharts.registerMap('tianjin', tianjinMap)
ECharts.registerMap('xianggang', xianggangMap)
ECharts.registerMap('xinjiang', xinjiangMap)
ECharts.registerMap('xizang', xizangMap)
ECharts.registerMap('yunnan', yunnanMap)
ECharts.registerMap('zhejiang', zhejiangMap)
Vue.component('chart', ECharts)

library.add(fas)

Vue.component('font-awesome-icon', FontAwesomeIcon)

Vue.use(VueParticles)

Vue.use(Element, {
  size: 'medium', // set element-ui default size
  i18n: (key, value) => i18n.t(key, value)
})

// register global utility filters.
Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
})

Vue.config.productionTip = false

new Vue({
  el: '#app',
  router,
  store,
  i18n,
  render: h => h(App)
})
