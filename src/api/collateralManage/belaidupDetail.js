import fetch from '@/utils/fetch'
const test = '' // '/mockjsdata/1',''


/**
 * 押品管理-押品评估-头部信息
 * @param supplierId 商户ID
 */
export function belaidupHead (collateralId) {
  const data = {
    collateralId
  }
  return fetch({
    url: test + '/admin/collateral/belaidup_head',
    method: 'post',
    data
  })
}
/**
 * 押品管理-押品评估详情
 * @param supplierId 商户ID
 */
export function belaidupDetail (collateralId) {
  const data = {
    collateralId
  }
  return fetch({
    url: test + '/admin/collateral/belaidup_detail',
    method: 'post',
    data
  })
}
export default {
	belaidupHead,
	belaidupDetail
	
}