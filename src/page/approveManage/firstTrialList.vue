<template>
  <div class="page-container" ref="page-container" id="page-container"><!---商户管理-商户入驻--->
    <div class="filter-container" ref="filter-container" id="filter-container">
      <el-form :inline="true" :model="listQuery" ref="listQueryForm">
        <!--<el-form-item label="申请人手机号" prop="applyPhone">
          <el-input v-model="listQuery.applyPhone" style="width:130px;"></el-input>
        </el-form-item>-->
        <el-form-item label="企业名称" prop="enterpriseName">
          <el-input v-model="listQuery.enterpriseName" style="width:120px;"></el-input>
        </el-form-item>
        <el-form-item label="信用代码" prop="businessLicenseNo">
          <el-input v-model="listQuery.businessLicenseNo" style="width:130px;"></el-input>
        </el-form-item>
        <el-form-item label="法定代表人姓名" prop="repreName">
          <el-input v-model="listQuery.repreName" style="width:130px;"></el-input>
        </el-form-item>
        <el-form-item label="法定代表人手机" prop="repreMobile">
          <el-input v-model="listQuery.repreMobile" style="width:130px;"></el-input>
        </el-form-item>
        <el-form-item label="客户类型" class="query-select" prop="customerType">
          <el-select v-model="listQuery.customerType" style="width:110px;">
            <el-option label="全部" value="">
            </el-option>
            <el-option v-if="customerTypeListData" 
            	v-for="(val,key) in customerTypeListData" 
            	:label="val" 
            	:value='key' 
            	:key='key'>
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="评级" class="query-select" prop="grade">
          <el-select v-model="listQuery.grade" style="width:150px;">
            <el-option label="全部" value="">
            </el-option>
            <el-option v-if="supplierGradeList" v-for="(val,key) in supplierGradeList"  :label="val" :value='key' :key='key'>
            </el-option>
          </el-select>
        </el-form-item>
          <el-form-item label="进件状态" class="query-select" prop="finallyStatus">
          <el-select v-model="listQuery.finallyStatus" style="width:150px;">
            <el-option label="全部" value="">
            </el-option>
            <el-option v-if="finallyStatusList" v-for="(val,key) in finallyStatusList" :label="val" :value='key' :key='key'>
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="审批状态" class="query-select" prop="checkStatus">
          <el-select v-model="listQuery.checkStatus" style="width:150px;" placeholder="待审核">
            <el-option label="全部" value>
            </el-option>
            <el-option v-if="checkStatusList" v-for="(val,key) in checkStatusList"  :label="val" :value='key' :key='key'>
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button  @click="search"  size="mini" type="primary" icon="el-icon-search">查询</el-button>
          <el-button  @click="resetForm('listQueryForm')" size="mini" type="primary" icon="el-icon-refresh">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
    <el-table :data="list"  @current-change="handleSelectionChange" highlight-current-row  :max-height='tableMaxHeight'>
      <el-table-column
        prop="applySerialNo"
        width="180"
        label="申请流水号">
      </el-table-column>
      
      <el-table-column
        prop="enterpriseName"
        width="220"
        label="企业信息">
        <template slot-scope="scope" >
          <div>{{scope.row.enterpriseName}}</div>
          <div>{{scope.row.businessLicenseNo}}</div>
        </template>
      </el-table-column>


      <el-table-column
        prop="repreName"
        width="110"
        label="法人信息">
        <template slot-scope="scope" >
          <div>{{scope.row.repreName}}</div>
          <div>{{scope.row.repreMobile}}</div>
        </template>
      </el-table-column>
      <el-table-column
        prop="customerTypeText"
        label="客户类型">
      </el-table-column>
      <el-table-column
        prop="productName"
        width="100"
        label="对接产品">
      </el-table-column>
      <el-table-column
        prop="partnerName"
         width="140"
        label="所属场景方">
      </el-table-column>
      <el-table-column
        prop="creditLine"
        label="申请额度（万元）">
      </el-table-column>

      <el-table-column
        prop="grade"
         width="70"
        label="评级">
      </el-table-column>

      <el-table-column
        prop="creditLineEstimate"
        label="系统测算额度（万元）">
      </el-table-column>
      
      <el-table-column
        prop="creditLineAuditor1"
        label="初审额度（万元）">
      </el-table-column>

    
      
      <el-table-column
        prop="finallyStatus"
        width="100"
        label="进件状态">
        <template slot-scope="scope" >
          <span>{{scope.row.finallyStatusText}}</span>
        </template>
      </el-table-column>
      
    <el-table-column
        prop="checkStatus"
        label="审批状态">
        <template slot-scope="scope" >
          <span>{{scope.row.checkStatusText}}</span>
        </template>
      </el-table-column>

      <el-table-column
        label="操作">
        <template slot-scope="scope" v-if="!roleHasPermissions['supplier_manage_register_list_view']">
        		<!-- <router-link tag="a" target="_blank" :to="'/enterpriseDataManage/enterpriseData/'+scope.row.supplierId" class="router-link"> -->
        		<router-link  :to="'/enterpriseDataManage/enterpriseData/'+scope.row.supplierId" class="router-link">
			        	企业资料 
			      </router-link>
            <router-link :to="'firstTrialDetail/' + scope.row.supplierId" class="router-link">审核详情</router-link>
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
  import {supplierGrade,customerType} from '@/api/common'
  import { getListData,getRegisterStatusList,checkStatusList,finallyStatusList} from '@/api/approveManage/firstTrialList'
  import { Format } from '@/utils/index'

  export default {
    name: 'firstTrialList',
    filters: {
      filterStatus: function (value) {
        if (value === 'PASS') {
          return 'suc'
        } else if (value === 'REJECT') {
          return 'fail'
        }
      }
    },
    data () {
      return {
        registerStatusList:'',//入驻阶段下拉
        supplierGradeList:'',//供应商评级-下拉列表
        checkStatusList:'',//列表查询-审核下拉接口
        finallyStatusList:'',//列表查询-进件下拉接口
        customerTypeListData:'',//客户类型下拉
        list: [], // 表格数据
        total: 0, // 表格数据总条数
        listQuery: { // 查询参数
          page: 1,
          limit: 30,
          enterpriseName: '', // 企业名
          businessLicenseNo: '', // 信用代码
          repreName:'',//法定代表人姓名
          repreMobile:'',//法定代表人手机
          grade:'', //评级
          checkStatus:'PENDING',//审批状态
          finallyStatus: '', // 状态
          customerType:'',  //客户类型
        },
        option: [{
          value: 'PENDING',
          label: '待审核'
        },{
          value: 'REVIEW_SUCCESS',
          label: '审核'
        },{
          value: 'BACK',
          label: '已打回'
        },{
          value: 'REJECT',
          label: '已拒绝'
        },{
          value: 'RETURNED',
          label: '被退回'
        }],
        shipDate:[],// 时间范围
        yesterday: new Date().getTime() - 24 * 60 * 60 * 1000,
        selectedData: '', // 选中某一行的数据
        handleSelectionChange: handleSelectionChange.bind(this),
        handleSizeChange: handleSizeChange.bind(this),
        handleCurrentPage: handleCurrentPage.bind(this),
      }
    },
    computed: {
      ...mapGetters([
        'roleHasPermissions', // 用户权限list
        'tableMaxHeight'
      ])
    },
    watch :{
    	shipDate(val,oldVal){
    		let that = this;
    		if(val[0]){
    			that.listQuery.beginCreateTime = Format(val[0], 'yyyy-MM-dd');
    		}else{
    			that.listQuery.beginCreateTime = '';
    		}
	  		if(val[1]){
	  			that.listQuery.endCreateTime = Format(val[1], 'yyyy-MM-dd');
	  		}else{
    			that.listQuery.endCreateTime = '';
	  		}
	  	}  
    },
    created () {
    },
    mounted () {
      this.getList()  //获取数据列表
      this.getRegisterStatusList();//获取入驻阶段下拉
      this.getSupplierGradeList();//供应商评级-下拉列表
      this.getCheckStatusList ();//列表查询-审核下拉接口
      this.getFinallyStatusList ();//列表查询-进件下拉接口
      this.getCustomerTypeList ();//客户类型
      setTimeout(() => {
        this.$store.dispatch('SetTableMaxHeight')
      }, 500)
    },
    methods: {
      getRegisterStatusList (){
      	getRegisterStatusList().then(res => {
          if (res.data.code === '200') {
          	this.registerStatusList= res.data.data
          } else {
            this.$message.error(res.data.message)
          }
        })
      },
      getSupplierGradeList (){//供应商评级-下拉列表
      	supplierGrade().then(res => {
          if (res.data.code === '200') {
          	this.supplierGradeList= res.data.data
          } else {
            this.$message.error(res.data.message)
          }
        })
      },
      getCheckStatusList (){//列表查询-审核下拉接口-下拉列表
      	checkStatusList().then(res => {
          if (res.data.code === '200') {
          	this.checkStatusList= res.data.data
          } else {
            this.$message.error(res.data.message)
          }
        })
      },
      getFinallyStatusList (){//列表查询-审核下拉接口-下拉列表
      	finallyStatusList().then(res => {
          if (res.data.code === '200') {
          	this.finallyStatusList= res.data.data
          } else {
            this.$message.error(res.data.message)
          }
        })
      },
      getCustomerTypeList (){//客户类型
      	customerType().then(res => {
          if (res.data.code === '200') {
          	this.customerTypeListData= res.data.data
          } else {
            this.$message.error(res.data.message)
          }
        })
      },
      getList () {
        getListData(this.listQuery).then(res => {
          if (res.data.code === '200') {
            const listData = res.data.data.list;

            this.total = res.data.data.total
            this.list = listData
          } else {
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
        this.shipDate = [];
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
      &:last-of-type{
        border-right: none;
      }
    }
  }
  .router-link{
    display: block;
    color:#409EFF;
  }
</style>

