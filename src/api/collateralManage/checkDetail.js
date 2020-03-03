import fetch from '@/utils/fetch'
const test = '' // '/mockjsdata/1',''


/**
 * 押品管理-押品预审-头部信息
 * @param supplierId 商户ID
 */
export function checkHead (collateralId) {
  const data = {
    collateralId
  }
  return fetch({
    url: test + '/admin/collateral/check_head',
    method: 'post',
    data
  })
}
/**
 * 押品预审详情
 * @param supplierId 商户ID
 */
export function checkDetail (collateralId) {
  const data = {
    collateralId
  }
  return fetch({
    url: test + '/admin/collateral/check_detail',
    method: 'post',
    data
  })
}
/**
 * 押品预审保存
 * @param supplierId 商户ID
 */
export function checkSave ({collateralId,checkAmount,checkOpinion}) {
  const data = {
    collateralId,
    checkAmount,
    checkOpinion
  }
  return fetch({
    url: test + '/admin/collateral/check_save',
    method: 'post',
    data
  })
}
/**
 * 押品预审详情-打回
 * @param supplierId 商户ID
 */
export function repulseCheck ({collateralId,remark}) {
  const data = {
    collateralId,
    remark
  }
  return fetch({
    url: test + '/admin/collateral/repulse_check',
    method: 'post',
    data
  })
}
/**
 * 押品管理-押品预审详情-提交初审
 * @param supplierId 商户ID
 */
export function submitCheck (collateralId) {
  const data = {
    collateralId
  }
  return fetch({
    url: test + '/admin/collateral/submit_check',
    method: 'post',
    data
  })
}
export default {
	checkHead,
	checkDetail,
	checkSave,
	repulseCheck,
	submitCheck
	
}