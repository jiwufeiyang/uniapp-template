import log from '@/util/wxLog.js'

export const handleResData = (result) => {
  const config = result.config
  const startTime = config.metadata.startTime
  const expend = new Date().getTime() - startTime
  const baseLog = `请求时间：${new Date(startTime)}，耗时：${expend}ms，地址：${
    config.baseURL + config.url
  } ${config.method}`

  const data = result.data

  if (data.resultCode && data.resultCode !== '200') {
    const msg = data.resultMsg || '服务端正忙，请稍后再试'
    console.error(data)
    log.error(baseLog, '请求参数：', config.data, config.params, '响应异常数据: ', data)
    if (msg.length > 22) {
      // 长度过长另外显示
      uni.showModal({
        title: '提示',
        content: msg,
        showCancel: false
      })
      uni.hideLoading()
    } else {
      uni.showToast({ title: msg, icon: 'none' })
    }
    return Promise.reject(new Error(msg))
  } else {
    log.info(baseLog)
    return Promise.resolve(data)
  }
}

export default [handleResData]
