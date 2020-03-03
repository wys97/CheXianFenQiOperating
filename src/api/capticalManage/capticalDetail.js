import fetch from '@/utils/fetch'
const test = '' // '/mockjsdata/1',''

//资金方详情

/** 
 * 资金方详情-头部
 * @param capitalId   资金方编号
 * 
 * */

export function detailHead(capitalId){
	let data = {
		capitalId
	}
	return fetch({
		url:test+'/admin/capital_manage/detail_head',
		method:'post',
		data
	})
}
/** 
 * 资金方详情查询
 * @param capitalId   资金方编号
 * 
 * */

export function detail(capitalId){
	let data = {
		capitalId
	}
	return fetch({
		url:test+'/admin/capital_manage/detail',
		method:'post',
		data
	})
}
/** 
 * 资金方保存和新增
 * @param capitalId   资金方编号
 * 
 * */

export function capitalSave({capitalId,capitalShortName,capitalType,capitalName,creditLine,businessLicenseNo,cooperateDate,status,remark,repreName,repreMobile,repreIdcardNo}){
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
		repreIdcardNo
	}
	return fetch({
		url:test+'/admin/capital_manage/save',
		method:'post',
		data
	})
}
/*
 * 联系人列表
 *@param capitalId 资金方编号
 * */
export function contactList({page,limit,capitalId}){
	let data = {
		page,
		limit,
		capitalId
	}
	return fetch({
		url:test+'/admin/capital_manage/contact_list',
		method:'post',
		data
	})
}
/*
 * 联系人详情
 *@param capitalId 资金方编号
 * */
export function contactDetail(contactId){
	let data = {
		contactId
	}
	return fetch({
		url:test+'/admin/capital_manage/contact_detail',
		method:'post',
		data
	})
}
/*
 * 联系人保存和新增
 *@param capitalId 资金方编号
 * */
export function saveContact({contactId,capitalId,contactName,position,mobile,remark}){
	let data = {
		contactId,
		capitalId,
		contactName,
		position,
		mobile,
		remark,
	}
	return fetch({
		url:test+'/admin/capital_manage/save_contact',
		method:'post',
		data
	})
}
/*
 * 联系人删除
 *@param capitalId 资金方编号
 * */
export function removeContact(contactId){
	let data = {
		contactId
	}
	return fetch({
		url:test+'/admin/capital_manage/remove_contact',
		method:'post',
		data
	})
}
/*
 * 融资费率查询
 *@param capitalId 资金方编号
 * */
export function loanFee(capitalId){
	let data = {
		capitalId
	}
	return fetch({
		url:test+'/admin/capital_manage/loan_fee',
		method:'post',
		data
	})
}

/*
 * 其它设置-签约设置
 *@param capitalId 资金方编号
 * */
export function signSetup(capitalId){
	let data = {
		capitalId
	}
	return fetch({
		url:test+'/admin/capital_manage/sign_setup',
		method:'post',
		data
	})
}
/*
 * 签约设置保存
 *@param capitalId 资金方编号
 * */
export function saveSignSetup(data){
	// let data = {
	// 	capitalId,
	// 	method,
	// 	financeMethod
	// }
	return fetch({
		url:test+'/admin/capital_manage/save_sign_setup',
		method:'post',
		data
	})
}
/*
 * 其它设置-签约设置申请
 *@param capitalId 资金方编号
 * */
export function applySignSetup(capitalId){
	let data = {
		capitalId
	}
	return fetch({
		url:test+'/admin/capital_manage/apply_sign_setup',
		method:'post',
		data
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

/*
 * 申请数字证书
 *@param capitalId 资金方编号
 * */
export function applyCertificate(capitalId){
	let data = {
		capitalId
	}
	return fetch({
		url:test+'/admin/captical_manage/apply_certificate',
		method:'post',
		data
	})
}
/*
 * 资方端登录账号-列表
 *@param capitalId
 * */
export function capitalOperatorList(capitalId){
	let data = {
		capitalId
	}
	return fetch({
		url:test+'/admin/capital_manage/capital_operator_list',
		method:'post',
		data
	})
}
/*
 * 查询单个登录账户 (用于修改)
 *@param capitalId
 * */
export function queryCapitalOperator(id){
	let data = {
		id	
	}
	return fetch({
		url:test+'/admin/capital_manage/query_capital_operator',
		method:'post',
		data
	})
}
/*
 * 修改登录账户
 *@param capitalId
 * */
export function updateOperator({id,operatorName,mobile}){
	let data = {
		id,
		operatorName,
		mobile,
	}
	return fetch({
		url:test+'/admin/capital_manage/update_operator',
		method:'post',
		data
	})
}
/*
 * 重置密码
 *@param capitalId
 * */
export function resetPassWord(id){
	let data = {
		id	
	}
	return fetch({
		url:test+'/admin/capital_manage/reset_passWord',
		method:'post',
		data
	})
}
export default{
	detailHead,
	detail,
	capitalSave,
	contactList,
	contactDetail,
	saveContact,
	removeContact,
	loanFee,

	signSetup,
	saveSignSetup,
	applySignSetup,
	capitalType,
	applyCertificate,
	capitalOperatorList,
	queryCapitalOperator,
	updateOperator,
	resetPassWord
}
