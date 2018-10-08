import request from '@/utils/request'

export function addOrUpdateGroupAndDevice(data) {
  return request({
    url: '/temp/api/deviceGroup/addOrUpdateGroupAndDevice',
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
