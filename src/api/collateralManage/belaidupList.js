import fetch from '@/utils/fetch'
const test = '' // '/mockjsdata/1',''

// 商户入驻

/**
 * 押品管理-押品入库列表
 * @param limit 每页记录数
 * @param page 当前页数
 * @param status 阶段状态
 */
export function getListData ({limit,page,collateralId,type,enterpriseName,licenseNo,repreName,repreIdCard,status}) {
  const data = {
    limit,
    page,
    collateralId,
    type,
    enterpriseName,
    licenseNo,
    repreName,
    repreIdCard,
    status
  }
  return fetch({
    url: test + '/admin/collateral/belaidup_list',
    method: 'post',
    data
  })
}
/**
 * 押品管理-押品入库列表
 * @param limit 每页记录数
 * @param page 当前页数
 * @param status 阶段状态
 */
export function passList ({limit,page,collateralId,type,enterpriseName,licenseNo,repreName,repreIdCard}) {
  const data = {
    limit,
    page,
    collateralId,
    type,
    enterpriseName,
    licenseNo,
    repreName,
    repreIdCard
  }
  return fetch({
    url: test + '/admin/collateral/pass_list',
    method: 'post',
    data
  })
}

/**
 * 押品管理-选择入库
 * @param limit 每页记录数
 * @param page 当前页数
 * @param status 阶段状态
 */
export function choseBelaidup (collateralIds) {
  const data = {
    collateralIds
  }
  return fetch({
    url: test + '/admin/collateral/chose_belaidup',
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
  passList,
  choseBelaidup,
  collateraCheckStatus
}
