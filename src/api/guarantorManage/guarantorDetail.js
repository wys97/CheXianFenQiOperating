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
 * 担保人查询-详情
 * @param supplierId 商户ID
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
export default {
	enterpriseInfo,
	saveGuarantor,
	guarantorInfo,
	updateGuarantor,
	deleteGuarantor,
	enterpriseInfoList,
	enterpriseName
	
}