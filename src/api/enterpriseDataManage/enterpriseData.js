import fetch from '@/utils/fetch'
const test = '' // '/mockjsdata/1',''

// 商户详情

/**
 * 申请登记-详情-头部
 * @param supplierId 商户 id
 */
export function detailTop (supplierId) {
  const data = {
    supplierId
  }
  return fetch({
    url: test + '/admin/enterprise_data/detail_top',
    method: 'post',
    data
  })
}	
/**
 * 头部信息
 * @param supplierId 商户ID
 */
export function headData (supplierId) {
  const data = {
    supplierId
  }
  return fetch({
    url: test + '/admin/enterprise_data/detail_top',
    method: 'post',
    data
  })
}

/**
 * 融资概况
 * @param supplierId 商户ID
 */
export function financeGeneralSituation (supplierId) {
  const data = {
    supplierId
  }
  return fetch({
    url: test + '/admin/maintain/finance_general_situation',
    method: 'post',
    data
  })
}

/**
 * 资料明细-企业基本信息_客户类型查询
 * @param supplierId 商户 id
 */
export function customType (supplierId) {
  const data = {
    supplierId
  }
  return fetch({
    url: test + '/admin/supply_data/custom_type',
    method: 'post',
    data
  })
}
/**
 * 资料明细-企业基本信息_基本情况查询
 * @param supplierId 商户 id
 */
export function basicData (supplierId) {
  const data = {
    supplierId
  }
  return fetch({
    url: test + '/admin/enterprise_data/basic_data',
    method: 'post',
    data
  })
}

/**
 * 资料明细-企业基本信息_基本情况保存
 * @param supplierId 商户 id
 */
export function saveBasicData ({supplierId,registerAddress,establishDate,mobile,fax,licensePicKey,locationType,locationArea,locationAddress,staffNo,utilitiesMonth,profit,hasSub,remark}) {
  const data = {
    supplierId,
    registerAddress,
    establishDate,
    mobile,
    fax,
    licensePicKey,
    locationType,
    locationArea,
    locationAddress,
    staffNo,
    utilitiesMonth,
    profit,
    hasSub,
    remark
  }
  return fetch({
    url: test + '/admin/enterprise_data/save_basic_data',
    method: 'post',
    data
  })
}

/**
 * 资料明细-企业基本信息_开户许可证查询
 * @param supplierId 商户 id
 */
export function  accountLicense (supplierId) {
  const data = {
    supplierId
  }
  return fetch({
    url: test + '/admin/enterprise_data/account_license',
    method: 'post',
    data
  })
}

/**
 * 资料明细-企业基本信息_开户许可证保存
 * @param supplierId 商户 id
 */
export function saveAccountLicense ({supplierId,accountName,bankName,branchBankName,accountNo,picKey}) {
  const data = {
    supplierId,
    accountName,
    bankName,
    branchBankName,
    accountNo,
    picKey
  }
  return fetch({
    url: test + '/admin/enterprise_data/save_account_license',
    method: 'post',
    data
  })
}
/**
 * 尽调信息-股东名单列表查询
 * @param supplierId 商户 id
 */
export function  shareHolding (supplierId) {
  const data = {
    supplierId
  }
  return fetch({
    url: test + '/admin/enterprise_data/share_holding',
    method: 'post',
    data
  })
}

/**
 * 尽调信息-股东名单保存
 * @param supplierId 商户 id
 */
export function saveShareHolding ({supplierId,info}) {
  const data = {
    supplierId,
    info
  }
  return fetch({
    url: test + '/admin/enterprise_data/save_share_holding',
    method: 'post',
    data
  })
}

/**
 * 尽调信息-股东变更信息列表查询
 * @param supplierId 商户 id
 */
export function enterpriseChange (supplierId) {
  const data = {
    supplierId
  }
  return fetch({
    url: test + '/admin/enterprise_data/enterprise_change',
    method: 'post',
    data
  })
}

/**
 * 尽调信息-股东变更信息保存
 * @param supplierId 商户 id
 */
export function saveEnterpriseChange({supplierId,info}) {
  const data = {
    supplierId,
    info
  }
  return fetch({
    url: test + '/admin/enterprise_data/save_enterprise_change',
    method: 'post',
    data
  })
}

/**
 * 资料明细-企业基本信息_扩展信息(发展, 背景, 往来)查询
 * @param supplierId 商户 id
 */
export function  extendInfo (supplierId) {
  const data = {
    supplierId
  }
  return fetch({
    url: test + '/admin/enterprise_data/extend_info',
    method: 'post',
    data
  })
}

/**
 * 资料明细-企业基本信息_扩展信息保存
 * @param supplierId 商户 id
 */
export function saveExtendInfo ({supplierId,history,background,comeAndGo}) {
  const data = {
    supplierId,
    history,
    background,
    comeAndGo
  }
  return fetch({
    url: test + '/admin/enterprise_data/save_extend_info',
    method: 'post',
    data
  })
}

/**
 * 资料明细-公司管理情况-公司管理情况查询
 * @param supplierId 商户 id
 */
export function  companyManage (supplierId) {
  const data = {
    supplierId
  }
  return fetch({
    url: test + '/admin/enterprise_data/company_manage',
    method: 'post',
    data
  })
}

/**
 * 资料明细-公司管理情况-公司管理情况修改
 * @param supplierId 商户 id
 */
export function updateCompanyManage ({supplierId,businessModel,organizationStructure,managementTechnique}) {
  const data = {
    supplierId,
    businessModel,
    organizationStructure,
    managementTechnique
  }
  return fetch({
    url: test + '/admin/enterprise_data/update_company_manage',
    method: 'post',
    data
  })
}
/**
 * 资料明细-主营业务及市场查询
 * @param supplierId 商户 id
 */
export function  marketInfo (supplierId) {
  const data = {
    supplierId
  }
  return fetch({
    url: test + '/admin/enterprise_data/market_info',
    method: 'post',
    data
  })
}

/**
 * 资料明细-主营业务及市场保存
 * @param supplierId 商户 id
 */
export function saveMarketInfo ({supplierId,position,trend,cycle}) {
  const data = {
    supplierId,
    position,
    trend,
    cycle
  }
  return fetch({
    url: test + '/admin/enterprise_data/save_market_info',
    method: 'post',
    data
  })
}

/**
 * 资料明细-上下游数据-进入上下游页面---查询
 * @param supplierId 商户 id
 */
export function intoUpdownstream (supplierId) {
  const data = {
    supplierId
  }
  return fetch({
    url: test + '/admin/enterprise_data/into_updownstream',
    method: 'post',
    data
  })
}
/**
 * 资料明细-上下游数据-上下游数据查询按钮---失去焦点
 * @param supplierId 商户 id
 */
export function queryTitanUpdownstream (merchantCode) {
  const data = {
    merchantCode
  }
  return fetch({
    url: test + '/admin/enterprise_data/query_titan_updownstream',
    method: 'post',
    data
  })
}

/**
 * 资料明细-上下游数据-上下游数据保存
 * @param supplierId 商户 id
 */
export function saveUpdownstreamData ({supplierId,merchantCode}) {
  const data = {
  	supplierId,
    merchantCode
  }
  return fetch({
    url: test + '/admin/enterprise_data/save_updownstream_data',
    method: 'post',
    data
  })
}

/**
 * 资料明细-借款信息-借款信息查询
 * @param supplierId 商户 id
 */
export function borrowInfo (supplierId) {
  const data = {
    supplierId
  }
  return fetch({
    url: test + '/admin/enterprise_data/borrow_info',
    method: 'post',
    data
  })
}
/**
 * 资料明细-关联公司状态-关联公司状态查询
 * @param supplierId 商户 id
 */
export function  affiliatedCompany (supplierId) {
  const data = {
    supplierId
  }
  return fetch({
    url: test + '/admin/enterprise_data/affiliated_company',
    method: 'post',
    data
  })
}

/**
 * 资料明细-关联公司状态-关联公司状态修改
 * @param supplierId 商户 id
 */
export function updateAffiliatedCompany({supplierId,companyData}) {
  const data = {
    supplierId,
    companyData
  }
  return fetch({
    url: test + '/admin/enterprise_data/update_affiliated_company',
    method: 'post',
    data
  })
}
/**
 * 尽调信息-成员名单列表查询
 * @param supplierId 商户 id
 */
export function queryManager (supplierId) {
  const data = {
    supplierId
  }
  return fetch({
    url: test + '/admin/maintain/query_manager',
    method: 'post',
    data
  })
}

/**
 * 尽调信息-成员名单根据成员身份查询出法人基本信息
 * @param supplierId 商户 id
 */
export function queryRepreManager ({supplierId,type}) {
  const data = {
    supplierId,
    type
  }
  return fetch({
    url: test + '/admin/maintain/query_repre_manager',
    method: 'post',
    data
  })
}

/**
 * 尽调信息-成员名单保存
 * @param supplierId 商户 id
 */
export function saveManager ({supplierId,info}) {
  const data = {
    supplierId,
    info
  }
  return fetch({
    url: test + '/admin/maintain/save_manager',
    method: 'post',
    data
  })
}

/**
 * 尽调信息-征信记录列表查询
 * @param supplierId 商户 id
 */
export function queryCredit (supplierId) {
  const data = {
    supplierId
  }
  return fetch({
    url: test + '/admin/maintain/query_credit',
    method: 'post',
    data
  })
}

/**
 * 尽调信息-征信记录保存
 * @param supplierId 商户 id
 */
export function saveCredit ({supplierId,info}) {
  const data = {
    supplierId,
    info
  }
  return fetch({
    url: test + '/admin/maintain/save_credit',
    method: 'post',
    data
  })
}

/**
 * 尽调信息-企业附件列表查询
 * @param supplierId 商户 id
 */
export function queryPaper (supplierId) {
  const data = {
    supplierId
  }
  return fetch({
    url: test + '/admin/maintain/query_paper',
    method: 'post',
    data
  })
}

/**
 * 尽调信息-企业附件列表保存
 * @param supplierId 商户 id
 */
export function savePaper ({supplierId,info}) {
  const data = {
    supplierId,
    info
  }
  return fetch({
    url: test + '/admin/maintain/save_paper',
    method: 'post',
    data
  })
}

/**
 * 资料明细-法人信息-法人信息查询
 * @param supplierId 商户 id
 */
export function queryEnterpriseGuarantor (supplierId) {
  const data = {
    supplierId
  }
  return fetch({
    url: test + '/admin/enterprise_data/repre_info',
    method: 'post',
    data
  })
}

/**
 * 资料明细-法人信息-法人信息修改
 * @param supplierId 商户 id
 */
export function saveEnterpriseGuarantor ({supplierId,address,email,educationBackground,maritalStatus,localResident}) {
  const data = {
    supplierId,
    address,
    email,
    educationBackground,
    maritalStatus,
    localResident,
  }
  return fetch({
    url: test + '/admin/enterprise_data/update_repre',
    method: 'post',
    data
  })
}

/**
 * 资料明细-财产信息-财产信息查询
 * @param supplierId 商户 id
 */
export function assetInfo (supplierId) {
  const data = {
    supplierId
  }
  return fetch({
    url: test + '/admin/enterprise_data/asset_info',
    method: 'post',
    data
  })
}

/**
 * 资料明细-财产信息-财产信息修改
 * @param supplierId 商户 id
 */
export function updateAsset ({supplierId,assetData}) {
  const data = {
    supplierId,
    assetData
  }
  return fetch({
    url: test + '/admin/enterprise_data/update_asset',
    method: 'post',
    data
  })
}

/**
 * 担保人列表-选择
 * @param supplierId 商户 id
 */
export function selectGuarantorList (supplierId) {
  const data = {
    supplierId
  }
  return fetch({
    url: test + '/admin/maintain/select_guarantor_list',
    method: 'post',
    data
  })
}

/**
 * 担保人的测试Key-获取选择
 * @param guarantorId 担保人 id
 */
export function createTestKey (guarantorId) {
  const data = {
    guarantorId
  }
  return fetch({
    url: test + '/admin/maintain/create_test_key',
    method: 'post',
    data
  })
}

/**
 * 担保人-删除
 * @param supplierId 商户 id
 */
export function deleteEnterpriseGuarantor (guarantorId) {
  const data = {
    guarantorId
  }
  return fetch({
    url: test + '/admin/maintain/delete_enterprise_guarantor',
    method: 'post',
    data
  })
}
/**
 * 尽调信息-下游平台信息列表-查询
 * @param supplierId 商户 id
 */
export function queryDistributor (supplierId) {
  const data = {
    supplierId
  }
  return fetch({
    url: test + '/admin/maintain/query_distributor',
    method: 'post',
    data
  })
}

/**
 * 尽调信息-下游平台信息-删除
 * @param supplierId 商户 id
 */
export function deleteDistributor ({supplierId,centreId}) {
  const data = {
    supplierId,
    centreId
  }
  return fetch({
    url: test + '/admin/maintain/delete_distributor',
    method: 'post',
    data
  })
}

/**
 * 尽调信息-下游平台信息-保存
 * @param supplierId 商户 id
 */
export function operateDistributor ({centreId,name,username,password,companyName,businessLicense,contractName,contractNum,validDate,bankCode,bankBranch,bankAccountNum,files,supplierId}) {
  const data = {
    centreId,
    name,
    username,
    password,
    companyName,
    businessLicense,
    contractName,
    contractNum,
    validDate,
    bankCode,
    bankBranch,
    bankAccountNum,
    files,
    supplierId
  }
  return fetch({
    url: test + '/admin/maintain/operate_distributor',
    method: 'post',
    data
  })
}


/**
 * 查询授信签署
 * @param supplierId 商户 id
 */
export function querySign (supplierId) {
  const data = {
    supplierId
  }
  return fetch({
    url: test + '/admin/maintain/query_sign',
    method: 'post',
    data
  })
}


/**
 * 授信签署-计算月利率和年利率
 * @param supplierId 商户 id
 */
export function calculatedInterest (loanRate) {
  const data = {
    loanRate
  }
  return fetch({
    url: test + '/admin/maintain/calculated_interest',
    method: 'post',
    data
  })
}

/**
 * 修改授信签署
 * @param supplierId 商户 id
 * @param capitalId 资金方 id
 * @param totalCreditLine 总授信额度
 * @param creditLineExpireTime 授信额度届满日
 * @param creditAndIterestRate 授信与利息
 */
export function updateSign ({supplierId, capitalId, totalCreditLine, creditLineExpireTime,interestRate,overdueRate,chargeRate,marginRate, creditAndIterestRate}) {
  const data = {
    supplierId,
    capitalId,
    totalCreditLine,
    creditLineExpireTime,
    interestRate,
    overdueRate,
    chargeRate,
    marginRate,
    creditAndIterestRate,
  }
  return fetch({
    url: test + '/admin/maintain/update_sign',
    method: 'post',
    data
  })
}

/**
 * 详情-合同管理-列表
 * @param supplierId 商户 id
 */
export function contractList (supplierId) {
  const data = {
    supplierId
  }
  return fetch({
    url: test + '/admin/maintain/contract_list',
    method: 'post',
    data
  })
}
/**
 * 影像列表-查询
 * @param supplierId 商户 id
 */
export function fileList (supplierId) {
  const data = {
    supplierId
  }
  return fetch({
    url: test + '/admin/enterprise_data/file_list',
    method: 'post',
    data
  })
}
/**
 * 影像列表-上传影像
 * @param supplierId 商户 id
 */
export function uploadFile (data) {
  return fetch({
    url: test + '/admin/enterprise_data/upload_file',
    method: 'post',
    isFormData: true,
    headers: {'Content-Type': 'multipart/form-data; boundary=' + data._boundary},
    data
  })
}
/**
 * 影像列表-删除影像
 * @param supplierId 商户 id
 */
export function deleteFile (id) {
  const data = {
  	id
  }
  return fetch({
    url: test + '/admin/enterprise_data/delete_file',
    method: 'post',
    data
  })
}
/**
 * 资料明细-提交初审
 * @param supplierId 商户 id
 */
export function supplySubmitCheck (supplierId) {
	let data = {
		supplierId
	}
  return fetch({
    url: test + '/admin/enterprise_data/submit_check',
    method: 'post',
    data
  })
}
/**
 * 资料明细-拒绝
 * @param supplierId 商户 id
 */
export function reject ({supplierId,remark}) {
	let data = {
		supplierId,
		remark
	}
  return fetch({
    url: test + '/admin/enterprise_data/reject',
    method: 'post',
    data
  })
}
/**
 * 下拉列表-分销商下拉信息查询
 * @param supplierId 商户 id
 */
export function agentInfo (supplierId) {
  const data = {
    supplierId
  }
  return fetch({
    url: test + '/admin/combobox/agent_info',
    method: 'post',
    data
  })
}
/**
 * 业务受理-资料明细-企业基本信息_经营地下拉
 * @param supplierId 商户 id
 */
export function locationType () {
  return fetch({
    url: test + '/admin/combobox/location_type',
    method: 'post',
  })
}
/**
 * 下拉列表-企业成员类型
 * @param supplierId 商户 id
 */
export function memberType (supplierId) {
  const data = {
    supplierId
  }
  return fetch({
    url: test + '/admin/combobox/member_type',
    method: 'post',
    data
  })
}

/**
 * 下拉列表-资产子类型
 * @param supplierId 商户 id
 */
export function assetSubType (supplierId) {
  const data = {
    supplierId
  }
  return fetch({
    url: test + '/admin/combobox/asset_sub_type',
    method: 'post',
    data
  })
}

/**
 * 资产子类型-房
 * @param supplierId 商户 id
 */
export function assetSubHouseType () {
  return fetch({
    url: test + '/admin/combobox/asset_sub_house_type',
    method: 'post'
  })
}

/**
 * 资产子类型-车
 * @param supplierId 商户 id
 */
export function assetSubCarType () {
  return fetch({
    url: test + '/admin/combobox/asset_sub_car_type',
    method: 'post'
  })
}
/**
 * 下拉列表-与借款企业关系
 * @param supplierId 商户 id
 */
export function affiliateType (supplierId) {
  const data = {
    supplierId
  }
  return fetch({
    url: test + '/admin/combobox/affiliate_type',
    method: 'post',
    data
  })
}
/**
 * 下拉列表-严重程度
 * @param supplierId 商户 id
 */
export function levelInfo (supplierId) {
  const data = {
    supplierId
  }
  return fetch({
    url: test + '/admin/combobox/level_info',
    method: 'post',
    data
  })
}

/**
 * 下拉列表-分销商下拉信息查询
 * @param supplierId 商户 id
 */
export function bankList (supplierId) {
  const data = {
    supplierId
  }
  return fetch({
    url: test + '/admin/combobox/bank_list',
    method: 'post',
    data
  })
}

/**
 * 下拉列表-证件类型
 * @param supplierId 商户 id
 */
export function certificateType (supplierId) {
  const data = {
    supplierId
  }
  return fetch({
    url: test + '/admin/combobox/certificate_type',
    method: 'post',
    data
  })
}

/**
 * 下拉列表-征信记录所属下拉
 * @param supplierId 商户 id
 */
export function creditBelong ({supplierId,type}) {
  const data = {
    supplierId,
    type
  }
  return fetch({
    url: test + '/admin/combobox/credit_belong',
    method: 'post',
    data
  })
}

/**
 * 下拉列表-身份证件类型
 * @param supplierId 商户 id
 */
export function identityType ({supplierId,type}) {
  const data = {
    supplierId,
    type
  }
  return fetch({
    url: test + '/admin/combobox/identity_type',
    method: 'post',
    data
  })
}
/**
 * 资料明细_企业基本信息_股东名单_类型下拉
 * @param supplierId 商户 id
 */
export function capitalType () {
  return fetch({
    url: test + '/admin/enterprise_data/capital_type',
    method: 'post'
  })
}
/**
 * 资料明细_企业基本信息_股东变更_变更事项下拉
 * @param supplierId 商户 id
 */
export function changeType () {
  return fetch({
    url: test + '/admin/enterprise_data/change_type',
    method: 'post'
  })
}


// 经营数据分析

export function verifyEnterpriseSale (supplierId) {
  let data = {
    supplierId,
    name:'',
    startDate:'',
    endDate:''
  }
  return fetch({
    url: test + '/admin/supplier_info/othersStream',
    method: 'post',
    data
  })
}



// 经营数据分析-检查发票服务签约状态
export function checkInvoiceSignStatus(supplierId){
  return fetch({
    url: test + '/admin/supply_data/check_invoice_sign_status',
    method: 'post',
    data:{
      supplierId
    }
  })
}
// 经营数据分析-近一年前五大客户
export function relatedClients(data){
    
  return fetch({
    url: test + '/admin/supply_data/related_clients',
    method: 'post',
    data
  })
}
// 经营数据分析-近一年前五大供应商
export function relatedSuppliers(data){
    
  return fetch({
    url: test + '/admin/supply_data/related_suppliers',
    method: 'post',
    data
  })
}
// 经营数据分析-进项发票数据统计
export function inputVatData(data){
    
  return fetch({
    url: test + '/admin/supply_data/input_vat_data',
    method: 'post',
    data
  })
}
// 经营数据分析-销项发票数据统计
export function outputVatData(data){
    
  return fetch({
    url: test + '/admin/supply_data/output_vat_data',
    method: 'post',
    data
  })
}
// 经营数据分析-营销指标
export function salesMetrics(data){
    
  return fetch({
    url: test + '/admin/supply_data/sales_metrics',
    method: 'post',
    data
  })
}

/**
 * 资料明细-经营数据分析-主要供应商情况列表
 * @param supplierId 商户 id
 */
export function upDownSupplierList (supplierId) {
  const data = {
   supplierId:supplierId
  }
return fetch({
 method: 'POST',
 url: test + '/admin/supplier_info/upDown_supplier_list',
 data
})
}


/** 
 * 资料明细-银行流水查询
 * @param supplierId 商户id
 */
export function bankStatement (data) {
  return fetch({
    url: test + '/admin/apply_register/bank_water_inspect_by_time',
    method: 'post',
    data
  })
}








export default {
	detailTop,
	headData,
	financeGeneralSituation,
	customType,
	basicData,
	saveBasicData,
	accountLicense,
	saveAccountLicense,
	shareHolding,
	saveShareHolding,
	enterpriseChange,
  	saveEnterpriseChange,
  	extendInfo,
  	saveExtendInfo,
  	companyManage,
  	updateCompanyManage,
  	marketInfo,
  	saveMarketInfo,
  	intoUpdownstream,
  	queryTitanUpdownstream,
  	saveUpdownstreamData,
  	borrowInfo,
  	affiliatedCompany,
  	updateAffiliatedCompany,
  	queryManager,
  	queryRepreManager,
  	saveManager,
  	queryCredit,
  	saveCredit,
  	queryPaper,
  	savePaper,
  	queryEnterpriseGuarantor,
  	assetInfo,
  	updateAsset,
  	selectGuarantorList,
  	createTestKey,
  	deleteEnterpriseGuarantor,
  	saveEnterpriseGuarantor,
  	queryDistributor,
  	deleteDistributor,
  	operateDistributor,
  	querySign,
  	calculatedInterest,
  	updateSign,
  	contractList,
  	fileList,
  	uploadFile,
  	deleteFile,
  	supplySubmitCheck,
  	reject,
  	agentInfo,
  	locationType,
  	memberType,
  	assetSubType,
  	assetSubHouseType,
  	assetSubCarType,
  	affiliateType,
  	levelInfo,
  	bankList,
  	certificateType,
  	creditBelong,
  	identityType,
  	capitalType,
    changeType,
    verifyEnterpriseSale,
    checkInvoiceSignStatus,
    relatedClients,
    relatedSuppliers,
    inputVatData,
    outputVatData,
    salesMetrics,
    upDownSupplierList,
    bankStatement
}