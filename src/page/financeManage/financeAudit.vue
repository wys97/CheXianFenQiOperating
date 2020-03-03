<template>
  <div class="page-container" ref="page-container" id="page-container"><!---融资审核管理--->
    <div class="filter-container" ref="filter-container"  id="filter-container">
      <el-form :inline="true" :model="listQuery" ref="listQueryForm">
        <el-form-item label="融资单号：" prop="financeNo">
          <el-input v-model="listQuery.financeNo" style="width:120px;"></el-input>
        </el-form-item>
        <el-form-item label="商户名称：" prop="supplierName" >
          <el-input v-model="listQuery.supplierName" style="width:130px;"></el-input>
        </el-form-item>
        <!--<el-form-item label="核心企业" class="query-select" prop="status">
          <el-select v-model="listQuery.centreName" @visible-change="getSelect" style="width:150px;">
            <el-option label="全部" value=""></el-option>
            <el-option v-for="(value,key) in centreList" :label="value" :value='value' :key="key"></el-option>
	          </el-select>
        </el-form-item>-->
        <el-form-item label="放款资金方：" class="query-select" prop="capitalId">
          <el-select v-model="listQuery.capitalId" style="width:110px;">
            <el-option label="全部" value="">
            </el-option>
            <el-option v-if="lenderData" 
            	v-for="item in lenderData" 
            	:label="item.capitalName" 
            	:value='item.capitalId' 
            	:key='item.capitalId'>
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="对接产品：" class="query-select" prop="productName">
          <el-input v-model="listQuery.productName" style="width:130px;"></el-input>
        </el-form-item>
        <el-form-item label="所属场景方：" prop="partnerName" >
          <el-input v-model="listQuery.partnerName" style="width:130px;"></el-input>
        </el-form-item>
        <el-form-item label="申请时间："  prop="shipDate">
         <el-date-picker
			      v-model="shipDate"
			      align="right"
			      type="date"
			      placeholder="选择日期"
			      :picker-options="pickerOptions1">
			    </el-date-picker>
        </el-form-item>
        <el-form-item label="融资状态：" class="query-select" prop="status">
         <el-select v-model="listQuery.status" style="width:110px;">
            <el-option label="全部" value="">
            </el-option>
            <el-option v-if="financingstatusData" 
            	v-for="item in financingstatusData" 
            	:label="item.statusText" 
            	:value='item.status' 
            	:key='item.status'>
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button  @click="search" size="mini" type="primary"><i class="iconfont icon-search"></i>查询</el-button>
          <el-button  @click="resetForm('listQueryForm')" size="mini" type="primary"><i class="iconfont icon-reset"></i>重置</el-button>
        </el-form-item>
      </el-form>
    </div>
    <el-table :data="list" @current-change="handleSelectionChange" highlight-current-row :max-height=tableMaxHeight>
			
		<el-table-column prop="financeNo" label="融资单号" min-width="100">
		</el-table-column>
	
		<el-table-column prop="supplierName" label="企业信息" width="122">
			<template slot-scope="scope">
				<div>{{scope.row.supplierName}}</div>
			</template>
		</el-table-column>
		
		<el-table-column prop="capticalName" label="放款资金方" min-width="122" align="center">
		</el-table-column>
		<el-table-column prop="productName" label="对接产品" min-width="122" align="center">
		</el-table-column>
		<el-table-column prop="partnerName" label="所属场景方" min-width="122" align="center">
		</el-table-column>
	
		<el-table-column prop="financeAmt" label="融资金额（元）" width="122" align="center">
		</el-table-column>
		
		<el-table-column prop="repaymentMethodText" label="还款方式" width="122" align="center">
		</el-table-column>
		
		<el-table-column prop="loanMonths" label="期限（月）" width="122" align="center">
		</el-table-column>
		
			<el-table-column prop="loanRate" label="年利率（%）" width="122" align="center">
		</el-table-column>
		
		<el-table-column prop="interest" label="利息（元）" width="122" align="center">
		</el-table-column>
		
		<el-table-column prop="totalAmt" label="还款总金额（元）" width="124" align="center">
		</el-table-column>
		
		<el-table-column prop="applyTime" label="申请时间" width="101" align="center">
		</el-table-column>
	
		<el-table-column prop="statusText" label="状态" width="122" align="center">
		</el-table-column>
		
		<el-table-column prop="financeNo" label="操作" width="122" align="center">
			<template slot-scope="scope" v-if="!roleHasPermissions['finance_manage_register_list_view']">
				<router-link :to="'financeDetail/' + scope.row.financeNo"  class="router-link">查看</router-link>
			</template>
		</el-table-column>
      
    </el-table>
    <div  class="pagination-container" ref="pagination-container" id="pagination-container">
      <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentPage" :current-page.sync="listQuery.page"
                     :page-sizes="[10,20,30,50]" :page-size="listQuery.limit" :total='total' layout="total, sizes, prev, pager, next, jumper">
      </el-pagination>
    </div>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'
  import { handleSelectionChange, handleSizeChange, handleCurrentPage } from '@/utils/common'
  import { getListData,lender,financingstatus } from '@/api/financeManage/financeAudit'
  import { Format } from '@/utils/index'
  import {comboboxCentreEnterprise,queryCapitalEnterprise} from '@/api/common'

  export default {
    name: 'FinanceAudit',
    data () {
      return {
        list: [], // 表格数据
        total: 0, // 表格数据总条数
        listQuery: { // 查询参数
          page: 1,
          limit: 30,
          financeNo: '', // 融资单号
          supplierName: '', // 商户名称
          status: '', // 状态：INVALID-未形成 AUDIT_WAIT-待审核 AUDIT_REFUSE-不达标 AUDIT_PASS-已达标 OVERDUE-过期
          applyDate:'', // 到货日期
          centreName:'',//核心企业名
          capitalId:'',//资方ID
          statusText:'',
        },
        centreList:'',//核心企业列表
        queryCapitalEnterpriseList:[],//资方下拉
        lenderData:[],
        financingstatusData:[],
        shipDate:'',
        yesterday: new Date().getTime() - 24 * 60 * 60 * 1000,
        selectedData: '', // 选中某一行的数据
        pickerOptions: {
          disabledDate (time) {
            return time.getTime() > Date.now() - 24 * 60 * 60 * 1000
          }
        },
        handleSelectionChange: handleSelectionChange.bind(this),
        handleSizeChange: handleSizeChange.bind(this),
        handleCurrentPage: handleCurrentPage.bind(this),
        pickerOptions1: {
          disabledDate(time) {
            return time.getTime() > Date.now();
          },
          shortcuts: [{
            text: '今天',
            onClick(picker) {
              picker.$emit('pick', new Date());
            }
          }, {
            text: '昨天',
            onClick(picker) {
              const date = new Date();
              date.setTime(date.getTime() - 3600 * 1000 * 24);
              picker.$emit('pick', date);
            }
          }, {
            text: '一周前',
            onClick(picker) {
              const date = new Date();
              date.setTime(date.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit('pick', date);
            }
          }]
        },
      }
    },
    watch:{
	  	//监听路由切换回调
	  	'$route':'fetchdata', 
	  	shipDate(val,oldVal){
	  		let that = this;
	  		let _Time;
	  		if(val){
	  			_Time = Format(val, 'yyyy-MM-dd');
	  		}else{
	  			_Time = ''
	  		}
	  		that.listQuery.applyDate = _Time;
	  	}  
	  },
    computed: {
      ...mapGetters([
        'roleHasPermissions', // 用户权限list
        'tableMaxHeight'
      ])
    },
    created () {
      this.getList()
      this.getQueryCapitalEnterprise()
      this.getLender()
      this.getFinancingstatus()
    },
    mounted () {
      setTimeout(() => {
        this.$store.dispatch('SetTableMaxHeight')
      }, 500)
    },
    methods: {
    	fetchdata(){
    		//切换路由do
    	},
    	getSelect(){
    		comboboxCentreEnterprise().then(res => {
          if (res.data.code === '200') {
          	this.centreList = res.data.data
          } else {
            this.$message.error(res.data.message)
          }
        })
    	},
    	getQueryCapitalEnterprise(){//资方下拉
    		queryCapitalEnterprise().then(res => {
          if (res.data.code === '200') {
          	this.queryCapitalEnterpriseList = res.data.data
          } else {
            this.$message.error(res.data.message)
          }
        })
    	},
    	
      getList () {
        getListData(this.listQuery).then(res => {
          if (res.data.code === '200') {
            const listData = res.data.data.list
            this.total = res.data.data.total
            this.list = listData
          } else {
            this.$message.error(res.data.message)
          }
      
        })
      },

      getLender(){// 放款资金方下拉
        lender().then(res => {
          if (res.data.code === '200') {
            this.lenderData = res.data.data
          } else {
            this.$message.error(res.data.message)
          }
        
        })
      },

      getFinancingstatus(){
        financingstatus().then(res => {
          if(res.data.code === '200'){
            this.financingstatusData = res.data.data
          }else {
            this.$message.error(res.data.message)
          }
       
        })
      },

      search(){
      	let that = this;
      	that.getList();
      },//查询
      resetForm(formName) {
        this.$refs[formName].resetFields();
      },//重置表单
    }
  }
</script>
<style rel="stylesheet/scss" lang="scss">
  .total-container{
    >span{
      margin-right: 10px;
      padding-right: 10px;
      border-right: 1px solid #ccc;
    }
  }
</style>

