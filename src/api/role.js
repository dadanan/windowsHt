import request from '@/utils/request'

export function getPermissions() {
  return request({
    url: '/role/getPermissions',
    method: 'get'
  })
}

export function createRole(data) {
  return request({
    url: '/role/createRole',
    method: 'post',
    data
  })
}

export function getRoleList() {
  return request({
    url: '/role/getRoleList',
    method: 'get'
  })
}

export function deleteRole(id) {
  return request({
    url: `/role/delRole/${id}`,
    method: 'delete'
  })
}

export function updateRole(data) {
  return request({
    url: `/role/updateRole`,
    method: 'put',
    data
  })
}
