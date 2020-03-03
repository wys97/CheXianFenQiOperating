<template>
  <div class='tabs-view-container'>
    <router-link class="tabs-view"  v-for="tag in Array.from(visitedViews)" :to="tag.path" :key="tag.path">
      <el-tag :closable="true" :class="isActive(tag.path)?'active':''" @close='closeViewTabs(tag,$event)'>
        {{tag.name}}
      </el-tag>
    </router-link>
  </div>
</template>

<script>
export default {
  computed: {
    visitedViews () {
      return this.$store.state.app.visitedViews
    }
  },
  created () {
    this.addViewTabs()
  },
  methods: {
    closeViewTabs (view, $event) {
      this.$store.dispatch('DelVisitedViews', view).then((views) => {
        if (this.isActive(view.path)) {
          const latestView = views.slice(-1)[0];
          if (latestView){
            this.$router.push(latestView.path)
          } else {
            this.$router.push('/')
          }
        }else{
          const latestView = views.slice(-1)[0];
          if (latestView){
            this.$router.push(latestView.path)
          } else {
            this.$router.push('/')
          }
        }
      })
      $event.preventDefault()
    },
    generateRoute () {
      if (this.$route.matched[this.$route.matched.length - 1].name) {
        if (this.$route.matched[this.$route.matched.length - 1].name === '业务受理详情') {
          return this.$route
        }
        if (this.$route.matched[this.$route.matched.length - 1].name === '分期申请补充详情') {
          return this.$route
        }
        if (this.$route.matched[this.$route.matched.length - 1].name === '分期订单详情') {
          return this.$route
        }
        if (this.$route.matched[this.$route.matched.length - 1].name === '复审详情') {
          return this.$route
        }
        if (this.$route.matched[this.$route.matched.length - 1].name === '复核审批详情') {
          return this.$route
        }
        if (this.$route.matched[this.$route.matched.length - 1].name === '终审详情') {
          return this.$route
        }
        if (this.$route.matched[this.$route.matched.length - 1].name === '终审二审详情') {
          return this.$route
        }
        if (this.$route.matched[this.$route.matched.length - 1].name === '授信报告详情') {
          return this.$route
        }
        if (this.$route.matched[this.$route.matched.length - 1].name === '商户授信情况详情') {
          return this.$route
        }
        if (this.$route.matched[this.$route.matched.length - 1].name === '担保人详情') {
          return this.$route
        }
        if (this.$route.matched[this.$route.matched.length - 1].name === '押品信息登记') {
          return this.$route
        }
        if (this.$route.matched[this.$route.matched.length - 1].name === '押品信息登记详情') {
          return this.$route
        }
        if (this.$route.matched[this.$route.matched.length - 1].name === '押品评估详情') {
          return this.$route
        }
        if (this.$route.matched[this.$route.matched.length - 1].name === '押品审核详情') {
          return this.$route
        }
        if (this.$route.matched[this.$route.matched.length - 1].name === '押品入库详情') {
          return this.$route
        }
        if (this.$route.matched[this.$route.matched.length - 1].name === '押品拍卖详情') {
          return this.$route
        }
        if (this.$route.matched[this.$route.matched.length - 1].name === '押品出库详情') {
          return this.$route
        }
        if (this.$route.matched[this.$route.matched.length - 1].name === '商户进件对接详情') {
          return this.$route
        }
        if (this.$route.matched[this.$route.matched.length - 1].name === '新增押品信息登记') {
          return this.$route
        }
        if (this.$route.matched[this.$route.matched.length - 1].name === '合同列表') {
          return this.$route
        }
        if (this.$route.matched[this.$route.matched.length - 1].name === '合同详情') {
          return this.$route
        }
        if (this.$route.matched[this.$route.matched.length - 1].name === '贷后检查登记') {
          return this.$route
        }
        // if (this.$route.matched[this.$route.matched.length - 1].name === '贷后预警设置') {
        //   return this.$route
        // }
        if (this.$route.matched[this.$route.matched.length - 1].name === '贷后检查登记详情') {
          return this.$route
        }
        if (this.$route.matched[this.$route.matched.length - 1].name === '催收管理') {
          return this.$route
        }
        if (this.$route.matched[this.$route.matched.length - 1].name === '催收详情') {
          return this.$route
        }
        if (this.$route.matched[this.$route.matched.length - 1].name === '商户信息详情') {
          return this.$route
        }
        if (this.$route.matched[this.$route.matched.length - 1].name === '核心企业详情') {
          return this.$route
        }
        if (this.$route.matched[this.$route.matched.length - 1].name === '资金方详情') {
          return this.$route
        }
        if (this.$route.matched[this.$route.matched.length - 1].name === '授信额度详情') {
          return this.$route
        }
        if (this.$route.matched[this.$route.matched.length - 1].name === '担保额度详情') {
          return this.$route
        }
        if (this.$route.matched[this.$route.matched.length - 1].name === '五级分类调整详情') {
          return this.$route
        }
        if (this.$route.matched[this.$route.matched.length - 1].name === '新增核心企业') {
          return this.$route
        }
        if (this.$route.matched[this.$route.matched.length - 1].name === '评分卡详情') {
          return this.$route
        }
        if (this.$route.matched[this.$route.matched.length - 1].name === '应收账款详情') {
          return this.$route
        }
        if (this.$route.matched[this.$route.matched.length - 1].name === '融资审核详情') {
          return this.$route
        }
        if (this.$route.matched[this.$route.matched.length - 1].name === '还款登记详情') {
          return this.$route
        }
        if (this.$route.matched[this.$route.matched.length - 1].name === '银行进账详情') {
          return this.$route
        }
        if (this.$route.matched[this.$route.matched.length - 1].name === '还款详情') {
          return this.$route
        }
        if (this.$route.matched[this.$route.matched.length - 1].name === '代理商信息新增') {
          return this.$route
        }
        if (this.$route.matched[this.$route.matched.length - 1].name === '代理商信息详情') {
          return this.$route
        }
        if (this.$route.matched[this.$route.matched.length - 1].name === '代理商信息修改') {
          return this.$route
        }
        if (this.$route.matched[this.$route.matched.length - 1].name === '结算信息新增') {
          return this.$route
        }
        if (this.$route.matched[this.$route.matched.length - 1].name === '结算信息修改') {
          return this.$route
        }
        if (this.$route.matched[this.$route.matched.length - 1].name === '场景方管理详情') {
          return this.$route
        }
        if (this.$route.matched[this.$route.matched.length - 1].name === '产品管理详情') {
          return this.$route
        }
        if (this.$route.matched[this.$route.matched.length - 1].name === '项目配置详情') {
          return this.$route
        }
        return this.$route.matched[this.$route.matched.length - 1]
      }
      this.$route.matched[0].path = '/'
      return this.$route.matched[0]
    },
    addViewTabs () {
      this.$store.dispatch('AddVisitedViews', this.generateRoute())
    },
    isActive (path) {
      return path === this.$route.path
    }
  },
  watch: {
    $route () {
      this.addViewTabs()
      setTimeout(() => {
        this.$store.dispatch('SetTableMaxHeight')
      }, 500)
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  .tabs-view-container {
    display: inline-block;
    vertical-align: top;
    margin-left: 10px;
    width: 80%;
    overflow: hidden;
    .tabs-view {
      margin-left: 10px;
    }
    .active{
      background-color: #409EFF;
      color:#fff;
    }
  }
</style>
