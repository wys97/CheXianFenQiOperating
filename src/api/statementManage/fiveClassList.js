import fetch from '@/utils/fetch'
const test = '' // '/mockjsdata/1',''

// 商户入驻

/**
 * 收益表-查询分页
 */
export function getListData ({limit,page}) {
  const data = {
    limit,
    page,
  }
  return fetch({
    url: test + '/admin/classification_report/list',
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
  getListData,
  collateralRegisterStatus
}
