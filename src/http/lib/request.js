import Request from 'luch-request'
import interceptorsRequest from '../interceptor/request'
import { handleResData } from '../interceptor/respone'
import store from '@/store'
import storage from '@/util/storage'
import log from '@/util/wxLog.js'

const instance = new Request({
  baseURL: process.env.VUE_APP_BASE_URL,
  header: {
    'Content-Type': 'application/json'
  }
})

let timer = null

// 多个拦截器
interceptorsRequest.forEach((func) => {
  instance.interceptors.request.use(func)
})

instance.interceptors.response.use(handleResData, (error) => {
  const config = error.config
  const startTime = config.metadata.startTime
  const expend = new Date().getTime() - startTime
  const baseLog = `请求时间：${new Date(startTime)}，耗时：${expend}ms，地址：${
    config.baseURL + config.url
  } ${config.method}`

  log.error('HTTP状态码异常！', baseLog, '请求参数：', config.data, config.params)
  console.error('HTTP状态码异常！', error)

  const errData = error.data || {}
  const { resultCode, resultMsg } = errData

  // 状态码
  switch (resultCode) {
    case '424':
      uni.showToast({
        title: '正在自动登录…',
        icon: 'none'
      })
      store.dispatch('user/resetToken').then(() => {
        let options = storage.get('shareParams') || {}

        if (JSON.stringify(options) !== '{}') {
          // 从分享链接进来
          store.dispatch('user/login').catch((err) => {
            console.error(err)
          })
        } else {
          uni.showToast({
            title: '正在自动登录…',
            icon: 'none'
          })
          clearTimeout(timer)
          // 从首页进来
          timer = setTimeout(() => {
            uni.reLaunch({ url: '/page/index/index' })
            clearTimeout(timer)
          }, 2000)
        }
      })
      break
    default:
      uni.getNetworkType({
        success: (res) => {
          // 返回网络类型, 有效值：
          // wifi/2g/3g/4g/unknown(Android下不常见的网络类型)/none(无网络)
          let networkType = res.networkType
          if (networkType == 'none' || networkType == 'unknown') {
            log.error('interceptors.response 网络异常', res)
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
