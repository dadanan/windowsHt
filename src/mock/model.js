// import Mock from 'mockjs'
import { param2Obj } from '@/utils'

const list = [
  {
    id: 1,
    typeId: 'fen-01',
    name: '测试风机',
    source: '未知',
    codeMap: '未知',
    functionList: [
      { name: '传感器 1' },
      { name: '传感器 2' },
      { name: '传感器 3' },
      { name: '风速控制 1' }
    ],
    description: '暂无'
  },
  {
    id: 2,
    typeId: 'fen-02',
    name: '测试风机 2',
    source: '未知',
    codeMap: '未知',
    functionList: [
      { name: '传感器 1' },
      { name: '传感器 2' },
      { name: '传感器 3' },
      { name: '风速控制 1' }
    ],
    description: '暂无'
  },
  {
    id: 3,
    typeId: 'fen-03',
    name: '测试风机 3',
    source: '未知',
    codeMap: '未知',
    functionList: [
      { name: '传感器 1' },
      { name: '传感器 2' },
      { name: '传感器 3' },
      { name: '风速控制 1' }
    ],
    description: '暂无'
  },
  {
    id: 4,
    typeId: 'fen-04',
    name: '测试风机 4',
    source: '未知',
    codeMap: '未知',
    functionList: [
      { name: '传感器 1' },
      { name: '传感器 2' },
      { name: '传感器 3' },
      { name: '风速控制 1' }
    ],
    description: '暂无'
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
