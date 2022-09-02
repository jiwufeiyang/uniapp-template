import config from '../config'

/**
 * 本地储存
 */
class Storage {
  prefix: string
  constructor(prefix: string = 'ww') {
    // 添加前缀
    this.prefix = prefix
  }

  /**
   * 设置储存
   * @param {*} key
   * @param {*} value
   * @param {*} expriess 过期时间（单位：秒，0为永不过期）
   */
  set(key: string, value: string, expriess: number = 0) {
    let o = {
      value,
      createTime: Date.now(),
      expriess: expriess * 1000
    }
    uni.setStorageSync(this.prefix + '__' + key, o)
  }

  /**
   * 获取缓存
   * @param {*} key
   * @returns
   */
  get(key: string) {
    let storage = uni.getStorageSync(this.prefix + '__' + key)

    if (!!storage === false) {
      return null
    } else {
      if (storage.expriess <= 0) {
        return storage.value
      } else {
        if (storage.expriess + storage.createTime > Date.now()) {
          return storage.value
        }
        // 过期销毁
        this.remove(key)
        return null
      }
    }
  }

  /**
   * 移除指定缓存
   * @param {*} key
   */
  remove(key: string) {
    uni.removeStorageSync(this.prefix + '__' + key)
  }

  /**
   * 清除该前缀下所有缓存
   */
  clear() {
    for (let key in uni.getStorageInfoSync().keys) {
      if (key.includes(this.prefix)) {
        this.remove(key.split('__')[1])
      }
    }
  }
}

export default new Storage(config.STORAGE_PREFIX)
