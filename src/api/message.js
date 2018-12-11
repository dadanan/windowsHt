import request from '@/utils/request'

export function selectUserFeedbackInfo(data) {
    return request({
      url: '/temp/api/info/selectUserFeedbackInfo',
      method: 'post',
      data
    })
}
// 查询消息列表
export function selectList(data) {
  return request({
    url: '/temp/api/message/selectList',
    method: 'post',
    data
  })
}

// 编辑消息
export function addMessage(data) {
  return request({
    url: '/temp/api/message/addMessage',
    method: 'post',
    data
  })
}

// 修改消息
export function editMessage(data) {
  return request({
    url: '/temp/api/message/editMessage',
    method: 'post',
    data
  })
}

//删除消息
export function deleteMessage(data) {
  return request({
    url: '/temp/api/message/deleteMessage',
    method: 'post',
    data
  })
}

//发送消息
export function sendMessage(data) {
  return request({
    url: `/temp/api/message/sendMessage/${data}`,
    method: 'get',
  })
}


//查询接收消息列表

export function logSelectList(data) {
  return request({
    url: '/temp/api/message/logSelectList',
    method: 'post',
    data
  })
}

//标记已读状态

export function read(data) {
  return request({
    url: `/temp/api/message/read/${data}`,
    method: 'get',
  })
}

//删除日志消息
export function deleteMessageLog(data) {
  return request({
    url: '/temp/api/message/deleteMessageLog',
    method: 'post',
    data
  })
}