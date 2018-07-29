import request from '@/utils/request'

export function fetchList(query) {
  return request({
    url: '/model/list',
    method: 'get',
    params: query
  })
}
