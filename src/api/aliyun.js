import request from '@/utils/request'

export function getToken() {
  return request({
    url: '/aliyun/upload/token',
    method: 'get'
  })
}
