// import Mock from 'mockjs'
import { param2Obj } from '@/utils/index'

const list = [
  {
    id: 1,
    name: '温度传感器 1',
    functionId: 211,
    description: '打法沙发沙发沙发',
    permissionList: ['r']
  },
  {
    id: 2,
    name: '温度传感器 2',
    functionId: 212,
    description: '打法沙发沙发沙发沙发沙',
    permissionList: ['r']
  },
  {
    id: 3,
    name: '湿度传感器 1',
    functionId: 111,
    description: '打法沙发沙发沙发沙发沙发放大撒旦发射点打法沙发沙发沙发沙发沙发放大撒旦发射点打法沙发沙发沙发沙发沙发放大撒旦发射点打法沙发沙发沙发沙发沙发放大撒旦发射点',
    permissionList: ['r']
  },
  {
    id: 4,
    name: '风机转速控制 1',
    functionId: 312,
    description: '打法沙发沙发沙发沙发沙发放大撒旦发射点打法沙发沙发沙发沙发沙发放大撒旦发射点打法沙发沙发沙发沙发沙发放大撒旦发射点打法沙发沙发沙发沙发沙发放大撒旦发射点',
    permissionList: ['r', 'w'],
    config: { type: 3 }
  },
  {
    id: 5,
    name: 'PM2.5 传感器 1',
    functionId: 'a12',
    description: '打法沙发沙发沙发沙发沙发放大撒旦发射点打法沙发沙发沙发沙发沙发放大撒旦发射点打法沙发沙发沙发沙发沙发放大撒旦发射点打法沙发沙发沙发沙发沙发放大撒旦发射点',
    permissionList: ['r']
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
