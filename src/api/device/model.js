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

export function createDeviceType(data) {
  return request2({
    url: '/api/deviceType/createDeviceType',
    method: 'post',
    data
  })
}

export function deleteDeviceType(id) {
  return request2({
    url: `/api/deviceType/deleteDeviceTypeById/${id}`,
    method: 'delete'
  })
}

export function fetchList(data) {
  return request2({
    url: '/api/deviceType/select',
    method: 'post',
    data
  })
}

export function updateDeviceType(data) {
  return request2({
    url: '/api/deviceType/updateDeviceType',
    method: 'put',
    data
  })
}

export function selectById(id) {
  return request2({
    url: `/api/deviceType/selectById/${id}`,
    method: 'get'
  })
}

export function selectAllTypes(data) {
  return request2({
    url: `/api/deviceType/selectAllTypes`,
    method: 'post',
    data
  })
}

export function selectListByTypeIds(ids) {
  return request2({
    url: `api/deviceType/selectListByTypeIds/${ids}`,
    method: 'get'
  })
}
