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
  console.log(data)
  return request({
    url: `/temp/api/device/exportDeviceData?${encodeSearchParams(data)}`,
    method: 'get'
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

// 查询地理位置
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
    url: `/temp/api/device/newQueryDetailByDeviceId`,
    method: 'post',
    data,
    notLoading: true
  })
}
//工作日志
export function queryDeviceWorkLog(data) {
  return request({
    url: '/temp/api/deviceData/queryDeviceWorkLog',
    method: 'post',
    data
  })
}

//获取设备授权列表
export function deviceShareList(deviceId) {
  return request({
    url: `/temp/api/device/deviceShareList/${deviceId}`,
    method: 'post'
  })
}

//删除某人权限
export function clearRelation(data) {
  return request({
    url: `/temp/api/device/clearRelation`,
    method: 'post',
    data
  })
}

//修改所有人的权限
export function updateAllRelation(data) {
  return request({
    url: `/temp/api/device/updateAllRelation`,
    method: 'post',
    data
  })
}

//修改人的权限
export function updateRelation(data) {
  return request({
    url: `/temp/api/device/updateRelation`,
    method: 'post',
    data
  })
}

//发送指令
export function sendFunc(data) {
  return request({
    url: `/temp/api/device/sendFunc`,
    method: 'post',
    data
  })
}
export function encodeSearchParams(obj) {
  const params = []

  Object.keys(obj).forEach((key) => {
    let value = obj[key]
    if (typeof value === 'undefined') {
      value = ''
    }
    params.push([key, encodeURIComponent(value)].join('='))
  })

  return params.join('&')
}