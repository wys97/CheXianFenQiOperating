import fetch from '@/utils/fetch'
const test = '' // '/mockjsdata/1',''

// 商户入驻

/**
 * 收益表-查询合计
 */
export function total () {
  return fetch({
    url: test + '/admin/profit_report/total',
    method: 'post',
  })
}

/**
 * 收益表-查询分页
 */
export function getListData ({limit,page}) {
  const data = {
    limit,
    page,
  }
  return fetch({
    url: test + '/admin/profit_report/page',
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

export default {
	total,
  getListData,
  collateralRegisterStatus
}
