import fetch from '@/utils/fetch'
const test = '' // '/mockjsdata/1',''

// 商户入驻

/**
 * 复审列表
 * @param limit 每页记录数
 * @param page 当前页数
 * @param enterpriseName 企业名称
 * @param businessLicenseNo 信用代码
 * @param mobile 手机号码
 * @param beginCreateTime 最早得入驻时间
 * @param endCreateTime 最晚得入驻时间
 * @param status 阶段状态
 */
export function getListData ({limit,page,enterpriseName,businessLicenseNo,repreName,repreMobile,grade,recheckStatus,registerFinallyStatus,customerType}) {
  const data = {
    limit,
    page,
    enterpriseName,
    businessLicenseNo,
    repreName,
    repreMobile,
    grade,
    recheckStatus,
    registerFinallyStatus,
    customerType
  }
  return fetch({
    url: test + '/admin/recheck/list',
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
 * 列表查询-审核状态下拉
 */
export function recheckStatusList () {
  return fetch({
    url: test + '/admin/recheck/recheck_status_list',
    method: 'post'
  })
}

/**
 * 列表查询-进件状态下拉
 */
export function finallyStatusList () {
  return fetch({
    url: test + '/admin/recheck/finally_status_list',
    method: 'post'
  })
}
/**
 * 供应商评级-下拉列表
 */
export function supplierGrade () {
  return fetch({
    url: test + '/admin/combobox/supplier_grade',
    method: 'post'
  })
}

export default {
  getListData,
  getRegisterStatusList,
  recheckStatusList,
  finallyStatusList,
  supplierGrade
}
