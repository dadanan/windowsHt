import request from '@/utils/request'
// 添加数据
export function addDict(data) {
  return request({
    url: '/temp/api/dict/addDict',
    method: 'post',
    data
  })
}
// 数据列表
export function selectList(data) {
  return request({
    url: '/temp/api/dict/selectList',
    method: 'post',
    data
  })
}
// 删除数据
export function deleteDict(data) {
  return request({
    url: '/temp/api/dict/deleteDict',
    method: 'post',
    data
  })
}
// 修改数据
export function editDict(data) {
  return request({
    url: '/temp/api/dict/editDict',
    method: 'post',
    data
  })
}
// 查询数据
export function queryDict(data) {
    return request({
      url: '/temp/api/dict/queryDict',
      method: 'post',
      data
    })
  }
  