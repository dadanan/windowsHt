import request from '@/utils/request'

// 用户统计
export function selectCustomerUserCount(data) {
    return request({
      url: '/temp/api/statistics/selectCustomerUserCount',
      method: 'get',
    })
}
// 设备统计
export function selectDeviceCount(data) {
  return request({
    url: '/temp/api/statistics/selectDeviceCount',
    method: 'get',
  })
} 
// 设备类型统计
export function selectTypePercent(data) {
  return request({
    url: '/temp/api/statistics/selectTypePercent',
    method: 'get',
  })
}