import { logout, login } from '@/api/user'
import { getToken, setToken, removeToken } from '@/utils/auth'
import store from '../index'
import router from '../../router'

const user = {
  state: {
    user: '',
    status: '',
    code: '',
    token: getToken(),
    name: '',
    avatar: '',
    introduction: '',
    roles: [],
    setting: {
      articlePlatform: []
    }
  },

  mutations: {
    SET_CODE: (state, code) => {
      state.code = code
    },
    SET_TOKEN: (state, token) => {
      state.token = token
    },
    SET_INTRODUCTION: (state, introduction) => {
      state.introduction = introduction
    },
    SET_SETTING: (state, setting) => {
      state.setting = setting
    },
    SET_STATUS: (state, status) => {
      state.status = status
    },
    SET_NAME: (state, name) => {
      state.name = name
    },
    SET_AVATAR: (state, avatar) => {
      state.avatar = avatar
    },
    SET_ROLES: (state, roles) => {
      state.roles = roles
    }
  },

  actions: {
    // 用户名登录
    LoginByUsername({ commit }, userInfo) {
      const username = userInfo.username.trim()
      return new Promise((resolve, reject) => {
        login(username, userInfo.password)
          .then(response => {
            const data = response.data
            /**
             * 当前后端分离项目使用Token时，Token有两个作用：
             * 1.添加到请求的header中供后端进行安全校验。
             * 2.前端自行存储到Cookie or locakStorage中供前端判断用户是否登陆
             * 又因为此项目后端用的是传统的cookie方案（解决了「1」的问题）。
             * 所以我前端在成功登陆后自行添加一个token（一般后端会在此时返回一个token）
             * 前端自行模拟也没什么问题（为了解决「2」）
             */
            data['token'] = 'asdjc12eiajd2asd'
            commit('SET_TOKEN', data.token)
            setToken(data.token)

            // 先模拟roles
            data['roles'] = ['super_admin']
            if (data.roles && data.roles.length > 0) {
              // 验证返回的roles是否是一个非空数组
              commit('SET_ROLES', data.roles)
            } else {
              reject('getInfo: roles must be a non-null array !')
            }

            const user = data.user
            commit('SET_NAME', user.userName)

            commit('SET_AVATAR', user.avatar)
            commit('SET_INTRODUCTION', user.introduction)
            // debugger

            store.dispatch('GenerateRoutes', data).then(() => {
              // 根据roles权限生成可访问的路由表
              router.addRoutes(store.getters.addRouters) // 动态添加可访问路由表
              resolve()
            })
          })
          .catch(error => {
            console.log('err', error)
            reject(error)
          })
      })
    },

    // 第三方验证登录
    // LoginByThirdparty({ commit, state }, code) {
    //   return new Promise((resolve, reject) => {
    //     commit('SET_CODE', code)
    //     loginByThirdparty(state.status, state.email, state.code).then(response => {
    //       commit('SET_TOKEN', response.data.token)
    //       setToken(response.data.token)
    //       resolve()
    //     }).catch(error => {
    //       reject(error)
    //     })
    //   })
    // },

    // 登出
    LogOut({ commit, state }) {
      return new Promise((resolve, reject) => {
        logout()
          .then(() => {
            commit('SET_TOKEN', '')
            commit('SET_ROLES', [])
            removeToken()
            resolve()
          })
          .catch(error => {
            reject(error)
          })
      })
    },

    // 前端 登出
    FedLogOut({ commit }) {
      return new Promise(resolve => {
        commit('SET_TOKEN', '')
        removeToken()
        resolve()
      })
    },

    // 动态修改权限
    ChangeRoles({ commit }, role) {
      return new Promise(resolve => {
        commit('SET_TOKEN', role)
        setToken(role)
        // getUserInfo(role).then(response => {
        //   const data = response.data
        //   commit('SET_ROLES', data.roles)
        //   commit('SET_NAME', data.name)
        //   commit('SET_AVATAR', data.avatar)
        //   commit('SET_INTRODUCTION', data.introduction)
        //   resolve()
        // })
      })
    }
  }
}

export default user
