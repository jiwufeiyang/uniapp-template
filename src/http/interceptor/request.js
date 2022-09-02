/**
 * 处理全局参数注入
 * @param {*} config
 * @returns
 */

import { getToken } from '@/util/auth'

export const handleSetShareData = (config) => {
  return config
}

/**
 * 拦截登录请求， 添加登录需要的 header token
 * @param {*} config
 * @returns
 */
export const handleTokenHeader = (config) => {
  // 记录请求开始时间
  config.metadata = { startTime: new Date().getTime() }

  if (!config.header) {
    config.header = {}
  }
  if (config.url === '/cloudAuth/oauth/token') {
    //   微信授权
    config.header['Authorization'] = `Basic ZWNhcmQ6ZWNhcmQ=`
  } else {
    //   授权成功后用后台返回的token登录
    config.header['Authorization'] = config.header['Authorization'] || `Bearer ${getToken()}`
  }
  return config
}

export default [handleTokenHeader, handleSetShareData]
