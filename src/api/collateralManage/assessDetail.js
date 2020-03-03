import fetch from '@/utils/fetch'
const test = '' // '/mockjsdata/1',''


/**
 * 押品管理-押品评估-头部信息
 * @param supplierId 商户ID
 */
export function assessHead (collateralId) {
  const data = {
    collateralId
  }
  return fetch({
    url: test + '/admin/collateral/assess_head',
    method: 'post',
    data
  })
}
/**
 * 押品管理-押品评估详情
 * @param supplierId 商户ID
 */
export function assessDetail (collateralId) {
  const data = {
    collateralId
  }
  return fetch({
    url: test + '/admin/collateral/assess_detail',
    method: 'post',
    data
  })
}
/**
 * 押品管理-押品评估-企业编号查询企业信息
 * @param supplierId 商户ID
 */
export function enterpriseInfo (supplierId) {
  const data = {
    supplierId
  }
  return fetch({
    url: test + '/admin/collateral/enterprise_info',
    method: 'post',
    data
  })
}
/**
 * 押品管理-押品评估-押品评估保存
 * @param supplierId 商户ID
 */
export function assessSave ({collateralId,evaluateAmount,discountRate,evaluateOpinion,evaluateFiles}) {
  const data = {
    collateralId,
    evaluateAmount,
    discountRate,
    evaluateOpinion,
    evaluateFiles
  }
  return fetch({
    url: test + '/admin/collateral/assess_save',
    method: 'post',
    data
  })
}
/**
 * 评估详情-打回
 * @param supplierId 商户ID
 */
export function repulseAssess ({collateralId,remark}) {
  const data = {
    collateralId,
    remark
  }
  return fetch({
    url: test + '/admin/collateral/repulse_assess',
    method: 'post',
    data
  })
}
/**
 * 押品管理-信息登记-提交评估
 * @param supplierId 商户ID
 */
export function assessChecking (collateralId) {
  const data = {
    collateralId
  }
  return fetch({
    url: test + '/admin/collateral/assess_checking',
    method: 'post',
    data
  })
}
export default {
	assessHead,
	assessDetail,
	enterpriseInfo,
	assessSave,
	repulseAssess,
	assessChecking
	
}