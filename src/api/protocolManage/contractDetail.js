import fetch from '@/utils/fetch'
const test = '' // '/mockjsdata/1',''


/**
 * 通过商户id查询商户详情
 * @param supplierId 商户ID
 */
export function enterpriseInfo (supplierId) {
  const data = {
    supplierId
  }
  return fetch({
    url: test + '/admin/guarantor/enterprise_info',
    method: 'post',
    data
  })
}

/**
 * 合同-查询-详情头部
 * @param supplierId 商户ID
 */
export function queryContractTop (id) {
  const data = {
    id
  }
  return fetch({
    url: test + '/admin/agreement/query_contract_top',
    method: 'post',
    data
  })
}

/**
 * 担保人新增
 * @param supplierId 商户ID
 */
export function saveGuarantor ({supplierId,name,idcardNo,gender,address,mobile,email,idcardPicFrontKey,idcardPicBackKey,educationBackground,maritalStatus,localResident}) {
	let data = {
		supplierId,
		name,
		idcardNo,
		gender,
		address,
		mobile,
		email,
		idcardPicFrontKey,
		idcardPicBackKey,
		educationBackground,
		maritalStatus,
		localResident,
	}
  return fetch({
    url: test + '/admin/guarantor/save_guarantor',
    method: 'post',
    data
  })
}
/**
 * 合同-查询详情
 * @param supplierId 商户ID
 */
export function queryContract (id) {
	let data = {
		id
	}
  return fetch({
    url: test + '/admin/agreement/query_contract',
    method: 'post',
    data
  })
}
/**
 * 合同-新增
 * @param supplierId 商户ID
 */
export function saveContract ({supplierId,capitalId,signStep,agreementType,agreementNo,agreementName,files,remark}) {
	let data = {
		supplierId,
		capitalId,
		signStep,
		agreementType,
		agreementNo,
		agreementName,
		files,
		remark,
	}
  return fetch({
    url: test + '/admin/agreement/save_contract',
    method: 'post',
    data
  })
}
/**
 * 合同-修改
 * @param supplierId 商户ID
 */
export function updateContract ({id,signStep,agreementType,agreementNo,agreementName,files,remark}) {
	let data = {
		id,
		signStep,
		agreementType,
		agreementNo,
		agreementName,
		files,
		remark,
	}
  return fetch({
    url: test + '/admin/agreement/update_contract',
    method: 'post',
    data
  })
}
/**
 * 合同-删除
 * @param supplierId 商户ID
 */
export function deleteContract (id) {
	let data = {
		id
	}
  return fetch({
    url: test + '/admin/agreement/delete_contract',
    method: 'post',
    data
  })
}
/**
 * 担保人详情-修改
 * @param supplierId 商户ID
 */
export function updateGuarantor ({id,supplierId,name,idcardNo,gender,address,mobile,email,idcardPicFrontKey,idcardPicBackKey,educationBackground,maritalStatus,localResident,}) {
	let data = {
		id,
		supplierId,
		name,
		idcardNo,
		gender,
		address,
		mobile,
		email,
		idcardPicFrontKey,
		idcardPicBackKey,
		educationBackground,
		maritalStatus,
		localResident,
		
	}
  return fetch({
    url: test + '/admin/guarantor/update_guarantor',
    method: 'post',
    data
  })
}
/**
 * 担保人详情-删除
 * @param supplierId 商户ID
 */
export function deleteGuarantor (id) {
	let data = {
		id
	}
  return fetch({
    url: test + '/admin/guarantor/delete_guarantor',
    method: 'post',
    data
  })
}


/**
 * 下拉列表 - 所属企业
 * @param supplierId 商户ID
 */
export function enterpriseInfoList () {
  return fetch({
    url: test + '/admin/guarantor/enterprise_info_list',
    method: 'post'
  })
}

/**
 * 下拉列表 - 所属企业名称模糊查询
 * @param supplierId 商户ID
 */
export function enterpriseName () {
  return fetch({
    url: test + '/admin/guarantor/enterprise_info_list',
    method: 'post'
  })
}
/**
 * 下拉列表 - 签署节点
 * @param supplierId 商户ID
 */
export function signStep () {
  return fetch({
    url: test + '/admin/agreement/sign_step',
    method: 'post'
  })
}
/**
 * 下拉列表 - 合同类型
 * @param supplierId 商户ID
 */
export function agreementType () {
  return fetch({
    url: test + '/admin/agreement/agreement_type',
    method: 'post'
  })
}
export default {
	enterpriseInfo,
	queryContractTop,
	saveGuarantor,
	queryContract,
	saveContract,
	updateContract,
	deleteContract,
	updateGuarantor,
	deleteGuarantor,
	enterpriseInfoList,
	enterpriseName,
	signStep,
	agreementType
	
}