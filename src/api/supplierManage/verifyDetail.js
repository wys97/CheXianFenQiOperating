import fetch from '@/utils/fetch'
const test = '' // '/mockjsdata/1',''

// 商户详情

/**
 * 尽调信息-企业信息详情查询
 * @param supplierId 商户 id
 */
export function queryEnterpriseInfo (supplierId) {
  const data = {
    supplierId
  }
  return fetch({
    url: test + '/admin/supplier_register/query_enterprise_info',
    method: 'post',
    data
  })
}

/**
 * 尽调信息-企业信息修改
 * @param supplierId 商户 id
 */
export function modEnterpriseInfo ({supplierId,name,businessLicenseNo,address,establishDate,phone,fax}) {
  const data = {
    supplierId,
    name,
    businessLicenseNo,
    address,
    establishDate,
    phone,
    fax
  }
  return fetch({
    url: test + '/admin/supplier_register/mod_enterprise_info',
    method: 'post',
    data
  })
}

/**
 * 尽调信息-股权变动列表查询
 * @param supplierId 商户 id
 */
export function queryEquity (supplierId) {
  const data = {
    supplierId
  }
  return fetch({
    url: test + '/admin/supplier_register/query_equity',
    method: 'post',
    data
  })
}

/**
 * 尽调信息-股权变动保存
 * @param supplierId 商户 id
 */
export function saveEquity ({supplierId,info}) {
  const data = {
    supplierId,
    info
  }
  return fetch({
    url: test + '/admin/supplier_register/save_equity',
    method: 'post',
    data
  })
}

/**
 * 尽调信息-经营场所列表查询
 * @param supplierId 商户 id
 */
export function queryOffice (supplierId) {
  const data = {
    supplierId
  }
  return fetch({
    url: test + '/admin/supplier_register/query_office',
    method: 'post',
    data
  })
}

/**
 * 尽调信息-经营场所保存
 * @param supplierId 商户 id
 */
export function saveOffice ({supplierId,info}) {
  const data = {
    supplierId,
    info
  }
  return fetch({
    url: test + '/admin/supplier_register/save_office',
    method: 'post',
    data
  })
}

/**
 * 尽调信息-法律诉讼列表查询
 * @param supplierId 商户 id
 */
export function queryLitigation (supplierId) {
  const data = {
    supplierId
  }
  return fetch({
    url: test + '/admin/supplier_register/query_litigation',
    method: 'post',
    data
  })
}

/**
 * 尽调信息-法律诉讼保存
 * @param supplierId 商户 id
 */
export function saveLitigation ({supplierId,info}) {
  const data = {
    supplierId,
    info
  }
  return fetch({
    url: test + '/admin/supplier_register/save_litigation',
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
    url: test + '/admin/supplier_register/query_manager',
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
    url: test + '/admin/supplier_register/query_repre_manager',
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
    url: test + '/admin/supplier_register/save_manager',
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
    url: test + '/admin/supplier_register/query_credit',
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
    url: test + '/admin/supplier_register/save_credit',
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
    url: test + '/admin/supplier_register/query_paper',
    method: 'post',
    data
  })
}

/**
 * 尽调信息-营业执照查询
 * @param supplierId 商户 id
 */
export function queryPaperByType ({supplierId,type}) {
  const data = {
    supplierId,
    type
  }
  return fetch({
    url: test + '/admin/supplier_register/query_paper_by_type',
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
    url: test + '/admin/supplier_register/save_paper',
    method: 'post',
    data
  })
}

/**
 * 财务及贸易统计-查询
 * @param supplierId 商户 id
 */
export function queryEnterpriseTrade (supplierId) {
  const data = {
    supplierId
  }
  return fetch({
    url: test + '/admin/supplier_register/query_enterprise_trade',
    method: 'post',
    data
  })
}

/**
 * 财务及贸易统计交易数据可验证程度列表数据
 * @param supplierId 商户 id
 */
export function streamVolumesStatus () {
  return fetch({
    url: test + '/admin/supplier_register/stream_volumes_status',
    method: 'post'
  })
}
/**
 * 财务及贸易统计-保存
 * @param supplierId 商户 id
 */
export function updateEnterpriseTrade ({supplierId,receivableAmount,receivableOtherAmount,payableAmount,payableOtherAmount,upstreamVerifiable,upstreamVolumes,downstreamVerifiable,downstreamVolumes}) {
  const data = {
    supplierId,
    receivableAmount,
    receivableOtherAmount,
    payableAmount,
    payableOtherAmount,
    upstreamVerifiable,
    upstreamVolumes,
    downstreamVerifiable,
    downstreamVolumes
  }
  return fetch({
    url: test + '/admin/supplier_register/update_enterprise_trade',
    method: 'post',
    data
  })
}

/**
 * 其他信息-查询
 * @param supplierId 商户 id
 */
export function queryEnterpriseFinance (supplierId) {
  const data = {
    supplierId
  }
  return fetch({
    url: test + '/admin/supplier_register/query_enterprise_finance',
    method: 'post',
    data
  })
}
/**
 * 其他信息-保存
 * @param supplierId 商户 id
 */
export function saveEnterpriseFinance ({supplierId,profitAmount,interestAmount,loanAmount,guarantyAmount,assetsAmount,turnoverAmount,receivableAmount,backgroundYears,controllerAssets}) {
  const data = {
    supplierId,
    profitAmount,
    interestAmount,
    loanAmount,
    guarantyAmount,
    assetsAmount,
    turnoverAmount,
    receivableAmount,
    backgroundYears,
    controllerAssets
  }
  return fetch({
    url: test + '/admin/supplier_register/save_enterprise_finance',
    method: 'post',
    data
  })
}


/**
 * 其他信息-互联网信息审核查询
 * @param supplierId 商户 id
 */
export function queryEnterpriseOpinion (supplierId) {
  const data = {
    supplierId
  }
  return fetch({
    url: test + '/admin/supplier_register/query_enterprise_opinion',
    method: 'post',
    data
  })
}
/**
 * 其他信息-保存互联网信息审核
 * @param supplierId 商户 id
 */
export function saveEnterpriseOpinion ({supplierId,opinionData}) {
  const data = {
    supplierId,
    opinionData
  }
  return fetch({
    url: test + '/admin/supplier_register/save_enterprise_opinion',
    method: 'post',
    data
  })
}

/**
 * 担保人-查询
 * @param supplierId 商户 id
 */
export function queryEnterpriseGuarantor (supplierId) {
  const data = {
    supplierId
  }
  return fetch({
    url: test + '/admin/supplier_register/query_enterprise_guarantor',
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
    url: test + '/admin/supplier_register/select_guarantor_list',
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
    url: test + '/admin/supplier_register/create_test_key',
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
    url: test + '/admin/supplier_register/delete_enterprise_guarantor',
    method: 'post',
    data
  })
}
/**
 * 担保人信息-保存
 * @param supplierId 商户 id
 */
export function saveEnterpriseGuarantor ({supplierId,guarantorId,name,address,identityNo,mobile,email,identityFrontKey,identityBackKey,guaranteeValue,guaranteeValueFile}) {
  const data = {
    supplierId,
    guarantorId,
    name,
    address,
    identityNo,
    mobile,
    email,
    identityFrontKey,
    identityBackKey,
    guaranteeValue,
    guaranteeValueFile
  }
  return fetch({
    url: test + '/admin/supplier_register/save_enterprise_guarantor',
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
    url: test + '/admin/supplier_register/query_distributor',
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
    url: test + '/admin/supplier_register/delete_distributor',
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
    url: test + '/admin/supplier_register/operate_distributor',
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
 * 尽调信息-尽调资料提交审核
 * @param supplierId 商户 id
 */
export function submitCheck (supplierId) {
  const data = {
    supplierId
  }
  return fetch({
    url: test + '/admin/supplier_register/submit_check',
    method: 'post',
    data
  })
}
export default {
  queryEnterpriseInfo,
  modEnterpriseInfo,
  queryEquity,
  saveEquity,
  queryOffice,
  saveOffice,
  queryLitigation,
  saveLitigation,
  queryManager,
  queryRepreManager,
  saveManager,
  queryCredit,
  saveCredit,
  queryPaper,
  queryPaperByType,
  savePaper,
  queryEnterpriseTrade,
  streamVolumesStatus,
  updateEnterpriseTrade,
  queryEnterpriseFinance,
  saveEnterpriseFinance,
  queryEnterpriseOpinion,
  saveEnterpriseOpinion,
  queryEnterpriseGuarantor,
  selectGuarantorList,
  createTestKey,
  deleteEnterpriseGuarantor,
  saveEnterpriseGuarantor,
  queryDistributor,
  deleteDistributor,
  operateDistributor,
  agentInfo,
  memberType,
  levelInfo,
  bankList,
  certificateType,
  creditBelong,
  identityType,
  submitCheck
}