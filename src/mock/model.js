// import Mock from 'mockjs'
import { param2Obj } from '@/utils'

const list = [
  {
    id: '1',
    name: '测试风机',
    model: 'fen-z01',
    description: '暂无'
  },
  {
    id: '2',
    name: '测试风机2',
    model: 'fen-z02',
    description: '暂无'
  },
  {
    id: '3',
    name: '测试温度计 1',
    model: 'wen-z01',
    description: '暂无'
  },
  {
    id: '4',
    name: '测试温度计 2',
    model: 'wen-z02',
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
