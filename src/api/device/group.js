import request from '@/utils/request'

export function addNewGroupAndDevice(data) {
  return request({
    url: '/temp/api/deviceGroup/addNewGroupAndDevice',
    method: 'post',
    data
  })
}

export function queryGroupByDevice(data) {
  return request({
    url: '/temp/api/deviceGroup/queryGroupByDevice',
    method: 'post',
    data
  })
}
