import request from '@/utils/request'

export function fetchList(query) {
  return request({
    url: '/device/function/list',
    method: 'get',
    params: query
  })
}
