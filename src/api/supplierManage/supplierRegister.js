import fetch from '@/utils/fetch'
const test = '' // '/mockjsdata/1',''

// 商户入驻

/**
 * 查询列表
 */
//订单状态下拉
export function orderStatus() {
    return fetch({
        url: test + '/admin/apply_supplement/order_status_list',
        method: 'get',

    })
}
//保单状态下拉
export function policyStatus() {
    return fetch({
        url: test + '/admin/apply_supplement/policy_status_list',
        method: 'get',

    })
}
//发票状态下拉
export function invoiceStatus() {
    return fetch({
        url: test + '/admin/apply_supplement/invoice_status_list',
        method: 'get',

    })
}

//获取列表
export function getListData(data) {
    return fetch({
        url: test + '/admin/business_acceptance/list',
        method: 'post',
        data
    })
}

//上传发票- 保存
export function insertInvoiceInfo(data) {
    return fetch({
        url: test + '/admin/apply_supplement/insert_invoiceInfo',
        method: 'post',
        data
    })
}
//上传保单- 保存
export function insertPolicyInfo(data) {
    return fetch({
        url: test + '/admin/apply_supplement/insert_policyInfo',
        method: 'post',
        data
    })
}










/**
 *  
 * 新增分期申请
 * 
 * 
 * 
 */



// 压缩图片
export function compressImage(path, config) {
    return new Promise((resolve, reject) => {
        var img = new Image()
        img.src = path
        img.onload = function () {
            var that = this
            var w = that.width;
            var h = that.height;
            var scale = w / h;
            w = config.width || config.height * scale
            h = config.height || config.width / scale
            var quality = 0.9777;
            var canvas = document.createElement("canvas");
            var ctx = canvas.getContext("2d");
            var anw = document.createAttribute('width')
            anw.nodeValue = w
            var anh = document.createAttribute('height')
            anh.nodeValue = h
            canvas.setAttributeNode(anw)
            canvas.setAttributeNode(anh)
            if (config.quality && config.quality <= 1 && config.quality > 0) {
                quality = config.quality
            }
        
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            ctx.drawImage(this, 0, 0, canvas.width, canvas.height);
            var base64 = canvas.toDataURL("image/jpeg", quality); //压缩语
        
            // 回调函数返回base64的值，也可根据自己的需求返回blob的值
            resolve(base64)
        }
    })
}

//个人分期申请录入
export function saveDetails(data){
    return  fetch ({
        url:test +'/admin/add_apply/personal_entry',
        method:'post',
        data
    })
}

//企业分期申请录入
export function enterpriseEntry(data){
    return  fetch ({
        url:test +'/admin/add_apply/enterprise_entry',
        method:'post',
        data
    })
}

// 生成分期申请订单
export function insertApply(data){
    return  fetch ({
        url:test +'/admin/add_apply/insert_apply',
        method:'post',
        data
    })
}
// 生成分期申请订单
export function cancelOrder(data){
    return  fetch ({
        url:test +'/admin/add_apply/cancel_entry',
        method:'post',
        data
    })
}


export default {
    orderStatus,
    policyStatus,
    invoiceStatus,
    getListData,
    insertInvoiceInfo,
    insertPolicyInfo,

    //新增分期申请
    compressImage,
    saveDetails,
    enterpriseEntry,
    insertApply,
    cancelOrder
  

}