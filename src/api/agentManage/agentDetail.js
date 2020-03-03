import fetch from '@/utils/fetch'
const test = '' // '/mockjsdata/1',''



/**
 * 代理商类型
 */
export function agentTypeList() {
    return fetch({
        url: test + '/admin/agent_manage/agent_type',
        method: 'post'
    })
}


/**
 * 结算周期
 */
export function agentSettleCycle() {
    return fetch({
        url: test + '/admin/agent_manage/settle_cycle',
        method: 'post'
    })
}

/**
 * 结算状态
 */
export function agentSettleStatus() {
    return fetch({
        url: test + '/admin/agent_manage/settle_status',
        method: 'post'
    })
}


//对接产品列表
export function productInfo() {
    return fetch({
        url: test + '/admin/common/product-info?status='+'ENABLED',
        method: 'get'
    })
}


/**
 * 代理商新增
 */
export function agentAdd({ agentName, agentType, contactName, contactMobile, registerDate, profitScale, settleCycle, agentStatus, agentDesc }) {
    const data = {
        agentName,
        agentType,
        contactName,
        contactMobile,
        registerDate,
        profitScale,
        settleCycle,
        agentStatus,
        agentDesc
    }
    return fetch({
        url: test + '/admin/agent_manage/add',
        method: 'post',
        data
    })
}
/**
 * 代理商修改
 */
export function sureToModify(data) {
    return fetch({
        url: test + '/admin/agent_manage/update_login_account',
        method: 'post',
        data
    })
}


/**
 * 代理商删除
 */

export function agentDelete(agentId) {
    const data = {
        agentId
    }
    return fetch({
        url: test + '/admin/agent_manage/delete',
        method: 'post',
        data
    })
}

/**
 * 详情信息头部
 */

export function agentHead(agentId) {
    const data = {
        agentId
    }
    return fetch({
        url: test + '/admin/agent_manage/head',
        method: 'post',
        data
    })
}



/**
 * 基本信息
 */

export function agentBasicInfo(agentId) {
    const data = {
        agentId
    }
    return fetch({
        url: test + '/admin/agent_manage/basic_info',
        method: 'post',
        data
    })
}



/**
 * 基本信息-修改
 */

export function agentBasicInfoUpdate({ agentId, agentName, agentType, contactName, contactMobile, registerDate, profitScale, settleCycle, agentStatus, agentDesc }) {
    const data = {
        agentId,
        agentName,
        agentType,
        contactName,
        contactMobile,
        registerDate,
        profitScale,
        settleCycle,
        agentStatus,
        agentDesc
    }
    return fetch({
        url: test + '/admin/agent_manage/basic_info_update',
        method: 'post',
        data
    })
}



/**
 * 登录账号列表
 */

export function agentLoginAccountList(agentId) {
    const data = {
        agentId
    }
    return fetch({
        url: test + '/admin/agent_manage/login_account_list',
        method: 'post',
        data
    })
}
/**
 * 登录账号 新增
 */

export function sureToCreate(data) {
    return fetch({
        url: test + '/admin/agent_manage/create_login_account',
        method: 'post',
        data
    })
}



/**
 * 重置密码
 */

export function agentLResetPassword(id) {
    const data = {
        id
    }
    return fetch({
        url: test + '/admin/agent_manage/reset_password',
        method: 'post',
        data
    })
}

/**
 * 商户列表
 */

export function agentSupplierList(agentId) {
    const data = {
        agentId
    }
    return fetch({
        url: test + '/admin/agent_manage/supplier_list',
        method: 'post',
        data
    })
}


/**
 * 结算列表
 */

export function agentSettleList(agentId) {
    const data = {
        agentId
    }
    return fetch({
        url: test + '/admin/agent_manage/settle_list',
        method: 'post',
        data
    })
}


/**
 * 获取代理商编号和名称
 */

export function agentGetAgentInfo(agentId) {
    const data = {
        agentId
    }
    return fetch({
        url: test + '/admin/agent_manage/get_agent_info',
        method: 'post',
        data
    })
}



/**
 * 结算-新增
 */

export function agentSettleAdd({ agentId, settleBatchId, accountName, accountNum, settleAmount, settleDate, settleStatus }) {
    const data = {
        agentId,
        settleBatchId,
        accountName,
        accountNum,
        settleAmount,
        settleDate,
        settleStatus
    }
    return fetch({
        url: test + '/admin/agent_manage/settle_add',
        method: 'post',
        data
    })
}


/**
 * 结算-详情
 */

export function agentSettleDetail(id) {
    const data = {
        id
    }
    return fetch({
        url: test + '/admin/agent_manage/settle_detail',
        method: 'post',
        data
    })
}

/**
 * 结算-修改
 */
export function agentSettleUpdate({ id, settleBatchId, accountName, accountNum, settleAmount, settleDate, settleStatus }) {
    const data = {
        id,
        settleBatchId,
        accountName,
        accountNum,
        settleAmount,
        settleDate,
        settleStatus
    }
    return fetch({
        url: test + '/admin/agent_manage/settle_update',
        method: 'post',
        data
    })
}


/**
 * 结算-删除
 */

export function agentSettleDelete(id) {
    const data = {
        id
    }
    return fetch({
        url: test + '/admin/agent_manage/settle_delete',
        method: 'post',
        data
    })
}


/**
 * 推广配置
 */

export function agentRecommandSetting(agentId) {
    const data = {
        agentId
    }
    return fetch({
        url: test + '/admin/agent_manage/recommand_setting',
        method: 'post',
        data
    })
}



/**
 * 推荐二维码
 */

export function agentRecommandQrcode(agentId) {
    const data = {
        agentId
    }
    return fetch({
        url: test + '/admin/agent_manage/recommand_qrcode',
        method: 'post',
        data
    })
}


export default {
    agentTypeList,
    agentSettleCycle,
    agentSettleStatus,
    agentAdd,
    sureToCreate,
    sureToModify,
    agentDelete,
    agentHead,
    productInfo,
    agentBasicInfo,
    agentBasicInfoUpdate,
    agentLoginAccountList,
    agentLResetPassword,
    agentSupplierList,
    agentSettleList,
    agentGetAgentInfo,
    agentSettleAdd,
    agentSettleDetail,
    agentSettleUpdate,
    agentSettleDelete,
    agentRecommandSetting,
    agentRecommandQrcode
}