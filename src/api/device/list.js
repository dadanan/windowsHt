// import request from '@/utils/request'
import axios from 'axios'
import { Message } from 'element-ui'
import store from '@/store'

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

export function createDevice(data) {
  return request2({
    url: '/api/device/createDevice',
    method: 'post',
    data
  })
}

export function deleteDevice(data) {
  return request2({
    url: '/api/device/deleteDevice',
    method: 'post',
    data
  })
}

export function getList(data) {
  return request2({
    url: '/api/device/queryDevice',
    method: 'post',
    data
  })
}

export function assignDeviceToCustomer(data) {
  return request2({
    url: '/api/device/assignDeviceToCustomer',
    method: 'post',
    data
  })
}
