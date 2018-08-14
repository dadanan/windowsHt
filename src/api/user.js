import request from '@/utils/request'

export function login(userName, pwd) {
  const data = {
    userName,
    pwd
  }
  return request({
    url: '/user/login',
    method: 'post',
    params: data
  })
}

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

export function updateUser(id) {
  return request({
    url: `/user/updateUser`,
    method: 'put'
  })
}
