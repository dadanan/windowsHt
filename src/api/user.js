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

export function updateUser(data) {
  return request({
    url: '/user/updateUser',
    method: 'put',
    data
  })
}

export function createUser(data) {
  return request({
    url: '/user/createUser',
    method: 'post',
    data
  })
}

export function delUser(id) {
  return request({
    url: `/user/delUser/${id}`,
    method: 'delete'
  })
}

export function getUserList() {
  return request({
    url: '/user/getUserList',
    method: 'get'
  })
}
