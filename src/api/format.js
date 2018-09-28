import request from '@/utils/request'

export function createWxFormat(data) {
  return request({
    url: '/temp/api/wxFormat/createWxFormat',
    method: 'post',
    data
  })
}

export function deleteById(id) {
  return request({
    url: `/temp/api/wxFormat/deleteById/${id}`,
    method: 'delete'
  })
}

export function select(data) {
  return request({
    url: '/temp/api/wxFormat/select',
    method: 'post',
    data
  })
}

export function updateWxFormat(data) {
  return request({
    url: '/temp/api/wxFormat/updateWxFormat',
    method: 'put',
    data
  })
}

export function selectFormatsByCustomerId(customerId, typeId) {
  return request({
    url: `/temp/api/wxFormat/selectFormatsByCustomerId/${customerId}/${typeId}`,
    method: 'get'
  })
}

export function selectById(id) {
  return request({
    url: `/temp/api/wxFormat/selectById/${id}`,
    method: 'get'
  })
}
