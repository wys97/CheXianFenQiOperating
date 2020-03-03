import fetch from '@/utils/fetch'
const test = '' // '/mockjsdata/1',''

// 商户入驻

/**
 * 押品管理-信息登记列表
 * @param limit 每页记录数
 * @param page 当前页数
 * @param status 阶段状态
 */
export function getListData ({limit,page,productName,supplierName,overdueDays,cleared}) {
  const data = {
    limit,
    page,
    productName,
    supplierName,
    overdueDays,
    cleared
  }
  return fetch({
    url: test + '/admin/overdue_report/page',
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
 * 逾期情况表 - 下拉列表 - 逾期天数
 */
export function overdueDays () {
  return fetch({
    url: test + '/admin/overdue_report/overdue_days',
    method: 'post'
  })
}

export default {
  getListData,
  collateralRegisterStatus,
  overdueDays
}
