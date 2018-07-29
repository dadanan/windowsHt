// import Mock from 'mockjs'
import { param2Obj } from '@/utils'

const list = [
  {
    id: '1',
    name: '温度传感器 1',
    rwPermissions: ['read'],
    hwFunctionID: 211
  },
  {
    id: '2',
    name: '温度传感器 2',
    rwPermissions: ['read'],
    hwFunctionID: 212
  },
  {
    id: '3',
    name: '湿度传感器 1',
    rwPermissions: ['read'],
    hwFunctionID: 111,
    writeMethod: 0
  },
  {
    id: '4',
    name: '风机转速控制 1',
    rwPermissions: ['read', 'write'],
    hwFunctionID: 'a11',
    writeMethod: 3
  },
  {
    id: '5',
    name: 'PM2.5 传感器 1',
    rwPermissions: ['read'],
    hwFunctionID: 'a12'
  }
]

export default {
  getList(config) {
    const { page = 1, limit = 15 } = param2Obj(config.url)
    const pageList = list.filter((item, index) => index < limit * page && index >= limit * (page - 1))

    return {
      total: list.length,
      items: pageList
    }
  }
}
