import fetch from '@/utils/fetch'
const test = '' // '/mockjsdata/1',''

// 商户入驻

/**
 * 押品管理-信息登记列表
 * @param limit 每页记录数
 * @param page 当前页数
 * @param status 阶段状态
 */
export function getListData ({limit,page,financeNo,enterpriseName,repreName,loanProductType,repaymentMethod,financePeriod,overdueDays}) {
  const data = {
    limit,
    page,
    financeNo,
    enterpriseName,
    repreName,
    loanProductType,
    repaymentMethod,
    financePeriod,
    overdueDays
  }
  return fetch({
    url: test + '/admin/standing_book/standing_info_list',
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
 * 融资期数下拉-下拉列表
 */
export function financePeroid () {
  return fetch({
    url: test + '/admin/standing_book/finance_peroid',
    method: 'post'
  })
}
/**
 * 逾期天数-下拉列表
 */
export function inspectMode () {
  return fetch({
    url: test + '/admin/trade_overdue_collection/overdue_days',
    method: 'post'
  })
}

export default {
  getListData,
  collateralRegisterStatus,
  financePeroid,
  inspectMode
}
