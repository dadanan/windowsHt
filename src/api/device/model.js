import request from '@/utils/request'

export function fetchList(query) {
  return request({
    url: '/device/model/list',
    method: 'get',
    params: query
  })
}
