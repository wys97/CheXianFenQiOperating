import fetch from '@/utils/fetch'
const test = '' // '/mockjsdata/1',''

// 商户入驻

/**
 * 查询列表
 */
export function getListData ({limit, page,capitalId,capitalShortName,capitalName,status,capitalType,partnerName,enterpriseName}) {
  const data = {
    limit,
    page,
    capitalId,
    capitalShortName,
    capitalName,
    status,
    capitalType,
    partnerName,
    enterpriseName
  }
  return fetch({
    url: test + '/admin/capital_manage/list',
    method: 'post',
    data
  })
}

/**
 * 资方状态下拉
 */
export function capitalStatusList () {
  return fetch({
    url: test + '/admin/capital_manage/capital_status',
    method: 'post'
  })
}
/**
 * 公司类型下拉
 */
export function ompanyType () {
  return fetch({
    url: test + '/admin/capital_manage/capital_type',
    method: 'post'
  })
}
/*
 * 资方类型下拉
 *@param capitalId 资金方编号
 * */
export function capitalType(){
	return fetch({
		url:test+'/admin/capital_manage/capital_type',
		method:'post',
	})
}
/** 
 * 资金方保存和新增
 * @param capitalId   资金方编号
 * 
 * */

export function capitalSave({capitalId,capitalShortName,capitalType,capitalName,creditLine,businessLicenseNo,cooperateDate,status,remark,repreName,repreMobile,repreIdcardNo,loanAmount}){
	let data = {
		capitalId,
		capitalShortName,
		capitalType,
		capitalName,
    creditLine,
		businessLicenseNo,
		cooperateDate,
		status,
		remark,
		repreName,
		repreMobile,
    repreIdcardNo,
    loanAmount
	}
	return fetch({
		url:test+'/admin/capital_manage/save',
		method:'post',
		data
	})
}
export default {
  getListData,
  capitalStatusList,
  capitalType,
  capitalSave,
  ompanyType
}
