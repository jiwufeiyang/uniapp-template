import config from '../config'

/**
 * @desc 函数节流
 * @param func 函数
 * @param wait 延迟执行毫秒数
 * @param type 1 表时间戳版，2 表定时器版
 */
export const throttle = (func, wait = 1000, type = 1) => {
  let previous, timeout
  if (type === 1) {
    previous = 0
  } else if (type === 2) {
    timeout
  }
  return function () {
    let context = this
    let args = arguments
    if (type === 1) {
      let now = Date.now()
      if (now - previous > wait) {
        func.apply(context, args)
        previous = now
      }
    } else if (type === 2) {
      if (!timeout) {
        timeout = setTimeout(() => {
          timeout = null
          func.apply(context, args)
        }, wait)
      }
    }
  }
}

/**
 * @desc 函数防抖
 * @param func 目标函数
 * @param wait 延迟执行毫秒数
 * @param immediate true - 立即执行， false - 延迟执行
 */
export const debounce = (func: any, wait: number = 1000, immediate: boolean = true) => {
  let timer: any
  return function (this: any) {
    let context = this,
      args = arguments

    if (timer) clearTimeout(timer)
    if (immediate) {
      let callNow = !timer
      timer = setTimeout(() => {
        timer = null
      }, wait)
      if (callNow) func.apply(context, args)
    } else {
      timer = setTimeout(() => {
        func.apply
      }, wait)
    }
  }
}

/**
 * 自定义showLoading
 * @param {*} title 显示内容
 * @param {*} mask 是否显示透明蒙层，防止触摸穿透，默认：false
 */
export const showLoading = (title: string, mask: boolean = true) => {
  uni.showLoading({
    title: title,
    mask: mask
  })
}

/**
 * hideLoading
 */
export const hideLoading = () => {
  uni.hideLoading()
}

/**
 * 自定义toast
 * @param {*} str 显示内容
 * @param {*} type 图标类型， 默认没有图标
 */
export const customToast = (str: string, type: 'none' | 'success' | 'loading' | 'error' | undefined = 'none') => {
  uni.showToast({
    title: str,
    icon: type
  })
}

/**
 * [hideToast description] 隐藏lodding与去掉下拉刷新中状态
 * @return {[type]} [description]
 */
export const hideToast = (): void => {
  if (uni.hideLoading) {
    uni.hideLoading()
    //uni.hideToast();
    uni.stopPullDownRefresh()
    uni.hideNavigationBarLoading()
  } else {
    // 如果希望用户在最新版本的客户端上体验您的小程序，可以这样子提示
    uni.hideToast()
    uni.stopPullDownRefresh()
    uni.hideNavigationBarLoading()
  }
}

/*
 * 模态提示框
 */
export const showModal = (msg: string) => {
  hideToast()
  uni.showModal({
    title: '提示',
    showCancel: false,
    content: msg || '系统繁忙，请稍后重试',
    success: function (res) {
      if (res.confirm) {
        console.log('用户点击确定')
      }
    },
    fail: function (err) {
      console.log(err)
    }
  })
}

/**
 *  判断类型
 * @param {*} val 需要判断的值
 * @param {*} type 判断的类型， 如 Array, Object, String, Number
 * @returns
 */
export const isType = (val: any, type: object | string | number) => {
  return Object.prototype.toString.call(val) == `[object ${type}]`
}

/**
 * 是否定义变量
 * @param {*} val
 * @returns
 */
export const isUndefined = (val: any) => {
  return isType(val, 'Undefined')
}

/**
 * 是否为null值
 * @param {*} val
 * @returns
 */
export const isNull = (val: any) => {
  return isType(val, 'Null')
}

/**
 * 字符串是否为空
 * @param {*} val
 * @returns
 */
export const isEmpty = (val: any) => {
  return isUndefined(val) || isNull(val) || val === ''
}

/**
 * 倒计时器
 * @param {Function} callback 每秒执行函数
 * @param {Number} sec
 * @returns {Object} {start， stop}
 */
export const useTimer = (callback: any, sec: number): object => {
  let tmpSec = sec
  let timer: any = null

  function start() {
    callback(tmpSec, null)
    timer = setTimeout(() => {
      tmpSec--
      if (tmpSec <= 0) {
        stop()
        callback(tmpSec, 'done')
        tmpSec = sec
      } else {
        callback(tmpSec, null)
        start()
      }
    }, 1000)
  }

  function stop() {
    clearTimeout(timer)
  }

  return {
    start,
    stop
  }
}

/**
 * 生成本地缓存的key
 * @param {*} key
 * @returns
 */
export const genStorageKey = (key: string) => {
  return `${config.STORAGE_PREFIX}_${key}`
}

/**
 * object 转 querystring
 * @param { Object } obj 转换对象
 * @param {*} isEncode 是否需要编码,
 * @returns { string }
 */
export const objectToQueryString = (obj: any, isEncode: boolean = true): string => {
  if (!isType(obj, 'Object')) {
    return ''
  }

  const queryStringArr = []
  const keys = Object.keys(obj).filter((key) => Object.prototype.hasOwnProperty.call(obj, key))
  if (keys.length <= 0) {
    return ''
  }

  let val
  for (const key of keys) {
    val = obj[key]
    if (isType(val, 'Number') || isType(val, 'String') || isType(val, 'Boolean')) {
      val = isEncode ? encodeURIComponent(val) : val
    } else if (isType(val, 'Object') || isType(val, 'Array')) {
      val = isEncode ? encodeURIComponent(JSON.stringify(val)) : JSON.stringify(val)
    } else {
      throw new Error(`${val}不支持的类型`)
    }
    queryStringArr.push(`${key}=${val}`)
  }
  return `?${queryStringArr.join('&')}`
}
