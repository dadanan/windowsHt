import request from '@/utils/request'

export function login(userName, pwd) {
  const data = {
    userName,
    pwd
  }
  return request({
    url: '/server/user/login',
    method: 'post',
    params: data
  })
}

export function updateUser(data) {
  return request({
    url: '/server/user/updateUser',
    method: 'put',
    data
  })
}

export function createUser(data) {
  return request({
    url: '/server/user/createUser',
    method: 'post',
    data
  })
}

export function delUser(id) {
  return request({
    url: `/server/user/delUser/${id}`,
    method: 'delete'
  })
}

export function getUserList() {
  return request({
    url: '/server/user/getUserList',
    method: 'get',
  })
}

export function getCurrentUser() {
  return request({
    url: '/server/user/getCurrentUser',
    method: 'get'
  })
}

export function logout() {
  return request({
    url: '/server/user/logout',
    method: 'delete'
  })
}
export function getUserById(id) {
  return request({
    url: `/server/user/getUserById/${id}`,
    method: 'get'
  })
}
