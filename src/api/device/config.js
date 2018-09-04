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

export function createDeviceModel(data) {
  return request2({
    url: '/api/deviceModel/createDeviceModel',
    method: 'post',
    data
  })
}

export function deleteModelById(id) {
  return request2({
    url: `/api/deviceModel/deleteModelById/${id}`,
    method: 'delete'
  })
}

export function select(data) {
  return request2({
    url: '/api/deviceModel/select',
    method: 'post',
    data
  })
}

export function selectById(id) {
  return request2({
    url: `/api/deviceModel/selectById/${id}`,
    method: 'get'
  })
}

export function selectByTypeId(id) {
  return request2({
    url: `/api/deviceModel/selectByTypeId/${id}`,
    method: 'get'
  })
}

export function updateDeviceModel(data) {
  return request2({
    url: '/api/deviceModel/updateDeviceModel',
    method: 'put',
    data
  })
}
