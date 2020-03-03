import fetch from '@/utils/fetch'
const test = '' // '/mockjsdata/1',''

// 商户入驻

/**
 * 押品管理-信息登记列表
 * @param limit 每页记录数
 * @param page 当前页数
 * @param status 阶段状态
 */
export function getListData ({limit,page,enterpriseName,capitalName,creditStatus,partnerName,supplierId}) {
  const data = {
    limit,
    page,
    enterpriseName,
    capitalName,
    creditStatus,
    partnerName,
    supplierId
  }
  return fetch({
    url: test + '/admin/credit_line_manage/credit_line_list',
    method: 'post',
    data
  })
}

/**
 * 商户列表查询-（入驻阶段接口）
 */
export function collateralRegisterStatus () {
  return fetch({
    url: test + '/admin/combobox/collateral_register_status',
    method: 'post'
  })
}

/**
 * 授信状态
 */
export function creditStatus () {
  return fetch({
    url: test + '/admin/credit_line_manage/credit_status',
    method: 'post'
  })
}
export default {
  getListData,
  collateralRegisterStatus,
  creditStatus
}
