import request from '@/utils/request'

export function createDeviceModel(data) {
  return request({
    url: '/temp/api/deviceModel/createDeviceModel',
    method: 'post',
    data
  })
}

export function deleteModelById(id) {
  return request({
    url: `/temp/api/deviceModel/deleteModelById/${id}`,
    method: 'delete'
  })
}
// 复制型号http://pro.sikelai.net/temp/api/deviceModel/copy/190
export function deviceModelCopy(id) {
  return request({
    url: `/temp/api/deviceModel/copy/${id}`,
    method: 'get'
  })
}

export function select(data) {
  return request({
    url: '/temp/api/deviceModel/select',
    method: 'post',
    data
  })
}

export function selectById(id) {
  return request({
    url: `/temp/api/deviceModel/selectById/${id}`,
    method: 'get'
  })
}

export function queryDeviceOperation(id) {
  return request({
    url: `/temp/api/deviceModel/queryDeviceOperation/${id}`,
    method: 'get'
  })
}

export function selectByTypeId(id) {
  return request({
    url: `/temp/api/deviceModel/selectByTypeId/${id}`,
    method: 'get'
  })
}

export function updateDeviceModel(data) {
  return request({
    url: '/temp/api/deviceModel/updateDeviceModel',
    method: 'put',
    data
  })
}

export function createWxDeviceIds(data) {
  return request({
    url: `/temp/api/deviceModel/createWxDeviceIds?customerId=${
      data.customerId
    }&productId=${data.productId}&addCount=${data.addCount}`,
    method: 'post'
  })
}
// 设备型号总数
export function selectCount(data) {
  return request({
    url: `/temp/api/deviceModel/selectCount/${data}`,
    method: 'post',
  })
}

// 查看设备告警
export function queryDeviceAlarm(data) {
  return request({
    url: `/temp/api/deviceData/queryDeviceAlarm`,
    method: 'post',
    data
  })
}
// 查看故障记录
export function queryDeviceFailure(data) {
  return request({
    url: `/temp/api/deviceData/queryDeviceFailure`,
    method: 'post',
    data
  })
}