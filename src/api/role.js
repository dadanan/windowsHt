import request from '@/utils/request'

export function getPermissions() {
  return request({
    url: '/api/role/getPermissions',
    method: 'get'
  })
}

export function createRole(data) {
  return request({
    url: '/api/role/createRole',
    method: 'post',
    data
  })
}

export function getRoleList() {
  return request({
    url: '/api/role/getRoleList',
    method: 'get'
  })
}

export function deleteRole(id) {
  return request({
    url: `/api/role/delRole/${id}`,
    method: 'delete'
  })
}

export function updateRole(data) {
  return request({
    url: `/api/role/updateRole`,
    method: 'put',
    data
  })
}

export function getRoleDetail(id) {
  return request({
    url: `/api/role/getRoleDetail/${id}`,
    method: 'get'
  })
}
