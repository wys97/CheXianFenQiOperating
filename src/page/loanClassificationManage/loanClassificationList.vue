<template>
  <div class="page-container" ref="page-container" id="page-container"><!---商户管理-商户入驻--->
    <div class="filter-container" ref="filter-container" id="filter-container">
      <el-form :inline="true" :model="listQuery" ref="listQueryForm">
        <el-form-item label="融资单号：" prop="financeNo">
          <el-input v-model="listQuery.financeNo" style="width:120px;"></el-input>
        </el-form-item>
        <el-form-item label="商户名称：" prop="supplierName">
        	<el-input v-model="listQuery.supplierName" style="width:120px;"></el-input>
          <!--<el-select v-model="listQuery.type" style="width:150px;">
            <el-option label="全部" value="">
            </el-option>
            <el-option v-if="collateralTypeList" v-for="(val,key) in collateralTypeList" :label="val" :value='key' :key='key'>
            </el-option>
          </el-select>-->
        </el-form-item>
        <el-form-item label="当前五级分类：" prop="loanClassification">
          <el-select v-model="listQuery.loanClassification" style="width:150px;">
            <el-option label="全部" value="">
            </el-option>
            <el-option v-if="loanClassificationTypeList" v-for="(val,key) in loanClassificationTypeList" :label="val" :value='key' :key='key'>
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="是否核销：" prop="writtenOff">
          <el-select v-model="listQuery.writtenOff" style="width:150px;">
            <el-option label="全部" value=""></el-option>
            <el-option label="是" value="true"></el-option>
            <el-option label="否" value="false"></el-option>
            <!--<el-option v-if="creditStatusList" v-for="(val,key) in creditStatusList" :label="val" :value='key' :key='key'>
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
	    	<span>五级分类调整</span>
	    	<!--<router-link :to="'guarantorAdd'" class="router-link">
	    		<el-button type="primary" size="mini">新增</el-button>
	    	</router-link>-->
      </div>
    </div>
    <!--<div class="total-container" ref="total-container" id="total-container">
      <span>提交基础资料中：1</span> <span>审核入驻：21</span><span>审核贸易：2</span><span>预沟通：0</span><span>尽调中：9</span><span>尽调中：9</span><span>签署中：9</span>
    </div>-->
    <el-table :data="list"  @current-change="handleSelectionChange" highlight-current-row  :max-height=tableMaxHeight>
      <el-table-column
        prop="financeNo"
        width="260"
        label="融资单号">
      </el-table-column>
      
      <el-table-column
        prop="supplierName"
        width="300"
        label="商户信息">
        <template slot-scope="scope" >
          <div>{{scope.row.supplierName}}</div>
          <div>{{scope.row.businessLicenseNo}}</div>
        </template>
      </el-table-column>
      
      <el-table-column
        prop="financeAmount"
        width="260"
        label="融资金额">
        <template slot-scope="scope" >
          <div>{{scope.row.financeAmount}} 元</div>
        </template>
      </el-table-column>
      
      <el-table-column
        prop="repaymentAmount"
        label="还款金额">
        <template slot-scope="scope" >
          <div>{{scope.row.repaymentAmount}} 元</div>
        </template>
      </el-table-column>
      
      <el-table-column
        prop="clearAmount"
        label="结欠金额">
        <template slot-scope="scope" >
          <div>{{scope.row.clearAmount}} 元</div>
        </template>
      </el-table-column>
      
      <el-table-column
        prop="surplusClearAmount"
        label="剩余欠款金额">
        <template slot-scope="scope" >
          <div>{{scope.row.surplusClearAmount}} 元</div>
        </template>
      </el-table-column>
      
      <el-table-column
        prop="loanClassificationText"
        label="当前五级分类">
      </el-table-column>
      
      <el-table-column
        prop="writtenOff"
        label="是否核销">
        <template slot-scope="scope">
           {{scope.row.writtenOff?'是':'否'}}
        </template>
      </el-table-column>
      <!--<el-table-column
        prop="status"
        width="80"
        label="状态">
        <template slot-scope="scope" >
          <span :class="scope.row.status==='INIT'?'war':scope.row.status==='EVALUATING'?'suc':scope.row.status==='EVALUATING'?'fail':'draw' ">
          	{{scope.row.statusText}}
          </span>
        </template>
      </el-table-column>-->
      
      <el-table-column
        label="操作"
        align="center">
        <template slot-scope="scope" v-if="!roleHasPermissions['supplier_manage_register_list_view']">
            <router-link :to="'loanClassificationDetail/' + scope.row.financeNo" class="router-link">查看</router-link>
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
  import { handleSelectionChange, handleSizeChange, handleCurrentPage} from '@/utils/common'
  import apiCommon from '@/api/common'
  import { getListData,collateralRegisterStatus,loanClassificationType} from '@/api/loanClassificationManage/loanClassificationList'
  import { Format } from '@/utils/index'

  export default {
    name: 'loanClassificationList',
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
       	loanClassificationTypeList:'',//五级分类-下拉
        list: [], // 表格数据
        total: 0, // 表格数据总条数
        listQuery: { // 查询参数
          page: 1,
          limit: 30,
          financeNo:'',
          supplierName:'',
          loanClassification: '', 
          writtenOff: '', 
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
      this.getCreditStatusList ();//授信状态-状态下拉
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
      getCreditStatusList (){//五级分类-下拉
      	loanClassificationType ().then(res => {
          if (res.data.code === '200') {
          	this.loanClassificationTypeList= res.data.data
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

