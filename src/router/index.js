import Vue from 'vue'
import Router from 'vue-router'
import Layout from '../page/layout/Layout.vue'
import LayoutTwo from '../page/layoutTwo/Layout.vue'
const _import = require('./_import_' + process.env.NODE_ENV)

Vue.use(Router)

export const constantRouterMap = [
    { path: '/login', component: _import('Login'), hidden: true },
    { path: '/404', component: _import('errorPage/404'), hidden: true },
    { path: '/401', component: _import('errorPage/401'), hidden: true },
    {
        path: '/',
        redirect: '/home',
        component: Layout,
        isHome: true,
        name: '',
        children: [
            {
                path: 'home',
                name: '首页',
                component: resolve => require(['@/page/Home.vue'], resolve)
            }
        ]
    },
    {
        path: '',
        icon: 'icon-home',
        redirect: 'home',
        component: Layout,
        noDropdown: true,
        name: '首页',
        children: [
            {
                path: 'home',
                name: '首页',
                component: resolve => require(['@/page/Home.vue'], resolve)
            }
        ]
    },
]
export default new Router({
    routes: constantRouterMap
})

export const asyncRouterMap = [
    { path: '*', redirect: '/404', hidden: true },
    // 有权限限制
    {
        path: '/supplierManage',
        component: Layout,
        roleName: 'business_accept_manage.menu',
        name: '业务受理',
        icon: 'icon-supplier-manage',
        children: [{
            path: 'supplierRegister',
            // roleName: 'business_accept_manage.apply_register.menu',
            name: '业务受理',
            // name: '商户进件登记',
            component: resolve => require(['@/page/supplierManage/SupplierRegister.vue'], resolve)
        },

        {
            hidden: true,
            path: 'supplierDetail/:id/:orderNo',
            // roleName: 'agent_manage.agent_manage.menu',
            name: '业务受理详情',
            component: resolve => require(['@/page/supplierManage/SupplierDetail.vue'], resolve)
        },

        {
            hidden: true,
            path: 'supplementaryInformation/:id',
            // roleName: 'business_accept_manage.supply_data.menu',
            // name: '资料详情',
            name: '分期申请补充详情',
            component: resolve => require(['@/page/supplierManage/supplementaryInformation.vue'], resolve)
        },
        
            // {
            //     path: 'supplierMaintainList',
            //     roleName: 'business_accept_manage.supply_data.menu',
            //     // name: '商户信息完善',
            //     component: resolve => require(['@/page/supplierMaintain/supplierMaintainList.vue'], resolve)
            // },
            // {
            //     path: 'pushFund',
            //     roleName: 'business_accept_manage.supply_data.menu',
            //     // name: '资料明细',
            //     name: '推送审核资金方',
            //     component: resolve => require(['@/page/supplierMaintain/pushFund.vue'], resolve)
            // },
        ]
    },
    {
        path: '',
        component: Layout,

        name: '订单查询',
        icon: 'icon-supplier-manage',
        children: [{
            path: 'supplierMaintainList',
            icon: 'icon-supplier-manage',
            name: '分期订单查询',
            component: resolve => require(['@/page/supplierMaintain/supplierMaintainList.vue'], resolve)
        }, {
            hidden: true,
            path: 'supplierMaintainDetail/:id/:orderNo',
            name: '分期订单详情',
            component: resolve => require(['@/page/supplierMaintain/supplierMaintainDetail.vue'], resolve)
        },]
    },
    {
        path: '/repaymentManage',
        component: Layout,
        roleName: 'payment_manage.menu',
        name: '还款管理',
        icon: 'icon-repayment-manage',
        children: [{
            path: 'repaymentList',
            roleName: 'payment_manage.payment_list.menu',
            name: '还款列表',
            component: resolve => require(['@/page/repaymentManage/repaymentList.vue'], resolve)
        },
        {
            hidden: true,
            path: 'repaymentDetail/:orderNo/:periodNo',
            roleName: 'payment_manage.payment_list.menu',
            name: '还款详情',
            component: resolve => require(['@/page/repaymentManage/repaymentDetail.vue'], resolve)
        },
        {
            path: 'repaymentRegisterList',
            roleName: 'payment_manage.payment_register.menu',
            // name: '商户还款登记',
            name: '催收列表',
            component: resolve => require(['@/page/repaymentManage/repaymentRegisterList.vue'], resolve)
        },
        {
            hidden: true,
            path: 'repaymentRegisterDetail/:id',
            roleName: 'payment_manage.payment_register.menu',
            // name: '还款登记详情',
            name: '催收详情',
            component: resolve => require(['@/page/repaymentManage/repaymentRegisterDetail.vue'], resolve)
        },
            // {
            //     path: 'repaymentIncomeList',
            //     roleName: 'payment_manage.payment_income.menu',
            //     // name: '银行进账记录',
            //     name: '资金方银行进账记录',
            //     component: resolve => require(['@/page/repaymentManage/repaymentIncomeList.vue'], resolve)
            // },
            // {
            //     hidden: true,
            //     path: 'repaymentIncomeDetail/:id',
            //     roleName: 'payment_manage.payment_income.menu',
            //     // name: '银行进账详情',
            //     name: '资金方银行进账记录详情',
            //     component: resolve => require(['@/page/repaymentManage/repaymentIncomeDetail.vue'], resolve)
            // },
        ]
    },
      {
        path: '/capticalManage',
        component: Layout,
        roleName: 'capital_manage.menu',
        name: '资金方管理',
        icon: 'icon-business-manage',
        children: [{
            path: 'capticalList',
            roleName: 'capital_manage.capital.menu',
            name: '资金方列表',
            component: resolve => require(['@/page/capticalManage/capticalList.vue'], resolve)
        },
        {
            hidden: true,
            path: 'capticalDetail/:id',
            roleName: 'capital_manage.capital.menu',
            name: '资金方详情',
            component: resolve => require(['@/page/capticalManage/capticalDetail.vue'], resolve)
        },
        {
            hidden: true,
            path: 'capticalAdd',
            roleName: 'capital_manage.capital.menu',
            name: '新增资金方',
            component: resolve => require(['@/page/capticalManage/capticalAdd.vue'], resolve)
        },
        {
            hidden: true,
            path: 'createAccount',
            roleName: 'capital_manage.capital.menu',
            name: '创建账户',
            component: resolve => require(['@/page/capticalManage/createAccount.vue'], resolve)
        }
        ]
    },

    // {
    //     path: '/capitalButtManage',
    //     roleName: 'capital_abutment_manage.menu',
    //     component: Layout,
    //     // name: '资方对接管理',
    //     name: '资金方管理',
    //     icon: 'icon-supplier-manage',
    //     children: [{
    //         path: 'intoButtList',
    //         roleName: 'capital_abutment_manage.supplier_abutment.menu',
    //         // name: '商户进件对接',
    //         name: '资金方列表',
    //         component: resolve => require(['@/page/capitalButtManage/intoButtList.vue'], resolve)
    //     },
    //     {
    //         hidden: true,
    //         path: 'intoButtDetail/:id',
    //         roleName: 'capital_abutment_manage.supplier_abutment.menu',
    //         // name: '商户进件对接详情',
    //         name: '资金方详情',
    //         component: resolve => require(['@/page/capitalButtManage/intoButtDetail.vue'], resolve)
    //     },
    //     ]
    // },
    {
        path: '/agentManage',
        component: Layout,
        roleName: 'agent_manage.menu',
        name: '代理商管理',
        icon: 'icon-account-manage',
        children: [{
            path: 'agentList',
            roleName: 'agent_manage.agent_manage.menu',
            // name: '代理商管理',
            name: '代理商列表',
            component: resolve => require(['@/page/agentManage/agentList.vue'], resolve)
        },
        {
            hidden: true,
            path: 'agentAdd',
            roleName: 'agent_manage.agent_manage.menu',
            name: '代理商信息新增',
            component: resolve => require(['@/page/agentManage/agentAdd.vue'], resolve)
        },
        {
            hidden: true,
            path: 'agentDetail/:id',
            roleName: 'agent_manage.agent_manage.menu',
            name: '代理商信息详情',
            component: resolve => require(['@/page/agentManage/agentDetail.vue'], resolve)
        },
        {
            hidden: true,
            path: 'agentUpdate/:id',
            roleName: 'agent_manage.agent_manage.menu',
            name: '代理商信息修改',
            component: resolve => require(['@/page/agentManage/agentUpdate.vue'], resolve)
        },
            // {
            //     hidden: true,
            //     path: 'settleBatchAdd/:id',
            //     roleName: 'agent_manage.agent_manage.menu',
            //     name: '结算信息新增',
            //     component: resolve => require(['@/page/agentManage/settleBatchAdd.vue'], resolve)
            // },
            // {
            //     hidden: true,
            //     path: 'settleBatchUpdate/:id',
            //     roleName: 'agent_manage.agent_manage.menu',
            //     name: '结算信息修改',
            //     component: resolve => require(['@/page/agentManage/settleBatchUpdate.vue'], resolve)
            // },
        ]
    },
    {
        path: '/itemManage',
        component: Layout,
        roleName: 'capital_manage.menu',
        name: '项目管理',
        icon: 'icon-business-manage',
        children: [{
            path: 'roleManage',
            roleName: 'capital_manage.capital.menu',
            name: '场景方管理',
            component: resolve => require(['@/page/itemManage/roleManage.vue'], resolve)
        },
        {
            hidden: true,
            path: '/createScene',
            roleName: 'capital_manage.capital.menu',
            name: '创建场景方',
            component: resolve => require(['@/page/itemManage/createScene.vue'], resolve)
        },
        {
            hidden: true,
            path: '/roleManageDetails/:id',
            roleName: 'capital_manage.capital.menu',
            name: '场景方管理详情',
            component: resolve => require(['@/page/itemManage/roleManageDetails.vue'], resolve)
        },
        {
            path: 'productManage',
            roleName: 'capital_manage.capital.menu',
            name: '产品管理',
            component: resolve => require(['@/page/itemManage/productManage.vue'], resolve)
        },
        {
            hidden: true,
            path: '/createProductInformation',
            roleName: 'capital_manage.capital.menu',
            name: '创建产品信息',
            component: resolve => require(['@/page/itemManage/createProductInformation.vue'], resolve)
        },
        {
            hidden: true,
            path: '/createProductDetails/:id',
            roleName: 'capital_manage.capital.menu',
            name: '产品管理详情',
            component: resolve => require(['@/page/itemManage/createProductDetails.vue'], resolve)
        },
            // {
            //     path: 'itemConfiguration',
            //     roleName: 'capital_manage.capital.menu',
            //     name: '项目配置',
            //     component: resolve => require(['@/page/itemManage/itemConfiguration.vue'], resolve)
            // },
            // {
            //     hidden: true,
            //     path: '/createProject',
            //     roleName: 'capital_manage.capital.menu',
            //     name: '创建项目信息',
            //     component: resolve => require(['@/page/itemManage/createProject.vue'], resolve)
            // },
            // {
            //     hidden: true,
            //     path: '/projectDetails/:id',
            //     roleName: 'capital_manage.capital.menu',
            //     name: '项目配置详情',
            //     component: resolve => require(['@/page//itemManage/projectDetails.vue'], resolve)
            // }
        ]
    },
    {
        path: '/authorityManage',
        component: Layout,
        roleName: 'permission_manage.menu',
        name: '权限管理',
        icon: 'icon-authority-manage',
        children: [
            {
                path: 'roleMaintain',
                roleName: 'permission_manage.role_manage.menu',
                // name: '角色维护',
                name: '角色管理',
                component: resolve => require(['@/page/authorityManage/roleMaintain.vue'], resolve)
            },
            {
                path: 'userMaintain',
                roleName: 'permission_manage.operator_manage.menu',
                // name: '用户维护',
                name: '用户管理',
                component: resolve => require(['@/page/authorityManage/userMaintain.vue'], resolve)
            },

        ]
    },



    // {
    //     path: '/approveManage',
    //     component: Layout,
    //     roleName: 'approve_manage.menu',
    //     name: '审批管理',
    //     icon: 'icon-supplier-manage',
    //     children: [{
    //         path: 'firstTrialList',
    //         roleName: 'approve_manage.check.menu',
    //         name: '初审',
    //         component: resolve => require(['@/page/approveManage/firstTrialList.vue'], resolve)
    //     },
    //     {
    //         hidden: true,
    //         path: 'firstTrialDetail/:id',
    //         roleName: 'approve_manage.check.menu',
    //         name: '初审详情',
    //         component: resolve => require(['@/page/approveManage/firstTrialDetail.vue'], resolve)
    //     },
    //     {
    //         path: 'recheckList',
    //         roleName: 'approve_manage.recheck.menu',
    //         name: '复审',
    //         component: resolve => require(['@/page/approveManage/recheckList.vue'], resolve)
    //     },
    //     {
    //         hidden: true,
    //         path: 'recheckDetail/:id',
    //         roleName: 'approve_manage.recheck.menu',
    //         name: '复审详情',
    //         component: resolve => require(['@/page/approveManage/recheckDetail.vue'], resolve)
    //     },
    // {
    //     path: 'reviewRecheckList',
    //     roleName: 'approve_manage.review.menu',
    //     name: '复核拒绝的审批',
    //     component: resolve => require(['@/page/approveManage/reviewRecheckList.vue'], resolve)
    // },
    // {
    //     hidden: true,
    //     path: 'reviewRecheckDetail/:id',
    //     roleName: 'approve_manage.review.menu',
    //     name: '复核拒绝的审批详情',
    //     component: resolve => require(['@/page/approveManage/reviewRecheckDetail.vue'], resolve)
    // },
    //     {
    //         path: 'reviewRecheckList',
    //         roleName: 'approve_manage.review.menu',
    //         name: '复核拒绝列表',
    //         component: resolve => require(['@/page/approveManage/reviewRecheckList.vue'], resolve)
    //     },
    //     {
    //         hidden: true,
    //         path: 'reviewRecheckDetail/:id',
    //         roleName: 'approve_manage.review.menu',
    //         name: '复核审批详情',
    //         component: resolve => require(['@/page/approveManage/reviewRecheckDetail.vue'], resolve)
    //     },
    //     {
    //         path: 'finalfirstList',
    //         roleName: 'approve_manage.first_check.menu',
    //         // name: '终审一审',
    //         name: '终审',
    //         component: resolve => require(['@/page/approveManage/finalfirstList.vue'], resolve)
    //     },
    //     {
    //         hidden: true,
    //         path: 'finalfirstDetail/:id',
    //         roleName: 'approve_manage.first_check.menu',
    //         // name: '终审一审详情',
    //         name: '终审详情',
    //         component: resolve => require(['@/page/approveManage/finalfirstDetail.vue'], resolve)
    //     },
    //         // {
    //         //     path: 'finalsecondList',
    //         //     roleName: 'approve_manage.second_check.menu',
    //         //     name: '终审二审',
    //         //     component: resolve => require(['@/page/approveManage/finalsecondList.vue'], resolve)
    //         // },
    //         // {
    //         //     hidden: true,
    //         //     path: 'finalsecondDetail/:id',
    //         //     roleName: 'approve_manage.second_check.menu',
    //         //     name: '终审二审详情',
    //         //     component: resolve => require(['@/page/approveManage/finalsecondDetail.vue'], resolve)
    //         // }
    //     ]
    // },

    // {
    //     path: '/creditLineManage',
    //     component: Layout,
    //     roleName: 'line_credit.menu',
    //     name: '授信管理',
    //     icon: 'icon-business-manage',
    //     children: [{
    //         path: 'creditLineList',
    //         roleName: 'line_credit.credit_info.menu',
    //         name: '商户授信情况列表',
    //         component: resolve => require(['@/page/creditLineManage/creditLineList.vue'], resolve)
    //     },
    //     {
    //         hidden: true,
    //         path: 'creditLineDetail/:id',
    //         roleName: 'line_credit.credit_info.menu',
    //         name: '商户授信情况详情',
    //         component: resolve => require(['@/page/creditLineManage/creditLineDetail.vue'], resolve)
    //     },
    //     ]
    // },
    // {
    //     path: '/supplierInfoManage',
    //     component: Layout,
    //     roleName: 'supplier_manage.menu',
    //     name: '商户管理',
    //     icon: 'icon-supplier-manage',
    //     children: [{
    //         path: 'supplierInfoList',
    //         roleName: 'supplier_manage.supplier_info_manage.menu',
    //         name: '商户信息管理',
    //         component: resolve => require(['@/page/supplierInfoManage/supplierInfoList.vue'], resolve)
    //     },
    //     {
    //         hidden: true,
    //         path: 'supplierInfoDetail/:id',
    //         roleName: 'supplier_manage.supplier_info_manage.menu',
    //         name: '商户信息详情',
    //         component: resolve => require(['@/page/supplierInfoManage/supplierInfoDetail.vue'], resolve)
    //     },
    //     ]
    // },
    // {
    //     path: '/accountManage',
    //     component: Layout,
    //     roleName: 'receivable_manage.menu',
    //     name: '应收账款管理',
    //     icon: 'icon-account-manage',
    //     children: [{
    //         path: 'accountReceivable',
    //         roleName: 'receivable_manage.receive_list.menu',
    //         name: '应收账款列表',
    //         component: resolve => require(['@/page/accountManage/accountReceivable.vue'], resolve)
    //     },
    //     {
    //         hidden: true,
    //         path: 'accountDetail/:id',
    //         roleName: 'receivable_manage.receive_list.menu',
    //         name: '应收账款详情',
    //         component: resolve => require(['@/page/accountManage/accountDetail.vue'], resolve)
    //     }
    //     ]
    // },
    // {
    //     path: '/financeManage',
    //     component: Layout,
    //     roleName: 'finance_manage.menu',
    //     // name: '放款管理',
    //     name: '融资审核管理',
    //     icon: 'icon-finance-manage',
    //     children: [{
    //         path: 'financeAudit',
    //         roleName: 'finance_manage.finance_list.menu',
    //         // name: '提款申请列表',
    //         name: '融资审核列表',
    //         component: resolve => require(['@/page/financeManage/financeAudit.vue'], resolve)
    //     },
    //     {
    //         hidden: true,
    //         path: 'financeDetail/:id',
    //         roleName: 'finance_manage.finance_list.menu',
    //         // name: '提款申请详情',
    //         name: '融资审核详情',
    //         component: resolve => require(['@/page/financeManage/financeDetail.vue'], resolve)
    //     }
    //     ]
    // },
    // {
    //     path: '/orderSyncManage',
    //     component: Layout,
    //     roleName: 'loan_post_inspect.menu',
    //     // name: '贷后检查',
    //     name: '贷后管理',
    //     icon: 'icon-supplier-manage',
    //     children: [
    //         {
    //             path: 'orderSyncList',
    //             roleName: 'loan_post_inspect.platform_deal_data_monitor.menu',
    //             name: '平台交易数据监控',
    //             component: resolve => require(['@/page/orderSyncManage/orderSyncList.vue'], resolve)
    //         },
    //         {
    //             // hidden: true,
    //             path: 'postLoanWarning',
    //             roleName: 'loan_post_inspect.trade_post_inspect.menu',
    //             name: '贷后预警设置',
    //             component: resolve => require(['@/page/orderSyncManage/postLoanWarning.vue'], resolve)
    //         },
    //         {
    //             hidden: true,
    //             path: 'postLoanWarningDetail/:id',
    //             roleName: 'loan_post_inspect.trade_post_inspect.menu',
    //             name: '贷后预警设置详情',
    //             component: resolve => require(['@/page/orderSyncManage/postLoanWarningDetail.vue'], resolve)
    //         },
    //         {
    //             path: 'postLoanRegistList',
    //             roleName: 'loan_post_inspect.trade_post_inspect.menu',
    //             name: '贷后检查登记',
    //             component: resolve => require(['@/page/orderSyncManage/postLoanRegistList.vue'], resolve)
    //         },
    //         {
    //             hidden: true,
    //             path: 'postLoanAdd',
    //             roleName: 'loan_post_inspect.trade_post_inspect.menu',
    //             name: '新增贷后检查登记',
    //             component: resolve => require(['@/page/orderSyncManage/postLoanAdd.vue'], resolve)
    //         },
    //         {
    //             hidden: true,
    //             path: 'postLoanDetail/:id',
    //             roleName: 'loan_post_inspect.trade_post_inspect.menu',
    //             name: '贷后检查登记详情',
    //             component: resolve => require(['@/page/orderSyncManage/postLoanDetail.vue'], resolve)
    //         },
    //         {
    //             path: 'overdueCollectionList',
    //             roleName: 'loan_post_inspect.trade_overdue_collection.menu',
    //             name: '催收管理',
    //             component: resolve => require(['@/page/orderSyncManage/overdueCollectionList.vue'], resolve)
    //         },
    //         {
    //             hidden: true,
    //             path: 'overdueCollectionAdd',
    //             roleName: 'loan_post_inspect.trade_overdue_collection.menu',
    //             name: '催收新增',
    //             component: resolve => require(['@/page/orderSyncManage/overdueCollectionAdd.vue'], resolve)
    //         },
    //         {
    //             hidden: true,
    //             path: 'overdueCollectionDetail/:id',
    //             roleName: 'loan_post_inspect.trade_overdue_collection.menu',
    //             name: '催收详情',
    //             component: resolve => require(['@/page/orderSyncManage/overdueCollectionDetail.vue'], resolve)
    //         },
    //     ]
    // },
    // {
    //     path: '/protocolManage',
    //     roleName: 'agreement_manage.menu',
    //     component: Layout,
    //     name: '协议管理',
    //     icon: 'icon-supplier-manage',
    //     children: [{
    //         path: 'contractList',
    //         roleName: 'agreement_manage.contract.menu',
    //         // name: '合同列表',
    //         name: '服务协议管理',
    //         component: resolve => require(['@/page/protocolManage/contractList.vue'], resolve)
    //     },
    //     {
    //         hidden: true,
    //         path: 'contractDetail/:id',
    //         roleName: 'agreement_manage.contract.menu',
    //         name: '合同详情',
    //         component: resolve => require(['@/page/protocolManage/contractDetail.vue'], resolve)
    //     },
    //     {
    //         hidden: true,
    //         path: 'contractAdd',
    //         roleName: 'agreement_manage.contract.menu',
    //         name: '新增合同',
    //         component: resolve => require(['@/page/protocolManage/contractAdd.vue'], resolve)
    //     },
    //     ]
    // },

  

    // // {
    // //     path: '/authorityManage',
    // //     component: Layout,
    // //     roleName: 'permission_manage.menu',
    // //     name: '保险分期管理',
    // //     icon: 'icon-authority-manage',
    // //     children: []
    // // },


    // {
    //     hidden: true,
    //     path: '/enterpriseDataManage',
    //     component: LayoutTwo,
    //     name: '企业管理',
    //     icon: 'icon-supplier-manage',
    //     children: [{
    //         path: 'enterpriseData/:id',
    //         name: '企业资料',
    //         component: resolve => require(['@/page/enterpriseDataManage/enterpriseData.vue'], resolve)
    //     },
    //     {
    //         path: 'collaterallist/:id',
    //         name: '押品资料',
    //         component: resolve => require(['@/page/enterpriseDataManage/collaterallist.vue'], resolve)
    //     },
    //     {
    //         path: 'guarantorList/:id',
    //         name: '担保人',
    //         component: resolve => require(['@/page/enterpriseDataManage/guarantorList.vue'], resolve)
    //     },
    //     ]
    // },

    // {
    //     path: '/scoreCardManage',
    //     component: Layout,
    //     roleName: 'scorecard_rule_manage.menu',
    //     name: '评分规则设置',
    //     icon: 'icon-account-manage',
    //     children: [{
    //         path: 'scoreCardList',
    //         roleName: 'scorecard_rule_manage.scorecard_manage.menu',
    //         name: '评分卡管理',
    //         component: resolve => require(['@/page/scoreCardManage/scoreCardList.vue'], resolve)
    //     },
    //     {
    //         hidden: true,
    //         path: 'scoreCardDetail/:id',
    //         roleName: 'scorecard_rule_manage.scorecard_manage.menu',
    //         name: '评分卡详情',
    //         component: resolve => require(['@/page/scoreCardManage/scoreCardDetail.vue'], resolve)
    //     },
    //     {
    //         hidden: true,
    //         path: 'scoreCardAdd',
    //         roleName: 'scorecard_rule_manage.scorecard_manage.menu',
    //         name: '评分卡新增',
    //         component: resolve => require(['@/page/scoreCardManage/scoreCardAdd.vue'], resolve)
    //     },
    //     ]
    // },

    // {
    //     path: '/guarantorManage',
    //     roleName: 'guarantor_manage.menu',
    //     component: Layout,
    //     name: '担保人管理',
    //     icon: 'icon-supplier-manage',
    //     children: [{
    //         path: 'guarantorList',
    //         roleName: 'guarantor_manage.guarantor.menu',
    //         name: '担保人列表',
    //         component: resolve => require(['@/page/guarantorManage/guarantorList.vue'], resolve)
    //     },
    //     {
    //         hidden: true,
    //         path: 'guarantorDetail/:id',
    //         roleName: 'guarantor_manage.guarantor.menu',
    //         name: '担保人详情',
    //         component: resolve => require(['@/page/guarantorManage/guarantorDetail.vue'], resolve)
    //     },
    //     {
    //         hidden: true,
    //         path: 'guarantorAdd',
    //         roleName: 'guarantor_manage.guarantor.menu',
    //         name: '新增担保人',
    //         component: resolve => require(['@/page/guarantorManage/guarantorAdd.vue'], resolve)
    //     },
    //     ]
    // },
    // {
    //     path: '/collateralManage',
    //     component: Layout,
    //     roleName: 'collateral_manage.menu',
    //     name: '押品管理',
    //     icon: 'icon-supplier-manage',
    //     children: [{
    //         path: 'registerList',
    //         roleName: 'collateral_manage.register.menu',
    //         name: '押品信息登记',
    //         component: resolve => require(['@/page/collateralManage/registerList.vue'], resolve)
    //     },
    //     {
    //         hidden: true,
    //         path: 'registerDetail/:id',
    //         roleName: 'collateral_manage.register.menu',
    //         name: '押品信息登记详情',
    //         component: resolve => require(['@/page/collateralManage/registerDetail.vue'], resolve)
    //     },
    //     {
    //         hidden: true,
    //         path: 'registerAdd',
    //         roleName: 'collateral_manage.register.menu',
    //         name: '新增押品信息登记',
    //         component: resolve => require(['@/page/collateralManage/registerAdd.vue'], resolve)
    //     },
    //     {
    //         path: 'assessList',
    //         roleName: 'collateral_manage.assess.menu',
    //         name: '押品评估',
    //         component: resolve => require(['@/page/collateralManage/assessList.vue'], resolve)
    //     },
    //     {
    //         hidden: true,
    //         path: 'assessDetail/:id',
    //         roleName: 'collateral_manage.assess.menu',
    //         name: '押品评估详情',
    //         component: resolve => require(['@/page/collateralManage/assessDetail.vue'], resolve)
    //     },
    //     {
    //         path: 'checkList',
    //         roleName: 'collateral_manage.check.menu',
    //         name: '押品审核',
    //         component: resolve => require(['@/page/collateralManage/checkList.vue'], resolve)
    //     },
    //     {
    //         hidden: true,
    //         path: 'checkDetail/:id',
    //         roleName: 'collateral_manage.check.menu',
    //         name: '押品审核详情',
    //         component: resolve => require(['@/page/collateralManage/checkDetail.vue'], resolve)
    //     },
    //     {
    //         path: 'belaidupList',
    //         roleName: 'collateral_manage.belaidup.menu',
    //         name: '押品入库',
    //         component: resolve => require(['@/page/collateralManage/belaidupList.vue'], resolve)
    //     },
    //     {
    //         hidden: true,
    //         path: 'belaidupDetail/:id',
    //         roleName: 'collateral_manage.belaidup.menu',
    //         name: '押品入库详情',
    //         component: resolve => require(['@/page/collateralManage/belaidupDetail.vue'], resolve)
    //     },
    //     {
    //         path: 'auctionList',
    //         roleName: 'collateral_manage.auction.menu',
    //         name: '押品拍卖',
    //         component: resolve => require(['@/page/collateralManage/auctionList.vue'], resolve)
    //     },
    //     {
    //         hidden: true,
    //         path: 'auctionDetail/:id',
    //         roleName: 'collateral_manage.auction.menu',
    //         name: '押品拍卖详情',
    //         component: resolve => require(['@/page/collateralManage/auctionDetail.vue'], resolve)
    //     },
    //     {
    //         path: 'outList',
    //         roleName: 'collateral_manage.out.menu',
    //         name: '押品出库',
    //         component: resolve => require(['@/page/collateralManage/outList.vue'], resolve)
    //     },
    //     {
    //         hidden: true,
    //         path: 'outDetail/:id',
    //         roleName: 'collateral_manage.out.menu',
    //         name: '押品出库详情',
    //         component: resolve => require(['@/page/collateralManage/outDetail.vue'], resolve)
    //     }
    //     ]
    // },
    // {
    //     path: '/standingInfoManage',
    //     component: Layout,
    //     roleName: 'standingbook_manage.menu',
    //     name: '台账管理',
    //     icon: 'icon-supplier-manage',
    //     children: [{
    //         path: 'standingInfoList',
    //         roleName: 'standingbook_manage.menu',
    //         name: '台账信息列表',
    //         component: resolve => require(['@/page/standingInfoManage/standingInfoList.vue'], resolve)
    //     }]
    // },


    // {
    //     hidden: true,
    //     path: '/CoreBusinessManage',
    //     component: Layout,
    //     roleName: '',
    //     name: '核心企业管理',
    //     icon: 'icon-business-manage',
    //     children: [{
    //         path: 'CoreBusinessList',
    //         roleName: '',
    //         name: '核心企业列表',
    //         component: resolve => require(['@/page/CoreBusinessManage/CoreBusinessList.vue'], resolve)
    //     },
    //     {
    //         hidden: true,
    //         path: 'CoreBusinessDetail/:id',
    //         roleName: '',
    //         name: '核心企业详情',
    //         component: resolve => require(['@/page/CoreBusinessManage/CoreBusinessDetail.vue'], resolve)
    //     },
    //     {
    //         hidden: true,
    //         path: 'CoreBusinessAdd',
    //         roleName: '',
    //         name: '新增核心企业',
    //         component: resolve => require(['@/page/CoreBusinessManage/CoreBusinessAdd.vue'], resolve)
    //     }
    //     ]
    // },

    // {
    //     path: '/creditReportManage',
    //     roleName: 'creditline_report_manage.menu',
    //     component: Layout,
    //     name: '授信管理',
    //     icon: 'icon-supplier-manage',
    //     children: [{
    //         path: 'guarantorList',
    //         roleName: 'creditline_report_manage.zhonglv_bank.menu',
    //         name: '中旅银行',
    //         component: resolve => require(['@/page/creditReportManage/chinaTravelBankList.vue'], resolve)
    //     },
    //     {
    //         hidden: true,
    //         path: 'chinaTravelBankDetail/:id',
    //         roleName: '',
    //         name: '授信报告详情',
    //         component: resolve => require(['@/page/creditReportManage/chinaTravelBankDetail.vue'], resolve)
    //     }
    //     ]
    // },
    // {
    //     hidden: true,
    //     path: '/warrantiesManage',
    //     component: Layout,
    //     roleName: '',
    //     name: '担保额度管理',
    //     icon: 'icon-business-manage',
    //     children: [{
    //         path: 'warrantiesList',
    //         roleName: '',
    //         name: '担保额度列表',
    //         component: resolve => require(['@/page/warrantiesManage/warrantiesList.vue'], resolve)
    //     },
    //     {
    //         hidden: true,
    //         path: 'warrantiesDetail/:id',
    //         roleName: '',
    //         name: '担保额度详情',
    //         component: resolve => require(['@/page/warrantiesManage/warrantiesDetail.vue'], resolve)
    //     },
    //     {
    //         path: 'warrantiesStatisticsList',
    //         roleName: '',
    //         name: '担保额度统计',
    //         component: resolve => require(['@/page/warrantiesManage/warrantiesStatisticsList.vue'], resolve)
    //     },
    //     ]
    // },
    // {
    //     path: '/loanClassificationManage',
    //     component: Layout,
    //     roleName: 'loan_classification.menu',
    //     name: '贷款五级分类',
    //     icon: 'icon-business-manage',
    //     children: [{
    //         path: 'loanClassificationList',
    //         roleName: 'loan_classification.adjust.menu',
    //         name: '五级分类调整',
    //         component: resolve => require(['@/page/loanClassificationManage/loanClassificationList.vue'], resolve)
    //     },
    //     {
    //         hidden: true,
    //         path: 'loanClassificationDetail/:id',
    //         roleName: 'loan_classification.adjust.menu',
    //         name: '五级分类调整详情',
    //         component: resolve => require(['@/page/loanClassificationManage/loanClassificationDetail.vue'], resolve)
    //     },
    //     {
    //         path: 'adjustRecordList',
    //         roleName: 'loan_classification.adjust_record.menu',
    //         name: '五级分类调整记录',
    //         component: resolve => require(['@/page/loanClassificationManage/adjustRecordList.vue'], resolve)
    //     },
    //     ]
    // },
    // {
    //     path: '/statementManage',
    //     component: Layout,
    //     roleName: 'report_manage.menu',
    //     name: '报表管理',
    //     icon: 'icon-business-manage',
    //     children: [{
    //         path: 'operationReport',
    //         roleName: 'report_manage.operation_report.menu',
    //         name: '运营报告',
    //         component: resolve => require(['@/page/statementManage/operationReport.vue'], resolve)
    //     },
    //     {
    //         path: 'profitReportlist',
    //         roleName: 'report_manage.profit_report.menu',
    //         name: '收益表',
    //         component: resolve => require(['@/page/statementManage/profitReportlist.vue'], resolve)
    //     },
    //     {
    //         path: 'assetDailyReportList',
    //         roleName: 'report_manage.asset_daily_report.menu',
    //         name: '资产日报表',
    //         component: resolve => require(['@/page/statementManage/assetDailyReportList.vue'], resolve)
    //     },
    //     {
    //         path: 'fiveClassList',
    //         roleName: 'report_manage.classification_report.menu',
    //         name: '五级分类报表',
    //         component: resolve => require(['@/page/statementManage/fiveClassList.vue'], resolve)
    //     },
    //     {
    //         path: 'loanReportList',
    //         roleName: 'report_manage.loan_report.menu',
    //         name: '放款报表',
    //         component: resolve => require(['@/page/statementManage/loanReportList.vue'], resolve)
    //     },
    //     {
    //         path: 'backReportList',
    //         roleName: 'report_manage.back_report.menu',
    //         name: '还款报表',
    //         component: resolve => require(['@/page/statementManage/backReportList.vue'], resolve)
    //     },
    //     {
    //         path: 'overdueReportList',
    //         roleName: 'report_manage.overdue_report.menu',
    //         name: '逾期情况表',
    //         component: resolve => require(['@/page/statementManage/overdueReportList.vue'], resolve)
    //     }
    //     ]
    // },





]