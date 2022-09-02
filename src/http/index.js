import request from './lib/request.js'
import fileRequest from './lib/fileRequest.js'
import { POST_REQUEST_CONTENT_TYPE } from './constant.js'

/**
 * 以 json 方式发起请求
 * @param {*} url 请求的地址
 * @param {*} data 请求的数据
 */
export const doPostJson = (url, data = {}) => {
  return request.post(url, data, {
    header: {
      'Content-Type': POST_REQUEST_CONTENT_TYPE.JSON
    }
  })
}

/**
 * 以表单的方式发起请求，不包含文件
 * @param {*} url 请求的地址
 * @param {*} data 请求的数据
 */
export const doPostFormUrl = (url, data = {}) => {
  return request.post(url, data, {
    header: {
      'Content-Type': POST_REQUEST_CONTENT_TYPE.FORMURL
    }
  })
}

/**
 * 以get方式发起请求
 * @param {*} url 请求的地址
 * @param {*} data 请求的数据
 */
export const doGet = (url, data = {}, header = {}) => {
  return request.get(url, {
    header,
    params: data
  })
}

/**
 * 以delete方式发起请求
 * @param {*} url 请求的地址
 * @param {*} data 请求的数据
 */
export const doDelete = (url, data = {}) => {
  return request.delete(url, data, {
    header: {
      'Content-Type': POST_REQUEST_CONTENT_TYPE.FORMURL
    }
  })
}

/**
 *  文件上传
 * @param {*} url
 * @param {*} data 参数同 uni.uploadFile 初url之外的参数， 注意看平台差异
 * @returns
 */
export const doFileUpload = (url, data = {}) => {
  return request.upload(url, {
    ...data
    // header: {
    //     'Content-Type': POST_REQUEST_CONTENT_TYPE.JSON
    // }
  })
}

/**
 * 文件下载
 * @param {*} url
 * @param {*} data
 * @returns 参数同 uni.downloadFile 初url之外的参数， 注意看平台差异
 */
export const doFileDownload = (url, data = {}) => {
  return request.download(url, data)
}
