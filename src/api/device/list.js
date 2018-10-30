import request from '@/utils/request'

export function createDevice(data) {
  return request({
    url: '/temp/api/device/createDevice',
    method: 'post',
    data
  })
}

export function deleteDevice(data) {
  return request({
    url: '/temp/api/device/deleteDevice',
    method: 'delete',
    data
  })
}

export function deleteOneDevice(data) {
  return request({
    url: '/temp/api/device/deleteOneDevice',
    method: 'delete',
    data
  })
}

export function recoverDevice(data) {
  return request({
    url: '/temp/api/device/recoverDevice',
    method: 'put',
    data
  })
}

export function getList(data) {
  return request({
    url: '/temp/api/device/queryDevice',
    method: 'post',
    data
  })
}

export function assignDeviceToCustomer(data) {
  return request({
    url: '/temp/api/device/assignDeviceToCustomer',
    method: 'post',
    data
  })
}

export function callBackDeviceFromCustomer(data) {
  return request({
    url: '/temp/api/device/callBackDeviceFromCustomer',
    method: 'post',
    data
  })
}

export function bindDeviceToUser(data) {
  return request({
    url: '/temp/api/device/bindDeviceToUser',
    method: 'post',
    data
  })
}

export function untieDeviceToUser(data) {
  return request({
    url: '/temp/api/device/untieDeviceToUser',
    method: 'post',
    data
  })
}

export function queryUsers(data) {
  return request({
    url: '/temp/api/device/queryUsers',
    method: 'post',
    data
  })
}

export function updateDeivceDisble(data) {
  return request({
    url: '/temp/api/device/updateDeivceDisble',
    method: 'put',
    data
  })
}

export function updateDeivceEnable(data) {
  return request({
    url: '/temp/api/device/updateDeivceEnable',
    method: 'put',
    data
  })
}

export function queryTeamInfo(data) {
  return request({
    url: '/temp/api/device/queryTeamInfo',
    method: 'post',
    data
  })
}

export function queryChildDevice(id) {
  return request({
    url: `/temp/api/device/queryChildDevice/${id}`,
    method: 'post'
  })
}

// 导出
export function exportDeviceData(data) {
  return request({
    url: '/temp/api/device/exportDeviceData',
    method: 'post',
    data
  })
}

// 操作日志
export function queryOperLog(data) {
  return request({
    url: '/temp/api/deviceData/queryOperLog',
    method: 'post',
    data
  })
}
// 设备数据
export function queryDeviceSensorStat(data) {
  return request({
    url: '/temp/api/deviceData/queryDeviceSensorStat',
    method: 'post',
    data
  })
}

// 设备数据
export function queryDevicePosition(id) {
  return request({
    url: `/temp/api/device/queryDevicePosition/${id}`,
    method: 'post'
  })
}

// 修改设备详情
export function updateDevice(data) {
  return request({
    url: `/temp/api/device/updateDevice`,
    method: 'put',
    data
  })
}

// 修改设备详情
export function shareDeviceToken(wxDeviceId) {
  return request({
    url: `/temp/api/device/shareDeviceToken/${wxDeviceId}`,
    method: 'get'
  })
}

// 查询设备详情
export function queryDeviceById(id) {
  return request({
    url: `/temp/api/device/queryDeviceById/${id}`,
    method: 'get'
  })
}

// 查询设备详情
export function newQueryDetailByDeviceId(data) {
  return request({
    url: `/temp/api/device/newQueryDetailByDeviceId/`,
    method: 'get',
    data
  })
}
