import fetch from '@/utils/fetch'
const test = '' // '/mockjsdata/1',''

// 商户入驻

/**
 * 查询列表
 * @param limit 每页记录数
 * @param page 当前页数
 * @param enterpriseName 企业名称
 * @param businessLicenseNo 信用代码
 * @param mobile 手机号码
 * @param beginCreateTime 最早得入驻时间
 * @param endCreateTime 最晚得入驻时间
 * @param status 阶段状态
 * @param productName 对接产品
 * @param partnerName 所属场景方
 */
export function getListData ({limit, page,enterpriseName,businessLicenseNo,repreName,repreMobile,status,beginPassTime,endPassTime,productName,partnerName}) {
  const data = {
    limit,
    page,
    enterpriseName,
    businessLicenseNo,
    repreName,
    repreMobile,
    beginPassTime,
    endPassTime,
    status,
    productName,
    partnerName
  }
  return fetch({
    url: test + '/admin/supplier_info/list',
    method: 'post',
    data
  })
}

/**
 * 商户列表查询-（入驻阶段接口）
 */
export function getRegisterStatusList () {
  return fetch({
    url: test + '/admin/combobox/register_status',
    method: 'post'
  })
}
/**
 * 申请登记-列表-状态下拉
 */
export function getApplyStatusList () {
  return fetch({
    url: test + '/admin/supplier_info/supplier_enable_status',
    method: 'post'
  })
}

export default {
  getListData,
  getRegisterStatusList,
  getApplyStatusList
}
