export const columnData = [
  {
    prop: 'name',
    label: '名称'
  },
  {
    prop: 'devicecount',
    label: '群内设备'
  },
  {
    prop: 'introduction',
    label: '介绍'
  },
  {
    prop: 'location',
    label: '地点'
  },
  {
    prop: 'createTime',
    label: '创建时间'
  },
  {
    prop: 'customerName',
    label: '创建人'
  },
  {
    prop: 'remark',
    label: '备注'
  }
]

export const deviceColumnData = [
  {
    prop: 'name',
    label: '名称'
  },
  {
    prop: 'modelId',
    label: '型号'
  },
  {
    prop: 'mac',
    label: 'MAC'
  },
  {
    prop: 'introduce',
    label: '缩图'
  },
  {
    prop: 'onlineStatus',
    label: '在线状态',
    formatter: (row, column) => {
      return row[column.property] ? '在线' : '离线'
    }
  },
  {
    prop: 'workStatus',
    label: '工作状态',
    formatter: (row, column) => {
      return row[column.property] ? '开机/租赁中' : '关机/空闲'
    }
  },
  {
    prop: 'create',
    label: '告警状态'
  }
]

export const dialogDatas = {
  create: {
    title: '添加设备集群'
  },
  detail: {
    title: '查看设备集群详情'
  },
  edit: {
    title: '编辑设备集群'
  }
}
