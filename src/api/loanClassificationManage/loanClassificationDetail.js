import fetch from '@/utils/fetch'
const test = '' // '/mockjsdata/1',''


/**
 * 通过商户id查询商户详情
 * @param financeNo 商户ID
 */
export function loanClassificationDetail (financeNo) {
  const data = {
    financeNo
  }
  return fetch({
    url: test + '/admin/loan_classification/finance_basic_info',
    method: 'post',
    data
  })
}
/**
 * 确认核销
 * @param financeNo 商户ID
 */
export function confirmWrittenOff (financeNo) {
  const data = {
    financeNo
  }
  return fetch({
    url: test + '/admin/loan_classification/confirm_written_off',
    method: 'post',
    data
  })
}

/**
 * 授信额度-详情-授信额度调整记录
 * @param financeNo 商户ID
 */
export function loanClassificationDetailRecordList (financeNo) {
  const data = {
    financeNo
  }
  return fetch({
    url: test + '/admin/loan_classification/adjust_record',
    method: 'post',
    data
  })
}
/**
 * 保存授信额度调整记录
 * @param financeNo 商户ID
 */
export function loanClassificationDetailSaveRecord ({financeNo,loanClassificationAfter,adjustDate,clearAmount,remark}) {
  const data = {
    financeNo,
    loanClassificationAfter,
    adjustDate,
    clearAmount,
    remark
  }
  return fetch({
    url: test + '/admin/loan_classification/submit_adjust_record',
    method: 'post',
    data
  })
}

/**
 * 删除授信额度调整登记
 * @param financeNo 商户ID
 */
export function loanClassificationDetailDeleteRecord (id) {
  const data = {
    id
  }
  return fetch({
    url: test + '/admin/loan_classification/remove_adjust_record',
    method: 'post',
    data
  })
}
/**
 * 担保人新增
 * @param financeNo 商户ID
 */
export function saveGuarantor ({financeNo,name,idcardNo,gender,address,mobile,email,idcardPicFrontKey,idcardPicBackKey,educationBackground,maritalStatus,localResident}) {
	let data = {
		financeNo,
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
 * 担保人查询-详情
 * @param financeNo 商户ID
 */
export function guarantorInfo (guarantorId) {
	let data = {
		guarantorId
	}
  return fetch({
    url: test + '/admin/guarantor/guarantor_info',
    method: 'post',
    data
  })
}
/**
 * 担保人详情-修改
 * @param financeNo 商户ID
 */
export function updateGuarantor ({id,financeNo,name,idcardNo,gender,address,mobile,email,idcardPicFrontKey,idcardPicBackKey,educationBackground,maritalStatus,localResident,}) {
	let data = {
		id,
		financeNo,
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
 * @param financeNo 商户ID
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
 * @param financeNo 商户ID
 */
export function enterpriseInfoList () {
  return fetch({
    url: test + '/admin/guarantor/enterprise_info_list',
    method: 'post'
  })
}

/**
 * 下拉列表 - 所属企业名称模糊查询
 * @param financeNo 商户ID
 */
export function enterpriseName () {
  return fetch({
    url: test + '/admin/guarantor/enterprise_info_list',
    method: 'post'
  })
}
/**
 * 下拉列表 - 所属企业名称模糊查询
 * @param financeNo 商户ID
 */
export function loanClassificationType () {
  return fetch({
    url: test + '/admin/loan_classification/loan_classification_type',
    method: 'post'
  })
}

export default {
	loanClassificationDetail,
	confirmWrittenOff,
	loanClassificationDetailSaveRecord,
	loanClassificationDetailRecordList,
	loanClassificationDetailDeleteRecord,
	saveGuarantor,
	guarantorInfo,
	updateGuarantor,
	deleteGuarantor,
	enterpriseInfoList,
	enterpriseName,
	loanClassificationType
	
}