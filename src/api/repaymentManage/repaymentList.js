import fetch from '@/utils/fetch'
const test = '' // '/mockjsdata/1',''

// 还款列表

/**
 * 查询列表
 * @param supplierName 商户名字
 * @param financeNo 融资单号
 * @param financeDate	T文本	否 融资到账日期
 * @param status	T文本	状态:WAITING-待还款 PAYING-还款中 PART-部分还款 ALL-全部还款   OVERDUE -逾期
 * @param page	T文本	页码
 * @param limit	T文本	每页显示条数 
 */
export function orderStatus () {
  return fetch({
    url: test + '/admin/payment/order_status',
    method: 'post',
  })
}
export function getListData (data) {
  return fetch({
    url: test + '/admin/payment/order_list',
    method: 'post',
    data
  })
}

export default {
  orderStatus,
  getListData
}
