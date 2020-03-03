<template>
  <div class="page-container" ref="page-container" id="page-container"><!---商户管理-商户入驻--->
    <div class="filter-container" ref="filter-container" id="filter-container">
      <el-form :inline="true" :model="listQuery" ref="listQueryForm">
        <el-form-item label="产品名称：" prop="productName">
          <el-input v-model="listQuery.productName" style="width:120px;"></el-input>
        </el-form-item>
        <el-form-item label="商户名称：" prop="supplierName">
          <el-input v-model="listQuery.supplierName" style="width:130px;"></el-input>
        </el-form-item>
        <el-form-item label="逾期天数：" prop="overdueDays">
          <el-select v-model="listQuery.overdueDays" style="width:150px;">
            <el-option label="全部" value="">
            </el-option>
            <el-option v-if="overdueDaysList" v-for="(val,key) in overdueDaysList" :label="val" :value='key' :key='key'>
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="是否结清：" prop="cleared">
          <el-select v-model="listQuery.cleared" style="width:150px;">
            <el-option label="全部" value="">
            </el-option>
            <el-option label="是" :value="true">
            </el-option>
            <el-option label="否" :value="false">
            </el-option>
            <!--<el-option v-if="registerStatusList" v-for="(val,key) in registerStatusList" :label="val" :value='key' :key='key'>
            </el-option>-->
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button  @click="search"  size="mini" type="primary" icon="el-icon-search">查询</el-button>
          <el-button  @click="resetForm('listQueryForm')" size="mini" type="primary" icon="el-icon-refresh">重置</el-button>
        </el-form-item>
      </el-form>
    	
    	<hr class="hr"/>
	    <div class="table_title_box">
	    	<span>逾期情况表</span>
	    	<a :href="'/admin/overdue_report/export?productName='+listQuery.productName+'&supplierName='+listQuery.supplierName+'&overdueDays='+listQuery.overdueDays+'&cleared='+listQuery.cleared" target="_blank">
				<el-button type="primary" size="mini">导出</el-button>
			</a>
	    	<!--<router-link :to="'registerAdd'" class="router-link">
	    		<el-button type="primary" size="mini">新增</el-button>
	    	</router-link>-->
      </div>
    </div>
    <!--<div class="total-container" ref="total-container" id="total-container">
      <span>提交基础资料中：1</span> <span>审核入驻：21</span><span>审核贸易：2</span><span>预沟通：0</span><span>尽调中：9</span><span>尽调中：9</span><span>签署中：9</span>
    </div>-->
    <el-table :data="list"  @current-change="handleSelectionChange" highlight-current-row  :max-height=tableMaxHeight>
      <el-table-column
        prop="productName"
        label="产品名称">
      </el-table-column>
      
      <el-table-column
        prop="supplierName"
        width="300"
        label="商户信息">
        <template slot-scope="scope" >
          <div>{{scope.row.supplierName}}</div>
          <div>{{scope.row.businessLicense}}</div>
        </template>
      </el-table-column>
      
      <el-table-column
        prop="period"
        label="还款期号">
      </el-table-column>
      
      <el-table-column
        prop="prinipal"
        label="还款本金">
      </el-table-column>
      
      <el-table-column
        prop="interest"
        label="还款利息">
      </el-table-column>
      
      <el-table-column
        prop="planDate"
        label="应还日期">
      </el-table-column>
      
      <el-table-column
        prop="overdueDays"
        label="逾期天数">
      </el-table-column>
      
      <el-table-column
        prop="expectedFine"
        label="应还罚息">
      </el-table-column>
      
      <el-table-column
        prop="expectedAmount"
        label="应还总额">
      </el-table-column>
      
      <el-table-column
        prop="actualAmount"
        label="已还金额">
      </el-table-column>
      
      <el-table-column
        prop="remainingAmount"
        label="剩余金额">
      </el-table-column>
      
      <el-table-column
        prop="cleared"
        label="是否结清">
        <template slot-scope="scope" >
          <div>{{scope.row.cleared===true?'是':'否'}}</div>
        </template>
      </el-table-column>
      
      <!--<el-table-column
        label="操作"
        align="center">
        <template slot-scope="scope" v-if="!roleHasPermissions['supplier_manage_register_list_view']">
            <router-link :to="'registerDetail/' + scope.row.collateralId" class="router-link">查看</router-link>
        </template>
      </el-table-column>-->

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
  import { handleSelectionChange, handleSizeChange, handleCurrentPage} from '@/utils/common'
  import apiCommon from '@/api/common'
  import { getListData,collateralRegisterStatus,overdueDays} from '@/api/statementManage/overdueReportList'
  import { Format } from '@/utils/index'

  export default {
    name: 'SupplierRegister',
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
        collateralTypeList:'',//押品类型下拉
        registerStatusList:'',//申请登记-状态下拉
        overdueDaysList:'',//下拉列表 - 逾期天数
        list: [], // 表格数据
        total: 0, // 表格数据总条数
        listQuery: { // 查询参数
          page: 1,
          limit: 30,
          productName:'',
          supplierName:'',
          overdueDays: '', // 企业名
          cleared: '', // 信用代码
        },
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
      this.getList()
      this.getCollateralTypeList();//获取押品下拉
      this.getRegisterStatusList();//申请登记-状态下拉
      this.getOverdueDaysList ();//下拉列表 - 逾期天数
      setTimeout(() => {
        this.$store.dispatch('SetTableMaxHeight')
      }, 500)
    },
    methods: {
      getCollateralTypeList (){//获取押品下拉
      	apiCommon.collateralType ().then(res => {
          if (res.data.code === '200') {
          	this.collateralTypeList= res.data.data
          } else {
            this.$message.error(res.data.message)
          }
        })
      },
      getRegisterStatusList (){//申请登记-状态下拉
      	collateralRegisterStatus ().then(res => {
          if (res.data.code === '200') {
          	this.registerStatusList= res.data.data
          } else {
            this.$message.error(res.data.message)
          }
        })
      },
      getOverdueDaysList (){//下拉列表 - 逾期天数
      	overdueDays ().then(res => {
          if (res.data.code === '200') {
          	this.overdueDaysList= res.data.data
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

