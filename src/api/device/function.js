import request from '@/utils/request'

export function createDeviceAbility(data) {
  return request({
    url: '/temp/api/deviceAbility/createDeviceAbility',
    method: 'post',
    data
  })
}

export function deleteAbility(id) {
  return request({
    url: `/temp/api/deviceAbility/deleteAbility/${id}`,
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

export function updateDeviceAbility(data) {
  return request({
    url: '/temp/api/deviceAbility/updateDeviceAbility',
    method: 'put',
    data
  })
}
