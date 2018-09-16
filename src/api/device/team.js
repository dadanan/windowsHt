import request from '@/utils/request'

export function queryTeamList(data) {
  return request({
    url: '/temp/api/team/queryTeamList',
    method: 'post',
    data
  })
}

export function updateTeam(data) {
  return request({
    url: '/temp/api/team/updateTeam',
    method: 'put',
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
