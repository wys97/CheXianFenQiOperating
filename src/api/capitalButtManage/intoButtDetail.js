import fetch from '@/utils/fetch'
const test = '' // '/mockjsdata/1',''



/**
 * 初审详情-头部信息
 * @param supplierId 商户ID
 */
export function checkHead (supplierId) {
  const data = {
    supplierId
  }
  return fetch({
    url: test + '/admin/data_abutment/head',
    method: 'post',
    data
  })
}

/**
 * 对接详情
 * @param supplierId 商户ID
 */
export function abutmentDetail (supplierId) {
  const data = {
    supplierId
  }
  return fetch({
    url: test + '/admin/data_abutment/detail',
    method: 'post',
    data
  })
}

/**
 * 对接拒贷
 * @param supplierId 商户ID
 */
export function abutmentReject({supplierId,remark}) {
  const data = {
    supplierId,
    remark
  }
  return fetch({
    url: test + '/admin/data_abutment/reject',
    method: 'post',
    data
  })
}

/**
 * 对接记录-资方下拉框
 * @param supplierId 商户ID
 */
export function abutmentCapitalSelect(supplierId) {
  const data = {
    supplierId
  }
  return fetch({
    url: test + '/admin/data_abutment/capital_select',
    method: 'post',
    data
  })
}

/**
 * 对接记录-提交
 * @param supplierId 商户ID
 */
export function abutmentSubmit({supplierId,capitalId}) {
  const data = {
    supplierId,
    capitalId
  }
  return fetch({
    url: test + '/admin/data_abutment/submit',
    method: 'post',
    data
  })
}
/**
 * 对接记录
 * @param supplierId 商户ID
 */
export function abutmentInfoList(supplierId) {
  const data = {
    supplierId
  }
  return fetch({
    url: test + '/admin/data_abutment/abutment_info_list',
    method: 'post',
    data
  })
}
/**
 * 实际控制人-查询
 * @param supplierId 商户ID
 */
export function queryController (supplierId) {
  const data = {
    supplierId
  }
  return fetch({
    url: test + '/admin/data_abutment/query_controller',
    method: 'post',
    data
  })
}
/**
 * 实际控制人-法人查询  
 * @param supplierId 商户ID
 */
export function repreInfo (supplierId) {
  const data = {
    supplierId
  }
  return fetch({
    url: test + '/admin/data_abutment/repre_info',
    method: 'post',
    data
  })
}

/**
 * 实际控制人-保存
 * @param supplierId 商户ID
 */
export function saveController ({supplierId,name,idcardNo,gender,address,mobile,email,idcardPicFrontKey,idcardPicBackKey,educationBackground,maritalStatus,localResident,representative}) {
  const data = {
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
    representative,
  }
  return fetch({
    url: test + '/admin/data_abutment/save_controller',
    method: 'post',
    data
  })
}
/**
 * 尽调检查-企业销售情况-查询
 * @param supplierId 商户ID
 */
export function verifyEnterpriseSale (supplierId) {
  const data = {
    supplierId
  }
  return fetch({
    url: test + '/admin/data_abutment/verify_enterprise_sale',
    method: 'post',
    data
  })
}
/**
 * 尽调检查-企业销售情况-修改
 * @param supplierId 商户ID
 */
export function saveVerifyEnterpriseSale ({supplierId,saleStatSelf,saleStatOther}) {
  const data = {
    supplierId,
    saleStatSelf,
    saleStatOther
  }
  return fetch({
    url: test + '/admin/data_abutment/save_verify_enterprise_sale',
    method: 'post',
    data
  })
}

/**
 * 发票银行流水-查询
 * @param supplierId 商户ID
 */
export function invoiceBankSale (supplierId) {
  const data = {
    supplierId
  }
  return fetch({
    url: test + '/admin/data_abutment/invoice_bank_sale',
    method: 'post',
    data
  })
}
/**
 * 发票银行流水-保存
 * @param supplierId 商户ID
 */
export function saveInvoiceBankSale ({supplierId,invoice,invoiceCheckType,bank,saleAnalysis,saleEstimatedAmount}) {
  const data = {
    supplierId,
    invoice,
    invoiceCheckType,
    bank,
    saleAnalysis,
    saleEstimatedAmount
  }
  return fetch({
    url: test + '/admin/data_abutment/save_invoice_bank_sale',
    method: 'post',
    data
  })
}
/**
 * 尽调检查-企业主营业务营运资金循环-查询
 * @param supplierId 商户ID
 */
export function verifyBusinessOperatCapital (supplierId) {
  const data = {
    supplierId
  }
  return fetch({
    url: test + '/admin/data_abutment/verify_business_operat_capital',
    method: 'post',
    data
  })
}
/**
 * 尽调检查-企业主营业务营运资金循环-修改
 * @param supplierId 商户ID
 */
export function verifyUpdateBusinessOperatCapital ({supplierId,businessTurnover,businessUpstream,businessDownstream,businessReceivableHard,businessReceivableInfo,turnoverReceivable,turnoverStock,turnoverPayable,turnoverPaid,turnoverReceived,turnoverActualCapital,profitRate}) {
  const data = {
    supplierId,
    businessTurnover,
    businessUpstream,
    businessDownstream,
    businessReceivableHard,
    businessReceivableInfo,
    turnoverReceivable,
    turnoverStock,
    turnoverPayable,
    turnoverPaid,
    turnoverReceived,
    turnoverActualCapital,
    profitRate
  }
  return fetch({
    url: test + '/admin/data_abutment/verify_update_business_operat_capital',
    method: 'post',
    data
  })
}

/**
 * 尽调检查-企业负债情况-查询
 * @param supplierId 商户ID
 */
export function enterpriseDebt (supplierId) {
  const data = {
    supplierId
  }
  return fetch({
    url: test + '/admin/data_abutment/enterprise_debt',
    method: 'post',
    data
  })
}
/**
 * 企业负债信息保存
 * @param supplierId 商户ID
 */
export function enterpriseDeptSave ({supplierId,finance,nonfinance,borrow,guarantee,interest}) {
  const data = {
    supplierId,
    finance,
    nonfinance,
    borrow,
    guarantee,
    interest
  }
  return fetch({
    url: test + '/admin/data_abutment/enterprise_dept_save',
    method: 'post',
    data
  })
}

/**
 * 尽调检查-企业负债情况-查询
 * @param supplierId 商户ID
 */
export function enterpriseFinance (supplierId) {
  const data = {
    supplierId
  }
  return fetch({
    url: test + '/admin/data_abutment/enterprise_finance',
    method: 'post',
    data
  })
}
/**
 * 尽调检查-企业财务统计保存
 * @param supplierId 商户ID
 */
export function enterpriseFinanceSave ({supplierId,equityAmount}) {
  const data = {
    supplierId,
    equityAmount
  }
  return fetch({
    url: test + '/admin/data_abutment/enterprise_finance_save',
    method: 'post',
    data
  })
}
/**
 * 信用情况-查询
 * @param supplierId 商户ID
 */
export function creditSituation (supplierId) {
  const data = {
    supplierId
  }
  return fetch({
    url: test + '/admin/check/credit_situation',
    method: 'post',
    data
  })
}
/**
 * 信用情况-保存
 * @param supplierId 商户ID
 */
export function saveCreditSituation ({supplierId,creditScore,creditQueryTimes,internetOpinion,litigationSeverity}) {
  const data = {
    supplierId,
    creditScore,
    creditQueryTimes,
    internetOpinion,
    litigationSeverity
  }
  return fetch({
    url: test + '/admin/check/save_credit_situation',
    method: 'post',
    data
  })
}
/**
 * 担保情况-查询
 * @param supplierId 商户ID
 */
export function guaranteeValue (supplierId) {
  const data = {
    supplierId
  }
  return fetch({
    url: test + '/admin/check/guarantee_value',
    method: 'post',
    data
  })
}
/**
 * 担保情况-保存
 * @param supplierId 商户ID
 */
export function saveGuaranteeValue ({supplierId,guaranteeValue}) {
  const data = {
    supplierId,
    guaranteeValue
  }
  return fetch({
    url: test + '/admin/check/save_guarantee_value',
    method: 'post',
    data
  })
}
/**
 * 其它信息-查询
 * @param supplierId 商户ID
 */
export function costOther (supplierId) {
  const data = {
    supplierId
  }
  return fetch({
    url: test + '/admin/check/cost_other',
    method: 'post',
    data
  })
}
/**
 * 其它信息-保存
 * @param supplierId 商户ID
 */
export function saveCostOther ({supplierId,costOther}) {
  const data = {
    supplierId,
    costOther
  }
  return fetch({
    url: test + '/admin/check/save_cost_other',
    method: 'post',
    data
  })
}
/**
 * 尽调检查-现场尽职调查-查询
 * @param supplierId 商户ID
 */
export function spotCheck (supplierId) {
  const data = {
    supplierId
  }
  return fetch({
    url: test + '/admin/data_abutment/spot_check',
    method: 'post',
    data
  })
}
/**
 * 尽调检查-现场尽职调查-修改
 * @param supplierId 商户ID
 */
export function spotCheckSave ({supplierId,spotCheck,spotCheckFiles}) {
  const data = {
    supplierId,
    spotCheck,
    spotCheckFiles
  }
  return fetch({
    url: test + '/admin/data_abutment/spot_check_save',
    method: 'post',
    data
  })
}

/**
 * 尽调检查-负面信息核查结果-查询
 * @param supplierId 商户ID
 */
export function verifyNegativeInfo (supplierId) {
  const data = {
    supplierId
  }
  return fetch({
    url: test + '/admin/data_abutment/verify_negative_info',
    method: 'post',
    data
  })
}
/**
 * 尽调检查-负面信息核查情况-修改
 * @param supplierId 商户ID
 */
export function verifyUpdateNegativeInfo ({supplierId,content}) {
  const data = {
    supplierId,
    content
  }
  return fetch({
    url: test + '/admin/data_abutment/verify_update_negative_info',
    method: 'post',
    data
  })
}

/**
 * 授信结论-查询
 * @param supplierId 商户ID
 */
export function signConclusion (supplierId) {
  const data = {
    supplierId
  }
  return fetch({
    url: test + '/admin/data_abutment/sign_conclusion',
    method: 'post',
    data
  })
}



/**
 * 授信结论-保存
 * @param supplierId 商户ID
 */
export function saveSignConclusion ({supplierId,creditLine,creditLineMonth,enterpriseStrength,checkSummary,postLoanManagement,conclusionRemark}) {
  const data = {
    supplierId,
    creditLine,
    creditLineMonth,
    enterpriseStrength,
    checkSummary,
    postLoanManagement,
    conclusionRemark,
  }
  return fetch({
    url: test + '/admin/data_abutment/save_sign_conclusion',
    method: 'post',
    data
  })
}
/**
 * 授信结论-结论状态-单选按钮数据
 * @param supplierId 商户ID
 */
export function signConclusionStatus (supplierId) {
  const data = {
    supplierId
  }
  return fetch({
    url: test + '/admin/data_abutment/sign_conclusion_status',
    method: 'post',
    data
  })
}
/**
 * 授信结论-企业实力和业绩-单选按钮数据
 * @param supplierId 商户ID
 */
export function signEnterpriseStrength (supplierId) {
  const data = {
    supplierId
  }
  return fetch({
    url: test + '/admin/data_abutment/sign_enterprise_strength',
    method: 'post',
    data
  })
}
/**
 * 评级打分卡-查询
 * @param supplierId 商户ID
 */
export function scorecardQuery(supplierId) {
  const data = {
    supplierId
  }
  return fetch({
    url: test + '/admin/data_abutment/scorecard/query',
    method: 'post',
    data
  })
}
/**
 * 评级打分卡-修改
 * @param supplierId 商户ID
 */
export function scorecardSave({supplierId,selectedMap}) {
  const data = {
    supplierId,
    selectedMap
  }
  return fetch({
    url: test + '/admin/data_abutment/scorecard/save',
    method: 'post',
    data
  })
}

/**
 * 初审详情-初审通过
 * @param supplierId 商户ID
 */
export function checkPass(supplierId) {
  const data = {
    supplierId
  }
  return fetch({
    url: test + '/admin/data_abutment/check_pass',
    method: 'post',
    data
  })
}
/**
 * 初审详情-初审拒绝
 * @param supplierId 商户ID
 */
export function checkReject({supplierId,remark}) {
  const data = {
    supplierId,
    remark
  }
  return fetch({
    url: test + '/admin/data_abutment/check_reject',
    method: 'post',
    data
  })
}
/**
 * 初审详情-初审打回
 * @param supplierId 商户ID
 */
export function checkReturned({supplierId,remark}) {
  const data = {
    supplierId,
    remark
  }
  return fetch({
    url: test + '/admin/data_abutment/check_returned',
    method: 'post',
    data
  })
}
/**
 * 授信期限下拉
 * @param supplierId 商户ID
 */
export function creditLineMonths() {
  return fetch({
    url: test + '/admin/data_abutment/credit_line_months',
    method: 'post',
  })
}
/**
 * 第三方平台下拉
 * @param supplierId 商户ID
 */
export function thirdPartyPlatformType() {
  return fetch({
    url: test + '/admin/check/thirdParty_platform_type',
    method: 'post',
  })
}
/**
 * 产品/服务 下拉
 * @param supplierId 商户ID
 */
export function upDownProductType() {
  return fetch({
    url: test + '/admin/check/upDown_product_type',
    method: 'post',
  })
}

/**
 * 银行流水验证下拉
 * @param supplierId 商户ID
 */
export function bankStatType() {
  return fetch({
    url: test + '/admin/check/bank_stat_type',
    method: 'post',
  })
}

/**
 * 贷款种类下拉
 * @param supplierId 商户ID
 */
export function loanType() {
  return fetch({
    url: test + '/admin/check/loan_type',
    method: 'post',
  })
}

export default {
	checkHead,
	abutmentDetail,
	abutmentReject,
	abutmentCapitalSelect,
	abutmentSubmit,
	abutmentInfoList,
	verifyUpdateNegativeInfo,
	verifyNegativeInfo,
	spotCheck,
	spotCheckSave,
	enterpriseFinance,
	enterpriseFinanceSave,
	creditSituation,
	saveCreditSituation,
	guaranteeValue,
	saveGuaranteeValue,  
	costOther,
	saveCostOther,
	enterpriseDebt,
	enterpriseDeptSave,
	saveVerifyEnterpriseSale,
	invoiceBankSale,
	saveInvoiceBankSale,
	verifyBusinessOperatCapital,
	verifyUpdateBusinessOperatCapital,
	queryController,
	repreInfo,
	saveController,
	verifyEnterpriseSale,
	signConclusion,
	saveSignConclusion,
	signConclusionStatus,
	signEnterpriseStrength,
	scorecardQuery,
	scorecardSave,
	creditLineMonths,
	thirdPartyPlatformType,
	upDownProductType,
	bankStatType,
	loanType,
	checkPass,
	checkReject,
	checkReturned
}