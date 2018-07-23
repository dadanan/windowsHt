import Mock from 'mockjs'
import { param2Obj } from '@/utils'

const list = []
const count = 100

for (let i = 0; i < count; i++) {
  list.push(Mock.mock({
    id: '@increment',
    name: '@title(2, 5)',
    rwPermissions: ['read', 'write'],
    hwFunctionID: 211,
    writeMethod: 0
  }))
}

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
