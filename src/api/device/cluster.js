import request from '@/utils/request'

// 根据查询条件分页查询设备
export function queryGroupByPage(data) {
  return request({
    url: '/temp/api/deviceGroup/queryGroupByPage',
    method: 'post',
    data
  })
}
// 根据id查询项目详情
export function queryGroupById(id) {
  return request({
    url: `/temp/api/deviceGroup/queryGroupById/${id}`,
    method: 'post'
  })
}

// 根据id删除项目
export function deleteGroupById(id) {
  return request({
    url: `/temp/api/deviceGroup/deleteGroupById/${id}`,
    method: 'post'
  })
}

// 查询项目总数
export function queryGroupCount(id) {
  return request({
    url: `/temp/api/deviceGroup/queryGroupCount/${id}`,
    method: 'get'
  })
}

// 创建或更新项目
export function addOrUpdateGroupAndDevice(data) {
  return request({
    url: `/temp/api/deviceGroup/addOrUpdateGroupAndDevice`,
    method: 'post',
    data
  })
}

// 群控
export function groupSendFunc(data) {
  return request({
    url: '/temp/api/deviceGroup/groupSendFunc',
    method: 'post',
    data
  })
}
