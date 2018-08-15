import request from '@/utils/request'

export function fetchList(query) {
  return request({
    url: '/device/config/list',
    method: 'get',
    params: query
  })
}
