import fetch from '@/utils/fetch'
const test = '' // '/mockjsdata/1',''


/**
 * 押品管理-押品拍卖-头部信息
 * @param supplierId 商户ID
 */
export function outHead (collateralId) {
  const data = {
    collateralId
  }
  return fetch({
    url: test + '/admin/collateral/out_head',
    method: 'post',
    data
  })
}
/**
 * 押品拍卖详情
 * @param supplierId 商户ID
 */
export function outDetail (collateralId) {
  const data = {
    collateralId
  }
  return fetch({
    url: test + '/admin/collateral/out_detail',
    method: 'post',
    data
  })
}
/**
 * 出库附件保存
 * @param supplierId 商户ID
 */
export function outSave ({collateralId,outRemark,outFiles}) {
  const data = {
    collateralId,
    outRemark,
    outFiles
  }
  return fetch({
    url: test + '/admin/collateral/auction_save',
    method: 'post',
    data
  })
}
/**
 * 出库确认
 * @param supplierId 商户ID
 */
export function outConfirm (collateralId) {
  const data = {
    collateralId
  }
  return fetch({
    url: test + '/admin/collateral/out_confirm',
    method: 'post',
    data
  })
}
export default {
	outHead,
	outDetail,
	outSave,
	outConfirm
	
}