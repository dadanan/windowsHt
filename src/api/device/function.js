import request from '@/utils/request'

export function createDeviceAblity(data) {
  return request({
    url: '/temp/api/deviceAbility/createDeviceAblity',
    method: 'post',
    data
  })
}

export function deleteAblity(id) {
  return request({
    url: `/temp/api/deviceAbility/deleteAblity/${id}`,
    method: 'delete'
  })
}

export function fetchList(data) {
  return request({
    url: '/temp/api/deviceAbility/select',
    method: 'post',
    data
  })
}

export function updateDeviceAblity(data) {
  return request({
    url: '/temp/api/deviceAbility/updateDeviceAblity',
    method: 'put',
    data
  })
}
