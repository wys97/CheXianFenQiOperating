import fetch from '@/utils/fetch'
const test = '' // '/mockjsdata/1',''

// 商户入驻

/**
 * 查询初审列表
 * @param limit 每页记录数
 * @param page 当前页数
 * @param enterpriseName 企业名称
 * @param businessLicenseNo 信用代码
 * @param mobile 手机号码
 * @param beginCreateTime 最早得入驻时间
 * @param endCreateTime 最晚得入驻时间
 * @param status 阶段状态
 */
export function getListData ({limit,page,enterpriseName,businessLicenseNo,repreName,repreMobile,grade,customerType,approveStatus}) {
  const data = {
    limit,
    page,
    enterpriseName,
    businessLicenseNo,
    repreName,
    repreMobile,
    grade,
    customerType,
    approveStatus
  }
  return fetch({
    url: test + '/admin/creditline_report_zl/list',
    method: 'post',
    data
  })
}

/**
 * 商户列表查询-（入驻阶段接口）
 */
export function getRegisterStatusList () {
  return fetch({
    url: test + '/capital-api/combobox/register_status',
    method: 'post'
  })
}

/**
 * 供应商评级-下拉列表
 */
export function supplierGrade () {
  return fetch({
    url: test + '/capital-api/combobox/supplier_grade',
    method: 'post'
  })
}

/**
 * 列表查询-审核下拉接口
 */
export function checkStatusList () {
  return fetch({
    url: test + '/capital-api/supplier_verify/capital_approve_status',
    method: 'post'
  })
}


/**
 * 列表查询-进件下拉接口
 */
export function finallyStatusList () {
  return fetch({
    url: test + '/capital-api/check/finally_status_list',
    method: 'post'
  })
}

/**
 * 客户类型（中旅银行）-下拉
 */
export function customerType2 () {
  return fetch({
    url: test + '/admin/creditline_report_zl/customer_type',
    method: 'post'
  })
}

/**
 * 审核状态（中旅银行）-下拉
 */
export function approveStatus () {
  return fetch({
    url: test + '/admin/creditline_report_zl/capital_approve_status',
    method: 'post'
  })
}

export default {
  getListData,
  getRegisterStatusList,
  supplierGrade,
  checkStatusList,
  finallyStatusList,
  customerType2,
  approveStatus
}
