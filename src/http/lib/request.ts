import Request from 'luch-request'
import interceptorsRequest from '../interceptor/request'
import { handleResData } from '../interceptor/respone'

const instance = new Request({
  baseURL: import.meta.env.VITE_APP_PROXY_URL,
  header: {
    'Content-Type': 'application/json'
  }
})

let timer: any = null

// 多个拦截器
interceptorsRequest.forEach((func) => {
  instance.interceptors.request.use(func)
})

instance.interceptors.response.use(handleResData, (error:any) => {
  const config: any = error.config

  console.error('HTTP状态码异常！', error)

  const errData = error.data || {}
  const { resultCode, resultMsg } = errData

  // 状态码
  switch (resultCode) {
    case '424':
      // 登录过期处理
      break
    default:
      uni.getNetworkType({
        success: (res) => {
          // 返回网络类型, 有效值：
          // wifi/2g/3g/4g/unknown(Android下不常见的网络类型)/none(无网络)
          let networkType = res.networkType
          if (networkType == 'none' || networkType == 'unknown') {
            uni.showToast({
              title: '网络异常，请检查重试',
              icon: 'none'
            })
          } else {
            uni.showToast({
              title: resultMsg || '系统繁忙，请稍后重试',
              icon: 'none'
            })
          }
        }
      })
  }

  return Promise.reject({
    code: resultCode,
    msg: resultMsg
  })
})

export default instance
