<template>
  <section class="app-main-ed">
    <transition name="fade" mode="out-in">
      <keep-alive :include="include">
        <router-view></router-view>
      </keep-alive>
    </transition>
  </section>
</template>

<script>
  export default {	
    name: 'AppMain',
    computed: {
      include () {
        let include = []
        this.$store.state.app.visitedViews.forEach((v, i) => {
          if (v.componentName && 
          	v.componentName === 'SupplierRegister'||
          	v.componentName === 'CoreBusinessList'||
          	v.componentName === 'SupplierRegister'||
          	v.componentName === 'FinanceAudit'||
          	v.componentName === 'LoanAudit'||
          	v.componentName === 'RepaymentList'||
          	v.componentName === 'RepaymentRegisterList'||
          	v.componentName === 'RepaymentIncomeList'||
          	v.componentName === 'UserMaintain'||
          	v.componentName === 'RoleMaintain') {
            include.push(v.componentName)
          }
//        if (v.componentName && 
//        	v.componentName !== 'FinanceDetail'&&
//        	v.componentName !== 'SupplierDetail'&&
//        	v.componentName !== 'LoanDetail'&&
//        	v.componentName !== 'AccountDetail') {
//          include.push(v.componentName)
//        }
        })
        return include
      }
    }
  }
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
  @import "../../style/mixin.scss";
 .app-main-ed{
   position: absolute;
   top:0;
   right:0;
   left:0;
   bottom:0;
   padding-left: 250px;
   overflow: hidden;
 }
</style>
