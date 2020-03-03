<template>
  <div class="page-container" ref="page-container" id="page-container"><!---商户管理-商户入驻--->
    <div class="filter-container" ref="filter-container" id="filter-container">
      <el-form :inline="true" :model="listQuery" ref="listQueryForm">
        <el-form-item label="商户编码：" prop="merchantCode">
          <el-input v-model="listQuery.merchantCode" style="width:130px;"></el-input>
        </el-form-item>
        <el-form-item label="商户名称" prop="merchantName">
          <el-input v-model="listQuery.merchantName" style="width:120px;"></el-input>
        </el-form-item>
        <el-form-item label="创建时间" prop="shipDate">
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
        <el-form-item label="订单状态" class="query-select" prop="orderStatus">
          <el-select v-model="listQuery.orderStatus" style="width:150px;">
            <el-option label="全部" value="">
            </el-option>
            <el-option v-if="orderStatusList" v-for="item in orderStatusList" :label="item.statusText" :value='item.status' :key='item.status'>
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="供应商状态" class="query-select" prop="supplierOrderStatus">
          <el-select v-model="listQuery.supplierOrderStatus" style="width:150px;">
            <el-option label="全部" value="">
            </el-option>
            <el-option v-if="supplierOrderStatusList" v-for="item in supplierOrderStatusList" :label="item.statusText" :value='item.status' :key='item.status'>
            </el-option>
          </el-select>
        </el-form-item>

        <el-form-item>
          <el-button  @click="search"  size="mini" type="primary" icon="el-icon-search">查询</el-button>
          <el-button  @click="resetForm('listQueryForm')" size="mini" type="primary" icon="el-icon-refresh">重置</el-button>
          <el-button  @click="exportMessage" size="mini" type="primary" icon="el-icon-download">下载</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="total-container" ref="total-container" id="total-container">
      <span>总订单：{{totalInfo.orderCount}}条</span> <span>总商户：{{totalInfo.merchantCount}}个</span> <span>总金额：{{totalInfo.totalAmount}}元</span> <span>总渠道：{{totalInfo.agentCount}}个</span>
    </div>
    <el-table :data="list"  @current-change="handleSelectionChange" highlight-current-row  :max-height=tableMaxHeight>
      <el-table-column
        prop="orderNo"
        width="200"
        label="订单编号">
      </el-table-column>

      <el-table-column
        prop="merchantCode"
        width="140"
        label="商户编码">
      </el-table-column>

      <el-table-column
        prop="merchantName"
        width="200"
        label="商户名称">
        <template slot-scope="scope" >
          <div>{{scope.row.merchantName}}</div>
        </template>
      </el-table-column>

      <el-table-column
        prop="customerNames"
        width="260"
        label="客户信息">
      </el-table-column>

      <el-table-column
        prop="amount"
        label="价格（元）">
      </el-table-column>

      <el-table-column
        prop="platform"
        label="所属平台">
      </el-table-column>

      <el-table-column
        prop="agentName"
        width="210"
        label="渠道">
      </el-table-column>

      <el-table-column
        prop="supplierName"
        width="210"
        label="供应商名称">
      </el-table-column>

      <el-table-column
        prop="orderTime"
        width="210"
        label="订单创建时间">
      </el-table-column>

      <el-table-column
        prop="orderStatus"
        label="订单状态">
      </el-table-column>

      <el-table-column
        prop="supplierOrderStatus"
        width="150"
        label="供应商状态">
        <template slot-scope="scope" >
          <span>{{scope.row.supplierOrderStatus}}</span>
        </template>
      </el-table-column>

      <!--<el-table-column
        label="操作"
        align="center">
        <template slot-scope="scope" v-if="!roleHasPermissions['supplier_manage_register_list_view']">
            <router-link :to="'supplierDetail/' + scope.row.supplierId" class="router-link">查看</router-link>
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
  import { handleSelectionChange, handleSizeChange, handleCurrentPage } from '@/utils/common'
  import { getListData,getRegisterStatusList,orderStatusList,supplierOrderStatusList,queryTotalInfo } from '@/api/orderSyncManage/orderSyncList'
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
        orderStatusList:'',//下拉列表 - 订单状态
        supplierOrderStatusList:'',//下拉列表 - 供应商状态
        list: [], // 表格数据
        total: 0, // 表格数据总条数
        listQuery: { // 查询参数
          page: 1,
          limit: 30,
          merchantCode: '', // 企业名
          merchantName: '', // 信用代码
          orderDateFrom: '', // 手机号码
          orderDateTo:'',//法定代表人姓名
          orderStatus:'',//法定代表人手机
          supplierOrderStatus: '', // 最早得入驻时间
        },
        totalInfo: { // 统计
          orderCount: '',
          merchantCount: '',
          totalAmount: '',
          agentCount: ''
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
    			that.listQuery.orderDateFrom = Format(val[0], 'yyyy-MM-dd');
    		}else{
    			that.listQuery.orderDateFrom = '';
    		}
	  		if(val[1]){
	  			that.listQuery.orderDateTo = Format(val[1], 'yyyy-MM-dd');
	  		}else{
    			that.listQuery.orderDateTo = '';
	  		}
	  	}
    },
    created () {
    },
    mounted () {
      this.getList()
      this.getTotalInfo()
      this.getRegisterStatusList();//获取入驻阶段下拉
      this.getOrderStatusList ();//下拉列表 - 订单状态
      this.getSupplierOrderStatusList ();//下拉列表 - 供应商状态
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
      getOrderStatusList (){//下拉列表 - 订单状态
      	orderStatusList().then(res => {
          if (res.data.code === '200') {
          	this.orderStatusList= res.data.data
          } else {
            this.$message.error(res.data.message)
          }
        })
      },
      getSupplierOrderStatusList (){//下拉列表 - 供应商状态
      	supplierOrderStatusList().then(res => {
          if (res.data.code === '200') {
          	this.supplierOrderStatusList= res.data.data
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
      getTotalInfo () {
        queryTotalInfo(this.listQuery).then(res => {
          if (res.data.code === '200') {
            this.totalInfo = res.data.data
          } else {
            this.$message.error(res.data.message)
          }
        })
      },
      search(){
      	let that = this;
      	that.getList();
      	that.getTotalInfo()
      },//查询
      resetForm(formName) {
        this.$refs[formName].resetFields();
        this.shipDate = [];
      },//重置表单
      exportMessage () { // 导出提示
        if (this.listQuery.merchantCode || this.listQuery.merchantName) {
          let a = document.createElement('a')
          a.setAttribute('href','/admin/loan_post_inspect/export?merchantCode='+this.listQuery.merchantCode+'&merchantName='+this.listQuery.merchantName+'&orderDateFrom='+this.listQuery.orderDateFrom+'&orderDateTo='+this.listQuery.orderDateTo+'&orderStatus='+this.listQuery.orderStatus+'&supplierOrderStatus='+this.listQuery.supplierOrderStatus)
          a.setAttribute('target','_blank')
          a.click()
          return
        }
        this.$message.error('导出时必须输入商户信息, 商户编号或者商户名称');
      }
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

