import fetch from '@/utils/fetch'
const test = '' // '/mockjsdata/1',''

//中旅银行-授信报告

/**
 * 头部信息
 * @param supplierCapitalId 商户ID
 */
export function checkHead (supplierCapitalId) {
  const data = {
    supplierCapitalId
  }
  return fetch({
    url: test + '/admin/creditline_report_zl/head',
    method: 'post',
    data
  })
}

/**
 * 企业基础信息
 * @param supplierCapitalId 商户ID
 */
export function getCompBasicInfo (supplierCapitalId) {
  const data = {
    supplierCapitalId
  }
  return fetch({
    url: test + '/admin/creditline_report_zl/basic_info',
    method: 'post',
    data
  })
}

/**
 * 调查地点-多选框
 */
export function checkboxLoad () {
  return fetch({
    url: test + '/admin/creditline_report_zl/credit_property_role',
    method: 'post'
  })
}

/**
 * 借款企业及实际控制人信用记录情况-单选按钮数据
 */
export function queryCreditHistory () {
  return fetch({
    url: test + '/admin/creditline_report_zl/proposer_credit_history',
    method: 'post'
  })
}

/**
 * 授信性质及调查过程-查询
 * @param supplierCapitalId 商户ID
 */
export function queryController (supplierCapitalId) {
  const data = {
    supplierCapitalId
  }
  return fetch({
    url: test + '/admin/creditline_report_zl/credit_property',
    method: 'post',
    data
  })
}

/**
 * 授信性质及调查过程-保存
 * @param supplierCapitalId 商户ID
 */
export function saveController ({supplierCapitalId,creditPropertyTime,creditPropertyPlace,creditPropertyRole}) {
  const data = {
    supplierCapitalId,
    creditPropertyTime,
    creditPropertyPlace,
    creditPropertyRole
  }
  return fetch({
    url: test + '/admin/creditline_report_zl/credit_property_save',
    method: 'post',
    data
  })
}

/**
 * 申请人基本信息-查询
 * @param supplierCapitalId 商户ID
 */
export function queryApplier(supplierCapitalId) {
  const data = {
    supplierCapitalId
  }
  return fetch({
    url: test + '/admin/creditline_report_zl/proposer_basic',
    method: 'post',
    data
  })
}

/**
 * 申请人基本信息-修改
 * @param supplierCapitalId 商户ID
 */
export function editApplier({supplierCapitalId,proposerEnterpriseName,proposerTrade,proposerGrade,proposerRegisterAddress,proposerWorkAddress,proposerRepreName,proposerControllerName,proposerBank,proposerBusinessScope}) {
  const data = {
    supplierCapitalId,
    proposerEnterpriseName,
    proposerTrade,
    proposerGrade,
    proposerRegisterAddress,
    proposerWorkAddress,
    proposerRepreName,
    proposerControllerName,
    proposerBank,
    proposerBusinessScope
  }
  return fetch({
    url: test + '/admin/creditline_report_zl/proposer_basic_save',
    method: 'post',
    data
  })
}

/**
 * 实收资本及股权结构-查询
 * @param supplierCapitalId 商户ID
 */
export function queryApplierCount (supplierCapitalId) {
  const data = {
    supplierCapitalId
  }
  return fetch({
    url: test + '/admin/creditline_report_zl/proposer_shareholding',
    method: 'post',
    data
  })
}

/**
 * 实收资本及股权结构-修改
 * @param supplierCapitalId 商户ID
 */
export function editApplierCount({supplierCapitalId,proposerRegisterCapital,proposerActualCapital,shareHolding}) {
  const data = {
    supplierCapitalId,
    proposerRegisterCapital,
    proposerActualCapital,
    shareHolding
  }
  return fetch({
    url: test + '/admin/creditline_report_zl/proposer_shareholding_save',
    method: 'post',
    data
  })
}

/**
 * 关联投资企业-查询
 * @param supplierCapitalId 商户ID
 */
export function queryCompany (supplierCapitalId) {
  const data = {
    supplierCapitalId
  }
  return fetch({
    url: test + '/admin/creditline_report_zl/proposer_relateenterprise',
    method: 'post',
    data
  })
}

/**
 * 关联投资企业-修改
 * @param supplierCapitalId 商户ID
 */
export function editCompany({supplierCapitalId,relateEnterprise}) {
  const data = {
    supplierCapitalId,
    relateEnterprise
  }
  return fetch({
    url: test + '/admin/creditline_report_zl/proposer_relateenterprise_save',
    method: 'post',
    data
  })
}

/**
 * 借款人资信状况分析+企业发展历程+公司管理结构及组织框架-查询
 * @param supplierCapitalId 商户ID
 */
export function queryMuchInfo (supplierCapitalId) {
  const data = {
    supplierCapitalId
  }
  return fetch({
    url: test + '/admin/creditline_report_zl/proposer_muchinfo',
    method: 'post',
    data
  })
}

/**
 * 借款人资信状况分析+企业发展历程+公司管理结构及组织框架-修改
 * @param supplierCapitalId 商户ID
 */
export function editMuchInfo({supplierCapitalId, proposerOperatorQuality, proposerCreditHistory, proposerEnterpriseBadReason,proposerControllerBadReason, proposerDevelopHistory, proposerManageStructure}) {
  const data = {
    supplierCapitalId,
    proposerOperatorQuality,
    proposerCreditHistory,
    proposerEnterpriseBadReason,
    proposerControllerBadReason,
    proposerDevelopHistory,
    proposerManageStructure
  }
  return fetch({
    url: test + '/admin/creditline_report_zl/proposer_muchinfo_save',
    method: 'post',
    data
  })
}

/**
 * 借款企业和实际控制人主要资产和投资-查询
 * @param supplierCapitalId 商户ID
 */
export function queryAsset(supplierCapitalId) {
  const data = {
    supplierCapitalId
  }
  return fetch({
    url: test + '/admin/creditline_report_zl/propose_asset',
    method: 'post',
    data
  })
}

/**
 * 借款企业和实际控制人主要资产和投资-修改
 * @param supplierCapitalId 商户ID
 */
export function editAsset({supplierCapitalId,asset}) {
  const data = {
    supplierCapitalId,
    asset
  }
  return fetch({
    url: test + '/admin/creditline_report_zl/proposer_asset_save',
    method: 'post',
    data
  })
}

/**
 * 授信品种-查询
 * @param supplierCapitalId 商户ID
 */
export function queryCreditVariety (supplierCapitalId) {
  const data = {
    supplierCapitalId
  }
  return fetch({
    url: test + '/admin/creditline_report_zl/apply_credit_variety',
    method: 'post',
    data
  })
}

/**
 * 授信品种-修改
 * @param supplierCapitalId 商户ID
 */
export function editCredit({supplierCapitalId, applyCreditVariety}) {
  const data = {
    supplierCapitalId,
    applyCreditVariety
  }
  return fetch({
    url: test + '/admin/creditline_report_zl/apply_credit_variety_save',
    method: 'post',
    data
  })
}

/**
 * 企业及关联企业目前在我行授信情况-查询
 * @param supplierCapitalId 商户ID
 */
export function queryCreditInfo (supplierCapitalId) {
  const data = {
    supplierCapitalId
  }
  return fetch({
    url: test + '/admin/creditline_report_zl/apply_credit_now',
    method: 'post',
    data
  })
}

/**
 * 企业及关联企业目前在我行授信情况-修改
 * @param supplierCapitalId 商户ID
 */
export function editCreditInfo({supplierCapitalId, applyCreditNow}) {
  const data = {
    supplierCapitalId,
    applyCreditNow
  }
  return fetch({
    url: test + '/admin/creditline_report_zl/apply_credit_now_save',
    method: 'post',
    data
  })
}

/**
 * 同行授信-查询
 * @param supplierCapitalId 商户ID
 */
export function querySameTrade(supplierCapitalId) {
  const data = {
    supplierCapitalId
  }
  return fetch({
    url: test + '/admin/creditline_report_zl/sametrade_info',
    method: 'post',
    data
  })
}

/**
 * 同行授信-修改
 * @param supplierCapitalId 商户ID
 */
export function saveSameTrade({supplierCapitalId, sametradeInfo}) {
  const data = {
    supplierCapitalId,
    sametradeInfo
  }
  return fetch({
    url: test + '/admin/creditline_report_zl/sametrade_info_save',
    method: 'post',
    data
  })
}

/**
 * 企业对外担保情况-查询
 * @param supplierCapitalId 商户ID
 */
export function queryGuarantee(supplierCapitalId) {
  const data = {
    supplierCapitalId
  }
  return fetch({
    url: test + '/admin/creditline_report_zl/sametrade_guarantee',
    method: 'post',
    data
  })
}

/**
 * 企业对外担保情况-修改
 * @param supplierCapitalId 商户ID
 */
export function saveGuarantee({supplierCapitalId, sametradeGuaranteeStatus, sametradeGuarantee, sametradeGuaranteeExplain}) {
  const data = {
    supplierCapitalId,
    sametradeGuaranteeStatus,
    sametradeGuarantee,
    sametradeGuaranteeExplain
  }
  return fetch({
    url: test + '/admin/creditline_report_zl/sametrade_guarantee_save',
    method: 'post',
    data
  })
}

/**
 * 调查地点-多选框
 */
export function financeCheckList () {
  return fetch({
    url: test + '/admin/creditline_report_zl/sametrade_society_finance',
    method: 'post'
  })
}

/**
 * 综合评价-查询
 * @param supplierCapitalId 商户ID
 */
export function queryOverallMerit(supplierCapitalId) {
  const data = {
    supplierCapitalId
  }
  return fetch({
    url: test + '/admin/creditline_report_zl/sametrade_overall_merit',
    method: 'post',
    data
  })
}

/**
 * 综合评价-修改
 * @param supplierCapitalId 商户ID
 */
export function saveOverallMerit({supplierCapitalId, sametradeSocietyFinance, sametradeOverallMerit, sametradeSocietyFinanceRemark, sametradeResearchConclusions}) {
  const data = {
    supplierCapitalId,
    sametradeSocietyFinance,
    sametradeOverallMerit,
    sametradeSocietyFinanceRemark,
    sametradeResearchConclusions
  }
  return fetch({
    url: test + '/admin/creditline_report_zl/sametrade_overall_merit_save',
    method: 'post',
    data
  })
}

/**
 * 借款用途及还款来源-查询
 * @param supplierCapitalId 商户ID
 */
export function queryBorrowInfo(supplierCapitalId) {
  const data = {
    supplierCapitalId
  }
  return fetch({
    url: test + '/admin/creditline_report_zl/borrow_info',
    method: 'post',
    data
  })
}

/**
 * 借款用途及还款来源-修改
 * @param supplierCapitalId 商户ID
 */
export function saveBorrowInfo({supplierCapitalId, borrowUse, borrowGuaranteeMeasure, borrowRepaySource}) {
  const data = {
    supplierCapitalId,
    borrowUse,
    borrowGuaranteeMeasure,
    borrowRepaySource
  }
  return fetch({
    url: test + '/admin/creditline_report_zl/borrow_info_save',
    method: 'post',
    data
  })
}

/**
 * 借款人生产经营情况-自有系统平台销售数据+第三方销售数据-查询
 * @param supplierCapitalId 商户ID
 */
export function queryProduceInfo(supplierCapitalId) {
  const data = {
    supplierCapitalId
  }
  return fetch({
    url: test + '/admin/creditline_report_zl/produce_self_third',
    method: 'post',
    data
  })
}

/**
 * 借款人生产经营情况-自有系统平台销售数据+第三方销售数据-修改
 * @param supplierCapitalId 商户ID
 */
export function saveProduceInfo({supplierCapitalId, produceSelf, produceThird, produceThirdDescribe}) {
  const data = {
    supplierCapitalId,
    produceSelf,
    produceThird,
    produceThirdDescribe
  }
  return fetch({
    url: test + '/admin/creditline_report_zl/produce_self_third_save',
    method: 'post',
    data
  })
}

/**
 * 发票验证方式-单选框
 */
export function invoiceCheckRadio () {
  return fetch({
    url: test + '/admin/combobox/invoice_check_type',
    method: 'post'
  })
}

/**
 * 借款人生产经营情况-对有正式销售发票+银行流水+企业营收核对-查询
 * @param supplierCapitalId 商户ID
 */
export function queryInvoiceBank(supplierCapitalId) {
  const data = {
    supplierCapitalId
  }
  return fetch({
    url: test + '/admin/creditline_report_zl/produce_invoice_bank',
    method: 'post',
    data
  })
}

/**
 * 借款人生产经营情况-对有正式销售发票+银行流水+企业营收核对-修改
 * @param supplierCapitalId 商户ID
 */
export function saveInvoiceBank({supplierCapitalId, produceInvoiceCheckType, produceInvoiceStat, produceBankStat, produceVerify, produceInvoiceStatDescribe, produceBankStatDescribe}) {
  const data = {
    supplierCapitalId,
    produceInvoiceCheckType,
    produceInvoiceStat,
    produceBankStat,
    produceVerify,
    produceInvoiceStatDescribe,
    produceBankStatDescribe
  }
  return fetch({
    url: test + '/admin/creditline_report_zl/produce_invlice_bank_save',
    method: 'post',
    data
  })
}

/**
 * 银行流水验证方式-下拉列表
 */
export function bankCheckList () {
  return fetch({
    url: test + '/admin/check/bank_stat_type',
    method: 'post'
  })
}


/**
 * 前三位主要供应商+前三位主要销售商-查询
 * @param supplierCapitalId 商户ID
 */
export function querySupplier(supplierCapitalId) {
  const data = {
    supplierCapitalId
  }
  return fetch({
    url: test + '/admin/creditline_report_zl/produce_major_people',
    method: 'post',
    data
  })
}

/**
 * 前三位主要供应商+前三位主要销售商-修改
 * @param supplierCapitalId 商户ID
 */
export function saveSupplier({supplierCapitalId, produceMajorSupplier, produceMajorSeller}) {
  const data = {
    supplierCapitalId,
    produceMajorSupplier,
    produceMajorSeller
  }
  return fetch({
    url: test + '/admin/creditline_report_zl/produce_major_people_save',
    method: 'post',
    data
  })
}

/**
 * 核实方法-多选框
 */
export function checkMethodList () {
  return fetch({
    url: test + '/admin/creditline_report_zl/produce_verify_method',
    method: 'post'
  })
}

/**
 * 核实材料-多选框
 */
export function checkMaterialList () {
  return fetch({
    url: test + '/admin/creditline_report_zl/produce_verify_material',
    method: 'post'
  })
}

/**
 * 上下游对借款企业评价+生产经营和销售调查验证方法+生产经营和销售情况调查结论-查询
 * @param supplierCapitalId 商户ID
 */
export function queryProduceOther(supplierCapitalId) {
  const data = {
    supplierCapitalId
  }
  return fetch({
    url: test + '/admin/creditline_report_zl/produce_other',
    method: 'post',
    data
  })
}

/**
 * 上下游对借款企业评价+生产经营和销售调查验证方法+生产经营和销售情况调查结论-修改
 * @param supplierCapitalId 商户ID
 */
export function saveProduceOther({supplierCapitalId, produceEvaluate, produceCooperationDescription, produceVerifyMethod, produceVerifyMaterial, produceBriefDescription, produceResearchConclusion, produceVerifyMethodRemark, produceVerifyMaterialRemark}) {
  const data = {
    supplierCapitalId,
    produceEvaluate,
    produceCooperationDescription,
    produceVerifyMethod,
    produceVerifyMaterial,
    produceBriefDescription,
    produceResearchConclusion,
    produceVerifyMethodRemark,
    produceVerifyMaterialRemark
  }
  return fetch({
    url: test + '/admin/creditline_report_zl/produce_other_save',
    method: 'post',
    data
  })
}

/**
 * 财务分析-查询
 * @param supplierCapitalId 商户ID
 */
export function queryFinanceAnalysis(supplierCapitalId) {
  const data = {
    supplierCapitalId
  }
  return fetch({
    url: test + '/admin/creditline_report_zl/finance_analysis',
    method: 'post',
    data
  })
}

/**
 * 财务分析-修改
 * @param supplierCapitalId 商户ID
 */
export function saveFinanceAnalysis({supplierCapitalId, financeDebt, financeLossIncome, financeSubjectAnalysis}) {
  const data = {
    supplierCapitalId,
    financeDebt,
    financeLossIncome,
    financeSubjectAnalysis
  }
  return fetch({
    url: test + '/admin/creditline_report_zl/finance_analysis_save',
    method: 'post',
    data
  })
}

/**
 * 财务分析-查询
 * @param supplierCapitalId 商户ID
 */
export function querySpotCheck(supplierCapitalId) {
  const data = {
    supplierCapitalId
  }
  return fetch({
    url: test + '/admin/creditline_report_zl/spot_check_picture',
    method: 'post',
    data
  })
}

/**
 * 财务分析-修改
 * @param supplierCapitalId 商户ID
 */
export function saveSpotCheck({supplierCapitalId, spotCheck}) {
  const data = {
    supplierCapitalId,
    spotCheck
  }
  return fetch({
    url: test + '/admin/creditline_report_zl/spot_check_picture_save',
    method: 'post',
    data
  })
}

/**
 * 负面信息-查询
 * @param supplierCapitalId 商户ID
 */
export function queryNegativeInfo(supplierCapitalId) {
  const data = {
    supplierCapitalId
  }
  return fetch({
    url: test + '/admin/creditline_report_zl/negative_info',
    method: 'post',
    data
  })
}

/**
 * 负面信息-修改
 * @param supplierCapitalId 商户ID
 */
export function saveNegativeInfo({supplierCapitalId, negativeInfo}) {
  const data = {
    supplierCapitalId,
    negativeInfo
  }
  return fetch({
    url: test + '/admin/creditline_report_zl/negative_info_save',
    method: 'post',
    data
  })
}

/**
 * 额度测算+担保分析+本次授信主要风险点及防范措施 +其它需要说明的问题+授信结论+审批意见-查询
 * @param supplierCapitalId 商户ID
 */
export function queryOtherInfo(supplierCapitalId) {
  const data = {
    supplierCapitalId
  }
  return fetch({
    url: test + '/admin/creditline_report_zl/approval_opinion',
    method: 'post',
    data
  })
}

/**
 * 额度测算-修改
 * @param supplierCapitalId 商户ID
 */
export function saveLimitCal({supplierCapitalId, limitCal}) {
	const data = {
		supplierCapitalId, 
		limitCal
	}
	return fetch({
		url: test + '/admin/creditline_report_zl/limit_calculation_str_save',
		method: 'post',
		data
	})
}

/**
 * 担保分析-修改
 * @param supplierCapitalId 商户ID
 */
export function saveGuaranteeAnalysis({supplierCapitalId, guaranteeAnalysis}) {
	const data = {
		supplierCapitalId,
		guaranteeAnalysis
	}
	return fetch({
		url: test + '/admin/creditline_report_zl/guarantee_analysis_str_save',
		method: 'post',
		data
	})
}

/**
 * 本次授信主要风险点及防范措施-修改
 * @param supplierCapitalId 商户ID
 */
export function saveRiskPoint({supplierCapitalId, riskPoint}) {
	const data = {
		supplierCapitalId,
		riskPoint
	}
	return fetch({
		url: test + '/admin/creditline_report_zl/risk_point_str_save',
		method: 'post',
		data
	})
}

/**
 * 其它需要说明的问题-修改
 * @param supplierCapitalId 商户ID
 */
export function saveOtherQuestion({supplierCapitalId, otherQuestion}) {
	const data = {
		supplierCapitalId,
		otherQuestion
	}
	return fetch({
		url: test + '/admin/creditline_report_zl/other_question_str_save',
		method: 'post',
		data
	})
}

/**
 * 授信结论-修改
 * @param supplierCapitalId 商户ID
 */
export function saveCreditlineConclusion({supplierCapitalId, creditlineConclusion}) {
	const data = {
		supplierCapitalId,
		creditlineConclusion
	}
	return fetch({
		url: test + '/admin/creditline_report_zl/creditline_conclusion_str_save',
		method: 'post',
		data
	})
}

/**
 * 审批意见-修改
 * @param supplierCapitalId 商户ID
 */
export function saveApprovalOpinion({
    supplierCapitalId,
    approvalOpinionChief,
    approvalOpinionChiefAdvice,
    approvalOpinionExamine,
    approvalOpinionExamineAdvice,
    approvalOpinionApprover,
    approvalOpinionApproverAdvice
}) {
  const data = {
    supplierCapitalId,
    approvalOpinionChief,
    approvalOpinionChiefAdvice,
    approvalOpinionExamine,
    approvalOpinionExamineAdvice,
    approvalOpinionApprover,
    approvalOpinionApproverAdvice
  }
  return fetch({
    url: test + '/admin/creditline_report_zl/approval_opinion_str_save',
    method: 'post',
    data
  })
}

export default {
  checkboxLoad,
  queryCreditHistory,
  checkHead,
  getCompBasicInfo,
  queryController,
  saveController,
  queryApplier,
  editApplier,
  queryApplierCount,
  editApplierCount,
  queryCompany,
  editCompany,
  queryMuchInfo,
  editMuchInfo,
  queryAsset,
  editAsset,
  queryCreditVariety,
  editCredit,
  queryCreditInfo,
  editCreditInfo,
  querySameTrade,
  saveSameTrade,
  queryGuarantee,
  saveGuarantee,
  financeCheckList,
  queryOverallMerit,
  saveOverallMerit,
  queryBorrowInfo,
  saveBorrowInfo,
  queryProduceInfo,
  saveProduceInfo,
  invoiceCheckRadio,
  queryInvoiceBank,
  saveInvoiceBank,
  bankCheckList,
  querySupplier,
  saveSupplier,
  checkMethodList,
  checkMaterialList,
  queryProduceOther,
  saveProduceOther,
  queryFinanceAnalysis,
  saveFinanceAnalysis,
  querySpotCheck,
  saveSpotCheck,
  queryNegativeInfo,
  saveNegativeInfo,
  queryOtherInfo,
  saveLimitCal,
  saveGuaranteeAnalysis,
  saveRiskPoint,
  saveOtherQuestion,
  saveCreditlineConclusion,
  saveApprovalOpinion
}
