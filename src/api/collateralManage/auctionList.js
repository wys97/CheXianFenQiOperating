import fetch from '@/utils/fetch'
const test = '' // '/mockjsdata/1',''

// 商户入驻

/**
 * 押品管理-押品评估列表
 * @param limit 每页记录数
 * @param page 当前页数
 * @param status 阶段状态
 */
export function getListData ({limit,page,collateralId,collateralType,enterpriseName,businessLicenseNo,repreName,repreIdCardNo,collateralStatus}) {
  const data = {
    limit,
    page,
    collateralId,
    collateralType,
    enterpriseName,
    businessLicenseNo,
    repreName,
    repreIdCardNo,
    collateralStatus
  }
  return fetch({
    url: test + '/admin/collateral/auction_list',
    method: 'post',
    data
  })
}

/**
 * 商户列表查询-（入驻阶段接口）
 */
export function collateraCheckStatus () {
  return fetch({
    url: test + '/admin/combobox/collateral_belaidup_status',
    method: 'post'
  })
}

export default {
  getListData,
  collateraCheckStatus
}
