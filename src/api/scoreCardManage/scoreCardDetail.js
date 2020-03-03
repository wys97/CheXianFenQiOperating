import fetch from '@/utils/fetch'
const test = '' // '/mockjsdata/1',''

//资金方详情

/** 
 * 资金方详情-头部
 * @param cardId   资金方编号
 * 
 * */

export function detailHead(cardId){
	let data = {
		cardId
	}
	return fetch({
		url:test+'/admin/score_card/detail_top',
		method:'post',
		data
	})
}
/** 
 * 资金方详情查询
 * @param cardId   资金方编号
 * 
 * */

export function detail(cardId){
	let data = {
		cardId
	}
	return fetch({
		url:test+'/admin/score_card/detail',
		method:'post',
		data
	})
}
/** 
 * 评分卡管理 - 保存评分卡
 * @param cardId   资金方编号
 * 
 * */

export function scoreCardSave({cardId,cardNo,cardName,sceneType,cardType,strategyNo,thresholdALow,thresholdAHigh,thresholdBLow,thresholdBHigh,thresholdCLow,thresholdCHigh,thresholdDLow,thresholdDHigh,status,remark}){
	let data = {
		cardId,
		cardNo,
		cardName,
		sceneType,
		cardType,
		strategyNo,
		thresholdALow,
		thresholdAHigh,
		thresholdBLow,
		thresholdBHigh,
		thresholdCLow,
		thresholdCHigh,
		thresholdDLow,
		thresholdDHigh,
		status,
		remark,
	}
	return fetch({
		url:test+'/admin/score_card/save',
		method:'post',
		data
	})
}
/** 
 * 评分卡管理 - 保存评分卡
 * @param cardId   资金方编号
 * 
 * */

export function scoreCardAdd({cardNo,cardName,sceneType,cardType,strategyNo,thresholdALow,thresholdAHigh,thresholdBLow,thresholdBHigh,thresholdCLow,thresholdCHigh,thresholdDLow,thresholdDHigh,status,remark}){
	let data = {
		cardNo,
		cardName,
		sceneType,
		cardType,
		strategyNo,
		thresholdALow,
		thresholdAHigh,
		thresholdBLow,
		thresholdBHigh,
		thresholdCLow,
		thresholdCHigh,
		thresholdDLow,
		thresholdDHigh,
		status,
		remark,
	}
	return fetch({
		url:test+'/admin/score_card/add',
		method:'post',
		data
	})
}

/*
 * 评分卡管理 - 删除评分卡
 *@param cardId 资金方编号
 * */
export function scoreCardDelete(cardId){
	let data = {
		cardId
	}
	return fetch({
		url:test+'/admin/score_card/delete',
		method:'post',
		data
	})
}

/*
 * 模型管理-列表
 *@param cardId 资金方编号
 * */
export function scoreCardRuleSetList(cardId){
	let data = {
		cardId
	}
	return fetch({
		url:test+'/admin/score_card_rule_set/list',
		method:'post',
		data
	})
}
/*
 * 模型管理-规则集类型
 *@param cardId 资金方编号
 * */
export function rulesetType(){
	return fetch({
		url:test+'/admin/score_card_rule_set/ruleset_type',
		method:'post'
	})
}
/*
 * 模型管理-新增规则集
 *@param cardId 资金方编号
 * */
export function scoreCardRuleSetAdd({cardId,modelType,rulesetCode,rulesetName,rulesetType,remark}){
	let data = {
		cardId,
		modelType,
		rulesetCode,
		rulesetName,
		rulesetType,
		remark,
	}
	return fetch({
		url:test+'/admin/score_card_rule_set/add',
		method:'post',
		data
	})
}
/*
 * 模型管理-基础信息
 *@param cardId 资金方编号
 * */
export function basicInfo(ruleSetId){
	let data = {
		ruleSetId
	}
	return fetch({
		url:test+'/admin/score_card_rule_set/basic_info',
		method:'post',
		data
	})
}
/*
 * 模型管理-保存基础信息
 *@param cardId 资金方编号
 * */
export function saveBasicInfo({ruleSetId,rulesetCode,rulesetName,rulesetType,remark}){
	let data = {
		ruleSetId,
		rulesetCode,
		rulesetName,
		rulesetType,
		remark,
	}
	return fetch({
		url:test+'/admin/score_card_rule_set/save_basic_info',
		method:'post',
		data
	})
}
/*
 * 模型管理-删除规则集
 *@param cardId 资金方编号
 * */
export function scoreCardRuleSetDelete(ruleSetId){
	let data = {
		ruleSetId
	}
	return fetch({
		url:test+'/admin/score_card_rule_set/delete',
		method:'post',
		data
	})
}
/*
 * 规则管理-列表
 *@param cardId 资金方编号
 * */
export function scoreCardRuleList(ruleSetId){
	let data = {
		ruleSetId
	}
	return fetch({
		url:test+'/admin/score_card_rule/list',
		method:'post',
		data
	})
}
/*
 * 规则管理 - 新增 - 查询
 *@param cardId 资金方编号
 * */
export function dataSourceLinkerList(){
	return fetch({
		url:test+'/admin/score_card_rule/data_source_linker_list',
		method:'post',
	})
}
/*
 * 规则管理 - 新增
 *@param cardId 资金方编号
 * */
export function scoreCardRuleAdd({ruleSetId,grade,ruleLogic}){
	let data = {
		ruleSetId,
		grade,
		ruleLogic
	}
	return fetch({
		url:test+'/admin/score_card_rule/add',
		method:'post',
		data
	})
}
/*
 * 规则管理 - 查询规则
 *@param cardId 资金方编号
 * */
export function scoreCardRuleDetail(ruleId){
	let data = {
		ruleId
	}
	return fetch({
		url:test+'/admin/score_card_rule/detail',
		method:'post',
		data
	})
}
/*
 * 规则管理 - 保存规则
 *@param cardId 资金方编号
 * */
export function scoreCardRuleSave({ruleId,grade,ruleLogic}){
	let data = {
		ruleId,
		grade,
		ruleLogic
	}
	return fetch({
		url:test+'/admin/score_card_rule/save',
		method:'post',
		data
	})
}
/*
 * 规则管理-删除
 *@param cardId 资金方编号
 * */
export function scoreCardRuleDelete(ruleId){
	let data = {
		ruleId
	}
	return fetch({
		url:test+'/admin/score_card_rule/delete',
		method:'post',
		data
	})
}
/*
 * 联系人列表
 *@param cardId 资金方编号
 * */
export function contactList({page,limit,cardId}){
	let data = {
		page,
		limit,
		cardId
	}
	return fetch({
		url:test+'/admin/capital_manage/contact_list',
		method:'post',
		data
	})
}
/*
 * 联系人详情
 *@param cardId 资金方编号
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
 *@param cardId 资金方编号
 * */
export function saveContact({contactId,cardId,contactName,position,mobile,remark}){
	let data = {
		contactId,
		cardId,
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
 *@param cardId 资金方编号
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
 *@param cardId 资金方编号
 * */
export function loanFee(cardId){
	let data = {
		cardId
	}
	return fetch({
		url:test+'/admin/capital_manage/loan_fee',
		method:'post',
		data
	})
}
/*
 * 融资费率保存
 *@param cardId 资金方编号
 * */
export function saveLoanfee({cardId,overdueRate,loanFee,marginRate,chargeRate,interestRate}){
	let data = {
		cardId,
		overdueRate,
		loanFee,
		marginRate,
		chargeRate,
		interestRate
	}
	return fetch({
		url:test+'/admin/capital_manage/save_loanfee',
		method:'post',
		data
	})
}
/*
 * 其它设置-签约设置
 *@param cardId 资金方编号
 * */
export function signSetup(cardId){
	let data = {
		cardId
	}
	return fetch({
		url:test+'/admin/capital_manage/sign_setup',
		method:'post',
		data
	})
}
/*
 * 签约设置保存
 *@param cardId 资金方编号
 * */
export function saveSignSetup({cardId,method}){
	let data = {
		cardId,
		method
	}
	return fetch({
		url:test+'/admin/capital_manage/save_sign_setup',
		method:'post',
		data
	})
}
/*
 * 其它设置-签约设置申请
 *@param cardId 资金方编号
 * */
export function applySignSetup(cardId){
	let data = {
		cardId
	}
	return fetch({
		url:test+'/admin/capital_manage/apply_sign_setup',
		method:'post',
		data
	})
}
/*
 * 资方类型下拉
 *@param cardId 资金方编号
 * */
export function capitalType(){
	return fetch({
		url:test+'/admin/capital_manage/capital_type',
		method:'post',
	})
}

/*
 * 申请数字证书
 *@param cardId 资金方编号
 * */
export function applyCertificate(cardId){
	let data = {
		cardId
	}
	return fetch({
		url:test+'/admin/captical_manage/apply_certificate',
		method:'post',
		data
	})
}
/*
 * 资方端登录账号-列表
 *@param cardId
 * */
export function capitalOperatorList(cardId){
	let data = {
		cardId
	}
	return fetch({
		url:test+'/admin/capital_manage/capital_operator_list',
		method:'post',
		data
	})
}
/*
 * 查询单个登录账户 (用于修改)
 *@param cardId
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
 *@param cardId
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
 *@param cardId
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
	scoreCardSave,
	scoreCardAdd,
	scoreCardDelete,
	scoreCardRuleSetList,
	rulesetType,
	scoreCardRuleSetAdd,
	basicInfo,
	saveBasicInfo,
	scoreCardRuleSetDelete,
	scoreCardRuleList,
	dataSourceLinkerList,
	scoreCardRuleAdd,
	scoreCardRuleDetail,
	scoreCardRuleSave,
	scoreCardRuleDelete,
	detail,
	contactList,
	contactDetail,
	saveContact,
	removeContact,
	loanFee,
	saveLoanfee,
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
