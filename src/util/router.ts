import { objectToQueryString } from '/@/util/index'

class Router {
  constructor() {}
  push(url: string, params: object) {
    url = url + objectToQueryString(params, true)
    console.log(url, params)

    uni.navigateTo({
      url
    })
  }
  back(page: number) {
    uni.navigateBack({
      delta: page
    })
  }
  redirectTo(url: string, params: object) {
    url = url + objectToQueryString(params, true)
    uni.redirectTo({
      url
    })
  }
  reLaunch(url: string, params: object) {
    url = url + objectToQueryString(params, true)
    uni.reLaunch({
      url
    })
  }
  /**
   * 获取地址栏参数
   * @returns
   */
  query() {
    const pages: any = getCurrentPages() // eslint-disable-line
    const cur = pages[pages.length - 1]
    const op: any = {}
    //在微信小程序或是app中，通过curPage.options；如果是H5，则需要curPage.$route.query（H5中的curPage.options为undefined，所以刚好就不需要条件编译了）
    let curParam = cur.options || cur.$route.query
    const keys = Object.keys(curParam || {}).filter((key) => Object.prototype.hasOwnProperty.call(curParam, key))
    for (const key of keys) {
      const val = decodeURIComponent(curParam[key])
      if (val === 'false' || val === 'true') {
        op[key] = val === 'true' ? true : false
      } else {
        op[key] = val
      }
    }

    return op
  }
  /**
   * 转换参数
   * @param {*} data
   * @returns
   */
  parse(data: any = {}) {
    const op: any = {}
    const keys = Object.keys(data).filter((key) => Object.prototype.hasOwnProperty.call(data, key))
    for (const key of keys) {
      const val = decodeURIComponent(data[key])
      if (val === 'false' || val === 'true') {
        op[key] = val === 'true' ? true : false
      } else {
        op[key] = val
      }
    }

    return op
  }
}

export default Router
