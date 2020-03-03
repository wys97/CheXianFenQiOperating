import fetch from '@/utils/fetch'
const test = '' // '/mockjsdata/1',''



/**
 * 查询列表
 */
export function getListData({ agentName, contactName, contactMobile, agentStatus, page, limit }) {
    const data = {
        agentName,
        contactName,
        contactMobile,
        agentStatus,
        page,
        limit
    }
    return fetch({
        url: test + '/admin/agent_manage/list',
        method: 'post',
        data
    })
}



/**
 * 代理商状态
 */
export function agentStatusList() {
    return fetch({
        url: test + '/admin/agent_manage/agent_status',
        method: 'post'
    })
}



export default {
    getListData,
    agentStatusList
}