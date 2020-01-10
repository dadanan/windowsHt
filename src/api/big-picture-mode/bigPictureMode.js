import request from '@/utils/request'

// 用户统计
export function selectCustomerUserCount() {
  return request({
    url: '/temp/api/statistics/customerUserCountPerMonth',
    method: 'get'
  })
}
// 设备统计
export function selectDeviceCount() {
  return request({
    url: '/temp/api/statistics/deviceCountPerMonth',
    method: 'get'
  })
}
// 设备类型统计
export function modelPercent() {
  return request({
    url: '/temp/api/statistics/modelPercent',
    method: 'get'
  })
}
// 设备类型统计
export function selectTypePercent() {
  return request({
    url: '/temp/api/statistics/deviceCountPerMonth',
    method: 'get'
  })
}
// 设备类型统计
export function typePercent() {
  return request({
    url: '/temp/api/statistics/typePercent',
    method: 'get'
  })
}
// 今日新增设备统计
export function newDeviceCountOfToday() {
  return request({
    url: '/temp/api/statistics/newDeviceCountOfToday',
    method: 'get'
  })
}

// 首页统计数据
export function queryHomePageStatistic() {
  return request({
    url: '/temp/api/statistics/queryHomePageStatistic',
    method: 'get'
  })
}

// 用户列表
export function selectCustomerUser(data) {
  return request({
    url: '/temp/api/customerUser/selectCustomerUser',
    method: 'post',
    data
  })
}
// 每天活跃用户统计
export function selectLiveCustomerUserCountPerHour() {
  return request({
    url: '/temp/api/statistics/selectLiveCustomerUserCountPerHour',
    method: 'get',
  })
}
// 每月活跃用户统计
export function selectLiveCustomerUserCountPerMonth() {
  return request({
    url: '/temp/api/statistics/selectLiveCustomerUserCountPerMonth',
    method: 'get',
  })
}

// 城市统计
export function deviceLocationCount(data) {
  return request({
    url: '/temp/api/statistics/deviceLocationCount',
    method: 'post',
    data
  })
}

// 天气
export function queryWeather(data) {
  return request({
    url: '/temp/api/statistics/queryWeather',
    method: 'post',
    data
  })
}

// 查询维护信息看板
export function queryMaintenance() {
  return request({
    url: '/temp/api/dashboard/queryMaintenance',
    method: 'get',
  })
}

// 查询报警数据看板
export function queryWarnData() {
  return request({
    url: '/temp/api/dashboard/queryWarnData',
    method: 'get',
  })
}

// 查询任务数据看板
export function queryJobDash() {
  return request({
    url: '/temp/api/dashboard/queryJobDash',
    method: 'get',
  })
}


// 查询单个工程下型号比例看板
export function queryModelPercent(projectId) {
  return request({
    url: `/temp/api/dashboard/queryModelPercent/${projectId}`,
    method: 'get',
  })
}

// 保存当前的状态
export function updataLocation(data) {
  return request({
    url: `/temp/user/updataLocation`,
    method: 'post',
    data
  })
}



