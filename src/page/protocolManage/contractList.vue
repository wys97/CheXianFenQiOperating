<template>
  <div class="page-container" ref="page-container" id="page-container"><!---商户管理-商户入驻--->
    <div class="filter-container" ref="filter-container" id="filter-container">
      <el-form :inline="true" :model="listQuery" ref="listQueryForm">
        <el-form-item label="合同编号：" prop="agreementNo">
          <el-input v-model="listQuery.agreementNo" style="width:120px;"></el-input>
        </el-form-item>
        <el-form-item label="合同类型：" prop="agreementType">
          <el-select v-model="listQuery.agreementType" style="width:150px;">
            <el-option label="全部" value="">
            </el-option>
            <el-option v-if="agreementTypeList" v-for="(val,key) in agreementTypeList" :label="val" :value='key' :key='key'>
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="商户名称：" prop="enterpriseName">
          <el-input v-model="listQuery.enterpriseName" style="width:120px;"></el-input>
        </el-form-item>
        <el-form-item label="资方名称：" prop="capitalName">
          <el-input v-model="listQuery.capitalName" style="width:120px;"></el-input>
        </el-form-item>
        <!--<el-form-item label="状态：" prop="status">
          <el-select v-model="listQuery.status" style="width:150px;">
            <el-option label="全部" value="">i
            </el-option>
            <el-option v-if="registerStatusList" v-for="(val,key) in registerStatusList" :label="val" :value='key' :key='key'>
            </el-option>
          </el-select>
        </el-form-item>-->
        <el-form-item>
          <el-button  @click="search"  size="mini" type="primary" icon="el-icon-search">查询</el-button>
          <el-button  @click="resetForm('listQueryForm')" size="mini" type="primary" icon="el-icon-refresh">重置</el-button>
        </el-form-item>
      </el-form>
    	
    	<hr class="hr"/>
	    <div class="table_title_box">
	    	<span>合同列表</span>
	    	<router-link :to="'contractAdd'" class="router-link">
	    		<el-button type="primary" size="mini">新增</el-button>
	    	</router-link>
      </div>
    </div>
    <!--<div class="total-container" ref="total-container" id="total-container">
      <span>提交基础资料中：1</span> <span>审核入驻：21</span><span>审核贸易：2</span><span>预沟通：0</span><span>尽调中：9</span><span>尽调中：9</span><span>签署中：9</span>
    </div>-->
    <el-table :data="list"  @current-change="handleSelectionChange" highlight-current-row  :max-height=tableMaxHeight>
      <el-table-column
        prop="agreementNo"
        label="合同编号">
      </el-table-column>
      
      <el-table-column
        prop="signStepText"
        label="签署节点">
      </el-table-column>
      
      <el-table-column
        prop="agreementTypeText"
        label="合同类型">
      </el-table-column>
      
      <el-table-column
        prop="agreementName"
        label="合同名称">
      </el-table-column>
      
      <el-table-column
        prop="enterpriseName"
        width="300"
        label="签署商户">
        <template slot-scope="scope" >
          <div>{{scope.row.enterpriseName}}</div>
          <div>{{scope.row.enterpriseBusinessLicenseNo}}</div>
        </template>
      </el-table-column>
      
      <el-table-column
        prop="capitalName"
        width="300"
        label="签署资方">
        <template slot-scope="scope" >
          <div>{{scope.row.capitalName}}</div>
          <div>{{scope.row.capitalBusinessLicenseNo}}</div>
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
            <router-link :to="'contractDetail/' + scope.row.id" class="router-link">查看</router-link>
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
  import { getListData,collateralRegisterStatus,agreementType} from '@/api/protocolManage/contractList'
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
        agreementTypeList:'',//合同类型--下拉
        list: [], // 表格数据
        total: 0, // 表格数据总条数
        listQuery: { // 查询参数
          page: 1,
          limit: 30,
          agreementNo:'',
          agreementType:'',
          enterpriseName: '', 
          capitalName: '', 
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
    	//监听路由切换回调
	  	'$route':'fetchdata', 
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
    	this.init();
      setTimeout(() => {
        this.$store.dispatch('SetTableMaxHeight')
      }, 500)
    },
    methods: {
    	init(){
	      this.getList()
	      this.getCollateralTypeList();//获取押品下拉
	      this.getRegisterStatusList();//申请登记-状态下拉
	      this.getAgreementTypeList ();//合同类型下拉
    	},
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
      getAgreementTypeList (){//合同类型下拉
      	agreementType ().then(res => {
          if (res.data.code === '200') {
          	this.agreementTypeList= res.data.data
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
    	fetchdata(){
    		this.init();
	    },
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

