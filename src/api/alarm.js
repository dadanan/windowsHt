import request from '@/utils/request'
// 添加规则
export function addRule(data) {
  return request({
    url: '/temp/api/rule/addRule',
    method: 'post',
    data
  })
}

// 查询规则列表
export function selectList(data) {
  return request({
    url: '/temp/api/rule/selectList',
    method: 'post',
    data
  })
}
// 修改规则
export function editRule(data) {
  return request({
    url: '/temp/api/rule/editRule',
    method: 'post',
    data
  })
}
// 批量删除规则
export function deleteRule(data) {
  return request({
    url: '/temp/api/rule/deleteRule',
    method: 'post',
    data
  })
}
// 批量禁用规则
export function forbitRule(data) {
  return request({
    url: '/temp/api/rule/forbitRule',
    method: 'post',
    data
  })
}
// 批量启用规则
export function reverseRule(data) {
  return request({
    url: '/temp/api/rule/reverseRule',
    method: 'post',
    data
  })
}

// 计划列表
export function selectList1(data) {
  return request({
    url: '/temp/api/plan/selectList',
    method: 'post',
    data
  })
}

// 添加计划列表
export function addPlan(data) {
  return request({
    url: '/temp/api/plan/addPlan',
    method: 'post',
    data
  })
}
// 删除计划
export function deletePlan(data) {
  return request({
    url: '/temp/api/plan/deletePlan',
    method: 'post',
    data
  })
}
// 批量禁用计划
export function forbitPlan(data) {
  return request({
    url: '/temp/api/plan/forbitPlan',
    method: 'post',
    data
  })
}

// 任务列表
export function selectList2(data) {
  return request({
    url: '/temp/api/job/selectList',
    method: 'post',
    data
  })
}

// 查客户下模型
export function selectModelDict() {
  return request({
    url: '/temp/api/deviceModel/selectModelDict',
    method: 'get',
  })
}

// 根据id
export function selectByModelId(data) {
  return request({
    url: `/temp/api/device/selectByModelId/${data}`,
    method: 'get',
  })
}

// 查客户下模型 
export function select(data) {
  return request({
    url: `/temp/api/plan/select/${data}`,
    method: 'get',
  })
}
// 关联工程
export function selectProjectDict() {
  return request({
    url: '/temp/api/project/selectProjectDict',
    method: 'get',
  })
}

// 修改计划
export function editPlan(data) {
  return request({
    url: '/temp/api/plan/editPlan',
    method: 'post',
    data
  })
}
// 计划启用
export function reversePlan(data) {
  return request({
    url: '/temp/api/plan/reversePlan',
    method: 'post',
    data
  })
}

// 任务流转
export function jobFlow(data) {
  return request({
    url: '/temp/api/job/jobFlow',
    method: 'post',
    data
  })
}

// 查询任务详情
export function subselect(data) {
  return request({
    url: `/temp/api/job/select/${data}`,
    method: 'get',
  })
}
