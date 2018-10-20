import request from '@/utils/request'

// 用户统计
export function selectCustomerUserCount(data) {
    return request({
      url: '/temp/api/statistics/customerUserCountPerMonth',
      method: 'get',
    })
}
// 设备统计
export function selectDeviceCount(data) {
  return request({
    url: '/temp/api/statistics/deviceCountPerMonth',
    method: 'get',
  })
} 
// 设备类型统计
export function selectTypePercent(data) {
  return request({
    url: '/temp/api/statistics/typePercent',
    method: 'get',
  })
}
// 今日新增设备统计
export function newDeviceCountOfToday(data) {
  return request({
    url: '/temp/api/statistics/newDeviceCountOfToday',
    method: 'get',
  })
}