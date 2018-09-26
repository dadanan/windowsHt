import request from '@/utils/request'

// 根据查询条件分页查询设备
export function queryGroupByPage(data) {
  return request({
    url: '/temp/api/deviceGroup/queryGroupByPage',
    method: 'post',
    data
  })
}

// 根据查询条件分页查询设备
export function queryGroupById(id) {
  return request({
    url: `/temp/api/deviceGroup/queryGroupById/${id}`,
    method: 'post'
  })
}

// 根据id删除集群
export function deleteGroupById(id) {
  return request({
    url: `/temp/api/deviceGroup/deleteGroupById/${id}`,
    method: 'post'
  })
}

// 查询集群总数
export function queryGroupCount() {
  return request({
    url: '/temp/api/deviceGroup/queryGroupCount',
    method: 'get'
  })
}
