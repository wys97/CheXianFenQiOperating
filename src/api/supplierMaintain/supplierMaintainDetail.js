import fetch from '@/utils/fetch'
const test = '' // '/mockjsdata/1',''

// 商户详情
/**
 * 头部信息
 * @param supplierId 商户ID
 */

//订单详情  子页签显示状态
export function selectInfoStatus(data) {
   
    return fetch({
        url: test + '/admin/apply_supplement/select_info_status',
        method: 'post',
        data
    })
}

//订单详情 基本数据
export function detailData(data) {
   
    return fetch({
        url: test + '/admin/order_supplement/base_information',
        method: 'post',
        data
    })
}


//订单详情  车辆信息
export function carData(data) {
   
    return fetch({
        url: test + '/admin/order_supplement/car_information',
        method: 'post',
        data
    })
}
//订单详情  分期申请信息
export function installment(data) {
   
    return fetch({
        url: test + '/admin/order_supplement/installment_application',
        method: 'post',
        data
    })
}
//订单详情  保单信息
export function selectPolicyInfo(data) {
   
    return fetch({
        url: test + '/admin/apply_supplement/select_policyInfo',
        method: 'post',
        data
    })
}




//分期申请补充 保存基本信息详情  分期申请信息
export function preserveAmend(data) {
   
    return fetch({
        url: test + '/admin/order_supplement/base_information_save',
        method: 'post',
        data
    })
}





// 分期申请补充-投保企业下拉
export function holderCompany() {
   
    return fetch({
        url: test + '/admin/order_supplement/holder_company',
        method: 'post',
        
    })
}
// 分期申请补充-保险公司下拉
export function insuranceCompany() {
   
    return fetch({
        url: test + '/admin/order_supplement/insurance_company',
        method: 'post',
        
    })
}
// 分期申请补充-收款机构
export function insuranceInstitution(data) {
   
    return fetch({
        url: test + '/admin/order_supplement/insurance_institution',
        method: 'post',
        data
        
    })
}
// 分期申请补充-产品下拉
export function productCompay(data) {
   
    return fetch({
        url: test + '/admin/order_supplement/product_dropdown',
        method: 'post',
        data
        
    })
}
//分期订单补充-产品下拉-分期期数和金融服务费
export function productInstitution(data) {
   
    return fetch({
        url: test + '/admin/order_supplement/product_dropdown_info',
        method: 'post',
        data
        
    })
}
//分期申请补充-投保企业对应信用代码
export function holderCompanyCode(data) {
   
    return fetch({
        url: test + '/admin/order_supplement/holder_company_Code',
        method: 'post',
        data
        
    })
}
//分期申请补充-提交分期申请
export function orderInfoSave(data) {
   
    return fetch({
        url: test + '/admin/order_supplement/order_info_save',
        method: 'post',
        data
        
    })
}
//分期申请补充-取消分期申请
export function baseInformationClear(data) {
   
    return fetch({
        url: test + '/admin/order_supplement/base_information_clear',
        method: 'post',
        data
        
    })
}
//分期申请补充-还款计划信息
export function orderPlanInfo(data) {
   
    return fetch({
        url: test + '/admin/payment/order_plan_info',
        method: 'post',
        data
        
    })
}
//分期申请补充-还款计划表单信息
export function orderPlanList (data) {
  
    return fetch({
      url: test + '/admin/payment/order_plan_list',
      method: 'post',
      data
    })
  }
  


export default {
    selectInfoStatus,
    detailData,
    carData,
    installment,
    selectPolicyInfo,
    orderPlanInfo,
    orderPlanList,


    // 分期补充接口
    preserveAmend,
    holderCompany,
    insuranceCompany,
    insuranceInstitution,
    productCompay,
    productInstitution,
    holderCompanyCode,
    orderInfoSave,
    baseInformationClear,
    
}