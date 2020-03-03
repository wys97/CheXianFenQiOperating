import fetch from '@/utils/fetch'
const test = '' // '/mockjsdata/1',''

// 商户入驻

/**
 * 押品管理-信息登记列表
 * @param limit 每页记录数
 * @param page 当前页数
 * @param status 阶段状态
 */
export function getListData ({limit,page,orderNo,supplierName,repreName,loanProductType,operatorName,inspectMode,checkStatus}) {
  const data = {
    limit,
    page,
    orderNo,
    supplierName,
    repreName,
    loanProductType,
    operatorName,
    inspectMode,
    checkStatus
  }
  return fetch({
    url: test + '/admin/trade_post_inspect/list',
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
 * 检查方式-下拉列表
 */
export function inspectMode () {
  return fetch({
    url: test + '/admin/trade_post_inspect/inspect_mode',
    method: 'post'
  })
}

/**
 * 核查状态-下拉列表
 */
export function erificationStatus () {
  return fetch({
    url: test + '/admin/trade_post_inspect/list_check_status',
    method: 'post'
  })
}
export default {
  getListData,
  collateralRegisterStatus,
  inspectMode,
  erificationStatus
}
