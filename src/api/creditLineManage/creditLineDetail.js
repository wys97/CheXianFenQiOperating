import fetch from '@/utils/fetch'
const test = '' // '/mockjsdata/1',''


/**
 * 通过商户id查询商户详情
 * @param supplierCapitalId 商户ID
 */
export function creditLineDetail (supplierCapitalId) {
  const data = {
    supplierCapitalId
  }
  return fetch({
    url: test + '/admin/credit_line_manage/credit_line_detail',
    method: 'post',
    data
  })
}
/**
 * 授信额度-详情-授信额度调整记录
 * @param supplierCapitalId 商户ID
 */
export function creditLineDetailRecordList (supplierCapitalId) {
  const data = {
    supplierCapitalId
  }
  return fetch({
    url: test + '/admin/credit_line_manage/credit_line_detail_recordList',
    method: 'post',
    data
  })
}
/**
 * 保存授信额度调整记录
 * @param supplierCapitalId 商户ID
 */
export function creditLineDetailSaveRecord ({supplierCapitalId,creditLine,creditEndDate,remark,status}) {
  const data = {
    supplierCapitalId,
    creditLine,
    creditEndDate,
    remark,
    status
  }
  return fetch({
    url: test + '/admin/credit_line_manage/credit_line_detail_saveRecord',
    method: 'post',
    data
  })
}

/**
 * 删除授信额度调整登记
 * @param supplierCapitalId 商户ID
 */
export function creditLineDetailDeleteRecord (id) {
  const data = {
    id
  }
  return fetch({
    url: test + '/admin/credit_line_manage/credit_line_detail_deleteRecord',
    method: 'post',
    data
  })
}
/**
 * 担保人新增
 * @param supplierCapitalId 商户ID
 */
export function saveGuarantor ({supplierCapitalId,name,idcardNo,gender,address,mobile,email,idcardPicFrontKey,idcardPicBackKey,educationBackground,maritalStatus,localResident}) {
	let data = {
		supplierCapitalId,
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
 * @param supplierCapitalId 商户ID
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
 * @param supplierCapitalId 商户ID
 */
export function updateGuarantor ({id,supplierCapitalId,name,idcardNo,gender,address,mobile,email,idcardPicFrontKey,idcardPicBackKey,educationBackground,maritalStatus,localResident,}) {
	let data = {
		id,
		supplierCapitalId,
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
 * @param supplierCapitalId 商户ID
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
 * @param supplierCapitalId 商户ID
 */
export function enterpriseInfoList () {
  return fetch({
    url: test + '/admin/guarantor/enterprise_info_list',
    method: 'post'
  })
}

/**
 * 下拉列表 - 所属企业名称模糊查询
 * @param supplierCapitalId 商户ID
 */
export function enterpriseName () {
  return fetch({
    url: test + '/admin/guarantor/enterprise_info_list',
    method: 'post'
  })
}
export default {
	creditLineDetail,
	creditLineDetailSaveRecord,
	creditLineDetailRecordList,
	creditLineDetailDeleteRecord,
	saveGuarantor,
	guarantorInfo,
	updateGuarantor,
	deleteGuarantor,
	enterpriseInfoList,
	enterpriseName
	
}