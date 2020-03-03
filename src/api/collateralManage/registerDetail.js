import fetch from '@/utils/fetch'
const test = '' // '/mockjsdata/1',''


/**
 * 押品管理-信息登记-头部信息
 * @param supplierId 商户ID
 */
export function registerHead (collateralId) {
  const data = {
    collateralId
  }
  return fetch({
    url: test + '/admin/collateral/register_head',
    method: 'post',
    data
  })
}
/**
 * 押品管理-信息登记-详情查询
 * @param supplierId 商户ID
 */
export function registerDetail (collateralId) {
  const data = {
    collateralId
  }
  return fetch({
    url: test + '/admin/collateral/register_detail',
    method: 'post',
    data
  })
}
/**
 * 押品管理-信息登记-企业名称模糊查询
 * @param supplierId 商户ID
 */
export function enterpriseName (collateralId) {
  const data = {
    collateralId
  }
  return fetch({
    url: test + '/admin/collateral/enterprise_name',
    method: 'post',
    data
  })
}
/**
 * 押品管理-信息登记-企业编号查询企业信息
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
 * 押品管理-信息登记-保存押品信息
 * @param supplierId 商户ID
 */
export function registerSave ({supplierId,collateralId,collateralName,collateralType,collateralSource,collateralFiles,registerRemark}) {
  const data = {
    supplierId,
    collateralId,
    collateralName,
    collateralType,
    collateralSource,
    collateralFiles,
    registerRemark,
  }
  return fetch({
    url: test + '/admin/collateral/register_save',
    method: 'post',
    data
  })
}
/**
 * 押品管理-信息登记-取消
 * @param supplierId 商户ID
 */
export function registerCancel (collateralId) {
  const data = {
    collateralId
  }
  return fetch({
    url: test + '/admin/collateral/register_cancel',
    method: 'post',
    data
  })
}
/**
 * 押品管理-信息登记-提交评估
 * @param supplierId 商户ID
 */
export function registerSubmit (collateralId) {
  const data = {
    collateralId
  }
  return fetch({
    url: test + '/admin/collateral/register_submit',
    method: 'post',
    data
  })
}
export default {
	registerHead,
	registerDetail,
	enterpriseName,
	enterpriseInfo,
	registerSave,
	registerCancel,
	registerSubmit
	
}