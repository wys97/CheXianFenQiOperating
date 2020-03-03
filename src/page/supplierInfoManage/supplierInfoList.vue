<template>
  <div class="page-container" ref="page-container" id="page-container"><!---商户管理-商户入驻--->
    <div class="filter-container" ref="filter-container" id="filter-container">
      <el-form :inline="true" :model="listQuery" ref="listQueryForm">
        <el-form-item label="企业名称" prop="enterpriseName">
          <el-input v-model="listQuery.enterpriseName" style="width:120px;"></el-input>
        </el-form-item>
        <el-form-item label="社会统一信用代码" prop="businessLicenseNo">
          <el-input v-model="listQuery.businessLicenseNo" style="width:130px;"></el-input>
        </el-form-item>
        <el-form-item label="法定代表人姓名" prop="repreName">
          <el-input v-model="listQuery.repreName" style="width:130px;"></el-input>
        </el-form-item>
        <el-form-item label="法定代表人手机" prop="repreMobile">
          <el-input v-model="listQuery.repreMobile" style="width:130px;"></el-input>
        </el-form-item>
        <el-form-item label="对接产品" prop="productName">
          <el-input v-model="listQuery.productName" style="width:130px;"></el-input>
        </el-form-item>
        <el-form-item label="所属场景方" prop="partnerName">
          <el-input v-model="listQuery.partnerName" style="width:130px;"></el-input>
        </el-form-item>
        <el-form-item label="状态" class="query-select" prop="status">
          <el-select v-model="listQuery.status" style="width:150px;">
            <el-option label="全部" value="">
            </el-option>
            <el-option v-if="applyStatusList" v-for="(val,key) in applyStatusList" :label="val" :value='key' :key='key'>
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="进件日期" prop="shipDate">
          <el-date-picker
            v-model="shipDate"
            style="width:280px;"
            align="right"
            type="daterange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期">
          </el-date-picker>
        </el-form-item>
        <el-form-item>
          <el-button  @click="search"  size="mini" type="primary" icon="el-icon-search">查询</el-button>
          <el-button  @click="resetForm('listQueryForm')" size="mini" type="primary" icon="el-icon-refresh">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
    <!--<div class="total-container" ref="total-container" id="total-container">
      <span>提交基础资料中：1</span> <span>审核入驻：21</span><span>审核贸易：2</span><span>预沟通：0</span><span>尽调中：9</span><span>尽调中：9</span><span>签署中：9</span>
    </div>-->
    <el-table :data="list"  @current-change="handleSelectionChange" highlight-current-row  :max-height=tableMaxHeight>
     
      <el-table-column
        prop="enterpriseName"
        width="300"
        label="企业信息">
        <template slot-scope="scope" >
          <div>{{scope.row.enterpriseName}}</div>
          <div>{{scope.row.businessLicenseNo}}</div>
        </template>
      </el-table-column>


      <el-table-column
        prop="repreName"
        label="法定代表人">
        <template slot-scope="scope" >
          <div>{{scope.row.repreName}}</div>
          <div>{{scope.row.repreMobile}}</div>
        </template>
      </el-table-column>
      
      <el-table-column
        prop="productName"
        label="对接产品">
        <template slot-scope="scope" >
          <div>{{scope.row.productName}}</div>
        </template>
      </el-table-column>

       <el-table-column
        prop="partnerName"
        label="所属场景方">
        <template slot-scope="scope" >
          <div>{{scope.row.partnerName}}</div>
        </template>
      </el-table-column>

      <el-table-column
        prop="platformCredit"
        label="平台限额">
        <template slot-scope="scope" >
          <span>{{scope.row.platformCredit}} 元</span>
        </template>
      </el-table-column>

      <el-table-column
        prop="usedSignLimit"
        label="已用授信额度">
        <template slot-scope="scope" >
          <span>{{scope.row.usedSignLimit}} 元</span>
        </template>
      </el-table-column>
      
      <el-table-column
        prop="onSignLimit"
        label="在途授信额度">
        <template slot-scope="scope" >
          <span>{{scope.row.onSignLimit}} 元</span>
        </template>
      </el-table-column>

      <el-table-column
        prop="surplusLimit"
        label="剩余可用额度">
        <template slot-scope="scope" >
          <span>{{scope.row.surplusLimit}} 元</span>
        </template>
      </el-table-column>
      
      <el-table-column
        prop="statusText"
        width="150"
        label="状态">
        <template slot-scope="scope" >
          <span :class="scope.row.status==='ENABLED'?'suc':scope.row.status==='DISABLED'?'blue':scope.row.status==='FROZEN'?'war':''">{{scope.row.statusText}}</span>
        </template>
      </el-table-column>

      <el-table-column
        prop="passTime"
        label="进件通过时间">
      </el-table-column>

      <el-table-column
        label="操作"
        align="center">
        <template slot-scope="scope" v-if="!roleHasPermissions['false']">
            <router-link :to="'supplierInfoDetail/' + scope.row.supplierId" class="router-link">查看</router-link>
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
  import { getListData,getRegisterStatusList,getApplyStatusList } from '@/api/supplierInfoManage/supplierInfoList'
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
        registerStatusList:'',//入驻阶段下拉
        applyStatusList:'',
        list: [], // 表格数据
        total: 0, // 表格数据总条数
        listQuery: { // 查询参数
          page: 1,
          limit: 30,
          enterpriseName: '', // 企业名
          businessLicenseNo: '', // 信用代码
          applyPhone: '', // 手机号码
          repreName:'',//法定代表人姓名
          repreMobile:'',//法定代表人手机
          beginPassTime: '', // 最早得入驻时间
          endPassTime: '', // 最晚得入驻时间
          status: '', // 状态
          productName: '', //对接产品
          partnerName: '', //所属场景方
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
    			that.listQuery.beginPassTime = Format(val[0], 'yyyy-MM-dd');
    		}else{
    			that.listQuery.beginPassTime = '';
    		}
	  		if(val[1]){
	  			that.listQuery.endPassTime = Format(val[1], 'yyyy-MM-dd');
	  		}else{
    			that.listQuery.endPassTime = '';
	  		}
	  	}  
    },
    created () {
    },
    mounted () {
      this.getList()
      this.getRegisterStatusList();//获取入驻阶段下拉
      this.getApplyStatusList();//获取状态下拉
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
      getApplyStatusList (){
      	getApplyStatusList().then(res => {
          if (res.data.code === '200') {
          	this.applyStatusList= res.data.data
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

