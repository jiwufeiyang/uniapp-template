import { doGet, doDelete, doPostJson, doPostFormUrl, doFileUpload, doFileDownload } from '@/http'

/**
 * 获取当前登录用户的信息
 * @param {*} data
 * @returns {Promise}
 */
export const getBy = (data) => {
  return doGet('/cardServer/wxUser/get', data)
}

/**
 * 文件上传
 * @param {*} data
 * @param {*} data.uploadType 选择类型（ 0: audit 企业名称审核 ，1: introAudit #企业简介审核 ，2: cardTemplate #名片模板 , 3：小程序基础服务logo ，4: 产品简介审核， 5：相册图片）
 * @param {*} data.file
 * @returns {Promise}
 */
export const uploadFile = (data) => {
  return doFileUpload('/cardServer/upload/uploadFile/' + data.uploadType + '', data)
}

/**
 * 更新用户信息
 * @param {*} data
 * @param {*} data.avatarUrl 微信的头像
 * @param {*} data.city 城市
 * @param {*} data.country 国家
 * @param {*} data.gender 微信性别
 * @param {*} data.id
 * @param {*} data.nickName 微信nick_name
 * @param {*} data.phone 微信注册的手机号码
 * @param {*} data.province 省份
 * @returns {Promise}
 */
export const update = (data) => {
  return doPostJson('/cardServer/wxUser/update', data)
}

/**
 * 增加企业发票
 * @param {*} data
 * @param {*} data.bank 开户银行
 * @param {*} data.bankAccount 银行账户
 * @param {*} data.companyAddress 单位地址
 * @param {*} data.companyId 公司id
 * @param {*} data.companyPhone 单位电话
 * @param {*} data.dutyParagraph 税号
 * @param {*} data.inRise 抬头
 * @returns {Promise}
 */
export const addCompanyInvoice = (data) => {
  return doPostJson('/cardServer/companyInvoice/addCompanyInvoice', data)
}

/**
 * 小程序：企业管理查询企业发票信息-账号鉴权
 * @param {*} data
 * @param {*} data.qyUserId qyUserId
 * @returns {Promise}
 */
export const companyInvoice = (data) => {
  return doPostFormUrl('/cardServer/companyInvoice/companyInvoice', data)
}
