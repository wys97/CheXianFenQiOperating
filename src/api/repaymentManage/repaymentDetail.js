import fetch from '@/utils/fetch'
const test = '' // '/mockjsdata/1',''

// 还款详情

/**
 * 还款登记详情
 * @param orderNo 还款登记表 id
 */
export function RegisterDetail (data) {
 
  return fetch({
    url: test + '/admin/payment/order_details',
    method: 'post',
    data
  })
}
export function orderPlanList (data) {
  
  return fetch({
    url: test + '/admin/payment/order_plan_list',
    method: 'post',
    data
  })
}




export default {
  RegisterDetail,
  orderPlanList
}
