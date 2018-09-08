import request from '@/utils/request'

export function login(userName, pwd) {
  const data = {
    userName,
    pwd
  }
  return request({
    url: '/api/user/login',
    method: 'post',
    params: data
  })
}

export function updateUser(data) {
  return request({
    url: '/api/user/updateUser',
    method: 'put',
    data
  })
}

export function createUser(data) {
  return request({
    url: '/api/user/createUser',
    method: 'post',
    data
  })
}

export function delUser(id) {
  return request({
    url: `/api/user/delUser/${id}`,
    method: 'delete'
  })
}

export function getUserList() {
  return request({
    url: '/api/user/getUserList',
    method: 'get'
  })
}

export function getCurrentUser() {
  return request({
    url: '/api/user/getCurrentUser',
    method: 'get'
  })
}

export function logout() {
  return request({
    url: '/api/user/logout',
    method: 'delete'
  })
}
