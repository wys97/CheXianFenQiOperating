import fetch from '@/utils/fetch'
const test = '' // '/mockjsdata/1',''


/**
 * 押品管理-押品拍卖-头部信息
 * @param supplierId 商户ID
 */
export function auctionHead (collateralId) {
  const data = {
    collateralId
  }
  return fetch({
    url: test + '/admin/collateral/auction_head',
    method: 'post',
    data
  })
}
/**
 * 押品拍卖详情
 * @param supplierId 商户ID
 */
export function auctionDetail (collateralId) {
  const data = {
    collateralId
  }
  return fetch({
    url: test + '/admin/collateral/auction_detail',
    method: 'post',
    data
  })
}
/**
 * 押品拍卖保存
 * @param supplierId 商户ID
 */
export function auctionSave ({collateralId,auctionAmount,auctionReamrk,auctionFiles}) {
  const data = {
    collateralId,
    auctionAmount,
    auctionReamrk,
    auctionFiles
  }
  return fetch({
    url: test + '/admin/collateral/auction_save',
    method: 'post',
    data
  })
}
/**
 * 拍卖确认
 * @param supplierId 商户ID
 */
export function auctionConfirm (collateralId) {
  const data = {
    collateralId
  }
  return fetch({
    url: test + '/admin/collateral/auction_confirm',
    method: 'post',
    data
  })
}
export default {
	auctionHead,
	auctionDetail,
	auctionSave,
	auctionConfirm
	
}