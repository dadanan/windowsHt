import axios from 'axios'
import { Message, Loading } from 'element-ui'
import store from '@/store'

// 里面的域名的response不显示错误
const showNotError = [
  'api/customer/selectBackendConfigBySLD',
  'api/device/newQueryDetailByDeviceId'
]

// 如果url在白名单里
const macthUrl = responseURL => {
  return showNotError.filter(url => responseURL.match(url)).length !== 0
}

let loading
const startLoading = () => {
  loading = Loading.service({
    lock: true,
    text: '加载中……',
    background: 'rgba(0, 0, 0, 0.7)'
  })
}
const endLoading = () => {
  loading.close()
}

// create an axios instance
const service = axios.create({
  baseURL: window.location.origin, // api的base_url,为了应对多个二级域名，因此baseUrl不写死
  timeout: 5000 // request timeout
})

// request interceptor
service.interceptors.request.use(
  config => {
    // Do something before request is sent
    // if (store.getters.token) {
    //   // 让每个请求携带token-- ['X-Token']为自定义key 请根据实际情况自行修改
    //   config.headers['X-Token'] = getToken()
    // }
    if (!config.notLoading) {
      startLoading()
    }
    return config
  },
  error => {
    endLoading()
    // Do something with request error
    console.log(error) // for debug
    Promise.reject(error)
  }
)

// respone interceptor
service.interceptors.response.use(
  // response => response,
  /**
   * 下面的注释为通过在response里，自定义code来标示请求状态
   * 当code返回如下情况则说明权限有问题，登出并返回到登录页
   * 如想通过xmlhttprequest来状态码标识 逻辑可写在下面error中
   * 以下代码均为样例，请结合自生需求加以修改，若不需要，则可删除
   */
  response => {
    // 如果当前请求是为了获取logo和name，则报错时不显示出来
    endLoading()
    const res = response.data
    if (res.code !== 200) {
      const responseURL = response.request.responseURL
      if (macthUrl(responseURL)) {
        return Promise.reject('code: 500')
      }
      Message({
        message: res.msg,
        type: 'error',
        duration: 5 * 1000
      })
      // 401: 未登录; 403:
      if (res.code === 401) {
        store.dispatch('FedLogOut').then(() => {
          location.reload() // 为了重新实例化vue-router对象 避免bug
        })
      }
      return Promise.reject('error')
    } else {
      return res
    }
  },
  error => {
    console.log('err' + error) // for debug
    endLoading()
    Message({
      message: error.message,
      type: 'error',
      duration: 5 * 1000
    })
    return Promise.reject(error)
  }
)

export default service
