import Cookies from 'js-cookie'

const app = {
  state: {
    sidebar: {
      opened: !+Cookies.get('sidebarStatus')
    },
    tableMaxHeight: 500,
    visitedViews: []
  },
  mutations: {
    TOGGLE_SIDEBAR: state => {
      if (state.sidebar.opened) {
        Cookies.set('sidebarStatus', 1)
      } else {
        Cookies.set('sidebarStatus', 0)
      }
      state.sidebar.opened = !state.sidebar.opened
    },
    ADD_VISITED_VIEWS: (state, view) => {
      if (view.path === '/' && view.name === '') return
      if (state.visitedViews.some(v => v.path === view.path)) return
      if (view.name === '业务受理详情') {
        const findIndex = state.visitedViews.findIndex((v) => { return v.name === '业务受理详情' })
        if (findIndex === -1) {
          state.visitedViews.push({ name: view.name, path: view.path, componentName: view.matched[view.matched.length - 1].components.default.name })
        } else {
          state.visitedViews[findIndex].path = view.path
        }
        filter();
        return
      }
      if (view.name === '分期申请补充详情') {
        const findIndex = state.visitedViews.findIndex((v) => { return v.name === '分期申请补充详情' })
        if (findIndex === -1) {
          state.visitedViews.push({ name: view.name, path: view.path, componentName: view.matched[view.matched.length - 1].components.default.name })
        } else {
          state.visitedViews[findIndex].path = view.path
        }
        filter();
        return
      }
      if (view.name === '分期订单详情') {
        const findIndex = state.visitedViews.findIndex((v) => { return v.name === '分期订单详情' })
        if (findIndex === -1) {
          state.visitedViews.push({ name: view.name, path: view.path, componentName: view.matched[view.matched.length - 1].components.default.name })
        } else {
          state.visitedViews[findIndex].path = view.path
        }
        filter();
        return
      }
      if (view.name === '复审详情') {
        const findIndex = state.visitedViews.findIndex((v) => { return v.name === '复审详情' })
        if (findIndex === -1) {
          state.visitedViews.push({ name: view.name, path: view.path, componentName: view.matched[view.matched.length - 1].components.default.name })
        } else {
          state.visitedViews[findIndex].path = view.path
        }
        filter();
        return
      }
      if (view.name === '复核审批详情') {
        const findIndex = state.visitedViews.findIndex((v) => { return v.name === '复核审批详情' })
        if (findIndex === -1) {
          state.visitedViews.push({ name: view.name, path: view.path, componentName: view.matched[view.matched.length - 1].components.default.name })
        } else {
          state.visitedViews[findIndex].path = view.path
        }
        filter();
        return
      }
      if (view.name === '终审详情') {
        const findIndex = state.visitedViews.findIndex((v) => { return v.name === '终审详情' })
        if (findIndex === -1) {
          state.visitedViews.push({ name: view.name, path: view.path, componentName: view.matched[view.matched.length - 1].components.default.name })
        } else {
          state.visitedViews[findIndex].path = view.path
        }
        filter();
        return
      }
      if (view.name === '终审二审详情') {
        const findIndex = state.visitedViews.findIndex((v) => { return v.name === '终审二审详情' })
        if (findIndex === -1) {
          state.visitedViews.push({ name: view.name, path: view.path, componentName: view.matched[view.matched.length - 1].components.default.name })
        } else {
          state.visitedViews[findIndex].path = view.path
        }
        filter();
        return
      }
      if (view.name === '授信报告详情') {
        const findIndex = state.visitedViews.findIndex((v) => { return v.name === '授信报告详情' })
        if (findIndex === -1) {
          state.visitedViews.push({ name: view.name, path: view.path, componentName: view.matched[view.matched.length - 1].components.default.name })
        } else {
          state.visitedViews[findIndex].path = view.path
        }
        filter();
        return
      }
      if (view.name === '商户授信情况详情') {
        const findIndex = state.visitedViews.findIndex((v) => { return v.name === '商户授信情况详情' })
        if (findIndex === -1) {
          state.visitedViews.push({ name: view.name, path: view.path, componentName: view.matched[view.matched.length - 1].components.default.name })
        } else {
          state.visitedViews[findIndex].path = view.path
        }
        filter();
        return
      }
      if (view.name === '担保人详情') {
        const findIndex = state.visitedViews.findIndex((v) => { return v.name === '担保人详情' })
        if (findIndex === -1) {
          state.visitedViews.push({ name: view.name, path: view.path, componentName: view.matched[view.matched.length - 1].components.default.name })
        } else {
          state.visitedViews[findIndex].path = view.path
        }
        filter();
        return
      }
      if (view.name === '押品信息登记') {
        const findIndex = state.visitedViews.findIndex((v) => { return v.name === '押品信息登记' })
        if (findIndex === -1) {
          state.visitedViews.push({ name: view.name, path: view.path, componentName: view.matched[view.matched.length - 1].components.default.name })
        } else {
          state.visitedViews[findIndex].path = view.path
        }
        filter();
        return
      }
      if (view.name === '押品信息登记详情') {
        const findIndex = state.visitedViews.findIndex((v) => { return v.name === '押品信息登记详情' })
        if (findIndex === -1) {
          state.visitedViews.push({ name: view.name, path: view.path, componentName: view.matched[view.matched.length - 1].components.default.name })
        } else {
          state.visitedViews[findIndex].path = view.path
        }
        filter();
        return
      }
      if (view.name === '押品评估详情') {
        const findIndex = state.visitedViews.findIndex((v) => { return v.name === '押品评估详情' })
        if (findIndex === -1) {
          state.visitedViews.push({ name: view.name, path: view.path, componentName: view.matched[view.matched.length - 1].components.default.name })
        } else {
          state.visitedViews[findIndex].path = view.path
        }
        filter();
        return
      }
      if (view.name === '押品审核详情') {
        const findIndex = state.visitedViews.findIndex((v) => { return v.name === '押品审核详情' })
        if (findIndex === -1) {
          state.visitedViews.push({ name: view.name, path: view.path, componentName: view.matched[view.matched.length - 1].components.default.name })
        } else {
          state.visitedViews[findIndex].path = view.path
        }
        filter();
        return
      }
      if (view.name === '押品入库详情') {
        const findIndex = state.visitedViews.findIndex((v) => { return v.name === '押品入库详情' })
        if (findIndex === -1) {
          state.visitedViews.push({ name: view.name, path: view.path, componentName: view.matched[view.matched.length - 1].components.default.name })
        } else {
          state.visitedViews[findIndex].path = view.path
        }
        filter();
        return
      }
      if (view.name === '押品拍卖详情') {
        const findIndex = state.visitedViews.findIndex((v) => { return v.name === '押品拍卖详情' })
        if (findIndex === -1) {
          state.visitedViews.push({ name: view.name, path: view.path, componentName: view.matched[view.matched.length - 1].components.default.name })
        } else {
          state.visitedViews[findIndex].path = view.path
        }
        filter();
        return
      }
      if (view.name === '押品出库详情') {
        const findIndex = state.visitedViews.findIndex((v) => { return v.name === '押品出库详情' })
        if (findIndex === -1) {
          state.visitedViews.push({ name: view.name, path: view.path, componentName: view.matched[view.matched.length - 1].components.default.name })
        } else {
          state.visitedViews[findIndex].path = view.path
        }
        filter();
        return
      }
      if (view.name === '商户进件对接详情') {
        const findIndex = state.visitedViews.findIndex((v) => { return v.name === '商户进件对接详情' })
        if (findIndex === -1) {
          state.visitedViews.push({ name: view.name, path: view.path, componentName: view.matched[view.matched.length - 1].components.default.name })
        } else {
          state.visitedViews[findIndex].path = view.path
        }
        filter();
        return
      }
      if (view.name === '新增押品信息登记') {
        const findIndex = state.visitedViews.findIndex((v) => { return v.name === '新增押品信息登记' })
        if (findIndex === -1) {
          state.visitedViews.push({ name: view.name, path: view.path, componentName: view.matched[view.matched.length - 1].components.default.name })
        } else {
          state.visitedViews[findIndex].path = view.path
        }
        filter();
        return
      }
      if (view.name === '合同列表') {
        const findIndex = state.visitedViews.findIndex((v) => { return v.name === '合同列表' })
        if (findIndex === -1) {
          state.visitedViews.push({ name: view.name, path: view.path, componentName: view.matched[view.matched.length - 1].components.default.name })
        } else {
          state.visitedViews[findIndex].path = view.path
        }
        filter();
        return
      }
      if (view.name === '合同详情') {
        const findIndex = state.visitedViews.findIndex((v) => { return v.name === '合同详情' })
        if (findIndex === -1) {
          state.visitedViews.push({ name: view.name, path: view.path, componentName: view.matched[view.matched.length - 1].components.default.name })
        } else {
          state.visitedViews[findIndex].path = view.path
        }
        filter();
        return
      }
      if (view.name === '贷后检查登记') {
        const findIndex = state.visitedViews.findIndex((v) => { return v.name === '贷后检查登记' })
        if (findIndex === -1) {
          state.visitedViews.push({ name: view.name, path: view.path, componentName: view.matched[view.matched.length - 1].components.default.name })
        } else {
          state.visitedViews[findIndex].path = view.path
        }
        filter();
        return
      }
      if (view.name === '贷后检查登记详情') {
        const findIndex = state.visitedViews.findIndex((v) => { return v.name === '贷后检查登记详情' })
        if (findIndex === -1) {
          state.visitedViews.push({ name: view.name, path: view.path, componentName: view.matched[view.matched.length - 1].components.default.name })
        } else {
          state.visitedViews[findIndex].path = view.path
        }
        filter();
        return
      }
      if (view.name === '催收管理') {
        const findIndex = state.visitedViews.findIndex((v) => { return v.name === '催收管理' })
        if (findIndex === -1) {
          state.visitedViews.push({ name: view.name, path: view.path, componentName: view.matched[view.matched.length - 1].components.default.name })
        } else {
          state.visitedViews[findIndex].path = view.path
        }
        filter();
        return
      }
      if (view.name === '催收详情') {
        const findIndex = state.visitedViews.findIndex((v) => { return v.name === '催收详情' })
        if (findIndex === -1) {
          state.visitedViews.push({ name: view.name, path: view.path, componentName: view.matched[view.matched.length - 1].components.default.name })
        } else {
          state.visitedViews[findIndex].path = view.path
        }
        filter();
        return
      }
      if (view.name === '商户信息详情') {
        const findIndex = state.visitedViews.findIndex((v) => { return v.name === '商户信息详情' })
        if (findIndex === -1) {
          state.visitedViews.push({ name: view.name, path: view.path, componentName: view.matched[view.matched.length - 1].components.default.name })
        } else {
          state.visitedViews[findIndex].path = view.path
        }
        filter();
        return
      }
      if (view.name === '新增核心企业') {
        const findIndex = state.visitedViews.findIndex((v) => { return v.name === '新增核心企业' })
        if (findIndex === -1) {
          state.visitedViews.push({ name: view.name, path: view.path, componentName: view.matched[view.matched.length - 1].components.default.name })
        } else {
          state.visitedViews[findIndex].path = view.path
        }
        filter();
        return
      }
      if (view.name === '核心企业详情') {
        const findIndex = state.visitedViews.findIndex((v) => { return v.name === '核心企业详情' })
        if (findIndex === -1) {
          state.visitedViews.push({ name: view.name, path: view.path, componentName: view.matched[view.matched.length - 1].components.default.name })
        } else {
          state.visitedViews[findIndex].path = view.path
        }
        filter();
        return
      }
      if (view.name === '资金方详情') {
        const findIndex = state.visitedViews.findIndex((v) => { return v.name === '资金方详情' })
        if (findIndex === -1) {
          state.visitedViews.push({ name: view.name, path: view.path, componentName: view.matched[view.matched.length - 1].components.default.name })
        } else {
          state.visitedViews[findIndex].path = view.path
        }
        filter();
        return
      }
      if (view.name === '授信额度详情') {
        const findIndex = state.visitedViews.findIndex((v) => { return v.name === '授信额度详情' })
        if (findIndex === -1) {
          state.visitedViews.push({ name: view.name, path: view.path, componentName: view.matched[view.matched.length - 1].components.default.name })
        } else {
          state.visitedViews[findIndex].path = view.path
        }
        filter();
        return
      }
      if (view.name === '担保额度详情') {
        const findIndex = state.visitedViews.findIndex((v) => { return v.name === '担保额度详情' })
        if (findIndex === -1) {
          state.visitedViews.push({ name: view.name, path: view.path, componentName: view.matched[view.matched.length - 1].components.default.name })
        } else {
          state.visitedViews[findIndex].path = view.path
        }
        filter();
        return
      }
      if (view.name === '五级分类调整详情') {
        const findIndex = state.visitedViews.findIndex((v) => { return v.name === '五级分类调整详情' })
        if (findIndex === -1) {
          state.visitedViews.push({ name: view.name, path: view.path, componentName: view.matched[view.matched.length - 1].components.default.name })
        } else {
          state.visitedViews[findIndex].path = view.path
        }
        filter();
        return
      }
      if (view.name === '评分卡详情') {
        const findIndex = state.visitedViews.findIndex((v) => { return v.name === '评分卡详情' })
        if (findIndex === -1) {
          state.visitedViews.push({ name: view.name, path: view.path, componentName: view.matched[view.matched.length - 1].components.default.name })
        } else {
          state.visitedViews[findIndex].path = view.path
        }
        filter();
        return
      }
      if (view.name === '应收账款详情') {
        const findIndex = state.visitedViews.findIndex((v) => { return v.name === '应收账款详情' })
        if (findIndex === -1) {
          state.visitedViews.push({ name: view.name, path: view.path, componentName: view.matched[view.matched.length - 1].components.default.name })
        } else {
          state.visitedViews[findIndex].path = view.path
        }
        filter();
        return
      }
      if (view.name === '融资审核详情') {
        const findIndex = state.visitedViews.findIndex((v) => { return v.name === '融资审核详情' })
        if (findIndex === -1) {
          state.visitedViews.push({ name: view.name, path: view.path, componentName: view.matched[view.matched.length - 1].components.default.name })
        } else {
          state.visitedViews[findIndex].path = view.path
        }
        filter();
        return
      }
      if (view.name === '还款登记详情') {
        const findIndex = state.visitedViews.findIndex((v) => { return v.name === '还款登记详情' })
        if (findIndex === -1) {
          state.visitedViews.push({ name: view.name, path: view.path, componentName: view.matched[view.matched.length - 1].components.default.name })
        } else {
          state.visitedViews[findIndex].path = view.path
        }
        filter();
        return
      }
      if (view.name === '银行进账详情') {
        const findIndex = state.visitedViews.findIndex((v) => { return v.name === '银行进账详情' })
        if (findIndex === -1) {
          state.visitedViews.push({ name: view.name, path: view.path, componentName: view.matched[view.matched.length - 1].components.default.name })
        } else {
          state.visitedViews[findIndex].path = view.path
        }
        filter();
        return
      }
      if (view.name === '还款详情') {
        const findIndex = state.visitedViews.findIndex((v) => { return v.name === '还款详情' })
        if (findIndex === -1) {
          state.visitedViews.push({ name: view.name, path: view.path, componentName: view.matched[view.matched.length - 1].components.default.name })
        } else {
          state.visitedViews[findIndex].path = view.path
        }
        filter();
        return
      }
      if (view.name === '代理商信息新增') {
        const findIndex = state.visitedViews.findIndex((v) => { return v.name === '代理商信息新增' })
        if (findIndex === -1) {
          state.visitedViews.push({ name: view.name, path: view.path, componentName: view.matched[view.matched.length - 1].components.default.name })
        } else {
          state.visitedViews[findIndex].path = view.path
        }
        filter();
        return
      }
      if (view.name === '代理商信息详情') {
        const findIndex = state.visitedViews.findIndex((v) => { return v.name === '代理商信息详情' })
        if (findIndex === -1) {
          state.visitedViews.push({ name: view.name, path: view.path, componentName: view.matched[view.matched.length - 1].components.default.name })
        } else {
          state.visitedViews[findIndex].path = view.path
        }
        filter();
        return
      }
      if (view.name === '代理商信息修改') {
        const findIndex = state.visitedViews.findIndex((v) => { return v.name === '代理商信息修改' })
        if (findIndex === -1) {
          state.visitedViews.push({ name: view.name, path: view.path, componentName: view.matched[view.matched.length - 1].components.default.name })
        } else {
          state.visitedViews[findIndex].path = view.path
        }
        filter();
        return
      }
      if (view.name === '结算信息新增') {
        const findIndex = state.visitedViews.findIndex((v) => { return v.name === '结算信息新增' })
        if (findIndex === -1) {
          state.visitedViews.push({ name: view.name, path: view.path, componentName: view.matched[view.matched.length - 1].components.default.name })
        } else {
          state.visitedViews[findIndex].path = view.path
        }
        filter();
        return
      }
      if (view.name === '场景方管理详情') {
        const findIndex = state.visitedViews.findIndex((v) => { return v.name === '场景方管理详情' })
        if (findIndex === -1) {
          state.visitedViews.push({ name: view.name, path: view.path, componentName: view.matched[view.matched.length - 1].components.default.name })
        } else {
          state.visitedViews[findIndex].path = view.path
        }
        filter();
        return
      }
      if (view.name === '产品管理详情') {
        const findIndex = state.visitedViews.findIndex((v) => { return v.name === '产品管理详情' })
        if (findIndex === -1) {
          state.visitedViews.push({ name: view.name, path: view.path, componentName: view.matched[view.matched.length - 1].components.default.name })
        } else {
          state.visitedViews[findIndex].path = view.path
        }
        filter();
        return
      }
      if (view.name === '项目配置详情') {
        const findIndex = state.visitedViews.findIndex((v) => { return v.name === '项目配置详情' })
        if (findIndex === -1) {
          state.visitedViews.push({ name: view.name, path: view.path, componentName: view.matched[view.matched.length - 1].components.default.name })
        } else {
          state.visitedViews[findIndex].path = view.path
        }
        filter();
        return
      }
      if (view.name === '结算信息修改') {
        const findIndex = state.visitedViews.findIndex((v) => { return v.name === '结算信息修改' })
        if (findIndex === -1) {
          state.visitedViews.push({ name: view.name, path: view.path, componentName: view.matched[view.matched.length - 1].components.default.name })
        } else {
          state.visitedViews[findIndex].path = view.path
        }
        filter();
        return
      }
      filter();
      function filter(){
      	if(state.visitedViews.length>=8&&state.visitedViews[0].path!==view.path){
	      	state.visitedViews.shift(state.visitedViews[0])
	     	}
      }

      state.visitedViews.push({ name: view.name, path: view.path, componentName: view.components.default.name })
    },
    DEL_VISITED_VIEWS: (state, view) => {
      let index
      for (const [i, v] of state.visitedViews.entries()) {
        if (v.path === view.path) {
          index = i
          break
        }
      }
      state.visitedViews.splice(index, 1)
    },
    DEL_ALL_VISITED_VIEWS: (state) => {
      state.visitedViews = []
    },
    SET_TABLE_MAX_HEIGHT: (state, height) => {
      state.tableMaxHeight = height
    }
  },
  actions: {
    ToggleSideBar ({ commit }) {
      commit('TOGGLE_SIDEBAR')
    },
    AddVisitedViews ({ commit }, view) {
      commit('ADD_VISITED_VIEWS', view)
    },
    DelVisitedViews ({ commit, state }, view) {
      return new Promise((resolve) => {
        commit('DEL_VISITED_VIEWS', view)
        resolve([...state.visitedViews])
      })
    },
    DelAllVisitedViews ({ commit, state }) {
      return new Promise((resolve) => {
        commit('DEL_ALL_VISITED_VIEWS')
        resolve([...state.visitedViews])
      })
    },
    SetTableMaxHeight ({commit}) {
      const $pageContainer = document.getElementById('page-container')
      if ($pageContainer) {
        const pageContainerHeight = $pageContainer.offsetHeight // 总高度
        const $filterContainer = document.getElementById('filter-container') // 查询框
        const $operationContainer = document.getElementById('operation-container') // 操作栏
        const $totalContainer = document.getElementById('total-container') // 汇总
        const $paginationContainer = document.getElementById('pagination-container') // 分页框
        let height = pageContainerHeight - 35
        if ($filterContainer) {
          const filterContainerHeight = $filterContainer.offsetHeight  // 查询框高度
          height = height - filterContainerHeight
        }
        if ($operationContainer) {
          const operationContainerHeight = $operationContainer.offsetHeight  // 操作栏高度
          height = height - operationContainerHeight
        }
        if ($totalContainer) {
          const totalContainerHeight = $totalContainer.offsetHeight // 汇总的高度
          height = height - totalContainerHeight
        }
        if ($paginationContainer) {
          const paginationContainerHeight = $paginationContainer.offsetHeight  // 分页框高度
          height = height - paginationContainerHeight
        }
        commit('SET_TABLE_MAX_HEIGHT', height)
      }
    }
  }
}

export default app
