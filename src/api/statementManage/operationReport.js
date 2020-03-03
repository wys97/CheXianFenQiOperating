import fetch from '@/utils/fetch'
const test = '' // '/mockjsdata/1',''

// 首页
/**
 * 运营报告-查询运营概况
 */
export function summary () {
  return fetch({
    url: test + '/admin/operation_report/summary',
    method: 'post',
  })
}
/*
 *运营报告-借款期限占比
 * */
export function loanPeriod(){
	return fetch({
		url:test + '/admin/operation_report/loan_period',
		method:'post',
	})
}

/*
 *运营报告-借款利率占比
 * */
export function loanInterest(){
	return fetch({
		url:test + '/admin/operation_report/loan_interest',
		method:'post',
	})
}

export default {
	summary,
  	loanPeriod,
  	loanInterest
}