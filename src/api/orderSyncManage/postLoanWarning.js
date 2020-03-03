import fetch from '@/utils/fetch'
const test = '' // '/mockjsdata/1',''



/** 
 * 商户状态
 */
export function supplierEnableStatus() {
    return fetch({
        url: test + '/admin/trade_warning/supplier_enable_status',
        method: 'post'
    })
}

/** 
 * 预警状态
 */
export function tradeWarningStatus() {
    return fetch({
        url: test + '/admin/trade_warning/trade_warning_status',
        method: 'post'
    })
}


/**
 * 贷后预警设置信息列表
 * @param limit 每页记录数
 * @param page 当前页数
 * @param status 商户状态
 */
export function tradeWarningList({ page, limit, enterpriseName, repreName, repreMobile, status, warningStatus }) {
    const data = {
        page,
        limit,
        enterpriseName,
        repreName,
        repreMobile,
        status,
        warningStatus
    }
    return fetch({
        url: test + '/admin/trade_warning/list',
        method: 'post',
        data
    })
}

/** 
 * 点击页面列表中的设置按钮, 查询详情
 */
export function tradeWarningDetail(supplierId) {
    const data = {
        supplierId
    }
    return fetch({
        url: test + '/admin/trade_warning/detail',
        method: 'post',
        data
    })
}

/** 
 * 保存
 */
export function tradeWarningSave({ supplierId, riseRate, fallRate, warningStatus }) {
    const data = {
        supplierId,
        riseRate,
        fallRate,
        warningStatus
    }
    return fetch({
        url: test + '/admin/trade_warning/save',
        method: 'post',
        data
    })
}


export default {
    supplierEnableStatus,
    tradeWarningStatus,
    tradeWarningList,
    tradeWarningDetail,
    tradeWarningSave
}