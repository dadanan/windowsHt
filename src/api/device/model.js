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