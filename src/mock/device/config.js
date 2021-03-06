// import Mock from 'mockjs'
import { param2Obj } from '@/utils/index'

const list = [
  {
    id: 1,
    pic: 'http://via.placeholder.com/50x50',
    typeId: 'fen-01',
    name: 'S1 定制测试风机',
    source: '未知',
    codeMap: '未知',
    functionList: [
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
      }
    ],
    description: '暂无',
    user: 'X 平台',
    owner: '客户 A',
    createdAt: '1995-12-17T03:24:00'
  },
  {
    id: 2,
    pic: 'http://via.placeholder.com/50x50',
    typeId: 'fen-02',
    name: 'S1 定制测试风机 2',
    source: '未知',
    codeMap: '未知',
    functionList: [
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
      }
    ],
    description: '暂无',
    user: 'X 平台',
    owner: '客户 B',
    createdAt: '1995-12-17T03:24:00'
  },
  {
    id: 3,
    pic: 'http://via.placeholder.com/50x50',
    typeId: 'fen-03',
    name: 'S1 定制测试风机 3',
    source: '未知',
    codeMap: '未知',
    functionList: [
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
      }
    ],
    description: '暂无',
    user: 'X 平台',
    owner: '客户 C',
    createdAt: '1995-12-17T03:24:00'
  },
  {
    id: 4,
    pic: 'http://via.placeholder.com/50x50',
    typeId: 'fen-04',
    name: 'S1 定制测试风机 4',
    source: '未知',
    codeMap: '未知',
    functionList: [
      { id: 1, name: '传感器 1' },
      { id: 2, name: '传感器 2' },
      { id: 4, name: '传感器 3' },
      { id: 5, name: '风速控制 1' }
    ],
    description: '暂无',
    user: 'Y 平台',
    owner: '客户 A',
    createdAt: '1995-12-17T03:24:00'
  }
]

export default {
  getList(config) {
    const { page = 1, limit = 15 } = param2Obj(config.url)
    const pageList = list.filter(
      (item, index) => index < limit * page && index >= limit * (page - 1)
    )

    return {
      data: {
        total: list.length,
        items: pageList
      },
      code: 200
    }
  }
}
