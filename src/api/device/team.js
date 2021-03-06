import request from '@/utils/request'

export function queryTeamList(data) {
  return request({
    url: '/temp/api/team/queryTeamList',
    method: 'post',
    data
  })
}

export function createTrusteeQrCode(data) {
  return request({
    url: '/temp/api/team/createTrusteeQrCode',
    method: 'post',
    data
  })
}

export function createNewTeam(data) {
  return request({
    url: '/temp/api/team/createNewTeam',
    method: 'post',
    data
  })
}

export function trusteeTeam(data) {
  return request({
    url: `/temp/api/team/trusteeTeam`,
    method: 'post',
    data
  })
}

export function queryDeviceInfo(data) {
  return request({
    url: `/temp/api/team/queryDeviceInfo`,
    method: 'post',
    data
  })
}

export function deleteOneTeam(data) {
  return request({
    url: `/temp/api/team/deleteOneTeam`,
    method: 'post',
    data
  })
}

export function queryTeamById(id) {
  return request({
    url: `/temp/api/team/queryTeamById/${id}`,
    method: 'get'
  })
}
// 获取设备组的总数
export function queryTeamCount(id) {
  return request({
    url: `/temp/api/team/queryTeamCount/${id}`,
    method: 'get',
  })
}