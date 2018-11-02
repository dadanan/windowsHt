import request from '@/utils/request'

export function saveDetail(data) {
  return request({
    url: '/temp/api/customer/saveDetail',
    method: 'post',
    data
  })
}

export function updateDetail(data) {
  return request({
    url: '/temp/api/customer/updateDetail',
    method: 'put',
    data
  })
}

export function select(data) {
  return request({
    url: '/temp/api/customer/select',
    method: 'post',
    data
  })
}
export function selectAllCustomers(data) {
  return request({
    url: '/temp/api/customer/selectAllCustomers',
    method: 'post',
    data
  })
}

export function deleteCustomerById(id) {
  return request({
    url: `/temp/api/customer/deleteCustomerById/${id}`,
    method: 'delete'
  })
}

export function selectById(id) {
  return request({
    url: `/temp/api/customer/selectById/${id}`,
    method: 'get'
  })
}

export function selectModelsByTypeIds(typeIds) {
  return request({
    url: `/temp/api/deviceModel/selectModelsByTypeIds/${typeIds}`,
    method: 'get'
  })
}

export function selectBackendConfigBySLD() {
  return request({
    url: `/temp/api/customer/selectBackendConfigBySLD`,
    method: 'get'
  })
}

export function updateWebsiteInfo(data) {
  return request({
    url: `/temp/api/customer/updateWebsiteInfo`,
    method: 'post',
    data
  })
}
// 根据客户管理员主键查询客户详情

export function selectByUserId(data) {
  console.log(data)
  return request({
    url: `/dev/api/customer/selectByUserId/${data}`,
    method: 'get'
 })
}