// import request from '@/utils/request'
import axios from 'axios'
import { Message } from 'element-ui'
import store from '@/store'

/**
 * 客户管理
 */
const request2 = axios.create({
  baseURL: 'http://localhost:9528/temp',
  timeout: 5000
})

request2.interceptors.response.use(
  response => {
    const res = response.data
    if (res.code !== 200) {
      Message({
        message: res.msg,
        type: 'error',
        duration: 5 * 1000
      })
      // 401: 未登录; 403:
      if (res.code === 401) {
        store.dispatch('FedLogOut').then(() => {
          location.reload() // 为了重新实例化vue-router对象 避免bug
        })
      }
      return Promise.reject('error')
    } else {
      return res
    }
  },
  error => {
    console.log('err' + error) // for debug
    Message({
      message: error.message,
      type: 'error',
      duration: 5 * 1000
    })
    return Promise.reject(error)
  }
)

export function saveDetail(data) {
  return request2({
    url: '/api/customer/saveDetail',
    method: 'post',
    data
  })
}

export function updateDetail(data) {
  return request2({
    url: '/api/customer/updateDetail',
    method: 'put',
    data
  })
}

export function select(data) {
  return request2({
    url: '/api/customer/select',
    method: 'post',
    data
  })
}

export function deleteCustomerById(id) {
  return request2({
    url: `/api/customer/deleteCustomerById/${id}`,
    method: 'delete'
  })
}

export function selectById(id) {
  return request2({
    url: `/api/customer/selectById/${id}`,
    method: 'get'
  })
}
