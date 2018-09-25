import request from '@/utils/request'

export function queryGroupByPage(data) {
  return request({
    url: '/temp/api/deviceGroup/queryGroupByPage',
    method: 'post',
    data
  })
}

export function queryGroupCount() {
  return request({
    url: '/temp/api/deviceGroup/queryGroupCount',
    method: 'get'
  })
}
