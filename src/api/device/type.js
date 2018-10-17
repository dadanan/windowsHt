import request from '@/utils/request'

export function createDeviceType(data) {
  return request({
    url: '/temp/api/deviceType/createDeviceType',
    method: 'post',
    data
  })
}

export function deleteDeviceType(id) {
  return request({
    url: `/temp/api/deviceType/deleteDeviceTypeById/${id}`,
    method: 'delete'
  })
}

export function fetchList(data) {
  return request({
    url: '/temp/api/deviceType/select',
    method: 'post',
    data
  })
}

export function updateDeviceType(data) {
  return request({
    url: '/temp/api/deviceType/updateDeviceType',
    method: 'put',
    data
  })
}

export function selectById(id) {
  return request({
    url: `/temp/api/deviceType/selectById/${id}`,
    method: 'get'
  })
}

export function selectAllTypes(data) {
  return request({
    url: `/temp/api/deviceType/selectAllTypes`,
    method: 'post',
    data
  })
}

export function selectListByTypeIds(ids) {
  return request({
    url: `/temp/api/deviceType/selectListByTypeIds/${ids}`,
    method: 'get'
  })
}

export function selectTypesBySLD() {
  return request({
    url: `/temp/api/deviceType/selectTypesBySLD`,
    method: 'get'
  })
}
