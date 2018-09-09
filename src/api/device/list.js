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
    method: 'post',
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
