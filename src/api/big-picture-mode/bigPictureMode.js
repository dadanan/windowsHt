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
