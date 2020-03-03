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
    url: test + '/admin/apply_register/detail_top',
    method: 'post',
    data
  })
}	
/**
 * 申请登记-详情
 * @param supplierId 商户 id
 */
export function detail (supplierId) {
  const data = {
    supplierId
  }
  return fetch({
    url: test + '/admin/apply_register/detail',
    method: 'post',
    data
  })
}
//担保人信息
export function bondsmanDetail (supplierId) {
  const data = {
    supplierId
  }
  return fetch({
    url: test + '/admin/supply_data/guarantor_info',
    method: 'post',
    data
  })
}
/**
 * 申请登记-详情-登记
 * @param supplierId 商户 id
 */
export function detailRegister (supplierId) {
  const data = {
    supplierId
  }
  return fetch({
    url: test + '/admin/apply_register/detail_register',
    method: 'post',
    data
  })
}
/**
 * 申请登记-详情-打回
 * @param supplierId 商户 id
 */
export function detailRepulse ({supplierId,remark}) {
  const data = {
    supplierId,
    remark
  }
  return fetch({
    url: test + '/admin/apply_register/detail_repulse',
    method: 'post',
    data
  })
}


/**
 * 申请登记-详情
 * @param supplierId 商户 id
 */
export function querySummary (supplierId) {
  const data = {
    supplierId
  }
  return fetch({
    url: test + '/admin/apply_register/detail',
    method: 'post',
    data
  })
}

/**
 * 查询基础资料
 * @param supplierId 商户 id
 */
export function queryBasic (supplierId) {
  const data = {
    supplierId
  }
  return fetch({
    url: test + '/admin/supplier_register/query_basic',
    method: 'post',
    data
  })
}

/**
 * 查询基础资料的审核项
 * @param supplierId 商户 id
 */
export function queryBasicInspection (supplierId) {
  const data = {
    supplierId
  }
  return fetch({
    url: test + '/admin/supplier_register/query_basic_inspection',
    method: 'post',
    data
  })
}

/**
 * 查询尽调资料的审核项
 * @param supplierId 商户 id
 */
export function queryVerifyInspection (supplierId) {
  const data = {
    supplierId
  }
  return fetch({
    url: test + '/admin/supplier_register/query_verify_inspection',
    method: 'post',
    data
  })
}

/**
 * 查询授信资料的审核项
 * @param supplierId 商户 id
 */
export function querySignInspection (supplierId) {
  const data = {
    supplierId
  }
  return fetch({
    url: test + '/admin/supplier_register/query_sign_inspection',
    method: 'post',
    data
  })
}
/**
 * 初审基础资料
 * @param amendItems 需要修改的项
 * @param amendRemark 打回备注
 * @param inspections 审核项
 * @param pass 审核结果
 * @param supplierId 商户 id
 */
export function approveBasic ({amendItems, amendRemark, inspections, pass, supplierId}) {
  const data = {
    amendItems,
    amendRemark,
    inspections,
    pass,
    supplierId
  }
  return fetch({
    url: test + '/admin/supplier_register/approve_basic',
    method: 'post',
    data
  })
}

/**
 * 尽调资料初审 通过
 * @param inspections 审核项
 * @param supplierId 商户 id
 */
export function approveVerify ({inspections,supplierId}) {
  const data = {
    inspections,
    supplierId
  }
  return fetch({
    url: test + '/admin/supplier_register/approve_verify',
    method: 'post',
    data
  })
}

/**
 * 尽调资料打回
 * @param inspections 审核项
 * @param supplierId 商户 id
 */
export function amendingVerify ({inspections,supplierId,remark}) {
  const data = {
    inspections,
    supplierId,
    remark
  }
  return fetch({
    url: test + '/admin/supplier_register/amending_verify',
    method: 'post',
    data
  })
}

/**
 * 尽调资料复审
 * @param supplierId 商户 id
 */
export function reapproveVerify (supplierId) {
  const data = {
    supplierId
  }
  return fetch({
    url: test + '/admin/supplier_register/reapprove_verify',
    method: 'post',
    data
  })
}

/**
 * 授信签署初审 通过
 * @param inspections 审核项
 * @param supplierId 商户 id
 */
export function approveSign ({inspections,supplierId}) {
  const data = {
    inspections,
    supplierId
  }
  return fetch({
    url: test + '/admin/supplier_register/approve_sign',
    method: 'post',
    data
  })
}

/**
 * 授信打回
 * @param inspections 审核项
 * @param supplierId 商户 id
 */
export function amendingSign ({inspections,supplierId,remark}) {
  const data = {
    inspections,
    supplierId,
    remark
  }
  return fetch({
    url: test + '/admin/supplier_register/amending_sign',
    method: 'post',
    data
  })
}

/**
 * 授信签署复审通过并提交给资金方
 * @param supplierId 商户 id
 * @param rejectRemark 入驻失败原因   "通过" 为空
 * @param pass 审核结果	boolean	true: 通过; false: 拒绝
 */
export function approvefinal ({supplierId,rejectRemark,pass}) {
  const data = {
    supplierId,
    rejectRemark,
    pass
  }
  return fetch({
    url: test + '/admin/supplier_register/approve_final',
    method: 'post',
    data
  })
}
/**
 * 查询基础资料的风控汇总
 * @param supplierId 商户 id
 */
export function queryBasicRmSummary (supplierId) {
  const data = {
    supplierId
  }
  return fetch({
    url: test + '/admin/supplier_register/query_basic_rm_summary',
    method: 'post',
    data
  })
}

/**
 * 查询基础资料的风控明细
 * @param item 风控项
 * @param supplierId 商户 id
 */
export function queryBasicRmDetail (item, supplierId) {
  const data = {
    item,
    supplierId
  }
  return fetch({
    url: test + '/admin/supplier_register/query_basic_rm_detail',
    method: 'post',
    data
  })
}

/**
 * 复审通过基础资料
 * @param supplierId 商户 id
 */
export function reApproveBasic (supplierId) {
  const data = {
    supplierId
  }
  return fetch({
    url: test + '/admin/supplier_register/reapprove_basic',
    method: 'post',
    data
  })
}

/**
 * 查询贸易资料
 * @param supplierId 商户 id
 */
export function queryTrade (supplierId) {
  const data = {
    supplierId
  }
  return fetch({
    url: test + '/admin/supplier_register/query_trade',
    method: 'post',
    data
  })
}

/**
 * 查询贸易资料的审核项
 * @param supplierId 商户 id
 */
export function queryTradeInspection (supplierId) {
  const data = {
    supplierId
  }
  return fetch({
    url: test + '/admin/supplier_register/query_trade_inspection',
    method: 'post',
    data
  })
}

/**
 * 查询合同签署状态
 * @param supplierId 商户 id
 */
export function contractStatus (supplierId) {
  const data = {
    supplierId
  }
  return fetch({
    url: test + '/admin/supplier_register/contract_status',
    method: 'post',
    data
  })
}

/**
 * 国内商业保理合同-发送消息推送
 * @param supplierId 商户 id
 */
export function commerceFactorContract (supplierId) {
  const data = {
    supplierId
  }
  return fetch({
    url: test + '/admin/supplier_register/commerce_factor_contract',
    method: 'post',
    data
  })
}

/**
 * 保证合同-发送消息推送
 * @param guarantorId 商户 id
 */
export function guaranteeAgreement (guarantorId) {
  const data = {
    guarantorId
  }
  return fetch({
    url: test + '/admin/supplier_register/guarantee_agreement',
    method: 'post',
    data
  })
}

/**
 * 创建国内商业保理合同
 * @param supplierId 商户 id
 */
export function createFactorContract (supplierId) {
  const data = {
    supplierId
  }
  return fetch({
    url: test + '/admin/supplier_register/create_factor_contract',
    method: 'post',
    data
  })
}

/**
 * 创建保证合同
 * @param guarantorId 商户 id
 */
export function createGuaranteeContract (guarantorId) {
  const data = {
    guarantorId
  }
  return fetch({
    url: test + '/admin/supplier_register/create_guarantee_contract',
    method: 'post',
    data
  })
}

/**
 * 初审贸易资料
 * @param amendItems 需要修改的项
 * @param amendRemark 打回备注
 * @param inspections 审核项
 * @param pass 审核结果
 * @param supplierId 商户 id
 */
export function approveTrade ({amendItems, amendRemark, inspections, pass, supplierId}) {
  const data = {
    amendItems,
    amendRemark,
    inspections,
    pass,
    supplierId
  }
  return fetch({
    url: test + '/admin/supplier_register/approve_trade',
    method: 'post',
    data
  })
}

/**
 * 查询贸易资料的风控汇总
 * @param supplierId 商户 id
 */
export function queryTradeRmSummary (supplierId) {
  const data = {
    supplierId
  }
  return fetch({
    url: test + '/admin/supplier_register/query_trade_rm_summary',
    method: 'post',
    data
  })
}

/**
 * 查询贸易资料的风控明细
 * @param item 风控项
 * @param supplierId 商户 id
 */
export function queryTradeRmDetail (item, supplierId) {
  const data = {
    item,
    supplierId
  }
  return fetch({
    url: test + '/admin/supplier_register/query_trade_rm_detail',
    method: 'post',
    data
  })
}

/**
 * 复审通过贸易资料
 * @param supplierId 商户 id
 */
export function reApproveTrade (supplierId) {
  const data = {
    supplierId
  }
  return fetch({
    url: test + '/admin/supplier_register/reapprove_trade',
    method: 'post',
    data
  })
}

/**
 * 查询预沟通
 * @param supplierId 商户 id
 */
export function queryKnow (supplierId) {
  const data = {
    supplierId
  }
  return fetch({
    url: test + '/admin/supplier_register/query_know',
    method: 'post',
    data
  })
}

/**
 * 修改预沟通
 * @param supplierId 商户 id
 * @param credit 征信答疑
 * @param trade 贸易答疑
 */
export function updateKnow ({supplierId, credit, trade}) {
  const data = {
    supplierId,
    credit,
    trade
  }
  return fetch({
    url: test + '/admin/supplier_register/update_know',
    method: 'post',
    data
  })
}

/**
 * 审核通过预沟通
 * @param supplierId 商户 id
 */
export function approveKnow (supplierId) {
  const data = {
    supplierId
  }
  return fetch({
    url: test + '/admin/supplier_register/approve_know',
    method: 'post',
    data
  })
}

/**
 * 查询尽调资料
 * @param supplierId 商户 id
 */
export function queryVerify (supplierId) {
  const data = {
    supplierId
  }
  return fetch({
    url: test + '/admin/supplier_register/query_verify',
    method: 'post',
    data
  })
}

/**
 * 修改尽调资料
 * @param supplierId 商户 id
 * @param creditEnterprise
 * @param creditRepre
 * @param creditGuarantor
 * @param centres
 */
export function updateVerify ({supplierId, creditEnterprise, creditRepre, creditGuarantor, centres}) {
  const data = {
    supplierId,
    creditEnterprise,
    creditRepre,
    creditGuarantor,
    centres
  }
  return fetch({
    url: test + '/admin/supplier_register/update_verify',
    method: 'post',
    data
  })
}

/**
 * 查询尽调资料的风控汇总 贸易数据匹配
 * @param supplierId 商户 id
 */
export function queryVerifyRmSummary (supplierId) {
  const data = {
    supplierId
  }
  return fetch({
    url: test + '/admin/supplier_register/query_verify_rm_summary',
    method: 'post',
    data
  })
}

/**
 * 查询尽调资料的风控明细
 * @param supplierId 商户 id
 * @param creditType 信用type   1 企业担保人 2 法定担保人
 */
export function queryVerifyRmDetail (supplierId, creditType) {
  const data = {
    supplierId,
    creditType
  }
  return fetch({
    url: test + '/admin/supplier_register/query_verify_rm_detail',
    method: 'post',
    data
  })
}

/**
 * 上传尽调图片接口
 * @param data
 */
export function uploadVerify (data) {
  return fetch({
    url: test + '/admin/supplier_register/upload_verify',
    method: 'post',
    isFormData: true,
    headers: {'Content-Type': 'multipart/form-data; boundary=' + data._boundary},
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
    url: test + '/admin/supplier_register/query_sign',
    method: 'post',
    data
  })
}

/**
 * 授信签署-评级-重新评级
 * @param supplierId 商户 id
 */
export function evaluateGrade (supplierId) {
  const data = {
    supplierId
  }
  return fetch({
    url: test + '/admin/supplier_register/evaluate_grade',
    method: 'post',
    data
  })
}

/**
 * 授信签署-评级-查询评级
 * @param supplierId 商户 id
 */
export function queryGrade (supplierId) {
  const data = {
    supplierId
  }
  return fetch({
    url: test + '/admin/supplier_register/query_grade',
    method: 'post',
    data
  })
}

/**
 * 授信签署-评级-查询评级详情
 * @param supplierId 商户 id
 */
export function queryGradeDetail (supplierId) {
  const data = {
    supplierId
  }
  return fetch({
    url: test + '/admin/supplier_register/query_grade_detail',
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
    url: test + '/admin/supplier_register/calculated_interest',
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
    url: test + '/admin/supplier_register/update_sign',
    method: 'post',
    data
  })
}

/**
 * 入驻成功/失败
 * @param supplierId 商户 id
 * @param pass 审核结果
 * @param rejectRemark 入驻失败原因
 */
export function approveFinal ({supplierId, pass, rejectRemark}) {
  const data = {
    supplierId,
    pass,
    rejectRemark
  }
  return fetch({
    url: test + '/admin/supplier_register/approve_final',
    method: 'post',
    data
  })
}



/**
 * 保存贸易统计资料
 * @param supplierId 商户 id
 * @param vendorCode 平台得商户编号
 */
export function saveApproveTrade(supplierId, vendorCode) {
  const data = {
    supplierId,
    vendorCode
  }
  return fetch({
    url: test + '/admin/supplier_register/saveApprove_trade',
    method: 'post',
    data
  })

}


/**
 * 三要素四要素验证
 * @param supplierId 企业名称
 * @param type 请求状态    企业: ENTERPRISE 法人: REPRE 担保人: GUARANTOR
 */
export function informationCheck({supplierId, type}) {
  const data = {
    supplierId,
    type
  }
  return fetch({
    url: test + '/admin/supplier_register/information_check',
    method: 'post',
    data
  })

}


/**
 * 评分卡
 * @param supplierId 商户id
 */
export function getScoreCard(supplierId) {
  const data = {
    supplierId
  }
  return fetch({
    url: test + '/admin/supplier_register/query_scorecard',
    method: 'post',
    data
  })

}

/**
 * 银行打款验证
 * @param supplierId 商户id
 */
export function remitConfirm(supplierId) {
  const data = {
    supplierId
  }
  return fetch({
    url: test + '/admin/remit/confirm',
    method: 'post',
    data
  })

}
/**
 * 查看打款验证
 * @param supplierId 商户id
 */
export function remitView(supplierId) {
  const data = {
    supplierId
  }
  return fetch({
    url: test + '/admin/remit/view',
    method: 'post',
    data
  })

}

/**
 * 贸易资料风控 贸易统计详情刷新
 * @param supplierId 商户id
 */
export function refreshTrade(supplierId) {
  const data = {
    supplierId
  }
  return fetch({
    url: test + '/admin/supplier_register/refresh_trade',
    method: 'post',
    data
  })

}

/**
 *  选择核心企业
 * @param supplierId 商户id
 * @param centreIds centreIds
 */
export function addCentre({supplierId,centreIds}) {
  const data = {
    supplierId,
    centreIds
  }
  return fetch({
    url: test + '/admin/supplier_register/add_centre',
    method: 'post',
    data
  })

}

/**
 *  显示选择的核心企业
 * @param supplierId 商户id
 */
export function centreList(supplierId) {
  const data = {
    supplierId
  }
  return fetch({
    url: test + '/admin/supplier_register/centre_list',
    method: 'post',
    data
  })

}

/**
 *  合同签署的企业名称
 * @param centreId 核心企业Id
 */
export function contractSignNameList(centreId) {
  const data = {
    centreId
  }
  return fetch({
    url: test + '/admin/supplier_register/contract_sign_name',
    method: 'post',
    data
  })

}

/**
 *  查询企业征信
 * @param supplierId 商户id
 */
export function creditEnterprise(supplierId) {
  const data = {
    supplierId
  }
  return fetch({
    url: test + '/admin/supplier_register/credit_enterprise',
    method: 'post',
    data
  })
}

/**
 *  查询法人信用报告
 * @param supplierId 商户id
 */
export function creditRepre(supplierId) {
  const data = {
    supplierId
  }
  return fetch({
    url: test + '/admin/supplier_register/credit_repre',
    method: 'post',
    data
  })
}

/**
 *  查询担保人信用报告
 * @param supplierId 商户id
 */
export function creditGuarantor(supplierId) {
  const data = {
    supplierId
  }
  return fetch({
    url: test + '/admin/supplier_register/credit_guarantor',
    method: 'post',
    data
  })
}

/**
 * 刷新（校验核心企业账号状态）
 * @param supplierId 商户id
 * @param centreId 核心企业id
 */
export function refreshCentreAccount({supplierId,centreId}) {
  const data = {
    supplierId,
    centreId
  }
  return fetch({
    url: test + '/admin/supplier_register/refresh_centre_account',
    method: 'post',
    data
  })
}

/**
 * 法定代表人认证, "重置" 人脸识别次数
 * @param supplierId 商户id
 */
export function resetFaceCheckTimes(supplierId) {
  const data = {
    supplierId
  }
  return fetch({
    url: test + '/admin/supplier_register/reset_face_check_times',
    method: 'post',
    data
  })
}

/**
 * 操作
 * @param supplierId 商户id
 */
export function getQueryReview(supplierId) {
  const data = {
    supplierId
  }
  return fetch({
    url: test + '/admin/supplier_register/query_review',
    method: 'post',
    data
  })
}

/**
 * 商户审查-查询沟通内容
 * @param supplierId 商户id
 */
export function getQueryKnow(supplierId) {
  const data = {
    supplierId
  }
  return fetch({
    url: test + '/admin/supplier_register/query_know',
    method: 'post',
    data
  })
}

/**
 * 商户审查-添加沟通内容
 * @param supplierId 商户id
 * @param content 沟通内容
 */
export function addKnow({supplierId,content}) {
  const data = {
    supplierId,
    content
  }
  return fetch({
    url: test + '/admin/supplier_register/add_know',
    method: 'post',
    data
  })
}

/**
 * 商户审查-删除沟通内容
 * @param id 沟通消息 id
 */
export function deleteKnow(id) {
  const data = {
    id
  }
  return fetch({
    url: test + '/admin/supplier_register/delete_know',
    method: 'post',
    data
  })
}

/**
 * 信息校验与验证-查询
 * @param supplierId 商户id
 */
export function validationInfo(supplierId) {
  const data = {
    supplierId
  }
  return fetch({
    url: test + '/admin/supplier_register/validation_info',
    method: 'post',
    data
  })
}

/**
 * 调用信息校验和认证-修改
 * @param supplierId 商户id
 */
export function verifyValidationInfo({item,id}) {
  const data = {
    item,
    id
  }
  return fetch({
    url: test + '/admin/supplier_register/verify_validation_info',
    method: 'post',
    data
  })
}

export default {
	detailTop,
	detail,
	detailRegister,
	detailRepulse,
	
  querySummary,
  queryBasic,
  queryBasicInspection,
  queryVerifyInspection,
  querySignInspection,
  approveBasic,
  approveVerify,
  amendingVerify,
  reapproveVerify,
  approveSign,
  amendingSign,
  approvefinal,
  queryBasicRmSummary,
  queryBasicRmDetail,
  reApproveBasic,
  queryTrade,
  queryTradeInspection,
  contractStatus,
  commerceFactorContract,
  guaranteeAgreement,
  createFactorContract,
  createGuaranteeContract,
  approveTrade,
  queryTradeRmSummary,
  queryTradeRmDetail,
  reApproveTrade,
  queryKnow,
  updateKnow,
  approveKnow,
  queryVerify,
  updateVerify,
  queryVerifyRmSummary,
  queryVerifyRmDetail,
  querySign,
  evaluateGrade,
  queryGrade,
  queryGradeDetail,
  calculatedInterest,
  updateSign,
  approveFinal,
  saveApproveTrade,
  informationCheck,
  getScoreCard,
  remitConfirm,
  remitView,
  refreshTrade,
  addCentre,
  centreList,
  contractSignNameList,
  creditEnterprise,
  creditRepre,
  creditGuarantor,
  refreshCentreAccount,
  resetFaceCheckTimes,
  getQueryReview,
  getQueryKnow,
  addKnow,
  deleteKnow,
  validationInfo,
  verifyValidationInfo,
  bondsmanDetail
}
