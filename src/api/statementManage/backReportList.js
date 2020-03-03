import fetch from '@/utils/fetch'
const test = '' // '/mockjsdata/1',''

// 商户入驻

/**
 * 收益表-查询合计
 */
export function total ({by,date}) {
	let data = {
		by,
		date
	}
  return fetch({
    url: test + '/admin/back_report/total',
    method: 'post',
    data
  })
}

/**
 * 收益表-查询分页
 */
export function getListData ({limit,page,by,date}) {
  const data = {
    limit,
    page,
    by,
    date
  }
  return fetch({
    url: test + '/admin/back_report/page',
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
