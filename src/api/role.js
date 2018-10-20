import request from '@/utils/request'

export function getPermissions() {
  return request({
    url: '/server/role/getPermissions',
    method: 'get'
  })
}

export function createRole(data) {
  return request({
    url: '/server/role/createRole',
    method: 'post',
    data
  })
}

export function getRoleList() {
  return request({
    url: '/server/role/getRoleList',
    method: 'get',
    headers: {
      Origin: "http://dev.hcocloud.com"
    }
  })
}

export function deleteRole(id) {
  return request({
    url: `/server/role/delRole/${id}`,
    method: 'delete'
  })
}

export function updateRole(data) {
  return request({
    url: `/server/role/updateRole`,
    method: 'put',
    data
  })
}

export function getRoleDetail(id) {
  return request({
    url: `/server/role/getRoleDetail/${id}`,
    method: 'get'
  })
}
