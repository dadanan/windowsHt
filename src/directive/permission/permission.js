
import store from '@/store'

export default{
  inserted(el, binding, vnode) {
    const { value } = binding
    const permission = store.getters && store.getters.permission

    if (value && value instanceof Array && value.length > 0) {
      const permissionRoles = value

      const hasPermission = permission.some(role => {
        return permissionRoles.includes(role)
      })

      if (!hasPermission) {
        el.parentNode && el.parentNode.removeChild(el)
      }
    } else {
      throw new Error(`need permission! Like v-permission="['admin','editor']"`)
    }
  }
}
