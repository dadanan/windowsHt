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
export function subselect(jobId) {
  return request({
    url: `/temp/api/job/select/${jobId}`,
    method: 'get',
  })
}

// 工程列表
export function EngList(data) {
  return request({
    url: '/temp/api/project/selectList',
    method: 'post',
    data
  })
}

// 添加工程
export function addProject(data) {
  return request({
    url: '/temp/api/project/addProject',
    method: 'post',
    data
  })
}

// 查询单个工程
export function createselect(data) {
  return request({
    url: `/temp/api/project/select/${data}`,
    method: 'get'
  })
}
// 查询单个工程项目
export function selectGroups(data) {
  return request({
    url: '/temp/api/project/selectGroups',
    method: 'post',
    data
  })
}

// 修改工程
export function editProject(data) {
  return request({
    url: '/temp/api/project/editProject',
    method: 'post',
    data
  })
}
// 查询工程是否重复
export function existProjectNo(data) {
  return request({
    url: '/temp/api/project/existProjectNo',
    method: 'post',
    data
  })
}

// 删除工程
export function deleteProject(data) {
  return request({
    url: '/temp/api/project/deleteProject',
    method: 'post',
    data
  })
}

// 添加实施工程信息
export function addImpl(data) {
  return request({
    url: '/temp/api/implement/addImpl',
    method: 'post',
    data
  })
}
// 根据工程查实施工程信息
export function project(data) {
  return request({
    url: `/temp/api/implement/select/${data}`,
    method: 'post'
  })
}

// 根据工程查实施工程维保
export function maintenance(data) {
  return request({
    url: '/temp/api/plan/maintenance',
    method: 'post',
    data
  })
}

// 查询所有集群
export function queryAllGroup() {
  return request({
    url: '/temp/api/deviceGroup/queryAllGroup',
    method: 'get'
  })
}

// 工程区域统计
export function projectLocationCount() {
  return request({
    url: '/temp/api/project/statistics/projectLocationCount',
    method: 'get'
  })
}

//工程量趋势统计
export function projectTrendCount() {
  return request({
    url: '/temp/api/project/statistics/projectTrendCount',
    method: 'get'
  })
}

//查询是否存在材料
export function ifExistMateria(jobId) {
  return request({
    url: `/temp/api/materia/ifExistMateria/${jobId}`,
    method: 'get'
  })
}

//查询任务待审核状态下材料情况
export function queryJobMateria(jobId) {
  return request({
    url: `/temp/api/materia/queryJobMateria/${jobId}`,
    method: 'get'
  })
}

//工程分析
export function projectAnalysis(projectId) {
  return request({
    url: `/temp/api/project/projectAnalysis/${projectId}`,
    method: 'get'
  })
}

//耗材变更
export function updateMateria(data) {
  return request({
    url: '/temp/api/materia/updateMateria',
    method: 'post',
    data
  })
}

//查询任务待审核状态下材料情况
export function queryJobMateriaLog(materialId) {
  return request({
    url: `/temp/api/materia/queryJobMateriaLog/${materialId}`,
    method: 'get'
  })
}

//查询报警任务
export function queryWarnJob(data) {
  return request({
    url: '/temp/api/job/queryWarnJob',
    method: 'post',
    data
  })
}

//禁用字典
export function disableDict(data) {
  return request({
    url: '/temp/api/dict/disableDict',
    method: 'post',
    data
  })
}

//启用字典
export function enableDict(data) {
  return request({
    url: '/temp/api/dict/enableDict',
    method: 'post',
    data
  })
}

//导出工程维保列表
export function exportMaintenance(materialId) {
  // return request({
  //   url: `/temp/api/plan/exportMaintenance/${materialId}`,
  //   method: 'get'
  // })
  window.open(`/temp/api/plan/exportMaintenance/${materialId}`)
}
//
export function jobWarningSourceCount() {
  return request({
    url: '/temp/api/project/statistics/jobWarningSourceCount',
    method: 'get'
  })
}
//查询功能项
export function getEnableAbility() {
  return request({
    url: '/temp/api/rule/getEnableAbility',
    method: 'get'
  })
}

// 获取到可复制的工程
export function getCopyProjectPlan(data) {
  return request({
    url: `/temp/api/project/getCopyProjectPlan/${data}`,
    method: 'get',
  })
}

//从另一个工程复制周期的维保至本工程
export function copyProjectPlan(data) {
  return request({
    url: '/temp/api/project/copyProjectPlan',
    method: 'post',
    data
  })
}

// 查询计划模版列表
export function planModel(data) {
  return request({
    url: '/temp/api/planModel/selectList',
    method: 'post',
    data
  })
}

// 批量禁用计划模版
export function forbitPlanModel(data) {
  return request({
    url: '/temp/api/planModel/forbitPlanModel',
    method: 'post',
    data
  })
}

// 批量启用计划模版
export function reversePlanModel(data) {
  return request({
    url: '/temp/api/planModel/reversePlanModel',
    method: 'post',
    data
  })
}

// 批量删除计划模版信息
export function deletePlanModel(data) {
  return request({
    url: '/temp/api/planModel/deletePlanModel',
    method: 'post',
    data
  })
}

// 添加计划模版信息
export function addPlanModel(data) {
  return request({
    url: '/temp/api/planModel/addPlanModel',
    method: 'post',
    data
  })
}

// 查询单个计划模版
export function planModelList(data) {
  return request({
    url: `/temp/api/planModel/select/${data}`,
    method: 'get'
  })
}

// 修改计划模版信息
export function editPlanModel(data) {
  return request({
    url: '/temp/api/planModel/editPlanModel',
    method: 'post',
    data
  })
}

// 修改任务告警等级
export function editJobWarnLevel(data) {
  return request({
    url: '/temp/api/job/editJobWarnLevel',
    method: 'post',
    data
  })
}

// 查工程维保（计划）模版
export function queryPlanModels(data) {
  return request({
    url: '/temp/api/plan/queryPlanModels',
    method: 'get'
  })
}

// 工程项目查设备
export function devices(data) {
  return request({
    url: `/temp/api/dashboard/devices/${data}`,
    method: 'get'
  })
}

// 工程项目根据设备查传感器数值
export function historyData(data) {
  return request({
    url: `/temp/api/dashboard/historyData/${data}`,
    method: 'get'
  })
}

// 查单个实施工程信息
export function implId(implId) {
  return request({
    url: `/temp/api/implement/selectDetail/${implId}`,
    method: 'get'
  })
}

// 修改实施工程信息
export function editImpl(data) {
  return request({
    url: '/temp/api/implement/editImpl',
    method: 'post',
    data
  })
}
// 删除工程保养
export function deleteMaintenance(data) {
  return request({
    url: '/temp/api/plan/deleteMaintenance',
    method: 'post',
    data
  })
}

// 查指定人
export function queryAdmins(data) {
  return request({
    url: `/temp/api/job/queryAdmins/${data}`,
    method: 'get'
  })
}
// 添加电话告警
export function manageAddJob(data) {
  return request({
    url: '/temp/api/job/manageAddJob',
    method: 'post',
    data
  })
}