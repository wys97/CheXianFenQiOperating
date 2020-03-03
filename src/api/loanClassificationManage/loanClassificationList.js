import fetch from '@/utils/fetch'
const test = '' // '/mockjsdata/1',''

// 商户入驻

/**
 * 押品管理-信息登记列表
 * @param limit 每页记录数
 * @param page 当前页数
 * @param status 阶段状态
 */
export function getListData ({limit,page,financeNo,supplierName,loanClassification,writtenOff}) {
  const data = {
    limit,
    page,
    financeNo,
    supplierName,
    loanClassification,
    writtenOff,
  }
  return fetch({
    url: test + '/admin/loan_classification/list',
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
 * 五级分类-下拉
 */
export function loanClassificationType () {
  return fetch({
    url: test + '/admin/loan_classification/loan_classification_type',
    method: 'post'
  })
}
export default {
  getListData,
  collateralRegisterStatus,
  loanClassificationType
}
