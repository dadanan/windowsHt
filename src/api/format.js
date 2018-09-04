// import request from '@/utils/request'
import axios from 'axios'
import { Message } from 'element-ui'
import store from '@/store'

/**
 * 软件版式
 */

const request2 = axios.create({
  // baseURL: 'http://localhost:9528/temp',
  baseURL: 'http://dev.hcocloud.com/temp',
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

export function createWxFormat(data) {
  return request2({
    url: '/api/wxFormat/createWxFormat',
    method: 'post',
    data
  })
}

export function deleteById(id) {
  return request2({
    url: `/api/wxFormat/deleteById/${id}`,
    method: 'delete'
  })
}

export function select(data) {
  return request2({
    url: '/api/wxFormat/select',
    method: 'post',
    data
  })
}

export function updateWxFormat(data) {
  return request2({
    url: '/api/wxFormat/updateWxFormat',
    method: 'put',
    data
  })
}

export function selectFormatsByCustomerId(customerId, typeId) {
  return request2({
    url: `/api/wxFormat/selectFormatsByCustomerId/${customerId}/${typeId}`,
    method: 'get'
  })
}
