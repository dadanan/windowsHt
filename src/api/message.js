import request from '@/utils/request'

export function selectUserFeedbackInfo(data) {
    return request({
      url: '/temp/api/info/selectUserFeedbackInfo',
      method: 'post',
      data
    })
}